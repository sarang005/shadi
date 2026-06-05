import crypto from 'crypto';
import userRepository from '../repositories/userRepository.js';
import refreshTokenRepository from '../repositories/refreshTokenRepository.js';
import otpRepository from '../repositories/otpRepository.js';
import profileRepository from '../repositories/profileRepository.js';
import { comparePassword } from '../helpers/passwordHelper.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwtUtils.js';
import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';
import { ROLES } from '../constants/roles.js';
import { formatAuthPayload } from '../utils/apiResponse.js';
import env from '../config/env.js';

const getRefreshExpiryDate = () => {
  const expiresIn = env.jwt.refreshExpiresIn || '7d';
  const match = expiresIn.match(/^(\d+)([dhms])$/);
  const date = new Date();
  if (!match) {
    date.setDate(date.getDate() + 7);
    return date;
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  if (unit === 'd') date.setDate(date.getDate() + value);
  else if (unit === 'h') date.setHours(date.getHours() + value);
  else if (unit === 'm') date.setMinutes(date.getMinutes() + value);
  else if (unit === 's') date.setSeconds(date.getSeconds() + value);
  return date;
};

class AuthService {
  async register({ name, email, password }) {
    const exists = await userRepository.existsByEmail(email);
    if (exists) {
      throw new AppError(MESSAGES.AUTH.USER_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const user = await userRepository.create({
      name,
      email,
      password,
      role: ROLES.USER,
    });
    await profileRepository.create({ user: user._id });
    return this.buildAuthResponse(user);
  }

  async login({ email, password, rememberMe }, meta = {}) {
    const user = await userRepository.findByEmail(email, true);
    if (!user) {
      throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.isActive) {
      throw new AppError(MESSAGES.AUTH.ACCOUNT_INACTIVE, HTTP_STATUS.FORBIDDEN);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    user.lastLogin = new Date();
    await user.save();

    return this.buildAuthResponse(user, rememberMe, meta);
  }

  async buildAuthResponse(user, rememberMe = true, meta = {}) {
    const payload = { id: user._id.toString(), role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await refreshTokenRepository.create({
      user: user._id,
      token: refreshToken,
      expiresAt: getRefreshExpiryDate(),
      userAgent: meta.userAgent,
      ipAddress: meta.ipAddress,
    });

    const userDoc = await userRepository.findById(user._id);
    return {
      ...formatAuthPayload(userDoc, accessToken, refreshToken),
      rememberMe,
    };
  }

  async refreshToken(token) {
    if (!token) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const stored = await refreshTokenRepository.findValidToken(token);
    if (!stored) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await userRepository.findById(decoded.id);
    if (!user || !user.isActive) {
      throw new AppError(MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    await refreshTokenRepository.revokeByToken(token);

    const accessToken = signAccessToken({ id: user._id.toString(), role: user.role });
    const newRefreshToken = signRefreshToken({ id: user._id.toString(), role: user.role });

    await refreshTokenRepository.create({
      user: user._id,
      token: newRefreshToken,
      expiresAt: getRefreshExpiryDate(),
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      token: accessToken,
    };
  }

  async logout(token) {
    if (token) {
      await refreshTokenRepository.revokeByToken(token);
    }
    return true;
  }

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }

  async sendOtp({ countryCode = '+91', phone }) {
    const fullPhone = `${countryCode}${phone}`.replace(/\s/g, '');
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await otpRepository.create({ phone, countryCode, otp, expiresAt });

    const masked = `${countryCode} ${phone.slice(0, 2)}***${phone.slice(-2)}`;
    return { maskedPhone: masked, expiresIn: 600 };
  }

  async verifyOtp({ countryCode = '+91', phone, otp }) {
    const session = await otpRepository.findLatestByPhone(phone, countryCode);
    if (!session || session.otp !== otp || session.expiresAt < new Date()) {
      throw new AppError(MESSAGES.AUTH.INVALID_OTP, HTTP_STATUS.UNAUTHORIZED);
    }

    await otpRepository.markVerified(session._id);

    let user = await userRepository.findByPhone(phone);
    if (!user) {
      user = await userRepository.create({
        name: 'User',
        email: `${phone}@otp.shadisampanna.local`,
        password: crypto.randomBytes(16).toString('hex'),
        phone,
        role: ROLES.USER,
      });
      await profileRepository.create({ user: user._id });
    }

    if (!user.isActive) {
      throw new AppError(MESSAGES.AUTH.ACCOUNT_INACTIVE, HTTP_STATUS.FORBIDDEN);
    }

    user.lastLogin = new Date();
    await user.save();

    return this.buildAuthResponse(user);
  }
}

export default new AuthService();

import RefreshToken from '../models/RefreshToken.js';

class RefreshTokenRepository {
  create(data) {
    return RefreshToken.create(data);
  }

  findValidToken(token) {
    return RefreshToken.findOne({ token, revoked: false, expiresAt: { $gt: new Date() } });
  }

  revokeByToken(token) {
    return RefreshToken.findOneAndUpdate({ token }, { revoked: true });
  }

  revokeAllForUser(userId) {
    return RefreshToken.updateMany({ user: userId }, { revoked: true });
  }
}

export default new RefreshTokenRepository();

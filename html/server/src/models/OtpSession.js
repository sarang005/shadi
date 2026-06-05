import mongoose from 'mongoose';

const otpSessionSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, index: true },
    countryCode: { type: String, default: '+91' },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    verified: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const OtpSession = mongoose.model('OtpSession', otpSessionSchema);

export default OtpSession;

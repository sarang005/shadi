import OtpSession from '../models/OtpSession.js';

class OtpRepository {
  create(data) {
    return OtpSession.create(data);
  }

  findLatestByPhone(phone, countryCode) {
    return OtpSession.findOne({ phone, countryCode, verified: false })
      .sort({ createdAt: -1 });
  }

  markVerified(id) {
    return OtpSession.findByIdAndUpdate(id, { verified: true });
  }

  incrementAttempts(id) {
    return OtpSession.findByIdAndUpdate(id, { $inc: { attempts: 1 } });
  }
}

export default new OtpRepository();

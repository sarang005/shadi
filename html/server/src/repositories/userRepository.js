import User from '../models/User.js';

class UserRepository {
  create(data) {
    return User.create(data);
  }

  findById(id, selectPassword = false) {
    const query = User.findById(id);
    if (selectPassword) query.select('+password');
    return query;
  }

  findByEmail(email, selectPassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    if (selectPassword) query.select('+password');
    return query;
  }

  findByPhone(phone) {
    return User.findOne({ phone });
  }

  updateById(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  deleteById(id) {
    return User.findByIdAndDelete(id);
  }

  findWithFilters({ filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 10 }) {
    return User.find(filter).sort(sort).skip(skip).limit(limit);
  }

  countDocuments(filter = {}) {
    return User.countDocuments(filter);
  }

  existsByEmail(email, excludeId = null) {
    const filter = { email: email.toLowerCase() };
    if (excludeId) filter._id = { $ne: excludeId };
    return User.exists(filter);
  }
}

export default new UserRepository();

import Profile from '../models/Profile.js';

class ProfileRepository {
  create(data) {
    return Profile.create(data);
  }

  findByUserId(userId) {
    return Profile.findOne({ user: userId }).populate('user', '-password');
  }

  findById(id) {
    return Profile.findById(id).populate('user', '-password');
  }

  updateByUserId(userId, data) {
    return Profile.findOneAndUpdate({ user: userId }, data, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }

  findPublishedProfiles({ filter = {}, skip = 0, limit = 10 }) {
    return Profile.find({ isPublished: true, ...filter })
      .populate('user', 'name avatar membership profileId isActive')
      .skip(skip)
      .limit(limit);
  }

  countPublished(filter = {}) {
    return Profile.countDocuments({ isPublished: true, ...filter });
  }
}

export default new ProfileRepository();

import userRepository from '../repositories/userRepository.js';
import profileRepository from '../repositories/profileRepository.js';
import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

class UserService {
  async getOwnProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    const profile = await profileRepository.findByUserId(userId);
    return { user, profile };
  }

  async updateOwnProfile(userId, updates) {
    const { name, avatar, phone, ...profileData } = updates;
    const userUpdates = {};
    if (name) userUpdates.name = name;
    if (avatar !== undefined) userUpdates.avatar = avatar;
    if (phone) userUpdates.phone = phone;

    let user = await userRepository.findById(userId);
    if (Object.keys(userUpdates).length) {
      user = await userRepository.updateById(userId, userUpdates);
    }

    const profile = await profileRepository.updateByUserId(userId, profileData);
    return { user, profile };
  }

  async getDashboardForUser(userId) {
    const user = await userRepository.findById(userId);
    return {
      user: { name: user?.name, profileId: user?.profileId },
      stats: [
        { icon: '💑', iconClass: 'stat-icon-rose', num: 248, label: 'Profile Views Today', change: '↑ 18% from yesterday', changeType: 'up' },
        { icon: '💌', iconClass: 'stat-icon-rose', num: 36, label: 'Interests Received', change: '↑ 5 new today', changeType: 'up' },
        { icon: '⭐', iconClass: '', num: 14, label: 'Shortlisted by Others', change: '↑ 2 new today', changeType: 'up' },
        { icon: '🤝', iconClass: 'stat-icon-gold', num: 7, label: 'Mutual Matches', change: '↑ 3 this week', changeType: 'up' },
      ],
      profileStrength: 72,
      shortlistedToday: 3,
    };
  }
}

export default new UserService();

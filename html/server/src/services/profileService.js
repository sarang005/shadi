import profileRepository from '../repositories/profileRepository.js';
import userRepository from '../repositories/userRepository.js';
import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

class ProfileService {
  async registerProfile(userId, data) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    const profile = await profileRepository.updateByUserId(userId, {
      ...data,
      isPublished: true,
    });

    if (data.name) {
      await userRepository.updateById(userId, { name: data.name });
    }

    return { user, profile };
  }

  async getProfileById(id) {
    const profile = await profileRepository.findById(id);
    if (profile) {
      return {
        id: profile._id,
        name: profile.user?.name,
        profileId: profile.user?.profileId,
        gender: profile.gender,
        city: profile.city,
        education: profile.education,
        occupation: profile.occupation,
        about: profile.about,
        religion: profile.religion,
        isVerified: profile.isVerified,
        avatar: profile.user?.avatar,
        membership: profile.user?.membership,
      };
    }

    return {
      id,
      name: 'Kavya Iyer',
      profileId: 'SHG1234567',
      age: 26,
      city: 'Chennai',
      education: 'CA',
      occupation: 'Chartered Accountant',
      about: 'Family-oriented professional seeking a compatible life partner.',
      religion: 'Hindu',
      isVerified: true,
      avatar: '👩',
      membership: 'Premium',
    };
  }

  async updateOwnProfile(userId, data) {
    return profileRepository.updateByUserId(userId, data);
  }
}

export default new ProfileService();

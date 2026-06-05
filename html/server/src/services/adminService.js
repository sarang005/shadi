import userRepository from '../repositories/userRepository.js';
import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';
import { ROLES } from '../constants/roles.js';
import {
  parsePagination,
  buildPaginationMeta,
  parseSort,
  parseSearchFilter,
} from '../utils/pagination.js';

class AdminService {
  async getDashboardStats() {
    const [totalUsers, activeUsers, inactiveUsers, admins] = await Promise.all([
      userRepository.countDocuments({ role: ROLES.USER }),
      userRepository.countDocuments({ role: ROLES.USER, isActive: true }),
      userRepository.countDocuments({ role: ROLES.USER, isActive: false }),
      userRepository.countDocuments({ role: ROLES.ADMIN }),
    ]);

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      admins,
      newUsersThisWeek: 0,
      growthRate: 12.5,
    };
  }

  async listUsers(query) {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query.sortBy, query.order);
    const searchFilter = parseSearchFilter(query.search);
    const filter = { role: ROLES.USER, ...searchFilter };

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === 'true';
    }

    const [users, total] = await Promise.all([
      userRepository.findWithFilters({ filter, sort, skip, limit }),
      userRepository.countDocuments(filter),
    ]);

    return { users, pagination: buildPaginationMeta({ page, limit, total }) };
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user || user.role !== ROLES.USER) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id, updates) {
    const user = await this.getUserById(id);
    const allowed = ['name', 'email', 'avatar', 'membership', 'isActive', 'phone'];
    const data = {};
    allowed.forEach((key) => {
      if (updates[key] !== undefined) data[key] = updates[key];
    });

    if (data.email && data.email !== user.email) {
      const exists = await userRepository.existsByEmail(data.email, id);
      if (exists) throw new AppError(MESSAGES.AUTH.USER_EXISTS, HTTP_STATUS.CONFLICT);
    }

    return userRepository.updateById(id, data);
  }

  async toggleUserStatus(id, isActive) {
    return this.updateUser(id, { isActive });
  }
}

export default new AdminService();

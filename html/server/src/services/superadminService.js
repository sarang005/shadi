import userRepository from '../repositories/userRepository.js';
import refreshTokenRepository from '../repositories/refreshTokenRepository.js';
import AppError from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';
import { ROLES, ADMIN_ROLES } from '../constants/roles.js';
import {
  parsePagination,
  buildPaginationMeta,
  parseSort,
  parseSearchFilter,
} from '../utils/pagination.js';

class SuperadminService {
  async getSystemAnalytics() {
    const [users, admins, superadmins, active, inactive] = await Promise.all([
      userRepository.countDocuments({ role: ROLES.USER }),
      userRepository.countDocuments({ role: ROLES.ADMIN }),
      userRepository.countDocuments({ role: ROLES.SUPERADMIN }),
      userRepository.countDocuments({ isActive: true }),
      userRepository.countDocuments({ isActive: false }),
    ]);

    return {
      users,
      admins,
      superadmins,
      active,
      inactive,
      totalAccounts: users + admins + superadmins,
      systemHealth: 'operational',
    };
  }

  async listAllUsers(query) {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query.sortBy, query.order);
    const filter = parseSearchFilter(query.search);

    if (query.role) filter.role = query.role;
    if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';

    const [users, total] = await Promise.all([
      userRepository.findWithFilters({ filter, sort, skip, limit }),
      userRepository.countDocuments(filter),
    ]);

    return { users, pagination: buildPaginationMeta({ page, limit, total }) };
  }

  async createAdmin(data, createdBy) {
    const exists = await userRepository.existsByEmail(data.email);
    if (exists) {
      throw new AppError(MESSAGES.AUTH.USER_EXISTS, HTTP_STATUS.CONFLICT);
    }

    if (data.role === ROLES.SUPERADMIN) {
      throw new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    const role = data.role === ROLES.USER ? ROLES.USER : ROLES.ADMIN;

    return userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role,
      createdBy,
      avatar: data.avatar,
    });
  }

  async updateUserRole(id, role, requesterRole) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    if (user.role === ROLES.SUPERADMIN) {
      throw new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    if (role === ROLES.SUPERADMIN) {
      throw new AppError('Cannot assign superadmin role', HTTP_STATUS.FORBIDDEN);
    }

    if (requesterRole === ROLES.ADMIN && ADMIN_ROLES.includes(user.role)) {
      throw new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    return userRepository.updateById(id, { role });
  }

  async deleteUser(id, requesterId) {
    if (id === requesterId) {
      throw new AppError('Cannot delete your own account', HTTP_STATUS.BAD_REQUEST);
    }

    const user = await userRepository.findById(id);
    if (!user) throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    if (user.role === ROLES.SUPERADMIN) {
      throw new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    await refreshTokenRepository.revokeAllForUser(id);
    await userRepository.deleteById(id);
    return true;
  }

  async toggleAccountStatus(id, isActive) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    if (user.role === ROLES.SUPERADMIN) {
      throw new AppError(MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }
    return userRepository.updateById(id, { isActive });
  }

  async listAdmins(query) {
    const { page, limit, skip } = parsePagination(query);
    const filter = { role: { $in: [ROLES.ADMIN, ROLES.SUPERADMIN] } };
    const sort = parseSort(query.sortBy, query.order);

    const [users, total] = await Promise.all([
      userRepository.findWithFilters({ filter, sort, skip, limit }),
      userRepository.countDocuments(filter),
    ]);

    return { users, pagination: buildPaginationMeta({ page, limit, total }) };
  }
}

export default new SuperadminService();

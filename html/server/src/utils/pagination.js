export const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const buildPaginationMeta = ({ page, limit, total }) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit) || 1,
});

export const parseSort = (sortBy = 'createdAt', order = 'desc') => {
  const allowed = ['createdAt', 'name', 'email', 'lastLogin', 'role'];
  const field = allowed.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = order === 'asc' ? 1 : -1;
  return { [field]: sortOrder };
};

export const parseSearchFilter = (search) => {
  if (!search?.trim()) return {};
  const regex = new RegExp(search.trim(), 'i');
  return {
    $or: [{ name: regex }, { email: regex }],
  };
};

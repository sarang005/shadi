import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as adminService from '@/features/admin/adminService';
import { getApiErrorMessage } from '@/utils/apiUtils';
import './AdminPages.scss';

const AdminUsers = () => {
  const user = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.fetchUsers({ limit: 20 });
      setUsers(data.users);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (id, isActive) => {
    try {
      await adminService.updateUserStatus(id, !isActive);
      loadUsers();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="admin-page">
      <header className="topbar">
        <div className="topbar-title">
          <h1>Manage Users</h1>
          <p>{user?.name}</p>
        </div>
      </header>
      <div className="page">
        {loading && <p className="admin-muted">Loading users...</p>}
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id || u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={u.isActive ? 'badge-active' : 'badge-inactive'}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn-sm"
                      onClick={() => toggleStatus(u._id || u.id, u.isActive)}
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && users.length === 0 && (
            <p className="admin-muted">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;

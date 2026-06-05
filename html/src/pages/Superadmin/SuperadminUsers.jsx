import { useEffect, useState } from 'react';
import * as superadminService from '@/features/superadmin/superadminService';
import { getApiErrorMessage } from '@/utils/apiUtils';
import '../Admin/AdminPages.scss';

const SuperadminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await superadminService.fetchAllUsers({ limit: 30 });
      setUsers(data.users);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await superadminService.deleteUser(id);
      load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="admin-page">
      <header className="topbar">
        <h1>All Users</h1>
      </header>
      <div className="page">
        {loading && <p className="admin-muted">Loading...</p>}
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id || u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    {u.role !== 'superadmin' && (
                      <button
                        type="button"
                        className="admin-btn-sm"
                        onClick={() => handleDelete(u._id || u.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperadminUsers;

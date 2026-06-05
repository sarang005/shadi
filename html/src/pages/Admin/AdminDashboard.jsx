import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import * as adminService from '@/features/admin/adminService';
import { getApiErrorMessage } from '@/utils/apiUtils';
import './AdminPages.scss';

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await adminService.fetchAdminDashboard();
        setStats(data);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="admin-page">
      <header className="topbar">
        <div className="topbar-title">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <div className="topbar-avatar">{user?.avatar ?? '👨‍💼'}</div>
      </header>

      <div className="page">
        {loading && <p className="admin-muted">Loading statistics...</p>}
        {error && <p className="admin-error">{error}</p>}
        {stats && (
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-num">{stats.totalUsers}</div>
              <div className="admin-stat-label">Total Users</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-num">{stats.activeUsers}</div>
              <div className="admin-stat-label">Active Users</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-num">{stats.inactiveUsers}</div>
              <div className="admin-stat-label">Inactive Users</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-num">{stats.admins}</div>
              <div className="admin-stat-label">Admins</div>
            </div>
          </div>
        )}
        <Link to={ROUTES.ADMIN_USERS} className="admin-link-btn">
          Manage Users →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

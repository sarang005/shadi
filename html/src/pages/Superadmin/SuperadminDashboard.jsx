import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import * as superadminService from '@/features/superadmin/superadminService';
import { getApiErrorMessage } from '@/utils/apiUtils';
import '../Admin/AdminPages.scss';

const SuperadminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await superadminService.fetchAnalytics();
        setAnalytics(data);
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
          <h1>System Analytics</h1>
          <p>Super Admin — {user?.name}</p>
        </div>
        <div className="topbar-avatar">{user?.avatar ?? '👑'}</div>
      </header>
      <div className="page">
        {loading && <p className="admin-muted">Loading...</p>}
        {error && <p className="admin-error">{error}</p>}
        {analytics && (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-num">{analytics.users}</div>
                <div className="admin-stat-label">Users</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{analytics.admins}</div>
                <div className="admin-stat-label">Admins</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{analytics.superadmins}</div>
                <div className="admin-stat-label">Super Admins</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{analytics.totalAccounts}</div>
                <div className="admin-stat-label">Total Accounts</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{analytics.active}</div>
                <div className="admin-stat-label">Active</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{analytics.inactive}</div>
                <div className="admin-stat-label">Inactive</div>
              </div>
            </div>
            <p className="admin-muted">System: {analytics.systemHealth}</p>
          </>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Link to={ROUTES.SUPERADMIN_USERS} className="admin-link-btn">
            All Users →
          </Link>
          <Link to={ROUTES.SUPERADMIN_ADMINS} className="admin-link-btn">
            Manage Admins →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;

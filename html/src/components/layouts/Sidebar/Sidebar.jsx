import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/features/auth/authThunk';
import { logout } from '@/features/auth/authSlice';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import '@/styles/_sidebar.scss';

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || ROLES.USER;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(logout());
    navigate(ROUTES.SIGN_IN, { replace: true });
  };

  const userNav = (
    <>
      <div className="nav-label">Main</div>
      <NavLink
        to={ROUTES.DASHBOARD}
        end
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">🏠</div>
        Dashboard
      </NavLink>
      <NavLink
        to={ROUTES.MATCHES}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">💑</div>
        My Matches
      </NavLink>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=messages`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">💬</div>
        Messages
      </NavLink>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=interests`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">🔔</div>
        Interests
      </NavLink>

      <div className="nav-label">Discover</div>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=search`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">🔍</div>
        Search Profiles
      </NavLink>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=shortlisted`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">⭐</div>
        Shortlisted
      </NavLink>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=viewed`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">👁️</div>
        Who Viewed Me
      </NavLink>

      <div className="nav-label">Account</div>
      <NavLink
        to={ROUTES.EDIT_PROFILE}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">👤</div>
        Edit Profile
      </NavLink>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=membership`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">💎</div>
        Membership
      </NavLink>
      <NavLink
        to={`${ROUTES.COMING_SOON}?page=settings`}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">⚙️</div>
        Settings
      </NavLink>
    </>
  );

  const adminNav = (
    <>
      <div className="nav-label">Admin</div>
      <NavLink
        to={ROUTES.ADMIN_DASHBOARD}
        end
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">📊</div>
        Admin Dashboard
      </NavLink>
      <NavLink
        to={ROUTES.ADMIN_USERS}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <div className="nav-icon">👥</div>
        Manage Users
      </NavLink>
      {role === ROLES.SUPERADMIN && (
        <>
          <div className="nav-label">Super Admin</div>
          <NavLink
            to={ROUTES.SUPERADMIN_DASHBOARD}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <div className="nav-icon">👑</div>
            System Analytics
          </NavLink>
          <NavLink
            to={ROUTES.SUPERADMIN_USERS}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <div className="nav-icon">🗂️</div>
            All Users
          </NavLink>
          <NavLink
            to={ROUTES.SUPERADMIN_ADMINS}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <div className="nav-icon">🛡️</div>
            Manage Admins
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`} id="app-sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">♥</div>
        <span className="logo-text">
          Shadi<span>Sampanna</span>
        </span>
      </div>
      <nav className="sidebar-nav">
        {role === ROLES.USER ? userNav : adminNav}
      </nav>
      <div className="sidebar-user">
        <div className="user-avatar">{user?.avatar ?? '👩'}</div>
        <div style={{ flex: 1 }}>
          <div className="user-name">{user?.name ?? 'User'}</div>
          <div className="user-status">
            <div className="status-dot" />
            {user?.role ?? 'user'} · {user?.membership ?? 'Free'}
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18,
            padding: 4,
          }}
        >
          ⏻
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

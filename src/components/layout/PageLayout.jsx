import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * PageLayout — wraps any page that uses the sidebar (all pages except SignIn).
 *
 * @param {object}  props
 * @param {string}  props.title        TopBar page title
 * @param {string}  props.subtitle
 * @param {boolean} props.showSearch
 * @param {React.ReactNode} props.topBarActions
 * @param {React.ReactNode} props.children
 * @param {boolean} props.noPadding    skip default content padding
 */
const PageLayout = ({
  title,
  subtitle,
  showSearch = false,
  topBarActions,
  children,
  noPadding = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, notifications } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fdf0f5' }}>
      <Sidebar user={user} onLogout={handleLogout} />

      <div style={{ marginLeft: 260, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          title={title}
          subtitle={subtitle}
          onSearch={showSearch ? () => {} : undefined}
          notifCount={notifications?.unread || 0}
          user={user}
          actions={topBarActions}
        />

        <main
          style={{
            flex: 1,
            padding: noPadding ? 0 : '28px',
            maxWidth: 1400,
            width: '100%',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;

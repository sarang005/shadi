import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import { Avatar } from '../common/index.jsx';

const NAV_ITEMS = [
  { label: 'Dashboard',      icon: '🏠', path: '/dashboard' },
  { label: 'Matches',        icon: '💑', path: '/matches',          badge: 24 },
  { label: 'Messages',       icon: '💬', path: '/messages',         badge: 7 },
  { label: 'Interests',      icon: '💌', path: '/interests',        badge: 12 },
  { label: 'Search',         icon: '🔍', path: '/search' },
  { label: 'Shortlisted',    icon: '⭐', path: '/shortlisted' },
  { label: 'Who Viewed Me',  icon: '👁️', path: '/visitors' },
];

const ACCOUNT_ITEMS = [
  { label: 'Edit Profile',   icon: '✏️', path: '/profile/edit' },
  { label: 'Membership',     icon: '💎', path: '/membership' },
  { label: 'Settings',       icon: '⚙️', path: '/settings' },
];

/**
 * Sidebar — extracted from dashboard.html
 * Fixed left navigation panel (260px wide).
 *
 * @param {object}  props
 * @param {object}  props.user        { name, age, id, isOnline }
 * @param {function} props.onLogout
 */
const Sidebar = ({ user = {}, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 13px',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.25s',
    marginBottom: 2,
    textDecoration: 'none',
    color: isActive ? '#c2185b' : '#9e6b85',
    fontFamily: "'Jost', sans-serif",
    fontSize: 13.5,
    fontWeight: isActive ? 600 : 400,
    background: isActive
      ? 'linear-gradient(135deg,rgba(194,24,91,0.1),rgba(136,14,79,0.07))'
      : 'transparent',
    position: 'relative',
  });

  const navIconStyle = (isActive) => ({
    width: 34,
    height: 34,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    background: isActive
      ? 'linear-gradient(135deg,#c2185b,#880e4f)'
      : '#fdf0f5',
    boxShadow: isActive ? '0 4px 12px rgba(194,24,91,0.35)' : 'none',
    flexShrink: 0,
    transition: 'all 0.25s',
  });

  const sectionLabel = (text) => (
    <div
      style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#c9a0b8',
        padding: '14px 10px 6px',
        fontFamily: "'Jost', sans-serif",
      }}
    >
      {text}
    </div>
  );

  const renderItem = ({ label, icon, path, badge }) => {
    const isActive = location.pathname === path;
    return (
      <div key={path} style={navItemStyle(isActive)} onClick={() => navigate(path)}>
        {/* Active indicator bar */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              left: -12,
              top: '22%',
              bottom: '22%',
              width: 3,
              background: 'linear-gradient(to bottom,#c2185b,#880e4f)',
              borderRadius: '0 4px 4px 0',
            }}
          />
        )}
        <div style={navIconStyle(isActive)}>{icon}</div>
        <span style={{ flex: 1 }}>{label}</span>
        {badge && (
          <div
            style={{
              background: '#c2185b',
              color: 'white',
              fontSize: 10,
              fontWeight: 600,
              padding: '2px 7px',
              borderRadius: 50,
              minWidth: 20,
              textAlign: 'center',
            }}
          >
            {badge}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 260,
        background: 'white',
        borderRight: '1px solid rgba(194,24,91,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        boxShadow: '4px 0 30px rgba(136,14,79,0.05)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '26px 22px 22px',
          borderBottom: '1px solid rgba(194,24,91,0.1)',
        }}
      >
        <Logo variant="light" size={36} />
      </div>

      {/* Navigation */}
      <nav style={{ padding: '18px 12px', flex: 1, overflowY: 'auto' }}>
        {sectionLabel('Main')}
        {NAV_ITEMS.map(renderItem)}

        {sectionLabel('Account')}
        {ACCOUNT_ITEMS.map(renderItem)}
      </nav>

      {/* User Footer */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid rgba(194,24,91,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onClick={() => navigate('/profile')}
      >
        <Avatar emoji="👩" size={38} online={user.isOnline} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a0a12', truncate: true }}>
            {user.name || 'Sunita Sharma'}
          </div>
          <div style={{ fontSize: 11, color: '#9e6b85', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <span
              style={{
                width: 6,
                height: 6,
                background: '#4caf50',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            {user.id || 'SHG1234567'}
          </div>
        </div>
        <div
          style={{ fontSize: 12, color: '#9e6b85', cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); onLogout?.(); }}
          title="Logout"
        >
          ⏻
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

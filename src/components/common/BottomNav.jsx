import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * BottomNav — Large tab bar, 72px height for elderly accessibility
 * Clear labels always visible, large icons
 */
const NAV_ITEMS = [
  { path: '/home',     icon: '🏠', label: 'Discover' },
  { path: '/matches',  icon: '💑', label: 'Matches',  badge: 24 },
  { path: '/chat',     icon: '💬', label: 'Messages', badge: 7 },
  { path: '/shortlist',icon: '⭐', label: 'Saved' },
  { path: '/profile',  icon: '👤', label: 'My Profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      style={{ background: '#fff', borderTop: '1px solid rgba(194,24,91,0.1)', display: 'flex', padding: '6px 0 16px', flexShrink: 0, boxShadow: '0 -4px 20px rgba(136,14,79,0.06)' }}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '6px 4px', background: 'none', border: 'none', cursor: 'pointer',
              minHeight: 60, WebkitTapHighlightColor: 'transparent', position: 'relative',
            }}
            aria-label={item.label} aria-current={active ? 'page' : undefined}
          >
            <span style={{ fontSize: 26, lineHeight: 1 }}>{item.icon}</span>
            {item.badge && !active && (
              <span style={{ position: 'absolute', top: 4, right: '18%', background: '#c2185b', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 50, minWidth: 16, textAlign: 'center', fontFamily: "'Jost',sans-serif" }}>
                {item.badge}
              </span>
            )}
            <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? '#c2185b' : '#c9a0b8', fontFamily: "'Jost',sans-serif", lineHeight: 1 }}>
              {item.label}
            </span>
            {active && <div style={{ position: 'absolute', bottom: -6, width: 4, height: 4, background: '#c2185b', borderRadius: '50%' }} />}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;

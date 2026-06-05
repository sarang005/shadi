import React from 'react';

/**
 * PageHeader — Top navigation bar for inner pages
 * Large back button, large title, right actions
 */
const PageHeader = ({
  title, subtitle = null, onBack = null, rightActions = null,
  dark = false, style = {},
}) => {
  const bg = dark ? 'linear-gradient(135deg,#880e4f,#c2185b)' : '#fff';
  const titleColor = dark ? '#fff' : '#1a0a12';
  const subColor = dark ? 'rgba(255,255,255,0.7)' : '#9e6b85';

  return (
    <div style={{ background: bg, padding: '12px 16px 14px', borderBottom: dark ? 'none' : '1px solid rgba(194,24,91,0.1)', flexShrink: 0, boxShadow: dark ? 'none' : '0 2px 16px rgba(136,14,79,0.06)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ width: 48, height: 48, borderRadius: 14, background: dark ? 'rgba(255,255,255,0.15)' : '#fdf0f5', border: dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(194,24,91,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, cursor: 'pointer', color: dark ? '#fff' : '#c2185b', flexShrink: 0 }}
            aria-label="Go back"
          >←</button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, color: titleColor, lineHeight: 1.1 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13, color: subColor, marginTop: 2, fontFamily: "'Jost',sans-serif" }}>{subtitle}</div>}
        </div>
        {rightActions && <div style={{ display: 'flex', gap: 8 }}>{rightActions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;

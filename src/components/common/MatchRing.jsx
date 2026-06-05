import React from 'react';

/**
 * MatchRing — Circular percentage ring for compatibility score
 * Uses conic-gradient, always legible font
 */
const MatchRing = ({ percentage = 0, size = 64 }) => {
  const deg = (percentage / 100) * 360;
  const ringStyle = {
    width: size, height: size, borderRadius: '50%',
    background: `conic-gradient(#c2185b 0deg ${deg}deg, rgba(248,187,208,0.3) ${deg}deg 360deg)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', flexShrink: 0,
    boxShadow: '0 4px 16px rgba(194,24,91,0.3)',
  };
  const innerStyle = {
    position: 'absolute', inset: size * 0.12, borderRadius: '50%',
    background: '#fff', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
  };
  return (
    <div style={ringStyle}>
      <div style={innerStyle}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: size * 0.22, fontWeight: 700, color: '#c2185b', lineHeight: 1 }}>
          {percentage}%
        </span>
        <span style={{ fontSize: size * 0.11, color: '#9e6b85', fontFamily: "'Jost',sans-serif", lineHeight: 1 }}>Match</span>
      </div>
    </div>
  );
};

export default MatchRing;

import React from 'react';

/** iOS-style status bar */
const StatusBar = ({ dark = false, transparent = false }) => {
  const bg = transparent ? 'transparent' : dark ? 'linear-gradient(135deg,#880e4f,#c2185b)' : '#fff';
  const color = dark || transparent ? '#fff' : '#1a0a12';
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: bg, flexShrink: 0, zIndex: 50 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "'Jost',sans-serif" }}>{time}</span>
      <span style={{ fontSize: 12, color, opacity: 0.85 }}>●●● 🔋</span>
    </div>
  );
};

export default StatusBar;

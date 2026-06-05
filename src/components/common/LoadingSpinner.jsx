import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16 }}>
    <div style={{ width: 48, height: 48, border: '4px solid #fce4ec', borderTop: '4px solid #c2185b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 18, color: '#9e6b85' }}>{message}</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingSpinner;

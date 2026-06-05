import React from 'react';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry = null }) => (
  <div style={{ background: '#fff5f5', border: '2px solid rgba(198,40,40,0.2)', borderRadius: 16, padding: 20, margin: '12px 0', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
    <span style={{ fontSize: 28, flexShrink: 0 }}>⚠️</span>
    <div style={{ flex: 1 }}>
      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, color: '#c62828', fontWeight: 600, marginBottom: 4 }}>Oops!</p>
      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, color: '#9e6b85', lineHeight: 1.6 }}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: 12, padding: '10px 20px', background: '#c62828', color: '#fff', border: 'none', borderRadius: 12, fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Try Again
        </button>
      )}
    </div>
  </div>
);

export default ErrorMessage;

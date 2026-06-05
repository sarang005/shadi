import React from 'react';

/**
 * Button — Elderly-friendly large touch target (min 64px height)
 * Variants: primary | secondary | outline | ghost | danger | gold
 */
const Button = ({
  children, variant = 'primary', size = 'large',
  fullWidth = false, disabled = false, loading = false,
  icon = null, iconPosition = 'left', onClick, style = {}, type = 'button',
}) => {
  const sizes = {
    large:  { height: 64, fontSize: 18, padding: '0 28px' },
    medium: { height: 56, fontSize: 17, padding: '0 24px' },
    small:  { height: 48, fontSize: 16, padding: '0 18px' },
  };
  const variants = {
    primary:   { background: 'linear-gradient(135deg,#c2185b,#880e4f)', color: '#fff', boxShadow: '0 6px 22px rgba(194,24,91,0.38)', border: 'none' },
    secondary: { background: '#fdf0f5', color: '#c2185b', border: '2px solid rgba(194,24,91,0.2)' },
    outline:   { background: 'transparent', color: '#c2185b', border: '2.5px solid #c2185b' },
    ghost:     { background: 'rgba(194,24,91,0.08)', color: '#c2185b', border: 'none' },
    danger:    { background: 'linear-gradient(135deg,#e53935,#c62828)', color: '#fff', border: 'none' },
    gold:      { background: 'linear-gradient(135deg,#b8860b,#d4a017)', color: '#fff', border: 'none' },
  };
  const base = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    borderRadius: 18, fontFamily: "'Jost',sans-serif", fontWeight: 700,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.25s', outline: 'none', letterSpacing: 0.5,
    width: fullWidth ? '100%' : 'auto', opacity: disabled ? 0.55 : 1,
    WebkitTapHighlightColor: 'transparent', userSelect: 'none',
    ...sizes[size], ...variants[variant], ...style,
  };
  return (
    <button type={type} style={base} onClick={!disabled && !loading ? onClick : undefined} disabled={disabled || loading}>
      {loading && <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>}
      {!loading && icon && iconPosition === 'left' && <span style={{ fontSize: sizes[size].fontSize + 2 }}>{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span style={{ fontSize: sizes[size].fontSize + 2 }}>{icon}</span>}
    </button>
  );
};

export default Button;

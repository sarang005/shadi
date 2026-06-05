import React, { useState } from 'react';

/**
 * Input — Large, accessible form input for elderly users
 * Height 60px, Font 18px, clear label, error support
 */
const Input = ({
  label, placeholder, value, onChange, type = 'text',
  icon = null, rightIcon = null, onRightIconClick = null,
  error = null, helperText = null, disabled = false,
  required = false, name, id, style = {},
}) => {
  const [focused, setFocused] = useState(false);

  const wrapStyle = { marginBottom: 18, ...style };
  const labelStyle = {
    display: 'block', fontSize: 14, fontWeight: 700,
    letterSpacing: 1.5, textTransform: 'uppercase',
    color: error ? '#c62828' : '#9e6b85', marginBottom: 8,
    fontFamily: "'Jost',sans-serif",
  };
  const inputWrap = {
    position: 'relative', display: 'flex', alignItems: 'center',
    border: `2px solid ${error ? '#e53935' : focused ? '#c2185b' : 'rgba(194,24,91,0.15)'}`,
    borderRadius: 16, background: disabled ? '#fdf0f5' : '#fff',
    boxShadow: focused && !error ? '0 0 0 4px rgba(194,24,91,0.10)' : 'none',
    transition: 'all 0.3s',
  };
  const inputStyle = {
    flex: 1, height: 60, padding: `0 ${rightIcon ? 52 : 20}px 0 ${icon ? 52 : 20}px`,
    border: 'none', background: 'transparent', outline: 'none',
    fontFamily: "'Jost',sans-serif", fontSize: 18, color: '#3d1a2e',
    WebkitAppearance: 'none',
  };
  const iconStyle = { position: 'absolute', left: 18, fontSize: 20, color: focused ? '#c2185b' : '#c9a0b8', pointerEvents: 'none' };
  const rightIconStyle = {
    position: 'absolute', right: 16, fontSize: 22,
    color: '#c9a0b8', cursor: onRightIconClick ? 'pointer' : 'default', padding: 4,
    background: 'none', border: 'none',
  };
  const errorStyle = { fontSize: 14, color: '#c62828', marginTop: 6, fontFamily: "'Jost',sans-serif", display: 'flex', alignItems: 'center', gap: 5 };
  const helperStyle = { fontSize: 14, color: '#9e6b85', marginTop: 6, fontFamily: "'Jost',sans-serif" };

  return (
    <div style={wrapStyle}>
      {label && (
        <label htmlFor={id || name} style={labelStyle}>
          {label} {required && <span style={{ color: '#c2185b' }}>*</span>}
        </label>
      )}
      <div style={inputWrap}>
        {icon && <span style={iconStyle}>{icon}</span>}
        <input
          id={id || name} name={name} type={type} value={value}
          onChange={onChange} placeholder={placeholder}
          disabled={disabled} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={inputStyle} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}
        />
        {rightIcon && (
          <button type="button" style={rightIconStyle} onClick={onRightIconClick} aria-label="Toggle">
            {rightIcon}
          </button>
        )}
      </div>
      {error && <div id={`${name}-error`} style={errorStyle} role="alert">⚠ {error}</div>}
      {helperText && !error && <div style={helperStyle}>{helperText}</div>}
    </div>
  );
};

export default Input;

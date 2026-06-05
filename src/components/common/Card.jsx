import React from 'react';

/**
 * Card — Rounded container with consistent shadow and padding
 */
const Card = ({
  children, padding = 20, radius = 20, shadow = true,
  border = false, style = {}, onClick = null, hoverable = false,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const cardStyle = {
    background: '#fff',
    borderRadius: radius,
    padding,
    boxShadow: shadow ? (hovered && hoverable ? '0 8px 32px rgba(136,14,79,0.18)' : '0 4px 20px rgba(136,14,79,0.10)') : 'none',
    border: border ? '1.5px solid rgba(194,24,91,0.12)' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s',
    transform: hovered && hoverable ? 'translateY(-2px)' : 'none',
    ...style,
  };
  return (
    <div
      style={cardStyle} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;

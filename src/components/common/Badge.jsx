import React from "react";

/**
 * Badge — Status/label chip with icon support
 */
const Badge = ({
  children,
  variant = "default",
  icon = null,
  size = "medium",
  style = {},
}) => {
  const variants = {
    default: { background: "rgba(194,24,91,0.08)", color: "#c2185b" },
    verified: { background: "rgba(194,24,91,0.08)", color: "#c2185b" },
    premium: {
      background:
        "linear-gradient(135deg,rgba(184,134,11,0.12),rgba(212,160,23,0.08))",
      color: "#b8860b",
    },
    online: { background: "rgba(76,175,80,0.1)", color: "#2e7d32" },
    new: { background: "#fce4ec", color: "#c2185b" },
    success: { background: "rgba(46,125,50,0.1)", color: "#2e7d32" },
    error: { background: "rgba(198,40,40,0.08)", color: "#c62828" },
    warning: { background: "rgba(245,124,0,0.1)", color: "#f57c00" },
  };

  const sizes = {
    large: { padding: "8px 16px", fontSize: 14, borderRadius: 12 },
    medium: { padding: "5px 12px", fontSize: 12, borderRadius: 10 },
    small: { padding: "3px 9px", fontSize: 11, borderRadius: 8 },
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontFamily: "'Jost',sans-serif",
    fontWeight: 700,
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  return (
    <span style={badgeStyle}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;

import React from "react";

/**
 * Avatar — Profile picture circle with online indicator
 */
const Avatar = ({
  emoji = "👤",
  size = 56,
  online = false,
  border = true,
  bg = null,
  style = {},
}) => {
  const wrap = {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
    ...style,
  };

  const circle = {
    width: size,
    height: size,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.46,
    background: bg || "linear-gradient(135deg,#fce4ec,#f48fb1)",
    border: border ? `${Math.max(2, size * 0.04)}px solid #f8bbd0` : "none",
    flexShrink: 0,
  };

  const dot = {
    position: "absolute",
    bottom: size * 0.04,
    right: size * 0.04,
    width: Math.max(10, size * 0.2),
    height: Math.max(10, size * 0.2),
    background: "#4caf50",
    borderRadius: "50%",
    border: `${Math.max(2, size * 0.04)}px solid #fff`,
  };

  return (
    <div style={wrap}>
      <div style={circle}>{emoji}</div>
      {online && <div style={dot} aria-label="Online" />}
    </div>
  );
};

export default Avatar;

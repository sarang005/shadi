import React from "react";
import { useNavigate } from "react-router-dom";
// import { Avatar } from "../common/index.jsx";

/**
 * TopBar — extracted from dashboard.html
 * Sticky top navigation bar for pages using the Sidebar layout.
 *
 * @param {object}  props
 * @param {string}  props.title          page title
 * @param {string}  props.subtitle
 * @param {function} props.onSearch
 * @param {number}  props.notifCount
 * @param {object}  props.user
 * @param {React.ReactNode} props.actions  custom right-side actions
 */
const TopBar = ({
  title,
  subtitle,
  onSearch,
  notifCount = 0,
  user = {},
  actions,
}) => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        background: "white",
        borderBottom: "1px solid rgba(194,24,91,0.1)",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 68,
        zIndex: 50,
        boxShadow: "0 2px 20px rgba(136,14,79,0.06)",
      }}
    >
      {/* Page Title */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontWeight: 500,
            color: "#1a0a12",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: "#9e6b85", marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Search */}
      {onSearch && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#fdf0f5",
            border: "1px solid rgba(194,24,91,0.12)",
            borderRadius: 12,
            padding: "9px 16px",
            cursor: "pointer",
            minWidth: 200,
          }}
          onClick={onSearch}
        >
          <span style={{ fontSize: 15 }}>🔍</span>
          <span
            style={{
              fontSize: 13,
              color: "#c9a0b8",
              fontFamily: "'Jost',sans-serif",
            }}
          >
            Search profiles...
          </span>
        </div>
      )}

      {/* Custom Actions */}
      {actions}

      {/* Notifications */}
      <div style={{ position: "relative", cursor: "pointer" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "#fdf0f5",
            border: "1px solid rgba(194,24,91,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
          }}
          onClick={() => navigate("/notifications")}
        >
          🔔
        </div>
        {notifCount > 0 && (
          <div
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 17,
              height: 17,
              background: "#c2185b",
              borderRadius: "50%",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: "white",
              fontWeight: 700,
            }}
          >
            {notifCount > 9 ? "9+" : notifCount}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>
        <Avatar
          emoji="👩"
          size={36}
          gradient="linear-gradient(135deg,#fce4ec,#c2185b)"
          online={user.isOnline}
        />
      </div>
    </header>
  );
};

export default TopBar;

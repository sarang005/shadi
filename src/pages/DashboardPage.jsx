import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <button class="mobile-menu-toggle" onclick="toggleSidebar()">
        <span></span>
        <span></span>
        <span></span>
      </button>{" "}
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">
          <div class="logo-mark">♥</div>
          <span class="logo-text">
            Shadi<span>Sampanna</span>
          </span>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-label">Main</div>
          <a class="nav-item active" href="dashboard.html">
            <div class="nav-icon">🏠</div>
            Dashboard
          </a>
          <a class="nav-item" href="matches.html">
            <div class="nav-icon">💑</div>
            My Matches
            <span class="nav-badge">24</span>
          </a>
          <a class="nav-item" href="#">
            <div class="nav-icon">💬</div>
            Messages
            <span class="nav-badge">7</span>
          </a>
          <a class="nav-item" href="#">
            <div class="nav-icon">🔔</div>
            Interests
            <span class="nav-badge">12</span>
          </a>
          <div class="nav-label">Discover</div>
          <a class="nav-item" href="#">
            <div class="nav-icon">🔍</div>
            Search Profiles
          </a>
          <a class="nav-item" href="#">
            <div class="nav-icon">⭐</div>
            Shortlisted
          </a>
          <a class="nav-item" href="#">
            <div class="nav-icon">👁️</div>
            Who Viewed Me
          </a>
          <div class="nav-label">Account</div>
          <a class="nav-item" href="profile-registration.html">
            <div class="nav-icon">👤</div>
            Edit Profile
          </a>
          <a class="nav-item" href="#">
            <div class="nav-icon">💎</div>
            Membership
          </a>
          <a class="nav-item" href="#">
            <div class="nav-icon">⚙️</div>
            Settings
          </a>
        </nav>
        <div class="sidebar-user">
          <div class="user-avatar">👩</div>
          <div>
            <div class="user-name">Ananya Sharma</div>
            <div class="user-status">
              <div class="status-dot"></div>
              Active · Premium
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { fetchDashboard } from '@/features/dashboard/dashboardThunk';
import './Dashboard.scss';

const formatDate = () => {
  const d = new Date();
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { profileStrength, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <>
      <header className="topbar">
        <div className="topbar-title">
          <h1>Dashboard</h1>
          <p>{formatDate()}</p>
        </div>
        <div className="topbar-search">
          <span>🔍</span>
          <input type="text" placeholder="Search profiles, messages..." />
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
          <button type="button" className="icon-btn">
            🔔
            <div className="notif-dot" />
          </button>
          <button type="button" className="icon-btn">
            💬
          </button>
          <div className="topbar-avatar">{user?.avatar ?? '👩'}</div>
        </div>
      </header>

      <div className="page">
        <div className="welcome-banner">
          <div className="welcome-left">
            <div className="greeting">Good Morning ✦</div>
            <h2>
              Welcome back, <em>{firstName}!</em>
              <br />
              Your soulmate awaits.
            </h2>
            <p>
              You have 24 new matches today and 7 unread messages from
              interested profiles. Complete your profile to attract better
              matches.
            </p>
            <div className="welcome-actions">
              <Link to={ROUTES.MATCHES}>
                <button type="button" className="btn-white">
                  View Matches ✨
                </button>
              </Link>
              <Link to={ROUTES.EDIT_PROFILE}>
                <button type="button" className="btn-outline-white">
                  Complete Profile
                </button>
              </Link>
            </div>
          </div>
          <div className="welcome-right">
            <div className="profile-complete">
              <div className="profile-complete-label">
                <span>Profile Strength</span>
                <strong>{profileStrength ?? 72}%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
              <div style={{ fontSize: 11, marginTop: 8, opacity: 0.75 }}>
                Add photos to reach 90% ↗
              </div>
            </div>
            <div style={{ marginTop: 16, opacity: 0.85, fontSize: 13 }}>
              3 people shortlisted you today 💝
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card" style={{ animationDelay: '0.05s' }}>
            <div className="stat-icon stat-icon-rose">💑</div>
            <div className="stat-num">248</div>
            <div className="stat-label">Profile Views Today</div>
            <div className="stat-change stat-up">↑ 18% from yesterday</div>
          </div>
          <div className="stat-card" style={{ animationDelay: '0.1s' }}>
            <div className="stat-icon stat-icon-rose">💌</div>
            <div className="stat-num">36</div>
            <div className="stat-label">Interests Received</div>
            <div className="stat-change stat-up">↑ 5 new today</div>
          </div>
          <div className="stat-card" style={{ animationDelay: '0.15s' }}>
            <div className="stat-icon" style={{ background: '#e8f5e9' }}>
              ⭐
            </div>
            <div className="stat-num">14</div>
            <div className="stat-label">Shortlisted by Others</div>
            <div className="stat-change stat-up">↑ 2 new today</div>
          </div>
          <div className="stat-card" style={{ animationDelay: '0.2s' }}>
            <div className="stat-icon stat-icon-gold">🤝</div>
            <div className="stat-num">7</div>
            <div className="stat-label">Mutual Matches</div>
            <div className="stat-change stat-up">↑ 3 this week</div>
          </div>
        </div>

        <div className="grid-2-1">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Today&apos;s Matches ✨</div>
                <div className="card-subtitle">
                  AI-curated profiles based on your preferences
                </div>
              </div>
              <Link to={ROUTES.MATCHES} className="card-action">
                View All →
              </Link>
            </div>
            <div className="card-body">
              <div className="match-scroll">
                <div className="match-mini">
                  <div className="match-mini-photo photo-1">
                    👩
                    <div className="match-mini-badge">NEW</div>
                  </div>
                  <div className="match-mini-info">
                    <div className="match-mini-name">Kavya Iyer</div>
                    <div className="match-mini-detail">26 · CA · Chennai</div>
                    <div className="match-mini-score">
                      <div className="score-bar-wrap">
                        <div className="score-bar" style={{ width: '94%' }} />
                      </div>
                      <span className="score-pct">94%</span>
                    </div>
                    <div className="match-mini-actions">
                      <button
                        type="button"
                        className="btn-xs btn-xs-outline"
                        style={{ border: '1.5px solid var(--rose)' }}
                      >
                        Skip
                      </button>
                      <button type="button" className="btn-xs btn-xs-fill">
                        💝 Like
                      </button>
                    </div>
                  </div>
                </div>
                <div className="match-mini">
                  <div className="match-mini-photo photo-5">
                    👩
                    <div className="match-mini-badge">✓</div>
                  </div>
                  <div className="match-mini-info">
                    <div className="match-mini-name">Priya Rao</div>
                    <div className="match-mini-detail">25 · Doctor · Bangalore</div>
                    <div className="match-mini-score">
                      <div className="score-bar-wrap">
                        <div className="score-bar" style={{ width: '91%' }} />
                      </div>
                      <span className="score-pct">91%</span>
                    </div>
                    <div className="match-mini-actions">
                      <button
                        type="button"
                        className="btn-xs btn-xs-outline"
                        style={{ border: '1.5px solid var(--rose)' }}
                      >
                        Skip
                      </button>
                      <button type="button" className="btn-xs btn-xs-fill">
                        💝 Like
                      </button>
                    </div>
                  </div>
                </div>
                <div className="match-mini">
                  <div className="match-mini-photo photo-3">
                    👩
                    <div className="match-mini-badge">⭐</div>
                  </div>
                  <div className="match-mini-info">
                    <div className="match-mini-name">Sneha Kapoor</div>
                    <div className="match-mini-detail">27 · MBA · Mumbai</div>
                    <div className="match-mini-score">
                      <div className="score-bar-wrap">
                        <div className="score-bar" style={{ width: '88%' }} />
                      </div>
                      <span className="score-pct">88%</span>
                    </div>
                    <div className="match-mini-actions">
                      <button
                        type="button"
                        className="btn-xs btn-xs-outline"
                        style={{ border: '1.5px solid var(--rose)' }}
                      >
                        Skip
                      </button>
                      <button type="button" className="btn-xs btn-xs-fill">
                        💝 Like
                      </button>
                    </div>
                  </div>
                </div>
                <div className="match-mini">
                  <div className="match-mini-photo photo-4">
                    👩
                    <div className="match-mini-badge">💎</div>
                  </div>
                  <div className="match-mini-info">
                    <div className="match-mini-name">Meera Nair</div>
                    <div className="match-mini-detail">26 · Architect · Pune</div>
                    <div className="match-mini-score">
                      <div className="score-bar-wrap">
                        <div className="score-bar" style={{ width: '86%' }} />
                      </div>
                      <span className="score-pct">86%</span>
                    </div>
                    <div className="match-mini-actions">
                      <button
                        type="button"
                        className="btn-xs btn-xs-outline"
                        style={{ border: '1.5px solid var(--rose)' }}
                      >
                        Skip
                      </button>
                      <button type="button" className="btn-xs btn-xs-fill">
                        💝 Like
                      </button>
                    </div>
                  </div>
                </div>
                <div className="match-mini">
                  <div className="match-mini-photo photo-2">
                    👩
                    <div className="match-mini-badge">NEW</div>
                  </div>
                  <div className="match-mini-info">
                    <div className="match-mini-name">Deepa Menon</div>
                    <div className="match-mini-detail">24 · Engineer · Kochi</div>
                    <div className="match-mini-score">
                      <div className="score-bar-wrap">
                        <div className="score-bar" style={{ width: '83%' }} />
                      </div>
                      <span className="score-pct">83%</span>
                    </div>
                    <div className="match-mini-actions">
                      <button
                        type="button"
                        className="btn-xs btn-xs-outline"
                        style={{ border: '1.5px solid var(--rose)' }}
                      >
                        Skip
                      </button>
                      <button type="button" className="btn-xs btn-xs-fill">
                        💝 Like
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Recent Activity</div>
                <div className="card-subtitle">Latest interactions</div>
              </div>
              <span className="card-action">All →</span>
            </div>
            <div className="card-body" style={{ padding: '14px 20px' }}>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon-wrap act-interest">💌</div>
                  <div className="activity-text">
                    <div className="activity-main">
                      <strong>Rohit Verma</strong> sent you an interest request
                    </div>
                    <div className="activity-time">2 minutes ago</div>
                  </div>
                  <div className="activity-dot" />
                </div>
                <div className="activity-item">
                  <div className="activity-icon-wrap act-view">👁️</div>
                  <div className="activity-text">
                    <div className="activity-main">
                      <strong>Arjun Mehta</strong> viewed your profile
                    </div>
                    <div className="activity-time">14 minutes ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon-wrap act-shortlist">⭐</div>
                  <div className="activity-text">
                    <div className="activity-main">
                      <strong>Vikram S.</strong> shortlisted your profile
                    </div>
                    <div className="activity-time">1 hour ago</div>
                  </div>
                  <div className="activity-dot" />
                </div>
                <div className="activity-item">
                  <div className="activity-icon-wrap act-msg">💬</div>
                  <div className="activity-text">
                    <div className="activity-main">
                      <strong>Raj Patel</strong> sent you a message
                    </div>
                    <div className="activity-time">3 hours ago</div>
                  </div>
                  <div className="activity-dot" />
                </div>
                <div className="activity-item">
                  <div className="activity-icon-wrap act-interest">💌</div>
                  <div className="activity-text">
                    <div className="activity-main">
                      <strong>Kiran Kumar</strong> accepted your interest
                    </div>
                    <div className="activity-time">Yesterday</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-1-1">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">My Shortlist</div>
                <div className="card-subtitle">Profiles you saved</div>
              </div>
              <span className="card-action">View All →</span>
            </div>
            <div className="card-body" style={{ padding: '14px 20px' }}>
              <div className="shortlist-list">
                <div className="shortlist-item">
                  <div className="sl-photo photo-1">👩</div>
                  <div>
                    <div className="sl-name">Kavya Iyer</div>
                    <div className="sl-detail">
                      26 · CA · Chennai · Tamil Brahmin
                    </div>
                  </div>
                  <div className="sl-badge">94% Match</div>
                </div>
                <div className="shortlist-item">
                  <div className="sl-photo photo-5">👩</div>
                  <div>
                    <div className="sl-name">Priya Rao</div>
                    <div className="sl-detail">
                      25 · Doctor · Bangalore · Iyengar
                    </div>
                  </div>
                  <div className="sl-badge">91% Match</div>
                </div>
                <div className="shortlist-item">
                  <div className="sl-photo photo-3">👩</div>
                  <div>
                    <div className="sl-name">Sneha Kapoor</div>
                    <div className="sl-detail">27 · MBA · Mumbai · Punjabi</div>
                  </div>
                  <div className="sl-badge">88% Match</div>
                </div>
                <div className="shortlist-item">
                  <div className="sl-photo photo-4">👩</div>
                  <div>
                    <div className="sl-name">Meera Nair</div>
                    <div className="sl-detail">26 · Architect · Pune · Nair</div>
                  </div>
                  <div className="sl-badge">86% Match</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Compatibility Factors</div>
              </div>
              <div className="card-body">
                <div className="compat-chart">
                  <div className="compat-row">
                    <div className="compat-label">Education</div>
                    <div className="compat-bar-wrap">
                      <div className="compat-bar" style={{ width: '92%' }} />
                    </div>
                    <div className="compat-pct">92%</div>
                  </div>
                  <div className="compat-row">
                    <div className="compat-label">Values</div>
                    <div className="compat-bar-wrap">
                      <div className="compat-bar" style={{ width: '87%' }} />
                    </div>
                    <div className="compat-pct">87%</div>
                  </div>
                  <div className="compat-row">
                    <div className="compat-label">Location</div>
                    <div className="compat-bar-wrap">
                      <div className="compat-bar" style={{ width: '78%' }} />
                    </div>
                    <div className="compat-pct">78%</div>
                  </div>
                  <div className="compat-row">
                    <div className="compat-label">Lifestyle</div>
                    <div className="compat-bar-wrap">
                      <div className="compat-bar" style={{ width: '83%' }} />
                    </div>
                    <div className="compat-pct">83%</div>
                  </div>
                  <div className="compat-row">
                    <div className="compat-label">Horoscope</div>
                    <div className="compat-bar-wrap">
                      <div className="compat-bar" style={{ width: '70%' }} />
                    </div>
                    <div className="compat-pct">70%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Quick Actions</div>
              </div>
              <div className="card-body">
                <div className="quick-actions">
                  <button type="button" className="quick-action-btn">
                    <div className="qa-icon">📷</div>
                    <div>
                      <div className="qa-label">Add Photos</div>
                      <div className="qa-sublabel">Boost visibility</div>
                    </div>
                  </button>
                  <button type="button" className="quick-action-btn">
                    <div className="qa-icon">🔍</div>
                    <div>
                      <div className="qa-label">Advanced Search</div>
                      <div className="qa-sublabel">Filter profiles</div>
                    </div>
                  </button>
                  <button type="button" className="quick-action-btn">
                    <div className="qa-icon">⭐</div>
                    <div>
                      <div className="qa-label">Horoscope Match</div>
                      <div className="qa-sublabel">Kundli analysis</div>
                    </div>
                  </button>
                  <button type="button" className="quick-action-btn">
                    <div className="qa-icon">💎</div>
                    <div>
                      <div className="qa-label">Upgrade Plan</div>
                      <div className="qa-sublabel">Get more matches</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

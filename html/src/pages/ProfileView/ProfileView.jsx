import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProfile } from '@/features/profile/profileThunk';
import { ROUTES } from '@/constants/routes';
import './ProfileView.scss';

const ProfileView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { currentProfile: profile, loading, error } = useSelector((state) => state.profile);
  const [shortlisted, setShortlisted] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProfile(id));
  }, [dispatch, id]);

  const name = profile?.name ?? 'Profile';
  const profileId = profile?.profileId ?? id;

  return (
    <>
      <header className="topbar">
        <Link className="topbar-back" to={ROUTES.MATCHES}>
          ← Back to Matches
        </Link>
        <h1>
          {name} — {profileId}
        </h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button type="button" className="icon-btn">
            🔔
            <div className="notif-dot" />
          </button>
          <div className="topbar-avatar">{user?.avatar ?? '👩'}</div>
        </div>
      </header>

      {loading && (
        <p style={{ padding: 48, textAlign: 'center', color: 'var(--muted)' }}>
          Loading profile...
        </p>
      )}
      {error && (
        <p style={{ padding: 48, textAlign: 'center', color: 'var(--rose)' }}>{error}</p>
      )}

      {!loading && !error && (
        <div className="profile-layout">
          <div className="profile-main">
            <div className="hero-card" style={{ animation: 'fadeUp 0.5s ease both' }}>
              <div className="hero-photo-section">
                <div className="hero-photo">{profile?.avatar ?? profile?.emoji ?? '👤'}</div>
                <div className="hero-photo-overlay" />
                <div className="photo-badges">
                  {profile?.isVerified && (
                    <div className="photo-badge badge-verified">✓ ID Verified</div>
                  )}
                  {profile?.membership === 'Premium' && (
                    <div className="photo-badge badge-premium">✦ Premium</div>
                  )}
                </div>
              </div>

              <div className="hero-info">
                <div className="hero-name-block">
                  <h1 className="hero-name">{name}</h1>
                  <div className="hero-name-detail">
                    {profile?.age && <span>{profile.age} yrs</span>}
                    {profile?.occupation && <span>{profile.occupation}</span>}
                    {profile?.city && <span>{profile.city}</span>}
                  </div>
                </div>
                {profile?.about && <p className="hero-about">{profile.about}</p>}
              </div>
            </div>

            <div className="info-sections">
              <div className="info-card">
                <h3>Basic Information</h3>
                <div className="info-grid">
                  {profile?.religion && (
                    <div className="info-item">
                      <span className="info-label">Religion</span>
                      <span className="info-value">{profile.religion}</span>
                    </div>
                  )}
                  {profile?.education && (
                    <div className="info-item">
                      <span className="info-label">Education</span>
                      <span className="info-value">{profile.education}</span>
                    </div>
                  )}
                  {profile?.occupation && (
                    <div className="info-item">
                      <span className="info-label">Occupation</span>
                      <span className="info-value">{profile.occupation}</span>
                    </div>
                  )}
                  {profile?.city && (
                    <div className="info-item">
                      <span className="info-label">Location</span>
                      <span className="info-value">{profile.city}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="profile-sidebar">
            <div className="sidebar-card">
              <button
                type="button"
                className={`btn-shortlist${shortlisted ? ' on' : ''}`}
                onClick={() => setShortlisted((s) => !s)}
              >
                {shortlisted ? '⭐ Shortlisted' : '☆ Shortlist'}
              </button>
              <button type="button" className="btn-interest">
                💌 Send Interest
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default ProfileView;

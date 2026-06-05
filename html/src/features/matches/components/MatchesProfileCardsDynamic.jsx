import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const photoClasses = ['pcbg1', 'pcbg2', 'pcbg3', 'pcbg4', 'pcbg5', 'pcbg6'];

const MatchesProfileCardsDynamic = ({ profiles = [], onLikeClick, likedState = {} }) => {
  if (!profiles.length) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--muted)', padding: 48 }}>
        No profiles found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className="profiles-grid">
      {profiles.map((profile, index) => {
        const id = String(profile.id ?? profile._id ?? index);
        const score = profile.score ?? 85;
        const isLiked = likedState[id];
        return (
          <div
            key={id}
            className="profile-card"
            style={{ animationDelay: `${index * 0.07}s` }}
          >
            <div className={`pc-photo ${photoClasses[index % photoClasses.length]}`}>
              {profile.emoji ?? '👤'}
              {profile.verified && (
                <div className="pc-badges">
                  <span className="pc-badge badge-verified">✓ Verified</span>
                </div>
              )}
            </div>
            <div className="pc-body">
              <div className="pc-name-row">
                <span className="pc-name">{profile.name}</span>
                <button
                  type="button"
                  className={`pc-like${isLiked ? ' liked' : ''}`}
                  onClick={() => onLikeClick?.(id)}
                >
                  {isLiked ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="pc-meta">{profile.detail ?? profile.occupation ?? '—'}</div>
              <div className="pc-match">
                <div className="pc-match-num">{score}%</div>
                <div className="pc-match-bar">
                  <div className="pc-match-fill" style={{ width: `${score}%` }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
              </div>
              <div className="pc-actions">
                <Link to={ROUTES.PROFILE_VIEW.replace(':id', id)}>
                  <button type="button" className="btn-outline">
                    View Profile
                  </button>
                </Link>
                <button type="button" className="btn-fill">
                  💌 Interest
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchesProfileCardsDynamic;

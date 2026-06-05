import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const MatchesProfileCards = ({ onLikeClick, likedState = {} }) => (
  <div className="profiles-grid">
    <div className="profile-card" style={{ animationDelay: '0s' }}>
      <div className="pc-photo pcbg1">
        👩
        <div className="pc-badges">
          <span className="pc-badge badge-new">New</span>
          <span className="pc-badge badge-verified">✓ Verified</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-name-row">
          <span className="pc-name">Kavya Iyer</span>
          <button
            type="button"
            className={`pc-like${likedState['1'] !== false ? ' liked' : ''}`}
            onClick={() => onLikeClick?.('1')}
          >
            {likedState['1'] !== false ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="pc-meta">
          26 yrs · 5&apos;4&quot; · Chartered Accountant
          <br />
          Chennai, TN · Tamil Brahmin
        </div>
        <div className="pc-chips">
          <span className="pc-chip">Vegetarian</span>
          <span className="pc-chip">Non-smoker</span>
          <span className="pc-chip">Family values</span>
        </div>
        <div className="pc-match">
          <div className="pc-match-num">94%</div>
          <div className="pc-match-bar">
            <div className="pc-match-fill" style={{ width: '94%' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
        </div>
        <div className="pc-actions">
          <Link to={ROUTES.PROFILE_VIEW.replace(':id', '1')}>
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

    <div className="profile-card" style={{ animationDelay: '0.07s' }}>
      <div className="pc-photo pcbg5">
        👩
        <div className="pc-badges">
          <span className="pc-badge badge-premium">✦ Premium</span>
          <span className="pc-badge badge-verified">✓ Verified</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-name-row">
          <span className="pc-name">Priya Rao</span>
          <button
            type="button"
            className={`pc-like${likedState['2'] ? ' liked' : ''}`}
            onClick={() => onLikeClick?.('2')}
          >
            {likedState['2'] ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="pc-meta">
          25 yrs · 5&apos;6&quot; · MBBS Doctor
          <br />
          Bangalore, KA · Iyengar Brahmin
        </div>
        <div className="pc-chips">
          <span className="pc-chip">AIIMS Graduate</span>
          <span className="pc-chip">Manglik</span>
        </div>
        <div className="pc-match">
          <div className="pc-match-num">91%</div>
          <div className="pc-match-bar">
            <div className="pc-match-fill" style={{ width: '91%' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
        </div>
        <div className="pc-actions">
          <Link to={ROUTES.PROFILE_VIEW.replace(':id', '2')}>
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

    <div className="profile-card" style={{ animationDelay: '0.14s' }}>
      <div className="pc-photo pcbg3">
        👩
        <div className="pc-badges">
          <span className="pc-badge badge-new">New</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-name-row">
          <span className="pc-name">Meera Nair</span>
          <button
            type="button"
            className={`pc-like${likedState['3'] ? ' liked' : ''}`}
            onClick={() => onLikeClick?.('3')}
          >
            {likedState['3'] ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="pc-meta">
          26 yrs · 5&apos;5&quot; · Architect
          <br />
          Pune, MH · Nair Community
        </div>
        <div className="pc-chips">
          <span className="pc-chip">IIT Bombay</span>
          <span className="pc-chip">Creative</span>
        </div>
        <div className="pc-match">
          <div className="pc-match-num">88%</div>
          <div className="pc-match-bar">
            <div className="pc-match-fill" style={{ width: '88%' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
        </div>
        <div className="pc-actions">
          <Link to={ROUTES.PROFILE_VIEW.replace(':id', '3')}>
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

    <div className="profile-card" style={{ animationDelay: '0.21s' }}>
      <div className="pc-photo pcbg4">
        👩
        <div className="pc-badges">
          <span className="pc-badge badge-premium">✦ Premium</span>
          <span className="pc-badge badge-verified">✓ Verified</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-name-row">
          <span className="pc-name">Sneha Kapoor</span>
          <button
            type="button"
            className={`pc-like${likedState['4'] ? ' liked' : ''}`}
            onClick={() => onLikeClick?.('4')}
          >
            {likedState['4'] ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="pc-meta">
          27 yrs · 5&apos;7&quot; · MBA Finance
          <br />
          Mumbai, MH · Punjabi Khatri
        </div>
        <div className="pc-chips">
          <span className="pc-chip">IIM Grad</span>
          <span className="pc-chip">NRI Ready</span>
        </div>
        <div className="pc-match">
          <div className="pc-match-num">86%</div>
          <div className="pc-match-bar">
            <div className="pc-match-fill" style={{ width: '86%' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
        </div>
        <div className="pc-actions">
          <Link to={ROUTES.PROFILE_VIEW.replace(':id', '4')}>
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

    <div className="profile-card" style={{ animationDelay: '0.28s' }}>
      <div className="pc-photo pcbg2">
        👩
        <div className="pc-badges">
          <span className="pc-badge badge-verified">✓ Verified</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-name-row">
          <span className="pc-name">Deepa Menon</span>
          <button
            type="button"
            className={`pc-like${likedState['5'] ? ' liked' : ''}`}
            onClick={() => onLikeClick?.('5')}
          >
            {likedState['5'] ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="pc-meta">
          24 yrs · 5&apos;3&quot; · Software Engineer
          <br />
          Kochi, KL · Nair Community
        </div>
        <div className="pc-chips">
          <span className="pc-chip">NITK Graduate</span>
          <span className="pc-chip">Reader</span>
        </div>
        <div className="pc-match">
          <div className="pc-match-num">84%</div>
          <div className="pc-match-bar">
            <div className="pc-match-fill" style={{ width: '84%' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
        </div>
        <div className="pc-actions">
          <Link to={ROUTES.PROFILE_VIEW.replace(':id', '5')}>
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

    <div className="profile-card" style={{ animationDelay: '0.35s' }}>
      <div className="pc-photo pcbg6">
        👩
        <div className="pc-badges">
          <span className="pc-badge badge-premium">✦ Premium</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-name-row">
          <span className="pc-name">Anjali Singh</span>
          <button
            type="button"
            className={`pc-like${likedState['6'] ? ' liked' : ''}`}
            onClick={() => onLikeClick?.('6')}
          >
            {likedState['6'] ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="pc-meta">
          28 yrs · 5&apos;5&quot; · Civil Services (IAS)
          <br />
          Jaipur, RJ · Rajput
        </div>
        <div className="pc-chips">
          <span className="pc-chip">UPSC 2022</span>
          <span className="pc-chip">Traditional</span>
        </div>
        <div className="pc-match">
          <div className="pc-match-num">81%</div>
          <div className="pc-match-bar">
            <div className="pc-match-fill" style={{ width: '81%' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Match</span>
        </div>
        <div className="pc-actions">
          <Link to={ROUTES.PROFILE_VIEW.replace(':id', '6')}>
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
  </div>
);

export default MatchesProfileCards;

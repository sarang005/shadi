import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants/routes';
import { getHomeRouteForRole } from '@/constants/roles';
import './ComingSoon.scss';

const titles = {
  messages: 'Messages',
  interests: 'Interests',
  search: 'Search Profiles',
  shortlisted: 'Shortlisted',
  viewed: 'Who Viewed Me',
  membership: 'Membership',
  settings: 'Settings',
};

const ComingSoon = () => {
  const [params] = useSearchParams();
  const user = useSelector((state) => state.auth.user);
  const page = params.get('page') || 'feature';
  const title = titles[page] || 'Feature';

  return (
    <div className="coming-soon-page">
      <header className="topbar">
        <h1>{title}</h1>
      </header>
      <div className="coming-soon-card">
        <div className="coming-soon-icon">✨</div>
        <h2>{title} — Coming Soon</h2>
        <p>
          This section is under development. Check back soon for updates to your Shadi
          Sampanna experience.
        </p>
        <Link to={getHomeRouteForRole(user?.role) || ROUTES.DASHBOARD} className="btn-back">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;

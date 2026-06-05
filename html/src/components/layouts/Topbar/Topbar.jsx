import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Topbar.module.scss';

const Topbar = ({
  title,
  subtitle,
  showSearch = false,
  backLink,
  backLabel = '← Back to Matches',
}) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className={styles.topbar}>
      {backLink ? (
        <Link className={styles.topbarBack} to={backLink}>
          {backLabel}
        </Link>
      ) : (
        <div className={styles.topbarTitle}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {backLink && <h1 className={styles.topbarHeading}>{title}</h1>}
      {showSearch && (
        <div className={styles.topbarSearch}>
          <span>🔍</span>
          <input type="text" placeholder="Search profiles, messages..." />
        </div>
      )}
      <div className={styles.topbarActions}>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          🔔
          <div className={styles.notifDot} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Messages">
          💬
        </button>
        <div className={styles.topbarAvatar}>{user?.avatar ?? '👩'}</div>
      </div>
    </header>
  );
};

export default Topbar;

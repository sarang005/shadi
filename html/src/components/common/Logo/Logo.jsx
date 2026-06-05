import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = ({ variant = 'light', to = '/' }) => {
  return (
    <Link to={to} className={`${styles.logo} ${styles[variant]}`}>
      <div className={styles.logoMark}>♥</div>
      <span className={styles.logoText}>
        Shadi<span>Sampanna</span>
      </span>
    </Link>
  );
};

export default Logo;

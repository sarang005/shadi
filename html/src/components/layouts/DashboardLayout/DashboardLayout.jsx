import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layouts/Sidebar/Sidebar';
import useSidebar from '@/hooks/useSidebar';
import styles from './DashboardLayout.module.scss';

const DashboardLayout = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <button
        type="button"
        className="mobileMenuToggle"
        id="mobile-menu-toggle"
        onClick={toggle}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
      <Sidebar isOpen={isOpen} />
      <div className={styles.main}>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;

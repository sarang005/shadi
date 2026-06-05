import { useState, useCallback, useEffect } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById('app-sidebar');
      const toggleBtn = document.getElementById('mobile-menu-toggle');
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(e.target) &&
        toggleBtn &&
        !toggleBtn.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, close]);

  return { isOpen, toggle, close };
};

export default useSidebar;

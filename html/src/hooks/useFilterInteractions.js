import { useEffect } from 'react';

/** Replicates filter checkbox / pill interactions from matches.html */
export const useFilterInteractions = () => {
  useEffect(() => {
    const onFilterOptionClick = (e) => {
      const opt = e.target.closest('.filter-option');
      if (!opt) return;
      const cb = opt.querySelector('input');
      const check = opt.querySelector('.custom-check');
      if (!cb || !check) return;
      cb.checked = !cb.checked;
      check.textContent = cb.checked ? '✓' : '';
    };

    const onPillClick = (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill?.parentElement) return;
      pill.parentElement.querySelectorAll('.filter-pill').forEach((p) => {
        p.classList.remove('on');
      });
      pill.classList.add('on');
    };

    document.addEventListener('click', onFilterOptionClick);
    document.addEventListener('click', onPillClick);
    return () => {
      document.removeEventListener('click', onFilterOptionClick);
      document.removeEventListener('click', onPillClick);
    };
  }, []);
};

export default useFilterInteractions;

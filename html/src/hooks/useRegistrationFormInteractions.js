import { useEffect } from 'react';

/** Replicates radio/checkbox pill interactions from profile-registration.html */
export function useRegistrationFormInteractions() {
  useEffect(() => {
    const radioCleanups = [];

    document.querySelectorAll('.radio-pill input').forEach((input) => {
      const handler = () => {
        input
          .closest('.radio-pills')
          ?.querySelectorAll('.radio-pill-label')
          .forEach((label) => {
            label.style.fontWeight = '';
          });
      };
      input.addEventListener('change', handler);
      radioCleanups.push(() => input.removeEventListener('change', handler));
    });

    const checkboxCleanups = [];

    document.querySelectorAll('.cb-pill input').forEach((input) => {
      const handler = () => {
        const label = input.nextElementSibling;
        if (label) {
          label.style.fontWeight = input.checked ? '600' : '';
        }
      };
      input.addEventListener('change', handler);
      checkboxCleanups.push(() => input.removeEventListener('change', handler));
    });

    return () => {
      radioCleanups.forEach((cleanup) => cleanup());
      checkboxCleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}

export default useRegistrationFormInteractions;

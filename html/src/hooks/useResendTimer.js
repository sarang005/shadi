import { useState, useEffect, useCallback } from 'react';

export const useResendTimer = (seconds = 30) => {
  const [remaining, setRemaining] = useState(0);
  const [active, setActive] = useState(false);

  const start = useCallback(() => {
    setRemaining(seconds);
    setActive(true);
  }, [seconds]);

  useEffect(() => {
    if (!active || remaining <= 0) {
      if (remaining <= 0) setActive(false);
      return undefined;
    }
    const timer = setInterval(() => {
      setRemaining((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [active, remaining]);

  const label =
    remaining > 0 ? `Resend in ${remaining}s` : 'Resend OTP';

  return { remaining, active, start, label, canResend: remaining <= 0 };
};

export default useResendTimer;

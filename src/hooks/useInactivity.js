import { useCallback, useEffect } from 'react';

function useInactivity(timeout = 600000, onTimeout) {
  console.log('Auto Logout working');
  const resetTimeout = useCallback(() => {
    if (window.inactivityTimeout) clearTimeout(window.inactivityTimeout);
    window.inactivityTimeout = setTimeout(onTimeout, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const handleActivity = () => resetTimeout();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(window.inactivityTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [resetTimeout]);
}
export default useInactivity;

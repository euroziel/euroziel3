import { useState, useEffect } from 'react';

export interface UserStatus {
  isLoggedIn: boolean;
  hasPaid: boolean;
  isVerified: boolean;
  isRejected: boolean;
}

export function useUserStatus(): UserStatus {
  const [status, setStatus] = useState<UserStatus>(() => ({
    isLoggedIn: !!localStorage.getItem('euroziel_current_user'),
    hasPaid: localStorage.getItem('euroziel_has_paid') === 'true',
    isVerified: localStorage.getItem('euroziel_is_verified') === 'true',
    isRejected: localStorage.getItem('euroziel_is_rejected') === 'true',
  }));

  useEffect(() => {
    const check = () => {
      setStatus({
        isLoggedIn: !!localStorage.getItem('euroziel_current_user'),
        hasPaid: localStorage.getItem('euroziel_has_paid') === 'true',
        isVerified: localStorage.getItem('euroziel_is_verified') === 'true',
        isRejected: localStorage.getItem('euroziel_is_rejected') === 'true',
      });
    };

    window.addEventListener('storage', check);
    window.addEventListener('euroziel_payment_updated', check);
    return () => {
      window.removeEventListener('storage', check);
      window.removeEventListener('euroziel_payment_updated', check);
    };
  }, []);

  return status;
}

import { useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function useAccessLogger() {
  useEffect(() => {
    const logAccess = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/log-access`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              pathname: window.location.pathname,
              userAgent: navigator.userAgent,
              referrer: document.referrer || 'direct',
              timestamp: Date.now(),
            }),
          }
        );

        if (!response.ok) {
          console.error('Failed to log access');
        }
      } catch (error) {
        console.error('Error logging access:', error);
      }
    };

    logAccess();
  }, []);
}

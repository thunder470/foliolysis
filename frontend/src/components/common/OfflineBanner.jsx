import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [reconnectedToast, setReconnectedToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setReconnectedToast(true);
      const timer = setTimeout(() => setReconnectedToast(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setReconnectedToast(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (reconnectedToast) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          backgroundColor: '#00A87E',
          color: '#FFFFFF',
          padding: '8px 18px',
          borderRadius: '9999px',
          fontSize: '0.82rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(0, 168, 126, 0.3)',
          animation: 'pageFadeIn 0.2s ease',
        }}
      >
        <Wifi size={15} />
        <span>Internet Connection Restored</span>
      </div>
    );
  }

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 99998,
        width: '100%',
        backgroundColor: '#DC2626',
        color: '#FFFFFF',
        padding: '8px 20px',
        fontSize: '0.8rem',
        fontWeight: 650,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)',
      }}
    >
      <WifiOff size={15} />
      <span>
        Network Connection Lost — You are operating in offline mode. Quantitative models are running from cached data.
      </span>
    </div>
  );
}

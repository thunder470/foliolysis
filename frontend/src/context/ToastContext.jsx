import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, duration = 4000) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type, message };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, duration) => addToast('success', msg, duration),
    error: (msg, duration) => addToast('error', msg, duration),
    info: (msg, duration) => addToast('info', msg, duration),
    warning: (msg, duration) => addToast('warning', msg, duration),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Accessible Fixed Toast Container */}
      <div
        role="region"
        aria-label="Notifications"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '420px',
          width: 'calc(100vw - 48px)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => {
          let bg = '#FFFFFF';
          let border = '#E5E9EE';
          let textColor = '#1E2229';
          let Icon = Info;
          let iconColor = '#2563EB';

          if (t.type === 'success') {
            border = 'rgba(0, 168, 126, 0.4)';
            iconColor = '#00A87E';
            Icon = CheckCircle2;
          } else if (t.type === 'error') {
            border = 'rgba(239, 68, 68, 0.4)';
            iconColor = '#EF4444';
            Icon = AlertCircle;
          } else if (t.type === 'warning') {
            border = 'rgba(245, 158, 11, 0.4)';
            iconColor = '#D97706';
            Icon = AlertTriangle;
          }

          return (
            <div
              key={t.id}
              role="status"
              style={{
                pointerEvents: 'auto',
                backgroundColor: bg,
                border: `1px solid ${border}`,
                borderRadius: '14px',
                padding: '12px 16px',
                boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.14)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                animation: 'pageFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ color: iconColor, marginTop: '1px', flexShrink: 0 }}>
                <Icon size={18} />
              </div>

              <div style={{ flex: 1, fontSize: '0.84rem', color: textColor, lineHeight: 1.45, fontWeight: 550 }}>
                {t.message}
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                aria-label="Dismiss notification"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

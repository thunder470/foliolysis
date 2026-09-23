import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, LogIn } from 'lucide-react';
import { Logo, ThemeToggle } from '@/components/common';

export default function LandingHeader({ user, isGuest, setIsAuthModalOpen }) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'clamp(12px, 3vw, 18px) clamp(16px, 4vw, 48px)',
        borderBottom: '1px solid var(--border-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: 'var(--bg-glass)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Brand Logo */}
      <div style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Logo size={36} showText={true} />
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 14px)' }}>
        <ThemeToggle />

        {user && !isGuest ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }} className="hide-mobile">
              Signed in as <strong style={{ color: 'var(--text-primary)' }}>{user.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: '0.84rem',
                borderRadius: '10px',
              }}
            >
              <span>Enter Terminal</span>
              <ChevronRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: 650,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <LogIn size={15} color="var(--accent-blue)" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
              style={{
                padding: '8px 18px',
                fontSize: '0.84rem',
                borderRadius: '10px',
              }}
            >
              <span>Launch Terminal</span>
              <ChevronRight size={15} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

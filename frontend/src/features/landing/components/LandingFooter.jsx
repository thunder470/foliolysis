import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/common';

export default function LandingFooter() {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid var(--border-subtle)',
        padding: '20px clamp(16px, 4vw, 48px)',
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Logo size={22} showText={false} />
        <span>© 2026 foliolysis • Quantitative Simulator for Indian Equities</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="beacon-dot" />
          <span style={{ color: 'var(--gain-green)', fontWeight: 600 }}>NSE & BSE Feeds Active</span>
        </span>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--accent-blue)',
            fontWeight: 650,
            cursor: 'pointer',
            fontSize: '0.78rem',
          }}
        >
          Launch Terminal →
        </button>
      </div>
    </footer>
  );
}

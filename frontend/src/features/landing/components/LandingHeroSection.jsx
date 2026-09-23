import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, LogIn } from 'lucide-react';
import { Logo } from '@/components/common';

export default function LandingHeroSection({ setIsAuthModalOpen }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {/* Hero Centerpiece: Prominent Logo & Name */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        {/* Prominent Scaled Emblem with Soft Glow */}
        <div
          style={{
            marginBottom: '18px',
            padding: '16px',
            borderRadius: '26px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-card)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Logo size={78} showText={false} />
        </div>

        {/* Bold Foliolysis Name */}
        <h1
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            margin: '0 0 12px 0',
            color: 'var(--text-primary)',
          }}
        >
          folio<span style={{ color: 'var(--accent-blue)' }}>lysis</span>
        </h1>

        {/* Minimal Clean Platform Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--accent-blue-subtle)',
            border: '1px solid var(--border-subtle)',
            padding: '5px 16px',
            borderRadius: '9999px',
          }}
        >
          <span className="beacon-dot" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.02em' }}>
            NSE & BSE Quantitative Risk & Equities Simulator
          </span>
        </div>
      </div>

      {/* Clean High-Clarity CTAs */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
          style={{
            padding: '13px 28px',
            fontSize: '0.94rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Play size={15} fill="#FFFFFF" />
          <span>Launch Terminal</span>
        </button>

        <button
          type="button"
          onClick={() => setIsAuthModalOpen(true)}
          className="btn-secondary"
          style={{
            padding: '12px 22px',
            fontSize: '0.92rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <LogIn size={16} color="var(--accent-blue)" />
          <span>Sign In / Guest Access</span>
        </button>
      </div>

      {/* Live Index Market Ticker Capsule (Wraps smoothly on mobile) */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 18px)',
          flexWrap: 'wrap',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          padding: '8px 18px',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-card)',
          fontSize: '0.78rem',
          marginBottom: '44px',
          maxWidth: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>NIFTY 50</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>₹24,823.20</span>
          <span style={{ color: 'var(--gain-green)', fontWeight: 700 }}>+0.54%</span>
        </div>

        <span style={{ color: 'var(--border-input)' }}>•</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>SENSEX</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>₹81,224.80</span>
          <span style={{ color: 'var(--gain-green)', fontWeight: 700 }}>+0.48%</span>
        </div>

        <span style={{ color: 'var(--border-input)' }}>•</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>INDIA VIX</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>12.84</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>-1.12%</span>
        </div>
      </div>
    </div>
  );
}

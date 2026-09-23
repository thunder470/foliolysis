import React from 'react';
import { User, Sparkles, Zap } from 'lucide-react';

export default function ProfileSettingsCard({
  user,
  isGuest,
  name,
  setName,
  email,
  setEmail,
  handle,
  setHandle,
  setIsAuthModalOpen,
  loginAsGuest,
}) {
  return (
    <div className="col-span-5 fintech-card" style={{ gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-blue)' }}>
            <User size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Trader Profile & Identity
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              User credentials and access tier
            </p>
          </div>
        </div>
        <span className={isGuest ? 'badge badge-neutral' : 'badge badge-blue'}>
          {user.tier}
        </span>
      </div>

      {/* User Avatar + Profile Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'var(--bg-card-subtle)',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: user.avatar ? `url(${user.avatar}) center/cover no-repeat` : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.4rem',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
            flexShrink: 0,
          }}
        >
          {!user.avatar && (user.name ? user.name.slice(0, 2).toUpperCase() : 'TR')}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }} className="truncate">
            {user.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1px' }}>
            {user.email}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: isGuest ? 'var(--text-muted)' : 'var(--accent-blue)',
                background: isGuest ? 'var(--bg-card)' : 'var(--accent-blue-subtle)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {isGuest ? 'Guest Sandbox Access' : 'Verified Pro Trader'}
            </span>
          </div>
        </div>
      </div>

      {/* Authentication Switcher / Guest Mode Toggle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Account Mode Actions
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {isGuest ? (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.78rem' }}
            >
              <Sparkles size={14} />
              <span>Sign In / Upgrade to Pro</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={loginAsGuest}
              className="btn-secondary"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.78rem' }}
            >
              <Zap size={14} />
              <span>Switch to Guest Sandbox</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.78rem' }}
          >
            Switch User
          </button>
        </div>
      </div>

      {/* Edit Profile Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Display Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
            Trader Handle
          </label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
}

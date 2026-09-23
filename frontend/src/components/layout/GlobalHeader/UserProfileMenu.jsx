import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ChevronDown, User, Sparkles, Zap, LogOut } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function UserProfileMenu() {
  const navigate = useNavigate();
  const { user, isGuest, setIsAuthModalOpen, loginAsGuest } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));

  return (
    <div ref={profileMenuRef} style={{ position: 'relative' }}>
      <div
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: '4px var(--space-3) 4px 5px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-card-subtle)',
          border: isProfileMenuOpen ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: 'var(--radius-sm)',
            background: user.avatar
              ? `url(${user.avatar}) center/cover no-repeat`
              : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.72rem',
            border: '1.5px solid var(--bg-card)',
            boxShadow: 'var(--shadow-xs)',
            flexShrink: 0,
          }}
        >
          {!user.avatar && (user.name ? user.name.slice(0, 2).toUpperCase() : 'TR')}
        </div>

        <div style={{ lineHeight: 1.2 }} className="user-profile-details">
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              maxWidth: '100px',
            }}
            className="truncate"
          >
            {user.name}
          </div>
          <div
            style={{
              fontSize: '0.65rem',
              color: isGuest ? 'var(--warning-amber)' : 'var(--accent-blue)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {isGuest ? 'Guest Mode' : user.tier}
          </div>
        </div>

        <ChevronDown size={13} color="var(--text-muted)" />
      </div>

      {isProfileMenuOpen && (
        <div
          role="dialog"
          aria-label="User Profile Dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '240px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-dropdown)',
            zIndex: 100,
            overflow: 'hidden',
            animation: 'modalSpringIn 0.18s var(--ease-spring)',
          }}
        >
          <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {user.email}
            </div>
            <div style={{ marginTop: '6px' }}>
              <span className={isGuest ? 'badge badge-neutral' : 'badge badge-blue'}>
                {user.tier}
              </span>
            </div>
          </div>

          <div style={{ padding: '6px' }}>
            <button
              type="button"
              onClick={() => {
                navigate('/settings');
                setIsProfileMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <User size={15} color="var(--text-muted)" />
              <span>Account & Preferences</span>
            </button>

            {isGuest ? (
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--accent-blue)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-blue-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Sparkles size={15} color="var(--accent-blue)" />
                <span>Sign In to Pro Account</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  loginAsGuest();
                }}
                style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Zap size={15} color="var(--warning-amber)" />
                <span>Switch to Guest Sandbox</span>
              </button>
            )}

            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--loss-red)',
                borderRadius: 'var(--radius-sm)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--loss-red-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <LogOut size={15} color="var(--loss-red)" />
              <span>Switch Account / Sign In</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

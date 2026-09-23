import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Shield,
  BarChart3,
  FileText,
  Settings,
  X,
  Menu,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Logo, ThemeToggle } from '@/components/common';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/strategies', label: 'Strategies', icon: Layers },
  { path: '/risk-analysis', label: 'Risk', icon: Shield },
  { path: '/simulations', label: 'Simulate', icon: BarChart3 },
  { path: '/reports', label: 'Reports', icon: FileText },
];

export default function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { user, isGuest, setIsAuthModalOpen, loginAsGuest } = useAuth();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  return (
    <>
      {/* 1. Sticky Mobile Bottom Navigation Bar (<= 768px) */}
      <nav
        className="mobile-bottom-nav"
        aria-label="Mobile Navigation Bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '62px',
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border-glass)',
          zIndex: 80,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '54px',
                minHeight: '48px',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                textDecoration: 'none',
                gap: '2px',
                transition: 'all 0.18s ease',
              }}
            >
              <div
                style={{
                  padding: '3px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--accent-blue-subtle)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} />
              </div>
              <span style={{ fontSize: '0.66rem', fontWeight: isActive ? 700 : 500 }}>
                {item.label}
              </span>
            </NavLink>
          );
        })}

        {/* More / Settings Menu Trigger */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open Navigation Drawer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '54px',
            minHeight: '48px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            gap: '2px',
          }}
        >
          <div style={{ padding: '3px 12px', borderRadius: 'var(--radius-sm)' }}>
            <Menu size={18} />
          </div>
          <span style={{ fontSize: '0.66rem', fontWeight: 500 }}>More</span>
        </button>
      </nav>

      {/* 2. Slide-Over Navigation Drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Drawer"
          className="modal-backdrop-animate"
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-overlay)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '82%',
              maxWidth: '320px',
              height: '100%',
              background: 'var(--bg-card)',
              borderRight: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-modal)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'drawerSlideIn 0.24s var(--ease-spring) forwards',
              padding: 'var(--space-5)',
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <Logo size={32} showText={true} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close Navigation Drawer"
                  style={{
                    background: 'var(--bg-hover)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* User Profile Card in Drawer */}
            <div
              style={{
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                  {user?.name || 'Trader'}
                </div>
                <div style={{ fontSize: '0.7rem', color: isGuest ? 'var(--text-muted)' : 'var(--accent-blue)', fontWeight: 600 }}>
                  {user?.tier || 'Pro Trader'}
                </div>
              </div>
            </div>

            {/* All Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1, overflowY: 'auto' }}>
              {[
                { path: '/dashboard', label: 'Dashboard Telemetry', icon: LayoutDashboard },
                { path: '/strategies', label: 'Strategy Lab (Dual SMA)', icon: Layers },
                { path: '/risk-analysis', label: 'Risk & VaR Scenarios', icon: Shield },
                { path: '/simulations', label: 'Monte Carlo Projections', icon: BarChart3 },
                { path: '/reports', label: 'Audit Reports & Trade Logs', icon: FileText },
                { path: '/settings', label: 'Trading & User Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      background: isActive ? 'var(--accent-blue-subtle)' : 'transparent',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      minHeight: '44px',
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Auth Actions */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
              {isGuest ? (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', minHeight: '44px', fontSize: '0.82rem' }}
                >
                  <Sparkles size={15} />
                  <span>Sign In / Upgrade to Pro</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    loginAsGuest();
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', minHeight: '44px', fontSize: '0.82rem' }}
                >
                  <Zap size={15} />
                  <span>Switch to Sandbox</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

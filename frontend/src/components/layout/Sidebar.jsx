import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/common';
import {
  LayoutDashboard,
  Layers,
  ShieldAlert,
  LineChart,
  FileSpreadsheet,
  Settings as SettingsIcon,
  Home,
} from 'lucide-react';

export default function Sidebar({ marketOverview }) {
  const navigate = useNavigate();
  const { user, isGuest, setIsAuthModalOpen } = useAuth();

  const nifty = marketOverview?.marketIndices?.find((i) => i.symbol === '^NSEI') || {
    price: 24823.2,
    changePct: 0.54,
  };
  const sensex = marketOverview?.marketIndices?.find((i) => i.symbol === '^BSESN') || {
    price: 81224.8,
    changePct: 0.48,
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/strategies', label: 'Strategies', icon: Layers },
    { to: '/risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
    { to: '/simulations', label: 'Simulations', icon: LineChart },
    { to: '/reports', label: 'Reports', icon: FileSpreadsheet },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="sidebar-fixed" aria-label="Main Application Sidebar">
      {/* Foliolysis Logo & Branding */}
      <div
        onClick={() => navigate('/')}
        title="foliolysis — Return to Start"
        style={{
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          transition: 'background-color 0.18s ease',
        }}
      >
        <Logo size={32} showText={true} />
      </div>

      {/* Navigation Items (6 Primary Routes) */}
      <nav
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: 'var(--space-3) var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        <div
          style={{
            fontSize: '0.66rem',
            fontWeight: 700,
            color: 'var(--text-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px var(--space-3) 4px',
            whiteSpace: 'nowrap',
          }}
        >
          Platform Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={2.2} />
              <span className="no-wrap">{item.label}</span>
            </NavLink>
          );
        })}

        <div style={{ margin: 'var(--space-2) 0 var(--space-1)', borderTop: '1px solid var(--border-subtle)' }} />

        {/* Return to Home link */}
        <NavLink
          to="/"
          className="sidebar-link"
          style={{ color: 'var(--text-muted)' }}
        >
          <Home size={17} strokeWidth={2} />
          <span className="no-wrap">Home</span>
        </NavLink>
      </nav>

      {/* User Account & Authentication Profile Card */}
      <div
        style={{
          padding: 'var(--space-2) var(--space-3)',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-sidebar)',
        }}
      >
        <div
          onClick={() => setIsAuthModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: '6px var(--space-3)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-xs)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.borderColor = 'var(--border-input)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.transform = 'none';
          }}
          title="Click to Switch User or Login"
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: 'var(--radius-sm)',
              background: user.avatar ? `url(${user.avatar}) center/cover no-repeat` : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.75rem',
              flexShrink: 0,
            }}
          >
            {!user.avatar && (user.name ? user.name.slice(0, 2).toUpperCase() : 'TR')}
          </div>

          <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '0.65rem', color: isGuest ? 'var(--warning-amber)' : 'var(--accent-blue)', fontWeight: 700, marginTop: '1px' }}>
              {isGuest ? 'Guest Sandbox' : user.tier}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Card: Live NSE & BSE Points */}
      <div
        style={{
          padding: 'var(--space-2) var(--space-3) var(--space-3)',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-sidebar)',
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '6px var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          {/* Header row: Green pulse dot + Feed label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="beacon-dot" />
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                NSE / BSE Live
              </span>
            </div>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--gain-green)', background: 'var(--gain-green-bg)', padding: '1px 5px', borderRadius: 'var(--radius-full)' }}>
              Active
            </span>
          </div>

          {/* Points row 1: NIFTY 50 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>NIFTY 50</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{Number(nifty.price).toLocaleString('en-IN', { maximumFractionDigits: 1 })}
              </span>
              <span className="font-mono" style={{ fontSize: '0.65rem', fontWeight: 700, color: nifty.changePct >= 0 ? 'var(--gain-green)' : 'var(--loss-red)' }}>
                {nifty.changePct >= 0 ? `+${nifty.changePct}%` : `${nifty.changePct}%`}
              </span>
            </div>
          </div>

          {/* Points row 2: SENSEX */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>SENSEX</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{Number(sensex.price).toLocaleString('en-IN', { maximumFractionDigits: 1 })}
              </span>
              <span className="font-mono" style={{ fontSize: '0.65rem', fontWeight: 700, color: sensex.changePct >= 0 ? 'var(--gain-green)' : 'var(--loss-red)' }}>
                {sensex.changePct >= 0 ? `+${sensex.changePct}%` : `${sensex.changePct}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

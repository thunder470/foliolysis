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

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, isGuest, setIsAuthModalOpen } = useAuth();

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
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          transition: 'background-color 0.18s ease',
        }}
      >
        <Logo size={34} showText={true} />
      </div>

      {/* Navigation Items (6 Primary Routes) */}
      <nav
        style={{
          flex: 1,
          padding: 'var(--space-5) var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-1)',
        }}
      >
        <div
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: 'var(--text-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: 'var(--space-1) var(--space-3) var(--space-2)',
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
              <Icon size={19} strokeWidth={2.2} />
              <span className="no-wrap">{item.label}</span>
            </NavLink>
          );
        })}

        <div style={{ margin: 'var(--space-3) 0 var(--space-1)', borderTop: '1px solid var(--border-subtle)' }} />

        {/* Return to Home link */}
        <NavLink
          to="/"
          className="sidebar-link"
          style={{ color: 'var(--text-muted)' }}
        >
          <Home size={18} strokeWidth={2} />
          <span className="no-wrap">Home</span>
        </NavLink>
      </nav>

      {/* User Account & Authentication Profile Card */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-3)',
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
            padding: 'var(--space-2) var(--space-3)',
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
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              background: user.avatar ? `url(${user.avatar}) center/cover no-repeat` : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.78rem',
              flexShrink: 0,
            }}
          >
            {!user.avatar && (user.name ? user.name.slice(0, 2).toUpperCase() : 'TR')}
          </div>

          <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '0.68rem', color: isGuest ? 'var(--warning-amber)' : 'var(--accent-blue)', fontWeight: 700, marginTop: '2px' }}>
              {isGuest ? 'Guest Sandbox' : user.tier}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Pill: Live Feeds */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-3)',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-sidebar)',
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="beacon-dot" />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              NSE/BSE Feed
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gain-green)', whiteSpace: 'nowrap' }}>
            Active
          </span>
        </div>
      </div>
    </aside>
  );
}

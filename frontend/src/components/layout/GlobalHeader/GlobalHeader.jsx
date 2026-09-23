import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { ThemeToggle } from '@/components/common';
import BenchmarkBar from './BenchmarkBar';
import StockSearchModal from './StockSearchModal';
import UserProfileMenu from './UserProfileMenu';

export default function GlobalHeader({ marketOverview }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getHeaderInfo = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/':
        return {
          title: 'Dashboard',
          subtitle: 'Real-time surveillance on Indian benchmark indices and deployed algorithmic strategies',
        };
      case '/strategies':
        return {
          title: 'Strategies & Sandbox',
          subtitle: 'Quantitative SMA crossover backtesting, parameter sweeps, and live trade execution logs',
        };
      case '/risk-analysis':
        return {
          title: 'Risk Analysis & Stress Testing',
          subtitle: 'Value at Risk (VaR), drawdown stress testing, and Indian macroeconomic scenario modeling',
        };
      case '/simulations':
        return {
          title: 'Monte Carlo Projections',
          subtitle: 'Probabilistic multi-path forward projections and wealth distributions for Indian equities',
        };
      case '/reports':
        return {
          title: 'Audit Logs & Reports',
          subtitle: 'Historical backtest database records, compliance audit logs, and strategy export files',
        };
      case '/settings':
        return {
          title: 'User Profile & Settings',
          subtitle: 'Trader profile, authentication status, default INR capital, and broker connections',
        };
      default:
        return {
          title: 'foliolysis Terminal',
          subtitle: 'Institutional Quantitative Trading & Risk Simulator for Indian Equities',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <header
      className="global-header glass-panel"
      style={{
        padding: 'var(--space-3) var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: 'var(--shadow-card)',
        gap: 'var(--space-4)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Left: Contextual Page Title + Clean Wrapped Subtitle */}
      <div style={{ maxWidth: '320px', minWidth: '160px' }}>
        <h1
          style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {headerInfo.title}
        </h1>
        <p
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginTop: '2px',
            margin: 0,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {headerInfo.subtitle}
        </p>
      </div>

      {/* Center: Live Benchmark Ticker Strip */}
      <BenchmarkBar marketOverview={marketOverview} />

      {/* Right Controls: Stock Search, ThemeToggle, Quick Backtest, User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
        <StockSearchModal />

        <ThemeToggle />

        <button
          onClick={() => navigate('/strategies')}
          className="btn-primary"
          id="header-run-backtest-btn"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem', minHeight: '36px' }}
        >
          <Play size={13} fill="#FFFFFF" />
          <span className="no-wrap">+ Backtest</span>
        </button>

        <UserProfileMenu />
      </div>
    </header>
  );
}

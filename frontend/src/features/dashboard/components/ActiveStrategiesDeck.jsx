import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function ActiveStrategiesDeck() {
  const navigate = useNavigate();

  const [activeStrategies, setActiveStrategies] = useState([
    {
      id: 'strat-1',
      name: 'Foliolysis Momentum',
      ticker: 'RELIANCE.NS',
      type: 'Dual SMA (20/50) Momentum Overlay',
      winRate: 68.4,
      health: 94,
      active: true,
      trades: 42,
    },
    {
      id: 'strat-2',
      name: 'Basics Mean Reversion',
      ticker: 'TCS.NS',
      type: 'RSI Lower/Upper Volatility Channel',
      winRate: 59.2,
      health: 82,
      active: true,
      trades: 31,
    },
    {
      id: 'strat-3',
      name: 'Nifty Trend Follower',
      ticker: '^NSEI',
      type: 'Index Trend Following with Trailing Stop',
      winRate: 64.8,
      health: 89,
      active: true,
      trades: 28,
    },
  ]);

  const toggleStrategyActive = (id, e) => {
    e.stopPropagation();
    setActiveStrategies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <div className="fintech-card col-span-6" style={{ gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="no-wrap" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Active Trading Strategies
          </h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Deployed algorithmic models on NSE equities with health tracking
          </p>
        </div>
        <button
          onClick={() => navigate('/strategies')}
          className="btn-secondary"
          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
        >
          <span>Sandbox</span>
          <ChevronRight size={13} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activeStrategies.map((strat) => (
          <div
            key={strat.id}
            onClick={() => navigate(`/strategies?ticker=${strat.ticker}`)}
            style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)';
              e.currentTarget.style.borderColor = 'var(--border-card)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {strat.name}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>
                    {strat.ticker}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {strat.type}
                </div>
              </div>

              {/* Active Toggle Button */}
              <button
                type="button"
                onClick={(e) => toggleStrategyActive(strat.id, e)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: strat.active ? 'var(--gain-green-bg)' : 'var(--bg-card)',
                  color: strat.active ? 'var(--gain-green)' : 'var(--text-muted)',
                  transition: 'all 0.15s ease',
                }}
              >
                {strat.active ? '● Active' : '○ Paused'}
              </button>
            </div>

            {/* Progress Bar & Win-Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Strategy Health ({strat.health}%) · Win Rate: <strong style={{ color: 'var(--gain-green)' }}>{strat.winRate}%</strong>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{strat.trades} Trades</span>
              </div>
              <div className="health-bar-track">
                <div
                  className="health-bar-fill"
                  style={{
                    width: `${strat.health}%`,
                    background:
                      strat.health > 80
                        ? 'linear-gradient(90deg, #16A34A, #4ADE80)'
                        : 'linear-gradient(90deg, #2563EB, #60A5FA)',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

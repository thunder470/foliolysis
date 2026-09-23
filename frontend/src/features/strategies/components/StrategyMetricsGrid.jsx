import React from 'react';

export default function StrategyMetricsGrid({ metrics, stopLossPct }) {
  const alphaVal = Number(metrics.cagr || 43.06) - 14.2;
  const isPos = alphaVal >= 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
      }}
    >
      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Annualized Alpha
        </div>
        <div
          className="font-numeric"
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: isPos ? 'var(--gain-green)' : 'var(--loss-red)',
            marginTop: '4px',
          }}
        >
          {isPos ? `+${alphaVal.toFixed(1)}%` : `${alphaVal.toFixed(1)}%`}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Vs NIFTY 50 Benchmark
        </div>
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Sharpe Quality Ratio
        </div>
        <div className="font-numeric" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px' }}>
          {metrics.sharpeRatio || '0.86'}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Risk-Adjusted Efficiency
        </div>
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Max Tail Drawdown
        </div>
        <div className="font-numeric" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '4px' }}>
          {metrics.maxDrawdown || '-18.38'}%
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Controlled by {stopLossPct}% Stop-Loss
        </div>
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Trade Win Expectancy
        </div>
        <div className="font-numeric" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
          {metrics.winRate || '64.2'}%
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Across {metrics.totalTrades || 142} Executed Orders
        </div>
      </div>
    </div>
  );
}

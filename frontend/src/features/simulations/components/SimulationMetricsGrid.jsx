import React from 'react';

export default function SimulationMetricsGrid({ metrics, initialCapital, iterations }) {
  const medianGain = metrics.medianTerminalWealth - initialCapital;
  const isMedianGain = medianGain >= 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-3)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'var(--space-4)',
      }}
    >
      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Expected Median Wealth
        </div>
        <div className="font-numeric" style={{ fontSize: '1.25rem', fontWeight: 800, color: isMedianGain ? 'var(--gain-green)' : 'var(--loss-red)', marginTop: '2px' }}>
          ₹{Math.round(metrics.medianTerminalWealth).toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: '0.68rem', color: isMedianGain ? 'var(--gain-green)' : 'var(--loss-red)', marginTop: '2px', fontWeight: 700 }}>
          {isMedianGain ? `+₹${Math.round(medianGain).toLocaleString('en-IN')}` : `-₹${Math.round(Math.abs(medianGain)).toLocaleString('en-IN')}`} (
          {((medianGain / initialCapital) * 100).toFixed(1)}%)
        </div>
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Value at Risk (95% VaR)
        </div>
        <div className="font-numeric" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '2px' }}>
          ₹{Math.round(metrics.var95Dollars).toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {metrics.var95Pct}% Capital Risk (1 in 20 tail)
        </div>
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Conditional VaR (95% CVaR)
        </div>
        <div className="font-numeric" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '2px' }}>
          ₹{Math.round(metrics.cvar95Dollars).toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Expected Shortfall in worst 5% tail
        </div>
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Probability of Profit
        </div>
        <div className="font-numeric" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '2px' }}>
          {metrics.probabilityOfProfit}%
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Across {iterations} simulated trajectories
        </div>
      </div>
    </div>
  );
}

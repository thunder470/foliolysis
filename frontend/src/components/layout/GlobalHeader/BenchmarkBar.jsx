import React from 'react';

export default function BenchmarkBar({ marketOverview }) {
  const nifty = marketOverview?.marketIndices?.find((i) => i.symbol === '^NSEI') || {
    price: 24823.2,
    changePct: 0.54,
  };
  const sensex = marketOverview?.marketIndices?.find((i) => i.symbol === '^BSESN') || {
    price: 81224.8,
    changePct: 0.48,
  };

  return (
    <div
      className="header-marquee"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        background: 'var(--bg-card-subtle)',
        padding: '6px var(--space-4)',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-card)',
        fontSize: '0.78rem',
        flexShrink: 1,
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
        <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>NIFTY 50:</span>
        <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
          ₹{Number(nifty.price).toLocaleString('en-IN', { maximumFractionDigits: 1 })}
        </span>
        <span
          style={{
            fontWeight: 700,
            color: nifty.changePct >= 0 ? 'var(--gain-green)' : 'var(--loss-red)',
          }}
        >
          {nifty.changePct >= 0 ? `+${nifty.changePct}%` : `${nifty.changePct}%`}
        </span>
      </div>

      <div style={{ height: '12px', width: '1px', background: 'var(--border-input)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
        <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>SENSEX:</span>
        <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
          ₹{Number(sensex.price).toLocaleString('en-IN', { maximumFractionDigits: 1 })}
        </span>
        <span
          style={{
            fontWeight: 700,
            color: sensex.changePct >= 0 ? 'var(--gain-green)' : 'var(--loss-red)',
          }}
        >
          {sensex.changePct >= 0 ? `+${sensex.changePct}%` : `${sensex.changePct}%`}
        </span>
      </div>
    </div>
  );
}

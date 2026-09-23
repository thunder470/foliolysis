import React from 'react';
import { TrendingUp, Award, Activity, Shield } from 'lucide-react';

export default function TelemetryCardsGrid() {
  return (
    <div
      className="col-span-12"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '20px',
      }}
    >
      {/* 1. Total Portfolio Capital */}
      <div className="fintech-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Portfolio Capital
          </span>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-blue)' }}>
            <TrendingUp size={16} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
          <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            ₹35,00,000.00
          </span>
          <span className="badge badge-gain">
            +14.8% YTD
          </span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          Allocated across 3 Active Indian Models
        </div>
      </div>

      {/* 2. Annualized Alpha vs NIFTY 50 */}
      <div className="fintech-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Annualized Alpha vs NIFTY 50
          </span>
          <div style={{ background: 'var(--gain-green-bg)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--gain-green)' }}>
            <Award size={16} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
          <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gain-green)', whiteSpace: 'nowrap' }}>
            +8.42%
          </span>
          <span className="badge badge-blue">
            Beta: 0.84
          </span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          Defensive market risk posture
        </div>
      </div>

      {/* 3. India VIX Volatility Regime */}
      <div className="fintech-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            India VIX Volatility Regime
          </span>
          <div style={{ background: 'rgba(217, 119, 6, 0.12)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--warning-amber)' }}>
            <Activity size={16} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
          <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            15.24
          </span>
          <span className="badge badge-neutral">
            Mild Greed
          </span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          Market Breadth: 64% Advancing Stocks
        </div>
      </div>

      {/* 4. Portfolio Risk Index */}
      <div className="fintech-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Portfolio Risk Index
          </span>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-blue)' }}>
            <Shield size={16} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
          <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            88 / 100
          </span>
          <span className="badge badge-gain">
            Robust Defensive
          </span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          Calculated capital preservation rating
        </div>
      </div>
    </div>
  );
}

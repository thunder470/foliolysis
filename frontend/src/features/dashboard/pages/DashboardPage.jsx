import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Shield } from 'lucide-react';
import TelemetryCardsGrid from '../components/TelemetryCardsGrid';
import ActiveStrategiesDeck from '../components/ActiveStrategiesDeck';
import EquityCurveChart from '../components/EquityCurveChart';
import MarketMoversCard from '../components/MarketMoversCard';

export default function DashboardPage({ marketOverview }) {
  const navigate = useNavigate();

  return (
    <div className="grid-12">
      {/* Welcome Banner */}
      <div
        className="fintech-card col-span-12"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                background: 'var(--accent-blue-subtle)',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              INDIAN EQUITIES SURVEILLANCE
            </span>
          </div>
          <h1
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0',
              lineHeight: 1.25,
            }}
          >
            foliolysis Terminal
          </h1>
          <p
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Algorithmic backtesting, risk stress testing, and stochastic forward projections for Indian markets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => navigate('/strategies')}
            className="btn-primary"
          >
            <Play size={15} />
            <span>Open Strategy Sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/risk-analysis')}
            className="btn-secondary"
          >
            <Shield size={15} />
            <span>Stress Test Scenarios</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <TelemetryCardsGrid />

      {/* Active Trading Strategies Deck */}
      <ActiveStrategiesDeck />

      {/* Equity Performance Trajectory Chart */}
      <EquityCurveChart />

      {/* Volume Leaders Table */}
      <MarketMoversCard />
    </div>
  );
}

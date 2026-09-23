import React, { useState } from 'react';
import { PieChart, LineChart, Shield } from 'lucide-react';
import MacroStressScenarios from '../components/MacroStressScenarios';
import RiskVisualizerCard from '../components/RiskVisualizerCard';

export default function RiskAnalysisPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('rate-hike');
  const [activeRightTab, setActiveRightTab] = useState('donut'); // 'donut' | 'drawdown' | 'factors'

  const scenarios = [
    {
      id: 'rate-hike',
      name: 'RBI Interest Rate Hike (+50bps)',
      badge: 'Monetary Policy Tightening',
      impact: '-6.8%',
      impactValue: '-₹2,38,000',
      equityRatio: 67.2,
      varRatio: 18.3,
      cashRatio: 14.5,
      description: 'Reserve Bank of India raises repo rate by 50 bps, increasing corporate debt servicing costs and compressing bank net interest margins.',
      drawdown180d: [0, -1.2, -2.5, -4.1, -6.8, -6.2, -5.5, -4.8, -3.9],
      color: '#D97706',
    },
    {
      id: 'global-crash',
      name: 'Global Market Crash (-15%)',
      badge: 'Contagion Liquidation',
      impact: '-15.4%',
      impactValue: '-₹5,39,000',
      equityRatio: 58.0,
      varRatio: 26.5,
      cashRatio: 15.5,
      description: 'Systemic equity selloff across US and European markets leading to margin deleveraging and panic across emerging markets.',
      drawdown180d: [0, -3.5, -7.8, -12.4, -15.4, -14.2, -13.1, -11.8, -10.5],
      color: '#DC2626',
    },
    {
      id: 'crude-spike',
      name: 'Crude Oil Price Spike ($110+)',
      badge: 'Commodity Inflation Shock',
      impact: '-9.2%',
      impactValue: '-₹3,22,000',
      equityRatio: 64.0,
      varRatio: 21.0,
      cashRatio: 15.0,
      description: 'Brent crude surpasses $110/barrel, escalating India current account deficit and depreciating INR against the US Dollar.',
      drawdown180d: [0, -1.8, -3.9, -6.5, -9.2, -8.5, -7.8, -7.0, -6.1],
      color: '#EA580C',
    },
    {
      id: 'fii-outflow',
      name: 'FII Capital Outflow Surge',
      badge: 'Foreign Capital Flight',
      impact: '-11.8%',
      impactValue: '-₹4,13,000',
      equityRatio: 62.5,
      varRatio: 22.8,
      cashRatio: 14.7,
      description: 'Heavy sustained liquidation by Foreign Institutional Investors triggers concentrated selling in Nifty 50 heavyweight equities.',
      drawdown180d: [0, -2.4, -5.1, -8.6, -11.8, -10.9, -9.8, -8.5, -7.4],
      color: '#2563EB',
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div className="split-panel-layout">
      {/* LEFT COLUMN: MACRO STRESS SCENARIO SELECTORS */}
      <div className="panel-left-scrollable">
        <MacroStressScenarios
          scenarios={scenarios}
          selectedScenarioId={selectedScenarioId}
          setSelectedScenarioId={setSelectedScenarioId}
          currentScenario={currentScenario}
        />
      </div>

      {/* RIGHT COLUMN: VaR DONUT & DRAWDOWN GRAPHS */}
      <div className="panel-right-scrollable">
        {/* Tab Switcher Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px var(--space-4)',
            boxShadow: 'var(--shadow-card)',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveRightTab('donut')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeRightTab === 'donut' ? 'var(--accent-blue)' : 'transparent',
                color: activeRightTab === 'donut' ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: activeRightTab === 'donut' ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <PieChart size={15} />
              <span>VaR Donut</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRightTab('drawdown')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeRightTab === 'drawdown' ? 'var(--accent-blue)' : 'transparent',
                color: activeRightTab === 'drawdown' ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: activeRightTab === 'drawdown' ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <LineChart size={15} />
              <span>180-Day Drawdown Curve</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRightTab('factors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeRightTab === 'factors' ? 'var(--accent-blue)' : 'transparent',
                color: activeRightTab === 'factors' ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: activeRightTab === 'factors' ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Shield size={15} />
              <span>Factor Sensitivities</span>
            </button>
          </div>

          <span className="badge badge-loss">
            Active: {currentScenario.name}
          </span>
        </div>

        <RiskVisualizerCard
          activeRightTab={activeRightTab}
          currentScenario={currentScenario}
        />
      </div>
    </div>
  );
}

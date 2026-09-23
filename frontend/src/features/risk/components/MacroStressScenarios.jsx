import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function MacroStressScenarios({
  scenarios,
  selectedScenarioId,
  setSelectedScenarioId,
  currentScenario,
}) {
  return (
    <div
      className="fintech-card"
      style={{
        width: '100%',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'rgba(217, 119, 6, 0.12)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--warning-amber)' }}>
            <ShieldAlert size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Stress Scenarios
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              Select a shock to update VaR & Drawdown
            </p>
          </div>
        </div>
        <span className="badge badge-blue">
          {scenarios.length} Calibrated
        </span>
      </div>

      {/* Scenario Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scenarios.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <div
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              style={{
                background: isSelected ? 'var(--bg-card)' : 'var(--bg-card-subtle)',
                border: isSelected ? `2px solid ${sc.color}` : '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px 16px',
                cursor: 'pointer',
                transform: isSelected ? 'translateX(4px)' : 'none',
                boxShadow: isSelected ? 'var(--shadow-card-hover)' : 'none',
                transition: 'all 0.2s ease',
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: sc.color }}>
                  {sc.badge}
                </span>
                {isSelected && <span className="beacon-dot" style={{ background: sc.color }} />}
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {sc.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                <span className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--loss-red)' }}>
                  {sc.impact}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {sc.impactValue} on ₹35L NAV
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Scenario Explainer */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
          Scenario Mechanism
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          {currentScenario.description}
        </p>
      </div>
    </div>
  );
}

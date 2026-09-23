import React from 'react';
import { Award, Shield } from 'lucide-react';
import StrategyMetricsGrid from './StrategyMetricsGrid';

export default function AiReportModal({
  ticker,
  metrics,
  stopLossPct,
  initialCapital,
  parsedAdvisory,
  renderFormattedInline,
}) {
  const initialCapNum = Number(initialCapital) || 1000000;

  return (
    <div className="fintech-card" style={{ gap: 'var(--space-5)', borderLeft: '4px solid var(--accent-blue)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '10px', borderRadius: 'var(--radius-md)', color: 'var(--accent-blue)' }}>
            <Award size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Quantitative Strategy Advisory & Risk Report
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Institutional trend diagnostics, downside scenario testing & execution mandate for {ticker}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <span className="badge badge-gain">
            Alpha Conviction: High
          </span>
          <span className="badge badge-blue">
            Institutional Mandate
          </span>
        </div>
      </div>

      {/* 4-Stat Metric Strip */}
      <StrategyMetricsGrid metrics={metrics} stopLossPct={stopLossPct} />

      {/* Section 1: Executive Diagnosis */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Executive Quantitative Diagnosis
          </h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {parsedAdvisory?.executive
            ? renderFormattedInline(parsedAdvisory.executive)
            : `The quantitative trend-following momentum strategy on ${ticker} exhibits persistent alpha generation with disciplined downside protection.`}
        </p>
      </div>

      {/* Section 2: Downside Risk Factors */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--loss-red)' }} />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Downside Risk & Tail Scenarios
          </h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
          {parsedAdvisory?.riskFactors && parsedAdvisory.riskFactors.length > 0 ? (
            parsedAdvisory.riskFactors.map((r, rIdx) => (
              <div key={rIdx} style={{ background: 'var(--loss-red-bg)', border: '1px solid var(--loss-red-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--loss-red)', lineHeight: 1.5 }}>
                  {renderFormattedInline(r)}
                </div>
              </div>
            ))
          ) : (
            <>
              <div style={{ background: 'var(--loss-red-bg)', border: '1px solid var(--loss-red-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--loss-red)' }}>
                  Drawdown Profile & Moving Average Lag
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  During choppy consolidation bands, whipsaws can trigger multiple small stop-loss hits before establishing a persistent trend.
                </div>
              </div>
              <div style={{ background: 'var(--warning-amber-bg)', border: '1px solid var(--warning-amber-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--warning-amber)' }}>
                  Market Regime Sensitivity
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  The strategy demonstrates highest expectancy during trending bull and recovery regimes. In low-volatility chop, moving average lag can trigger whipsaw costs.
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Section 3: Position Sizing & Execution Mandates */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-xs)', color: 'var(--accent-blue)' }}>
            <Shield size={16} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Institutional Position Sizing & Execution Mandates
          </h4>
        </div>

        {parsedAdvisory?.volatility && parsedAdvisory.volatility.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
            {parsedAdvisory.volatility.map((v, vIdx) => (
              <div key={vIdx} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: vIdx < parsedAdvisory.volatility.length - 1 ? '6px' : 0 }}>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 800, marginRight: '6px' }}>•</span>
                {renderFormattedInline(v)}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>SINGLE ASSET CAP</div>
            <div className="font-numeric" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              15% of Portfolio Equity
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Max ₹{Math.round(initialCapNum * 0.15).toLocaleString('en-IN')} allocation per position
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>RISK / REWARD RATIO</div>
            <div className="font-numeric" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gain-green)', marginTop: '2px' }}>
              Minimum 1 : 2.0
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Target +{(stopLossPct * 2).toFixed(1)}% vs Stop -{stopLossPct}%
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>STOP-LOSS DISCIPLINE</div>
            <div className="font-numeric" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '2px' }}>
              {stopLossPct}% Trailing Stop
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Automated exit without discretionary delay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Sliders } from 'lucide-react';

export default function TradingRulesCard({
  initialCapital,
  setInitialCapital,
  defaultBenchmark,
  setDefaultBenchmark,
  riskTolerance,
  setRiskTolerance,
  defaultStopLoss,
  setDefaultStopLoss,
  maxOrderAllocationPct,
  setMaxOrderAllocationPct,
}) {
  return (
    <div className="col-span-7 fintech-card" style={{ gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--gain-green-bg)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--gain-green)' }}>
            <Sliders size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Default Trading & Capital Configuration
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              Indian Rupee (₹) capital defaults and risk management parameters
            </p>
          </div>
        </div>
        <span className="badge badge-gain">
          Currency: INR (₹)
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Default Initial Capital */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Default Portfolio Capital (₹)
          </label>
          <select
            value={initialCapital}
            onChange={(e) => setInitialCapital(Number(e.target.value))}
            className="form-select"
          >
            <option value={250000}>₹2,50,000 (Retail Basic)</option>
            <option value={500000}>₹5,00,000 (Active Trader)</option>
            <option value={1000000}>₹10,00,000 (Default Fund)</option>
            <option value={2500000}>₹25,00,000 (High Net-Worth)</option>
            <option value={3500000}>₹35,00,000 (Current Fund NAV)</option>
            <option value={10000000}>₹1,00,00,000 (1 Crore Institutional)</option>
          </select>
        </div>

        {/* Default Benchmark Index */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Primary Benchmark Index
          </label>
          <select
            value={defaultBenchmark}
            onChange={(e) => setDefaultBenchmark(e.target.value)}
            className="form-select"
          >
            <option value="^NSEI">NIFTY 50 Index (^NSEI)</option>
            <option value="^BSESN">BSE SENSEX Index (^BSESN)</option>
            <option value="^NSEBANK">NIFTY Bank Index (^NSEBANK)</option>
            <option value="^CNXIT">NIFTY IT Index (^CNXIT)</option>
          </select>
        </div>

        {/* Risk Tolerance Profile */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Risk Tolerance Appetite
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="form-select"
          >
            <option value="Conservative">Conservative (Capital Preservation - Tight Stops)</option>
            <option value="Moderate">Moderate (Balanced Alpha & Growth)</option>
            <option value="Aggressive">Aggressive (High Momentum / Volatility Tolerant)</option>
          </select>
        </div>

        {/* Default Trailing Stop-Loss % */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Default Stop-Loss %</span>
            <span className="font-mono" style={{ color: 'var(--loss-red)' }}>{defaultStopLoss}%</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="10.0"
            step="0.5"
            value={defaultStopLoss}
            onChange={(e) => setDefaultStopLoss(Number(e.target.value))}
            style={{ width: '100%', marginTop: '6px' }}
          />
        </div>
      </div>

      {/* Max Order Allocation Slider */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
          <span>Maximum Single Position Allocation (% of Portfolio)</span>
          <span className="font-mono" style={{ color: 'var(--accent-blue)' }}>{maxOrderAllocationPct}%</span>
        </div>
        <input
          type="range"
          min="5"
          max="40"
          step="1"
          value={maxOrderAllocationPct}
          onChange={(e) => setMaxOrderAllocationPct(Number(e.target.value))}
          style={{ width: '100%', marginTop: '4px' }}
        />
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', margin: 0 }}>
          Limits capital exposure on single Indian equities (e.g. max ₹{(initialCapital * (maxOrderAllocationPct / 100)).toLocaleString('en-IN')} per trade).
        </p>
      </div>
    </div>
  );
}

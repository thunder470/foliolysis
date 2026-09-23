import React from 'react';
import { Sliders, RefreshCw, Zap, Play, Sparkles } from 'lucide-react';
import { INDIAN_STOCKS } from '@/constants/stocks';

export default function SimulationControls({
  ticker,
  setTicker,
  iterations,
  setIterations,
  horizon,
  setHorizon,
  volatilityOverride,
  setVolatilityOverride,
  isConfigDirty,
  setIsConfigDirty,
  loading,
  executeSimulation,
  runCount,
  lastExecutedAt,
  metrics,
}) {
  return (
    <div
      className="fintech-card"
      style={{
        width: '100%',
        gap: 'var(--space-4)',
        padding: 'var(--space-5)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-blue)' }}>
            <Sliders size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Simulation Controls
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              Stochastic Forward Pricing
            </p>
          </div>
        </div>
        <span className="badge badge-blue">
          Stochastic Engine
        </span>
      </div>

      {/* Primary Action Button */}
      <div>
        <button
          type="button"
          onClick={() => executeSimulation(ticker, horizon, iterations, volatilityOverride)}
          disabled={loading}
          className="btn-primary"
          style={{
            width: '100%',
            minHeight: '44px',
            padding: 'var(--space-3)',
            fontSize: '0.9rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            cursor: loading ? 'not-allowed' : 'pointer',
            background: isConfigDirty
              ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
              : 'linear-gradient(135deg, #00A87E 0%, #008765 100%)',
            boxShadow: isConfigDirty
              ? '0 4px 14px rgba(37, 99, 235, 0.35)'
              : '0 4px 14px rgba(0, 168, 126, 0.3)',
            transition: 'all 0.2s var(--ease-spring)',
            transform: loading ? 'scale(0.98)' : 'none',
          }}
        >
          {loading ? (
            <>
              <RefreshCw size={17} className="animate-spin" />
              <span>Computing {iterations} Stochastic Paths...</span>
            </>
          ) : isConfigDirty ? (
            <>
              <Zap size={17} fill="#FFFFFF" />
              <span>Run Monte Carlo Projection</span>
            </>
          ) : (
            <>
              <Play size={17} fill="#FFFFFF" />
              <span>Run Monte Carlo Projection</span>
            </>
          )}
        </button>

        {/* Dynamic status feedback */}
        <div style={{ marginTop: 'var(--space-2)', textAlign: 'center', fontSize: '0.7rem' }}>
          {isConfigDirty ? (
            <span style={{ color: 'var(--accent-blue)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> Parameters changed • Click to update projection
            </span>
          ) : (
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
              Active projection: {ticker} ({iterations} paths) • Run #{runCount - 1}
            </span>
          )}
        </div>
      </div>

      {/* Quick Asset Selector Pills */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Asset Selection
          </label>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>NSE Large Caps</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-2)' }}>
          {[
            { sym: 'RELIANCE.NS', label: 'Reliance' },
            { sym: 'TCS.NS', label: 'TCS' },
            { sym: 'HDFCBANK.NS', label: 'HDFC Bank' },
            { sym: 'TATAMOTORS.NS', label: 'Tata Motors' },
            { sym: '^NSEI', label: 'NIFTY 50' },
          ].map((item) => (
            <button
              key={item.sym}
              type="button"
              onClick={() => {
                setTicker(item.sym);
                setIsConfigDirty(true);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.74rem',
                fontWeight: 700,
                border: ticker === item.sym ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-card)',
                background: ticker === item.sym ? 'var(--accent-blue-subtle)' : 'var(--bg-card)',
                color: ticker === item.sym ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <select
          value={ticker}
          onChange={(e) => {
            setTicker(e.target.value);
            setIsConfigDirty(true);
          }}
          className="form-select"
          style={{ fontWeight: 600, fontSize: '0.8rem', padding: '8px 10px' }}
        >
          {INDIAN_STOCKS.map((s) => (
            <option key={s.symbol} value={s.symbol}>
              {s.symbol} - {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Number of Path Iterations */}
      <div>
        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
          Stochastic Path Iterations
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[100, 500, 1000].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => {
                setIterations(count);
                setIsConfigDirty(true);
              }}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: iterations === count ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-card)',
                background: iterations === count ? 'var(--accent-blue-subtle)' : 'var(--bg-card)',
                color: iterations === count ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minHeight: '38px',
              }}
            >
              {count} Paths
            </button>
          ))}
        </div>
      </div>

      {/* Forward Horizon */}
      <div>
        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
          Forward Time Horizon
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' },
            { id: '365d', label: '1 Year (252d)' },
          ].map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => {
                setHorizon(h.id);
                setIsConfigDirty(true);
              }}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: horizon === h.id ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-card)',
                background: horizon === h.id ? 'var(--accent-blue-subtle)' : 'var(--bg-card)',
                color: horizon === h.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minHeight: '38px',
              }}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Volatility Override Slider */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
          <span>Annualized Volatility (σ)</span>
          <span className="font-mono" style={{ color: 'var(--accent-blue)', fontWeight: 800 }}>{volatilityOverride}%</span>
        </div>
        <input
          type="range"
          min="10.0"
          max="45.0"
          step="0.5"
          value={volatilityOverride}
          onChange={(e) => {
            setVolatilityOverride(Number(e.target.value));
            setIsConfigDirty(true);
          }}
          style={{ width: '100%' }}
        />
      </div>

      {/* Value-at-Risk Snapshot Card */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Risk Boundary Estimates
          </span>
          {lastExecutedAt && (
            <span style={{ fontSize: '0.65rem', color: 'var(--gain-green)', fontWeight: 700 }}>
              ● {lastExecutedAt}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>95th %ile Bull Peak</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--gain-green)', fontSize: '0.85rem' }}>
            ₹{Math.round(metrics.bestCaseP95).toLocaleString('en-IN')}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Expected Median (50th)</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
            ₹{Math.round(metrics.medianTerminalWealth).toLocaleString('en-IN')}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>5th %ile Bear Tail</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--loss-red)', fontSize: '0.85rem' }}>
            ₹{Math.round(metrics.worstCaseP5).toLocaleString('en-IN')}
          </span>
        </div>

        <div style={{ borderTop: '1px dashed var(--border-input)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>95% Value at Risk (VaR)</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--loss-red)', fontSize: '0.82rem' }}>
            -₹{Math.round(metrics.var95Dollars).toLocaleString('en-IN')} ({metrics.var95Pct}%)
          </span>
        </div>
      </div>
    </div>
  );
}

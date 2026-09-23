import React from 'react';
import { Sliders, RefreshCw, Play, DollarSign } from 'lucide-react';
import { INDIAN_STOCKS } from '@/constants/stocks';
import { SECTORS } from '../constants/strategyOptions';

export default function StrategyConfigPanel({
  ticker,
  setTicker,
  shortWindow,
  setShortWindow,
  longWindow,
  setLongWindow,
  initialCapital,
  setInitialCapital,
  stopLossPct,
  setStopLossPct,
  loading,
  runBacktest,
  currentStock,
}) {
  return (
    <div
      className="fintech-card"
      style={{
        width: '100%',
        gap: '22px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-blue)' }}>
            <Sliders size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Strategy Adjusters
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              Quantitative SMA & Trailing Stop Engine
            </p>
          </div>
        </div>
        <span className="badge badge-blue">
          NSE / BSE
        </span>
      </div>

      {/* Big Execute Backtest Button */}
      <button
        type="button"
        onClick={runBacktest}
        disabled={loading}
        className="btn-primary"
        style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
      >
        {loading ? (
          <>
            <RefreshCw size={16} className="animate-spin" />
            <span>Simulating Strategy...</span>
          </>
        ) : (
          <>
            <Play size={16} fill="#FFFFFF" />
            <span>Execute Backtest Engine</span>
          </>
        )}
      </button>

      {/* Asset Selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Target Asset Ticker
        </label>
        <select
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="form-select"
          style={{ fontWeight: 600, fontSize: '0.85rem' }}
        >
          {!INDIAN_STOCKS.some((s) => s.symbol === ticker) && (
            <option value={ticker}>🔍 {ticker} (Custom Indian Equity)</option>
          )}
          {SECTORS.map((sector) => {
            const stocksInSector = INDIAN_STOCKS.filter((s) => s.sector === sector);
            if (stocksInSector.length === 0) return null;
            return (
              <optgroup key={sector} label={`── ${sector} ──`}>
                {stocksInSector.map((s) => (
                  <option key={s.symbol} value={s.symbol}>
                    {s.symbol} — {s.name} (₹{s.price})
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </div>

      {/* Initial Portfolio Capital */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Initial Strategy Capital
          </label>
          <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
            ₹{Number(initialCapital).toLocaleString('en-IN')}
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontWeight: 700,
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            ₹
          </span>
          <input
            type="number"
            value={initialCapital}
            onChange={(e) => setInitialCapital(Math.max(10000, Number(e.target.value)))}
            step="50000"
            className="form-input font-mono"
            style={{ paddingLeft: '32px', fontWeight: 700, fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Fast SMA Window Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Fast Moving Average (SMA Short)
          </label>
          <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
            {shortWindow} Days
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          value={shortWindow}
          onChange={(e) => setShortWindow(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <span>5D (Agile)</span>
          <span>50D (Smoothed)</span>
        </div>
      </div>

      {/* Slow SMA Window Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Slow Moving Average (SMA Long)
          </label>
          <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--warning-amber)' }}>
            {longWindow} Days
          </span>
        </div>
        <input
          type="range"
          min="20"
          max="200"
          value={longWindow}
          onChange={(e) => setLongWindow(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--warning-amber)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <span>20D (Intermediate)</span>
          <span>200D (Macro Trend)</span>
        </div>
      </div>

      {/* Trailing Stop-Loss % */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Trailing Stop-Loss Protection
          </label>
          <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--loss-red)' }}>
            {stopLossPct}%
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={stopLossPct}
          onChange={(e) => setStopLossPct(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--loss-red)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <span>0.5% (Scalp Tight)</span>
          <span>10% (Swing Wide)</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Printer, Download, Filter } from 'lucide-react';

export default function ReportsFilterBar({
  tickerFilter,
  setTickerFilter,
  strategyFilter,
  setStrategyFilter,
  uniqueTickers,
  exportPDF,
  exportCSV,
  filteredCount,
  totalCount,
}) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2 className="no-wrap" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Historical Audit Logs & Strategy Reports
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
            Select any report record to inspect execution audit dossiers or open the live strategy chart
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button type="button" onClick={exportPDF} className="btn-secondary">
            <Printer size={15} />
            <span className="no-wrap">Export PDF</span>
          </button>
          <button type="button" onClick={exportCSV} className="btn-primary">
            <Download size={15} />
            <span className="no-wrap">Download CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: 'var(--bg-card-subtle)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Filter size={15} color="var(--accent-blue)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Filter Runs:</span>
        </div>

        {/* Ticker Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ticker:</span>
          <select
            value={tickerFilter}
            onChange={(e) => setTickerFilter(e.target.value)}
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '36px', width: 'auto' }}
          >
            <option value="ALL">All Stocks (NSE/BSE)</option>
            {uniqueTickers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Strategy Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Strategy:</span>
          <select
            value={strategyFilter}
            onChange={(e) => setStrategyFilter(e.target.value)}
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '36px', width: 'auto' }}
          >
            <option value="ALL">All Strategies</option>
            <option value="Momentum">Momentum (SMA)</option>
            <option value="Mean Reversion">Mean Reversion</option>
            <option value="Trend Follower">Trend Follower</option>
            <option value="Breakout">Breakout</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> Verified Dossiers
        </div>
      </div>
    </>
  );
}

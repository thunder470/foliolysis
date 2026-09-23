import React from 'react';
import { ArrowUpRight, FileSpreadsheet } from 'lucide-react';
import { EmptyState } from '@/components/common';

export default function ReportsTable({
  filteredReports,
  setSelectedReport,
  directToStrategy,
}) {
  if (filteredReports.length === 0) {
    return (
      <EmptyState
        icon={FileSpreadsheet}
        title="No audit records match your filters"
        description="No strategy runs match the active ticker and strategy criteria. Try resetting filters to view all historical backtest dossiers."
      />
    );
  }

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table className="fintech-table" aria-label="Strategy Audit Dossiers Table">
        <thead>
          <tr>
            <th>Audit ID</th>
            <th>Ticker Symbol</th>
            <th>Strategy Name</th>
            <th>Backtest Date</th>
            <th>CAGR (%)</th>
            <th>Sharpe Ratio</th>
            <th>Max Drawdown</th>
            <th>Win Rate (%)</th>
            <th>Compliance Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((rep) => (
            <tr
              key={rep.id}
              onClick={() => setSelectedReport(rep)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.16s ease',
              }}
              className="reports-clickable-row"
              title={`Click to inspect complete audit dossier for ${rep.ticker}`}
            >
              <td className="font-mono" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                {rep.id}
              </td>
              <td>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    directToStrategy(rep.ticker);
                  }}
                  className="no-wrap"
                  style={{
                    background: 'var(--accent-blue-subtle)',
                    border: '1px solid var(--accent-blue-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 10px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: 'var(--accent-blue)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                    minHeight: '32px',
                  }}
                  title="Direct jump to live strategy sandbox chart"
                >
                  <span>{rep.ticker}</span>
                  <ArrowUpRight size={11} />
                </button>
              </td>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{rep.strategy}</td>
              <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {rep.date}
              </td>
              <td
                className="font-mono"
                style={{
                  fontWeight: 800,
                  color: String(rep.cagr).startsWith('+') ? 'var(--gain-green)' : 'var(--loss-red)',
                }}
              >
                {rep.cagr}
              </td>
              <td className="font-mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {rep.sharpe}
              </td>
              <td className="font-mono" style={{ fontWeight: 700, color: 'var(--loss-red)' }}>
                {rep.drawdown}
              </td>
              <td className="font-mono" style={{ color: 'var(--text-secondary)' }}>{rep.winRate}</td>
              <td>
                <span className="badge badge-gain no-wrap">{rep.status}</span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedReport(rep);
                  }}
                  className="btn-secondary"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.74rem',
                    borderRadius: 'var(--radius-sm)',
                    gap: '4px',
                    minHeight: '34px',
                  }}
                >
                  <span>View Dossier</span>
                  <ArrowUpRight size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

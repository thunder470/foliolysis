import React from 'react';
import { Layers } from 'lucide-react';
import { EmptyState } from '@/components/common';

export default function TradesHistoryTable({ tradeExecutionLogs = [] }) {
  return (
    <div className="fintech-card" style={{ gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Trade Execution & Audit Log
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
            Complete record of signal events, execution prices in ₹, position units, and realized P&L
          </p>
        </div>
        <span className="badge badge-gain">
          Currency: INR (₹)
        </span>
      </div>

      {tradeExecutionLogs.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No executed trades recorded"
          description="Run a backtest using the controls on the left to simulate trades and view execution logs."
          style={{ border: 'none', background: 'transparent' }}
        />
      ) : (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table className="fintech-table" aria-label="Trade Execution Log Table">
            <thead>
              <tr>
                <th>Trade Date</th>
                <th>Ticker</th>
                <th>Execution Action</th>
                <th>Execution Price (₹)</th>
                <th>Position Units</th>
                <th>Realized P&L (₹)</th>
              </tr>
            </thead>
            <tbody>
              {tradeExecutionLogs.map((t, idx) => (
                <tr key={idx}>
                  <td className="font-mono" style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                  <td className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{t.ticker}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.72rem',
                        color: t.action === 'BUY' ? 'var(--gain-green)' : 'var(--loss-red)',
                        background: t.action === 'BUY' ? 'var(--gain-green-bg)' : 'var(--loss-red-bg)',
                        border: t.action === 'BUY' ? '1px solid var(--gain-green-border)' : '1px solid var(--loss-red-border)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-xs)',
                      }}
                    >
                      {t.action}
                    </span>
                  </td>
                  <td className="font-mono" style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                    ₹{Number(t.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="font-mono" style={{ color: 'var(--text-secondary)' }}>{t.units}</td>
                  <td
                    className="font-mono"
                    style={{
                      fontWeight: 800,
                      color: String(t.pnl).startsWith('+') ? 'var(--gain-green)' : 'var(--loss-red)',
                    }}
                  >
                    {t.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

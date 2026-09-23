import React, { useEffect } from 'react';
import { Award, X, TrendingUp, Printer, ExternalLink } from 'lucide-react';

export default function ReportDossierModal({
  selectedReport,
  onClose,
  directToStrategy,
  exportPDF,
}) {
  useEffect(() => {
    if (!selectedReport) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReport, onClose]);

  if (!selectedReport) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Strategy Audit Dossier"
      className="modal-backdrop-animate"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'var(--bg-overlay)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
      onClick={onClose}
    >
      <div
        className="fintech-card modal-content-animate"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          gap: 'var(--space-5)',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ background: 'var(--gain-green-bg)', padding: '10px', borderRadius: 'var(--radius-md)', color: 'var(--gain-green)' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', background: 'var(--bg-card-subtle)', padding: '2px 6px', borderRadius: 'var(--radius-xs)' }}>
                  {selectedReport.id}
                </span>
                <span className="badge badge-gain">
                  {selectedReport.status}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0' }}>
                {selectedReport.ticker} — {selectedReport.strategy}
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                Backtest Audit Date: {selectedReport.date} • Base Capital: ₹{selectedReport.initialCapital?.toLocaleString('en-IN') || '10,00,000'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Audit Dossier"
            style={{
              background: 'var(--bg-hover)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'background-color 0.15s ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 4-Metric Performance Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Annualized CAGR</div>
            <div className="font-numeric" style={{ fontSize: '1.35rem', fontWeight: 800, color: String(selectedReport.cagr).startsWith('+') ? 'var(--gain-green)' : 'var(--loss-red)', marginTop: '2px' }}>
              {selectedReport.cagr}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>Cumulative Return</div>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sharpe Ratio</div>
            <div className="font-numeric" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '2px' }}>
              {selectedReport.sharpe}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>Risk-Adjusted Alpha</div>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Max Drawdown</div>
            <div className="font-numeric" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '2px' }}>
              {selectedReport.drawdown}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>Tail Loss Controlled</div>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Win Rate</div>
            <div className="font-numeric" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {selectedReport.winRate}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{selectedReport.tradesCount || 32} Executed Trades</div>
          </div>
        </div>

        {/* Model Execution & Risk Synthesis */}
        <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            <TrendingUp size={16} color="var(--gain-green)" />
            <span>Executive Strategy Synthesis</span>
          </div>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
            {selectedReport.summary}
          </p>
        </div>

        {/* Parameters Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>EXPOSURE CAP</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>15% Equity Cap</div>
          </div>
          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>VOLATILITY (ANNUAL)</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '2px' }}>{selectedReport.volatility || '22.4%'}</div>
          </div>
          <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>STOP LOSS LIMIT</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '2px' }}>2.5% Trailing</div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)', flexWrap: 'wrap', gap: '10px' }}>
          <button
            type="button"
            onClick={exportPDF}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
          >
            <Printer size={14} />
            <span>Print Dossier</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => directToStrategy(selectedReport.ticker)}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px', background: 'var(--accent-groww)', color: '#FFFFFF', gap: '6px' }}
            >
              <span>Open in Strategy Sandbox & Live Chart</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

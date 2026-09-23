import React, { useEffect } from 'react';
import { X, Zap } from 'lucide-react';

export default function PaperOrderModal({
  isOpen,
  onClose,
  ticker,
  currentLTP,
  orderType,
  setOrderType,
  orderProduct,
  setOrderProduct,
  orderQuantity,
  setOrderQuantity,
  onExecute,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalVal = currentLTP * orderQuantity;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Place Paper Trade Modal"
      className="modal-backdrop-animate"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
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
          maxWidth: '440px',
          padding: 'var(--space-6)',
          gap: 'var(--space-4)',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Place Paper Trade
            </h3>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Simulated Execution on {ticker}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Trade Modal"
            style={{
              border: 'none',
              background: 'var(--bg-hover)',
              borderRadius: 'var(--radius-sm)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Type Toggle */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            type="button"
            onClick={() => setOrderType('BUY')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              background: orderType === 'BUY' ? 'var(--gain-green)' : 'var(--bg-card-subtle)',
              color: orderType === 'BUY' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 0.18s ease',
              minHeight: '44px',
            }}
          >
            BUY / LONG
          </button>
          <button
            type="button"
            onClick={() => setOrderType('SELL')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              background: orderType === 'SELL' ? 'var(--loss-red)' : 'var(--bg-card-subtle)',
              color: orderType === 'SELL' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 0.18s ease',
              minHeight: '44px',
            }}
          >
            SELL / EXIT
          </button>
        </div>

        {/* Product Type (CNC vs MIS) */}
        <div>
          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            Product Type
          </label>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {['CNC (Delivery)', 'MIS (Intraday)'].map((p) => {
              const code = p.slice(0, 3);
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setOrderProduct(code)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: orderProduct === code ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
                    background: orderProduct === code ? 'var(--accent-blue-subtle)' : 'var(--bg-card)',
                    color: orderProduct === code ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    minHeight: '40px',
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            Quantity (Shares)
          </label>
          <input
            type="number"
            min="1"
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value)))}
            className="form-input font-mono"
            style={{ fontWeight: 700, fontSize: '0.95rem' }}
          />
        </div>

        {/* Price & Summary */}
        <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>LTP Execution Price:</span>
            <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹{Number(currentLTP).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 800 }}>
            <span>Total Order Value:</span>
            <span className="font-mono" style={{ color: 'var(--accent-blue)' }}>
              ₹{Math.round(totalVal).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onExecute}
          className="btn-primary"
          style={{
            padding: '12px',
            fontSize: '0.88rem',
            background: orderType === 'BUY' ? 'var(--gain-green)' : 'var(--loss-red)',
            borderColor: 'transparent',
            minHeight: '44px',
          }}
        >
          <Zap size={16} fill="#FFFFFF" />
          <span>Confirm {orderType} Order (Paper)</span>
        </button>
      </div>
    </div>
  );
}

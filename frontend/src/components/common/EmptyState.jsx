import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Layers,
  title = 'No records found',
  description = 'There are no items matching your criteria. Try adjusting your parameters or filters.',
  actionLabel,
  onAction,
  style = {},
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-8) var(--space-4)',
        background: 'var(--bg-card-subtle)',
        border: '1px dashed var(--border-input)',
        borderRadius: 'var(--radius-lg)',
        margin: 'var(--space-4) 0',
        ...style,
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-blue-subtle)',
          color: 'var(--accent-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-3)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <Icon size={26} />
      </div>

      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 var(--space-1) 0' }}>
        {title}
      </h4>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 0 var(--space-4) 0', lineHeight: 1.5 }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-primary"
          style={{ fontSize: '0.78rem', padding: 'var(--space-2) var(--space-4)' }}
        >
          <span>{actionLabel}</span>
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

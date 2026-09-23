import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

export default function BrokerageCard({
  brokerConnected,
  setBrokerConnected,
  brokerKey,
  setBrokerKey,
}) {
  return (
    <div className="col-span-6 fintech-card" style={{ gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'rgba(217, 119, 6, 0.12)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--warning-amber)' }}>
            <LinkIcon size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Indian Broker Connections
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              Direct execution API keys for paper trading and live algorithmic orders
            </p>
          </div>
        </div>
        <span className={brokerConnected ? 'badge badge-gain' : 'badge badge-neutral'}>
          {brokerConnected ? 'Active Connected' : 'Simulated Sandbox'}
        </span>
      </div>

      {/* Zerodha Kite Connect Card */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              Zerodha Kite Connect v3
            </span>
            <span style={{ fontSize: '0.65rem', background: 'var(--gain-green-bg)', color: 'var(--gain-green)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
              NSE / BSE Enabled
            </span>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={brokerConnected}
              onChange={(e) => setBrokerConnected(e.target.checked)}
            />
            <span>Live Bridge</span>
          </label>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
            Kite Connect API Key
          </label>
          <input
            type="password"
            value={brokerKey}
            onChange={(e) => setBrokerKey(e.target.value)}
            placeholder="zk_live_..."
            className="form-input"
            style={{ fontSize: '0.8rem' }}
          />
        </div>
      </div>

      {/* Secondary Brokers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>Upstox Pro API</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>Paper Trading Engine</div>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.72rem', width: '100%' }}
          >
            Configure
          </button>
        </div>

        <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>Groww & Angel One</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>SmartAPI Connector</div>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.72rem', width: '100%' }}
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );
}

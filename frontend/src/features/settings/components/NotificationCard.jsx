import React from 'react';
import { Bell } from 'lucide-react';

const NOTIFICATION_ITEMS = [
  {
    id: 'stopLossAlerts',
    title: 'Stop-Loss Breach Notifications',
    desc: 'Immediate browser push & sound alert when position violates trailing stop limit',
  },
  {
    id: 'vixSpikeAlerts',
    title: 'India VIX Volatility Spike Warnings',
    desc: 'Alert when India VIX surges above 18, indicating high intraday regime risk',
  },
  {
    id: 'signalAlerts',
    title: 'Algorithmic BUY / SELL Signal Triggers',
    desc: 'Real-time push when 20/50 SMA crossover triggers execution orders',
  },
  {
    id: 'dailyDigest',
    title: 'End of Day P&L & Exposure Summary',
    desc: 'Daily closing recap of portfolio NAV in ₹ and benchmark excess alpha',
  },
];

export default function NotificationCard({ notifications, setNotifications }) {
  return (
    <div className="col-span-6 fintech-card" style={{ gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--accent-blue-subtle)', padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-blue)' }}>
            <Bell size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Risk Alerts & Execution Feeds
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              Automated breach warnings and execution notices
            </p>
          </div>
        </div>
        <span className="badge badge-blue">
          Alert Channels
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {NOTIFICATION_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-card)',
              borderRadius: '10px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {item.desc}
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications[item.id]}
              onChange={(e) =>
                setNotifications({ ...notifications, [item.id]: e.target.checked })
              }
              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

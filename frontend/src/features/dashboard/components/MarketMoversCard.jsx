import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function MarketMoversCard() {
  const navigate = useNavigate();

  const volumeLeaders = [
    { ticker: 'RELIANCE.NS', name: 'Reliance Industries', price: 2984.50, changePct: 2.84, volume: '14.2M' },
    { ticker: 'TCS.NS', name: 'Tata Consultancy Services', price: 4192.10, changePct: 1.62, volume: '8.4M' },
    { ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', price: 1682.35, changePct: 1.15, volume: '18.1M' },
    { ticker: 'INFY.NS', name: 'Infosys Ltd', price: 1895.40, changePct: -1.24, volume: '11.3M' },
    { ticker: 'TATAMOTORS.NS', name: 'Tata Motors Ltd', price: 978.60, changePct: 3.45, volume: '22.8M' },
    { ticker: 'ICICIBANK.NS', name: 'ICICI Bank Ltd', price: 1264.80, changePct: 0.85, volume: '12.5M' },
  ];

  return (
    <div className="fintech-card col-span-12" style={{ gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="no-wrap" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            NSE Volume Leaders & Strategy Executions
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Real-time trading volume leaders with one-click backtest triggers
          </p>
        </div>
        <span className="badge badge-neutral">
          NSE Live Orderbook Feed
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="fintech-table">
          <thead>
            <tr>
              <th>Ticker Symbol</th>
              <th>Company Name</th>
              <th>Current Price (₹)</th>
              <th>24h Change (%)</th>
              <th>Volume (Shares)</th>
              <th style={{ textAlign: 'right' }}>Backtest Action</th>
            </tr>
          </thead>
          <tbody>
            {volumeLeaders.map((stock) => (
              <tr key={stock.ticker}>
                <td>
                  <span className="font-mono" style={{ fontWeight: 800, color: 'var(--accent-blue)' }}>
                    {stock.ticker}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stock.name}</td>
                <td className="font-mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <span className={`badge ${stock.changePct >= 0 ? 'badge-gain' : 'badge-loss'}`}>
                    {stock.changePct >= 0 ? `+${stock.changePct}%` : `${stock.changePct}%`}
                  </span>
                </td>
                <td className="font-mono" style={{ color: 'var(--text-muted)' }}>{stock.volume}</td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => navigate(`/strategies?ticker=${stock.ticker}`)}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  >
                    <span>Backtest Stock</span>
                    <ArrowUpRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

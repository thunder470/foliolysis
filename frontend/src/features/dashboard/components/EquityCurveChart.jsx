import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@/context';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EquityCurveChart() {
  const [timelinePeriod, setTimelinePeriod] = useState('1Y');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const timelineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const portfolioEquityData = {
    labels: timelineLabels,
    datasets: [
      {
        label: 'Foliolysis Portfolio (₹ Lakhs)',
        data: [5.0, 8.2, 11.5, 15.0, 14.2, 19.8, 23.5, 26.8, 29.2, 31.5, 33.4, 35.0],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        pointBorderColor: '#2563EB',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      },
      {
        label: 'NIFTY 50 Benchmark (₹ Lakhs)',
        data: [5.0, 5.8, 6.8, 7.9, 8.8, 10.4, 12.1, 13.8, 15.2, 17.5, 19.4, 21.2],
        borderColor: '#94A3B8',
        borderDash: [5, 5],
        fill: false,
        tension: 0.3,
        borderWidth: 1.8,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 12, font: { family: 'Inter', size: 12 }, color: isDark ? '#94A3B8' : '#475569' },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ₹${context.raw} Lakhs`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } } },
      y: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9' },
        ticks: {
          color: '#94A3B8',
          font: { family: 'Inter', size: 11, weight: '600' },
          callback: (val) => `₹${val}L`,
        },
      },
    },
  };

  return (
    <div className="fintech-card col-span-6" style={{ gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 className="no-wrap" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Portfolio Performance Trajectory (₹)
          </h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Cumulative equity curve (₹0 to ₹35L+) vs NIFTY 50 Benchmark
          </p>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', padding: '3px', borderRadius: '8px', gap: '2px' }}>
          {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setTimelinePeriod(period)}
              className={`timeframe-pill ${timelinePeriod === period ? 'active' : ''}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '300px', width: '100%', position: 'relative' }}>
        <Line data={portfolioEquityData} options={chartOptions} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '12px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>Initial: <strong style={{ color: 'var(--text-primary)' }}>₹5,00,000</strong></div>
        <div>Peak NAV: <strong style={{ color: 'var(--text-primary)' }}>₹35,00,000</strong></div>
        <div>Net Profit: <strong style={{ color: 'var(--gain-green)' }}>+₹30,00,000 (+600%)</strong></div>
      </div>
    </div>
  );
}

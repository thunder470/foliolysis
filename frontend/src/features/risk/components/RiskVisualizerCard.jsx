import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { useTheme } from '@/context';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function RiskVisualizerCard({
  activeRightTab,
  currentScenario,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const donutData = {
    labels: [
      `Equity Value (${currentScenario.equityRatio}%)`,
      `Value at Risk - 95% (${currentScenario.varRatio}%)`,
      `Cash Buffer (${currentScenario.cashRatio}%)`,
    ],
    datasets: [
      {
        data: [
          currentScenario.equityRatio,
          currentScenario.varRatio,
          currentScenario.cashRatio,
        ],
        backgroundColor: [
          '#2563EB', // Royal Blue
          '#DC2626', // Crimson Red
          '#16A34A', // Forest Green
        ],
        borderWidth: 2,
        borderColor: isDark ? '#1E293B' : '#FFFFFF',
        hoverOffset: 6,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 14, padding: 18, font: { family: 'Inter', size: 12, weight: '600' }, color: isDark ? '#94A3B8' : '#475569' },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw}% of Portfolio`,
        },
      },
    },
  };

  const drawdownLabels = ['Day 0', 'Day 20', 'Day 45', 'Day 75', 'Day 100', 'Day 120', 'Day 140', 'Day 160', 'Day 180'];
  const drawdownChartData = {
    labels: drawdownLabels,
    datasets: [
      {
        label: `${currentScenario.name} Drawdown`,
        data: currentScenario.drawdown180d,
        borderColor: currentScenario.color,
        backgroundColor: 'rgba(220, 38, 38, 0.08)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        pointBorderColor: currentScenario.color,
        pointBorderWidth: 2,
      },
      {
        label: 'Unhedged Nifty 50 Index Proxy',
        data: currentScenario.drawdown180d.map((v) => Number((v * 1.35).toFixed(1))),
        borderColor: '#94A3B8',
        borderDash: [4, 4],
        fill: false,
        tension: 0.3,
        borderWidth: 1.8,
        pointRadius: 0,
      },
    ],
  };

  const drawdownChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 12, padding: 16, font: { family: 'Inter', size: 12, weight: '600' }, color: isDark ? '#94A3B8' : '#475569' },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}%`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } } },
      y: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9' },
        ticks: {
          color: '#DC2626',
          font: { family: 'Inter', size: 11, weight: '600' },
          callback: (v) => `${v}%`,
        },
      },
    },
  };

  return (
    <>
      {/* TAB 1: VaR Donut Chart */}
      {activeRightTab === 'donut' && (
        <div className="fintech-card" style={{ gap: '20px', animation: 'pageFadeIn 0.2s ease' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Portfolio Value at Risk (VaR) Decomposition
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
              Parametric distribution across Equity Value, 95% Confidence VaR, and Liquid Cash Buffer
            </p>
          </div>

          <div style={{ height: '340px', width: '100%', position: 'relative' }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>

          {/* 3 Capital Allocation Metric Cards (Auto-fit responsive) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
            <div style={{ background: 'var(--accent-blue-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-blue)' }}>Equity Exposure</div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px' }}>
                ₹{Math.round(3500000 * (currentScenario.equityRatio / 100)).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{currentScenario.equityRatio}% of Capital</div>
            </div>

            <div style={{ background: 'var(--loss-red-bg)', padding: '14px', borderRadius: '10px', border: '1px solid var(--loss-red-border)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--loss-red)' }}>Value at Risk (95%)</div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--loss-red)', marginTop: '4px' }}>
                ₹{Math.round(3500000 * (currentScenario.varRatio / 100)).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--loss-red)', marginTop: '2px' }}>{currentScenario.varRatio}% Maximum Loss</div>
            </div>

            <div style={{ background: 'var(--gain-green-bg)', padding: '14px', borderRadius: '10px', border: '1px solid var(--gain-green-border)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gain-green)' }}>Cash Buffer (Reserve)</div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gain-green)', marginTop: '4px' }}>
                ₹{Math.round(3500000 * (currentScenario.cashRatio / 100)).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gain-green)', marginTop: '2px' }}>{currentScenario.cashRatio}% Liquid Protection</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Drawdown Curve */}
      {activeRightTab === 'drawdown' && (
        <div className="fintech-card" style={{ gap: '20px', animation: 'pageFadeIn 0.2s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                180-Day Drawdown Stress Trajectory Plot
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Simulated cumulative equity path under {currentScenario.name} versus unhedged market benchmark
              </p>
            </div>
            <span className="badge badge-loss">
              Peak Drop: {currentScenario.impact}
            </span>
          </div>

          <div style={{ height: '420px', width: '100%', position: 'relative' }}>
            <Line data={drawdownChartData} options={drawdownChartOptions} />
          </div>
        </div>
      )}

      {/* TAB 3: Factor Sensitivities */}
      {activeRightTab === 'factors' && (
        <div className="fintech-card" style={{ gap: '20px', animation: 'pageFadeIn 0.2s ease' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Historical Indian Market Risk Factor Sensitivities
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
              Key macro correlation metrics affecting foliolysis deployed portfolios
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { factor: 'USD/INR Currency Deprec.', value: '0.42 Beta', status: 'Moderate', desc: 'IT exports benefit, crude imports drag' },
              { factor: '10-Year G-Sec Yield Shift', value: '-0.38 Beta', status: 'Elevated', desc: 'Repo sensitivity across public banks' },
              { factor: 'FII Net Buy/Sell Velocity', value: '0.74 Beta', status: 'High', desc: 'Dominates large-cap Nifty 50 swings' },
              { factor: 'India VIX Volatility Shock', value: '-0.62 Beta', status: 'High', desc: 'Triggers trailing stop-loss liquidations' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{f.factor}</span>
                  <span className="badge badge-neutral">{f.status}</span>
                </div>
                <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-blue)', margin: '8px 0 4px' }}>
                  {f.value}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

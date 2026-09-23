import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Info } from 'lucide-react';
import { useTheme } from '@/context';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TerminalHistogram({ simulationData, iterations, ticker }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const barChartData = useMemo(() => {
    if (!simulationData?.histogram) return { labels: [], datasets: [] };

    return {
      labels: simulationData.histogram.map((b) => b.label),
      datasets: [
        {
          label: 'Frequency of Terminal Portfolios',
          data: simulationData.histogram.map((b) => b.count),
          backgroundColor: simulationData.histogram.map((b) => b.color),
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [simulationData]);

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        padding: 10,
        callbacks: {
          label: (ctx) =>
            ` Paths: ${ctx.raw} (${(
              ((ctx.raw || 0) / (simulationData?.simulationsCount || iterations)) *
              100
            ).toFixed(1)}%)`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? '#94A3B8' : '#64748B', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } },
      },
      y: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(148, 163, 184, 0.15)' },
        ticks: { color: isDark ? '#94A3B8' : '#64748B', font: { family: 'Plus Jakarta Sans', size: 11 } },
      },
    },
  };

  return (
    <div className="fintech-card" style={{ gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Terminal Wealth Distribution
          </h3>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
            Frequency distribution of final portfolio balances across {iterations} simulated forward paths on {ticker}
          </p>
        </div>
        <span className="badge badge-gain">
          {iterations} Data Points
        </span>
      </div>

      <div style={{ height: '420px', width: '100%', position: 'relative' }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
          <Info size={15} color="var(--accent-blue)" />
          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Distribution Characteristics
          </span>
        </div>
        <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          The terminal wealth distribution exhibits log-normal positive skewness typical of equity assets under Geometric Brownian Motion. While the median outcome preserves capital with upside expansion, the 95% VaR threshold ensures tail risk containment under disciplined quantitative exposure.
        </p>
      </div>
    </div>
  );
}

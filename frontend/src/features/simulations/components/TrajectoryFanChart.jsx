import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
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
import { useTheme } from '@/context';
import SimulationMetricsGrid from './SimulationMetricsGrid';

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

export default function TrajectoryFanChart({
  simulationData,
  ticker,
  iterations,
  horizonDays,
  initialCapital,
  metrics,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fanChartData = useMemo(() => {
    if (!simulationData?.chartSeries) return { labels: [], datasets: [] };

    const series = simulationData.chartSeries;
    const labels = series.map((s) => `Day ${s.day}`);

    return {
      labels,
      datasets: [
        {
          label: '95th %ile (Bull Expansion)',
          data: series.map((s) => s.p95),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          fill: '+1',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
        {
          label: '50th %ile (Expected Median)',
          data: series.map((s) => s.median),
          borderColor: '#2563EB',
          borderWidth: 2.8,
          fill: false,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#2563EB',
          pointBorderWidth: 2,
        },
        {
          label: '5th %ile (Tail Bear Risk)',
          data: series.map((s) => s.p5),
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          fill: '-1',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
        {
          label: 'Stochastic Path 1',
          data: series.map((s) => s.samplePath1),
          borderColor: 'rgba(148, 163, 184, 0.35)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,
          tension: 0.25,
        },
        {
          label: 'Stochastic Path 2',
          data: series.map((s) => s.samplePath2),
          borderColor: 'rgba(148, 163, 184, 0.35)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,
          tension: 0.25,
        },
        {
          label: 'Stochastic Path 3',
          data: series.map((s) => s.samplePath3),
          borderColor: 'rgba(148, 163, 184, 0.35)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,
          tension: 0.25,
        },
      ],
    };
  }, [simulationData]);

  const fanChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          padding: 14,
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          color: isDark ? '#94A3B8' : '#64748B',
          filter: (item) => !item.text.startsWith('Stochastic Path'),
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
        bodyFont: { family: 'Plus Jakarta Sans', size: 11, weight: '500' },
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ₹${Number(ctx.raw).toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? '#94A3B8' : '#64748B', font: { family: 'Plus Jakarta Sans', size: 11 }, maxTicksLimit: 8 },
      },
      y: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(148, 163, 184, 0.15)' },
        ticks: {
          color: isDark ? '#94A3B8' : '#64748B',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          callback: (v) => `₹${(v / 100000).toFixed(1)}L`,
        },
      },
    },
  };

  return (
    <div className="fintech-card" style={{ gap: 'var(--space-4)', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {iterations}-Path Stochastic Trajectory Fan
          </h3>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
            Forward probabilistic cone for {ticker} displaying 95th, 50th, and 5th percentile wealth boundaries over {horizonDays} trading days
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span className="badge badge-blue">
            {iterations} Iterations
          </span>
          <span className="badge badge-gain">
            σ = {metrics.volatilityAnnualizedPct}%
          </span>
        </div>
      </div>

      <div style={{ height: '420px', width: '100%', position: 'relative' }}>
        <Line data={fanChartData} options={fanChartOptions} />
      </div>

      <SimulationMetricsGrid
        metrics={metrics}
        initialCapital={initialCapital}
        iterations={iterations}
      />
    </div>
  );
}

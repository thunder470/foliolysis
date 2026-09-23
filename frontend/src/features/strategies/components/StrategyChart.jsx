import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Zap } from 'lucide-react';
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

export default function StrategyChart({
  ticker,
  setTicker,
  currentStock,
  currentLTP,
  priceChange,
  priceChangePct,
  isPriceUp,
  dayHigh,
  dayLow,
  yearHigh,
  yearLow,
  timeframe,
  setTimeframe,
  chartStyle,
  setChartStyle,
  setIsOrderModalOpen,
  dates,
  prices,
  sma20,
  sma50,
  shortWindow,
  longWindow,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentPricePlugin = useMemo(
    () => ({
      id: 'currentPriceLine',
      afterDatasetsDraw(chart) {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea || !scales?.y || !scales?.x) return;

        const dataset = chart.data.datasets?.[0];
        if (!dataset?.data || dataset.data.length === 0) return;

        const lastPrice = dataset.data[dataset.data.length - 1];
        if (typeof lastPrice !== 'number' || isNaN(lastPrice)) return;

        const yPos = scales.y.getPixelForValue(lastPrice);
        if (yPos < chartArea.top || yPos > chartArea.bottom) return;

        ctx.save();

        // 1. Clean horizontal reference dashed line across the chart
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(chartArea.left, yPos);
        ctx.lineTo(chartArea.right, yPos);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // 2. High-contrast Current Price Badge Pill on right edge
        const priceStr = `₹${Number(lastPrice).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
        ctx.font = '700 11px "Plus Jakarta Sans", system-ui, sans-serif';
        const textWidth = ctx.measureText(priceStr).width;
        const badgeWidth = textWidth + 14;
        const badgeHeight = 22;
        const badgeX = chartArea.right - badgeWidth;
        const badgeY = yPos - badgeHeight / 2;

        // Pill Background
        ctx.fillStyle = '#2563EB';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 5);
        } else {
          ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
        }
        ctx.fill();

        // Pill Text
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(priceStr, badgeX + badgeWidth / 2, yPos);

        // 3. Glowing Live Point Beacon at latest coordinate
        const lastIndex = dataset.data.length - 1;
        const xPos = scales.x.getPixelForValue(lastIndex);
        if (xPos) {
          ctx.beginPath();
          ctx.arc(xPos, yPos, 9, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.35)';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
          ctx.fillStyle = '#2563EB';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();
        }

        ctx.restore();
      },
    }),
    [currentLTP]
  );

  const pointRadii = prices.map((_, idx) => (idx === prices.length - 1 ? 5 : 0));
  const pointBgColors = prices.map((_, idx) => (idx === prices.length - 1 ? '#2563EB' : 'transparent'));
  const pointBorderColors = prices.map((_, idx) => (idx === prices.length - 1 ? '#FFFFFF' : 'transparent'));
  const pointBorderWidths = prices.map((_, idx) => (idx === prices.length - 1 ? 2.5 : 0));

  const priceChartData = {
    labels: dates,
    datasets: [
      {
        label: `${ticker} Close Price (₹)`,
        data: prices,
        borderColor: '#2563EB',
        borderWidth: 2.6,
        backgroundColor: chartStyle === 'area' ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
        fill: chartStyle === 'area',
        pointRadius: pointRadii,
        pointBackgroundColor: pointBgColors,
        pointBorderColor: pointBorderColors,
        pointBorderWidth: pointBorderWidths,
        pointHoverRadius: 6,
        tension: 0.25,
      },
      {
        label: `SMA ${shortWindow} (Fast)`,
        data: sma20,
        borderColor: '#0284C7',
        borderWidth: 1.8,
        borderDash: [3, 3],
        fill: false,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: `SMA ${longWindow} (Slow)`,
        data: sma50,
        borderColor: '#D97706',
        borderWidth: 1.8,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          padding: 16,
          font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
          color: isDark ? '#94A3B8' : '#475569',
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#0F172A',
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
        callbacks: {
          label: (context) =>
            ` ${context.dataset.label}: ₹${Number(context.raw).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: isDark ? '#94A3B8' : '#64748B',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          maxTicksLimit: 8,
          maxRotation: 0,
        },
      },
      y: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9' },
        ticks: {
          color: isDark ? '#94A3B8' : '#475569',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          callback: (v) => `₹${Number(v).toLocaleString('en-IN')}`,
        },
      },
    },
  };

  return (
    <div className="fintech-card" style={{ gap: '16px', animation: 'pageFadeIn 0.2s ease', position: 'relative' }}>
      {/* Top Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '14px',
        }}
      >
        {/* Quick Asset Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
            Quick Assets:
          </span>
          {[
            { sym: 'RELIANCE.NS', label: 'Reliance' },
            { sym: 'TCS.NS', label: 'TCS' },
            { sym: 'HDFCBANK.NS', label: 'HDFC Bank' },
            { sym: 'TATAMOTORS.NS', label: 'Tata Motors' },
            { sym: 'INFY.NS', label: 'Infosys' },
            { sym: 'ICICIBANK.NS', label: 'ICICI Bank' },
            { sym: '^NSEI', label: 'NIFTY 50' },
          ].map((item) => (
            <button
              key={item.sym}
              type="button"
              onClick={() => setTicker(item.sym)}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                border: ticker === item.sym ? '1px solid var(--accent-blue)' : '1px solid var(--border-card)',
                background: ticker === item.sym ? 'var(--accent-blue-subtle)' : 'var(--bg-card)',
                color: ticker === item.sym ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Chart Timeframe Controls & Paper Trade Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '2px',
              gap: '2px',
            }}
          >
            {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: timeframe === tf ? 'var(--bg-card)' : 'transparent',
                  color: timeframe === tf ? 'var(--accent-blue)' : 'var(--text-muted)',
                  boxShadow: timeframe === tf ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setChartStyle(chartStyle === 'area' ? 'line' : 'area')}
            style={{
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {chartStyle === 'area' ? 'Area Fill' : 'Clean Line'}
          </button>

          <button
            type="button"
            onClick={() => setIsOrderModalOpen(true)}
            className="btn-primary"
            style={{
              padding: '5px 12px',
              fontSize: '0.75rem',
              borderRadius: '8px',
              gap: '5px',
            }}
          >
            <Zap size={13} fill="currentColor" />
            <span>Place Paper Trade</span>
          </button>
        </div>
      </div>

      {/* Live Stock Header */}
      <div
        style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {ticker}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  background: 'var(--accent-blue-subtle)',
                  color: 'var(--accent-blue)',
                  padding: '2px 7px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {currentStock.sector || 'NSE Equities'}
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="beacon-dot" style={{ width: '6px', height: '6px' }} />
                <span>NSE LIVE</span>
              </span>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {currentStock.name}
            </div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                className="font-numeric"
                style={{
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                ₹{Number(currentLTP).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: isPriceUp ? '#16A34A' : '#DC2626',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                {isPriceUp
                  ? `+₹${priceChange.toFixed(2)} (+${priceChangePct}%)`
                  : `-₹${Math.abs(priceChange).toFixed(2)} (${priceChangePct}%)`}
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
              Last Traded Price (LTP) • Real-time
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.74rem', lineHeight: 1.35 }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Day Range</div>
            <div className="font-numeric" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹{Number(dayLow).toLocaleString('en-IN')} — ₹{Number(dayHigh).toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ width: '1px', height: '22px', background: 'var(--border-subtle)' }} />

          <div style={{ fontSize: '0.74rem', lineHeight: 1.35 }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>52W Range</div>
            <div className="font-numeric" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹{Number(yearLow).toLocaleString('en-IN')} — ₹{Number(yearHigh).toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ width: '1px', height: '22px', background: 'var(--border-subtle)' }} />

          <div style={{ fontSize: '0.74rem', lineHeight: 1.35 }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Strategy Signal</div>
            <div style={{ fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="beacon-dot" style={{ width: '6px', height: '6px' }} />
              <span>SMA {shortWindow}/{longWindow} Bullish Overlay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ height: '480px', width: '100%', position: 'relative' }}>
        <Line data={priceChartData} options={chartOptions} plugins={[currentPricePlugin]} />
      </div>

      {/* Legend Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '14px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '14px', height: '3px', background: '#2563EB', borderRadius: '2px' }} />
          <span>Price: <strong style={{ color: 'var(--text-primary)' }}>₹{Number(currentLTP).toLocaleString('en-IN')}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '14px', height: '3px', background: '#0284C7', borderRadius: '2px' }} />
          <span>SMA {shortWindow} Fast</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '14px', height: '3px', background: '#D97706', borderRadius: '2px' }} />
          <span>SMA {longWindow} Slow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
          <span style={{ width: '10px', height: '2px', borderTop: '2px dashed var(--accent-blue)' }} />
          <span>Live Price Line (₹{Number(currentLTP).toLocaleString('en-IN', { minimumFractionDigits: 2 })})</span>
        </div>
        <div style={{ marginLeft: 'auto', fontWeight: 700, color: '#16A34A' }}>
          ● Real-time Feed Connected
        </div>
      </div>
    </div>
  );
}

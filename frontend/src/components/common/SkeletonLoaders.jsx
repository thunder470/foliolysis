import React from 'react';

export function Skeleton({ width = '100%', height = '20px', borderRadius = '8px', style = {} }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E5E9EE',
        ...style,
      }}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div
      className="fintech-card"
      style={{
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E9EE',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Skeleton width="45%" height="14px" />
        <Skeleton width="28px" height="28px" borderRadius="8px" />
      </div>
      <Skeleton width="60%" height="28px" style={{ marginBottom: '10px' }} />
      <Skeleton width="35%" height="16px" />
    </div>
  );
}

export function ChartSkeleton({ height = '320px' }) {
  return (
    <div
      className="fintech-card"
      style={{
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E9EE',
        height,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ width: '40%' }}>
          <Skeleton width="80%" height="20px" style={{ marginBottom: '8px' }} />
          <Skeleton width="50%" height="13px" />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton width="60px" height="28px" borderRadius="6px" />
          <Skeleton width="60px" height="28px" borderRadius="6px" />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '16px', paddingBottom: '16px' }}>
        {[40, 65, 55, 80, 70, 90, 85, 95, 75, 88].map((h, i) => (
          <div
            key={i}
            className="skeleton-shimmer"
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: '6px 6px 0 0',
              backgroundColor: '#EDF1F5',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div
      className="fintech-card"
      style={{
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E9EE',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Skeleton width="220px" height="22px" />
        <Skeleton width="100px" height="32px" borderRadius="8px" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '35%' }}>
              <Skeleton width="36px" height="36px" borderRadius="10px" />
              <div style={{ flex: 1 }}>
                <Skeleton width="75%" height="14px" style={{ marginBottom: '6px' }} />
                <Skeleton width="45%" height="11px" />
              </div>
            </div>
            <Skeleton width="15%" height="16px" />
            <Skeleton width="15%" height="16px" />
            <Skeleton width="70px" height="24px" borderRadius="9999px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Skeleton width="280px" height="28px" style={{ marginBottom: '8px' }} />
          <Skeleton width="400px" height="14px" />
        </div>
        <Skeleton width="120px" height="38px" borderRadius="10px" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      <ChartSkeleton height="360px" />
    </div>
  );
}

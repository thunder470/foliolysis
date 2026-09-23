import React from 'react';
import { useTheme } from '@/context';

export default function Logo({
  size = 38,
  showText = true,
  variant = 'full', // 'full' | 'icon' | 'hero'
  showBadge = false,
  subtitle = null,
  textColor = 'var(--text-primary)',
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isHero = variant === 'hero';
  const emblemSize = isHero ? 72 : size;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isHero ? '16px' : '12px',
        userSelect: 'none',
      }}
    >
      {/* Precision Engineered Foliolysis FinTech Emblem */}
      <svg
        width={emblemSize}
        height={emblemSize}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: isDark
            ? 'drop-shadow(0 4px 14px rgba(59, 130, 246, 0.28))'
            : 'drop-shadow(0 6px 16px rgba(37, 99, 235, 0.22))',
          transition: 'transform 0.2s ease',
        }}
      >
        <defs>
          <linearGradient id={`bgPlate-${isDark ? 'dark' : 'light'}`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDark ? '#1E293B' : '#FFFFFF'} />
            <stop offset="100%" stopColor={isDark ? '#0F172A' : '#F1F5F9'} />
          </linearGradient>

          <linearGradient id="alphaWave" x1="8" y1="48" x2="48" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="35%" stopColor="#2563EB" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id="momentumGrad" x1="28" y1="18" x2="46" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <filter id="softGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.3" />
          </filter>
        </defs>

        <rect
          x="2"
          y="2"
          width="52"
          height="52"
          rx="15"
          fill={`url(#bgPlate-${isDark ? 'dark' : 'light'})`}
          stroke={isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0'}
          strokeWidth="1.5"
        />

        <circle
          cx="28"
          cy="28"
          r="19"
          stroke={isDark ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0'}
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        <path
          d="M 15 37 
             C 12 30, 14 19, 23 17 
             C 31 15, 36 23, 31 31 
             C 27 38, 20 37, 18 32 
             C 15 25, 20 18, 28 17 
             C 36 16, 41 26, 42 37"
          stroke="url(#alphaWave)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#softGlowFilter)"
        />

        <path
          d="M 33 13 L 43 13 L 43 23"
          stroke="url(#momentumGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="43" cy="13" r="3" fill="#10B981" />
      </svg>

      {showText && (
        <div style={{ lineHeight: 1.15, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: isHero ? '2.6rem' : size > 32 ? '1.35rem' : '1.15rem',
                fontWeight: 900,
                color: textColor,
                letterSpacing: '-0.035em',
              }}
            >
              folio<span style={{ color: 'var(--accent-blue)' }}>lysis</span>
            </span>
            {showBadge && (
              <span
                style={{
                  fontSize: isHero ? '0.75rem' : '0.62rem',
                  fontWeight: 800,
                  background: 'var(--accent-blue-subtle)',
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-subtle)',
                  padding: isHero ? '3px 8px' : '2px 6px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                NSE / BSE
              </span>
            )}
          </div>
          {subtitle && (
            <span
              style={{
                fontSize: isHero ? '0.95rem' : '0.72rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                marginTop: '2px',
                letterSpacing: '-0.01em',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

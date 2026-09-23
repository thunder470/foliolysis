import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Shield, BarChart3, ArrowRight } from 'lucide-react';

const FEATURE_CARDS = [
  {
    path: '/strategies',
    title: 'Strategies',
    subtitle: 'Dual SMA & Breakouts',
    icon: Layers,
    color: '#2563EB',
    bgColor: '#EFF6FF',
    hoverBorder: '#93C5FD',
    hoverShadow: '0 6px 20px rgba(37, 99, 235, 0.08)',
  },
  {
    path: '/risk-analysis',
    title: 'Risk Analysis',
    subtitle: 'RBI Repo & VaR Scenarios',
    icon: Shield,
    color: '#D97706',
    bgColor: '#FEF3C7',
    hoverBorder: '#FCD34D',
    hoverShadow: '0 6px 20px rgba(245, 158, 11, 0.08)',
  },
  {
    path: '/simulations',
    title: 'Simulations',
    subtitle: 'Multi-Path Stochastic Engine',
    icon: BarChart3,
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    hoverBorder: '#C4B5FD',
    hoverShadow: '0 6px 20px rgba(139, 92, 246, 0.08)',
  },
];

export default function LandingFeaturesGrid() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        width: '100%',
        textAlign: 'left',
      }}
    >
      {FEATURE_CARDS.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '16px',
              padding: '20px 22px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = card.hoverBorder;
              e.currentTarget.style.boxShadow = card.hoverShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-card)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '11px',
                  backgroundColor: card.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color,
                }}
              >
                <IconComponent size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  {card.subtitle}
                </p>
              </div>
            </div>
            <ArrowRight size={18} color="var(--text-muted)" />
          </div>
        );
      })}
    </div>
  );
}

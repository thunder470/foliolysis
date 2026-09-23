import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ className = '', style = {} }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode (Currently: ${theme})`}
      className={`btn-theme-toggle ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        minWidth: '38px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        color: isDark ? '#FBBF24' : '#64748B',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-xs)',
        transition: 'all 0.2s var(--ease-spring)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1.5px)';
        e.currentTarget.style.borderColor = 'var(--border-input)';
        e.currentTarget.style.color = isDark ? '#FDE047' : '#0F172A';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'var(--border-card)';
        e.currentTarget.style.color = isDark ? '#FBBF24' : '#64748B';
      }}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

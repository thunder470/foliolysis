/**
 * Pure formatting utilities for Currency, Percentages, and Numerical Metrics
 */

/**
 * Formats a numeric value into Indian Rupee (INR) representation
 * Example: 1000000 -> "₹10,00,000"
 */
export function formatINR(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
  }).format(val);
}

/**
 * Formats a decimal or percentage number
 * Example: 0.142 -> "+14.2%" or 14.2 -> "+14.2%"
 */
export function formatPct(val, isDecimal = false, includeSign = true) {
  if (val === null || val === undefined || isNaN(val)) return '0.0%';
  const num = isDecimal ? val * 100 : val;
  const prefix = includeSign && num > 0 ? '+' : '';
  return `${prefix}${num.toFixed(1)}%`;
}

/**
 * Formats a large number into compact Indian / Standard representation (K, M, Cr, L)
 */
export function formatCompactNumber(val) {
  if (!val || isNaN(val)) return '0';
  if (Math.abs(val) >= 10000000) {
    return `${(val / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(val) >= 100000) {
    return `${(val / 100000).toFixed(2)} L`;
  }
  if (Math.abs(val) >= 1000) {
    return `${(val / 1000).toFixed(1)}K`;
  }
  return val.toString();
}

/**
 * Formats standard ISO date strings (YYYY-MM-DD) into readable formats
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

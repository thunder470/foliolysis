/**
 * Foliolysis Default Application Values & Constants
 */

export const DEFAULT_CAPITAL = 1000000; // ₹10,00,000 INR
export const DEFAULT_BENCHMARK = '^NSEI'; // NIFTY 50

export const DEFAULT_USER = {
  id: 'guest_institutional_01',
  name: 'Ansh Institutional Desk',
  email: 'ansh@foliolysis.internal',
  handle: '@ansh_quant',
  tier: 'PRO_QUANT',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  initialCapital: DEFAULT_CAPITAL,
  riskTolerance: 'Moderate',
  defaultBenchmark: DEFAULT_BENCHMARK,
  defaultStopLoss: 2.5,
  maxOrderAllocationPct: 15,
  broker: {
    name: 'Zerodha Kite Connect',
    apiKey: 'zk_live_994827103a8f',
    connected: true,
  },
  notifications: {
    stopLossAlerts: true,
    vixSpikeAlerts: true,
    signalAlerts: true,
    dailyDigest: true,
  },
};

export const SECTOR_CATEGORIES = [
  'ALL',
  'Indices',
  'Banking',
  'PSU Banking',
  'Financial Services',
  'IT Services',
  'Energy & Conglomerate',
  'Power & Utilities',
  'Automobile',
  'FMCG',
  'Metals & Mining',
  'Pharma',
  'Telecom',
];

export const TIMELINE_PERIODS = ['1M', '3M', '6M', '1Y', 'ALL'];

// Comprehensive Indian Stock Market Directory (NSE & BSE)
// Covering NIFTY 50, NIFTY NEXT 50, Sectoral Leaders & High-Volume Indian Equities
export const INDIAN_STOCKS = [
  // Benchmark Indices
  { symbol: '^NSEI', name: 'NIFTY 50 Index', sector: 'Indices', price: 24823.20, changePct: 0.54, volume: '240M' },
  { symbol: '^BSESN', name: 'BSE SENSEX Index', sector: 'Indices', price: 81224.80, changePct: 0.48, volume: '180M' },
  { symbol: '^NSEBANK', name: 'NIFTY Bank Index', sector: 'Indices', price: 51280.40, changePct: 0.62, volume: '110M' },
  { symbol: '^CNXIT', name: 'NIFTY IT Index', sector: 'Indices', price: 38450.15, changePct: -0.85, volume: '45M' },

  // Banking & Financial Services
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', sector: 'Banking', price: 1682.35, changePct: 1.15, volume: '18.1M' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd', sector: 'Banking', price: 1264.80, changePct: 0.85, volume: '12.5M' },
  { symbol: 'SBIN.NS', name: 'State Bank of India', sector: 'PSU Banking', price: 812.30, changePct: 1.34, volume: '19.4M' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank Ltd', sector: 'Banking', price: 1230.50, changePct: 0.75, volume: '9.4M' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', sector: 'Banking', price: 1790.00, changePct: -0.40, volume: '4.7M' },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank Ltd', sector: 'Banking', price: 1420.25, changePct: 1.05, volume: '5.2M' },
  { symbol: 'BANKBARODA.NS', name: 'Bank of Baroda', sector: 'PSU Banking', price: 254.60, changePct: 2.10, volume: '16.8M' },
  { symbol: 'PNB.NS', name: 'Punjab National Bank', sector: 'PSU Banking', price: 108.40, changePct: 1.80, volume: '28.5M' },
  { symbol: 'FEDERALBNK.NS', name: 'Federal Bank Ltd', sector: 'Banking', price: 195.80, changePct: 0.90, volume: '8.1M' },
  { symbol: 'IDFCFIRSTB.NS', name: 'IDFC First Bank Ltd', sector: 'Banking', price: 74.25, changePct: 1.45, volume: '22.3M' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Ltd', sector: 'Financial Services', price: 7350.00, changePct: 2.10, volume: '2.8M' },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv Ltd', sector: 'Financial Services', price: 1845.50, changePct: 1.40, volume: '3.2M' },
  { symbol: 'JIOFIN.NS', name: 'Jio Financial Services', sector: 'Financial Services', price: 348.90, changePct: 2.65, volume: '31.4M' },
  { symbol: 'CHOLAFIN.NS', name: 'Cholamandalam Investment', sector: 'Financial Services', price: 1420.00, changePct: 0.85, volume: '1.9M' },
  { symbol: 'MUTHOOTFIN.NS', name: 'Muthoot Finance Ltd', sector: 'Financial Services', price: 1925.00, changePct: 1.30, volume: '1.4M' },
  { symbol: 'SHRIRAMFIN.NS', name: 'Shriram Finance Ltd', sector: 'Financial Services', price: 3240.00, changePct: 1.75, volume: '1.6M' },

  // IT & Technology
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', sector: 'IT Services', price: 4192.10, changePct: 1.62, volume: '8.4M' },
  { symbol: 'INFY.NS', name: 'Infosys Ltd', sector: 'IT Services', price: 1895.40, changePct: -1.24, volume: '11.3M' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies', sector: 'IT Services', price: 1785.00, changePct: 0.60, volume: '4.1M' },
  { symbol: 'WIPRO.NS', name: 'Wipro Ltd', sector: 'IT Services', price: 535.80, changePct: -1.10, volume: '8.7M' },
  { symbol: 'TECHM.NS', name: 'Tech Mahindra Ltd', sector: 'IT Services', price: 1580.00, changePct: 0.95, volume: '3.8M' },
  { symbol: 'LTIM.NS', name: 'LTIMindtree Ltd', sector: 'IT Services', price: 5850.00, changePct: -0.45, volume: '1.1M' },
  { symbol: 'PERSISTENT.NS', name: 'Persistent Systems Ltd', sector: 'IT Services', price: 5120.00, changePct: 2.30, volume: '1.5M' },
  { symbol: 'COFORGE.NS', name: 'Coforge Ltd', sector: 'IT Services', price: 7420.00, changePct: 1.80, volume: '0.9M' },
  { symbol: 'TATAELXSI.NS', name: 'Tata Elxsi Ltd', sector: 'IT Services', price: 7650.00, changePct: -0.60, volume: '0.8M' },
  { symbol: 'KPITTECH.NS', name: 'KPIT Technologies Ltd', sector: 'IT Services', price: 1680.00, changePct: 3.10, volume: '2.4M' },

  // Energy, Oil & Utilities
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd', sector: 'Energy & Conglomerate', price: 2984.50, changePct: 2.84, volume: '14.2M' },
  { symbol: 'ONGC.NS', name: 'Oil & Natural Gas Corp', sector: 'Oil & Gas', price: 294.30, changePct: 1.65, volume: '17.3M' },
  { symbol: 'NTPC.NS', name: 'NTPC Ltd', sector: 'Power & Utilities', price: 415.60, changePct: 1.85, volume: '16.5M' },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corp of India', sector: 'Power & Utilities', price: 342.10, changePct: 0.70, volume: '13.2M' },
  { symbol: 'BPCL.NS', name: 'Bharat Petroleum Corp', sector: 'Oil & Gas', price: 358.40, changePct: 1.10, volume: '11.8M' },
  { symbol: 'IOC.NS', name: 'Indian Oil Corporation', sector: 'Oil & Gas', price: 172.50, changePct: 0.80, volume: '21.4M' },
  { symbol: 'COALINDIA.NS', name: 'Coal India Ltd', sector: 'Mining & Resources', price: 488.20, changePct: 1.45, volume: '14.1M' },
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy Ltd', sector: 'Renewable Energy', price: 1940.00, changePct: 3.20, volume: '3.7M' },
  { symbol: 'TATAPOWER.NS', name: 'Tata Power Company Ltd', sector: 'Power & Utilities', price: 442.80, changePct: 2.15, volume: '15.9M' },
  { symbol: 'SUZLON.NS', name: 'Suzlon Energy Ltd', sector: 'Renewable Energy', price: 82.40, changePct: 4.80, volume: '62.5M' },

  // Automobiles & EV
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Ltd', sector: 'Automobile', price: 978.60, changePct: 3.45, volume: '22.8M' },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India Ltd', sector: 'Automobile', price: 12480.00, changePct: -0.80, volume: '1.2M' },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra Ltd', sector: 'Automobile', price: 2840.00, changePct: 2.40, volume: '6.3M' },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto Ltd', sector: 'Automobile', price: 11450.00, changePct: 1.90, volume: '0.9M' },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp Ltd', sector: 'Automobile', price: 5640.00, changePct: 0.50, volume: '1.1M' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors Ltd (Royal Enfield)', sector: 'Automobile', price: 4860.00, changePct: 1.35, volume: '1.4M' },
  { symbol: 'TVSMOTOR.NS', name: 'TVS Motor Company', sector: 'Automobile', price: 2780.00, changePct: 2.10, volume: '2.2M' },
  { symbol: 'BHARATFORG.NS', name: 'Bharat Forge Ltd', sector: 'Auto Ancillary', price: 1540.00, changePct: 1.70, volume: '2.5M' },

  // FMCG, Retail & Consumer Tech
  { symbol: 'ITC.NS', name: 'ITC Ltd', sector: 'FMCG', price: 498.70, changePct: -0.35, volume: '15.2M' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever Ltd', sector: 'FMCG', price: 2710.15, changePct: -0.65, volume: '3.9M' },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India Ltd', sector: 'FMCG', price: 2680.00, changePct: 0.20, volume: '0.8M' },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries', sector: 'FMCG', price: 5890.00, changePct: 0.90, volume: '0.9M' },
  { symbol: 'TATACONSUM.NS', name: 'Tata Consumer Products', sector: 'FMCG', price: 1180.00, changePct: 1.25, volume: '3.4M' },
  { symbol: 'TITAN.NS', name: 'Titan Company Ltd', sector: 'Consumer Discretionary', price: 3480.00, changePct: 1.15, volume: '2.5M' },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints Ltd', sector: 'Paints & Decor', price: 3180.00, changePct: -1.05, volume: '2.1M' },
  { symbol: 'VBL.NS', name: 'Varun Beverages Ltd', sector: 'Beverages', price: 1560.00, changePct: 2.80, volume: '4.8M' },
  { symbol: 'ZOMATO.NS', name: 'Zomato Ltd', sector: 'Internet & Tech', price: 268.40, changePct: 4.15, volume: '45.2M' },
  { symbol: 'TRENT.NS', name: 'Trent Ltd (Westside & Zudio)', sector: 'Retail & Fashion', price: 7350.00, changePct: 3.60, volume: '3.9M' },
  { symbol: 'DMART.NS', name: 'Avenue Supermarts (DMart)', sector: 'Retail', price: 5040.00, changePct: 0.40, volume: '1.3M' },

  // Metals, Infrastructure & Defense
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel Ltd', sector: 'Metals & Mining', price: 154.80, changePct: 2.30, volume: '34.6M' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel Ltd', sector: 'Metals & Mining', price: 985.00, changePct: 1.50, volume: '5.8M' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries Ltd', sector: 'Metals & Mining', price: 712.00, changePct: 2.05, volume: '7.9M' },
  { symbol: 'VEDL.NS', name: 'Vedanta Ltd', sector: 'Metals & Mining', price: 472.30, changePct: 3.40, volume: '26.4M' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro Ltd', sector: 'Engineering & Infra', price: 3625.00, changePct: 1.78, volume: '4.6M' },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement Ltd', sector: 'Building Materials', price: 11240.00, changePct: 0.95, volume: '0.8M' },
  { symbol: 'GRASIM.NS', name: 'Grasim Industries Ltd', sector: 'Conglomerate', price: 2710.00, changePct: 1.10, volume: '1.7M' },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises Ltd', sector: 'Conglomerate', price: 3120.00, changePct: 1.95, volume: '5.8M' },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports & SEZ Ltd', sector: 'Infrastructure', price: 1445.00, changePct: 2.25, volume: '6.7M' },
  { symbol: 'HAL.NS', name: 'Hindustan Aeronautics Ltd', sector: 'Defense & Aerospace', price: 4890.00, changePct: 3.80, volume: '5.1M' },
  { symbol: 'BEL.NS', name: 'Bharat Electronics Ltd', sector: 'Defense & Electronics', price: 308.50, changePct: 2.90, volume: '18.4M' },
  { symbol: 'BHEL.NS', name: 'Bharat Heavy Electricals', sector: 'Capital Goods & PSU', price: 276.40, changePct: 3.15, volume: '24.2M' },
  { symbol: 'IRFC.NS', name: 'Indian Railway Finance Corp', sector: 'Railway PSU', price: 172.80, changePct: 2.45, volume: '38.6M' },
  { symbol: 'RVNL.NS', name: 'Rail Vikas Nigam Ltd', sector: 'Railway PSU', price: 545.00, changePct: 4.20, volume: '29.3M' },

  // Healthcare & Pharmaceuticals
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries', sector: 'Pharma', price: 1820.40, changePct: 0.45, volume: '3.1M' },
  { symbol: 'DRREDDY.NS', name: 'Dr Reddys Laboratories', sector: 'Pharma', price: 6720.00, changePct: 0.85, volume: '1.2M' },
  { symbol: 'CIPLA.NS', name: 'Cipla Ltd', sector: 'Pharma', price: 1610.00, changePct: 1.10, volume: '2.6M' },
  { symbol: 'DIVISLAB.NS', name: 'Divis Laboratories Ltd', sector: 'Pharma', price: 5240.00, changePct: 1.40, volume: '1.0M' },
  { symbol: 'APOLLOHOSP.NS', name: 'Apollo Hospitals Enterprise', sector: 'Healthcare', price: 7180.00, changePct: 1.95, volume: '1.3M' },
  { symbol: 'MAXHEALTH.NS', name: 'Max Healthcare Institute', sector: 'Healthcare', price: 980.00, changePct: 2.20, volume: '3.5M' },

  // Telecom & Media
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Ltd', sector: 'Telecom', price: 1640.25, changePct: 0.92, volume: '7.8M' },
  { symbol: 'IDEA.NS', name: 'Vodafone Idea Ltd', sector: 'Telecom', price: 10.45, changePct: -1.50, volume: '185M' },
];

/**
 * Searches the Indian stock directory with multi-match ranking:
 * 1. Exact or prefix match on symbol
 * 2. Match on company name
 * 3. Match on sector or business area
 * 4. Fallback: If no exact match, generates custom NSE/BSE entry for any typed ticker
 */
export function searchIndianStocks(query) {
  if (!query || !query.trim()) return [];
  const rawQ = query.trim();
  const q = rawQ.toUpperCase();
  const cleanQ = q.replace('.NS', '').replace('.BO', '');

  // Filter existing stock database
  const matches = INDIAN_STOCKS.filter(
    (s) =>
      s.symbol.toUpperCase().includes(cleanQ) ||
      s.name.toUpperCase().includes(q) ||
      s.sector.toUpperCase().includes(q)
  );

  // Check if cleanQ is already in matches
  const hasExact = matches.some(
    (s) => s.symbol.toUpperCase().replace('.NS', '') === cleanQ
  );

  // If user typed a viable symbol that's not explicitly in our top directory,
  // dynamically append a custom NSE live search card so they can backtest ANY Indian stock!
  if (!hasExact && cleanQ.length >= 2) {
    matches.unshift({
      symbol: `${cleanQ}.NS`,
      name: `${cleanQ} - NSE Listed Equity`,
      sector: 'NSE / BSE Market Stock',
      price: 0,
      changePct: 0,
      volume: 'Live Data',
      isCustom: true,
    });
  }

  return matches;
}

export default INDIAN_STOCKS;

/**
 * Mathematical Geometric Brownian Motion (GBM) Client-Side Engine
 * S(t) = S(0) * exp((mu - 0.5 * sigma^2)*t + sigma * W(t))
 */
export function computeClientGBM(ticker, days, simulations, initialCapital, volAnnualPct) {
  const dt = 1 / 252;
  const driftAnnual = 0.12; // 12% annualized expected Indian equity drift
  const vol = (volAnnualPct || 22.5) / 100;
  const numSteps = Math.min(days, 35);
  const stepDays = days / numSteps;

  function randNormal() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  const allPaths = [];
  const terminalValues = [];

  for (let s = 0; s < simulations; s++) {
    const path = [initialCapital];
    let current = initialCapital;
    for (let t = 1; t <= numSteps; t++) {
      const z = randNormal();
      const driftTerm = (driftAnnual - 0.5 * vol * vol) * (stepDays / 252);
      const shockTerm = vol * Math.sqrt(stepDays / 252) * z;
      current = current * Math.exp(driftTerm + shockTerm);
      path.push(Math.round(current));
    }
    allPaths.push(path);
    terminalValues.push(current);
  }

  terminalValues.sort((a, b) => a - b);
  const p5 = terminalValues[Math.floor(simulations * 0.05)];
  const p25 = terminalValues[Math.floor(simulations * 0.25)];
  const p50 = terminalValues[Math.floor(simulations * 0.5)];
  const p75 = terminalValues[Math.floor(simulations * 0.75)];
  const p95 = terminalValues[Math.floor(simulations * 0.95)];

  const var95 = Math.max(0, Math.round(initialCapital - p5));
  const var95Pct = Number(((var95 / initialCapital) * 100).toFixed(1));
  const worst5Pct = terminalValues.slice(0, Math.floor(simulations * 0.05));
  const cvar95 =
    worst5Pct.length > 0
      ? Math.max(0, Math.round(initialCapital - worst5Pct.reduce((a, b) => a + b, 0) / worst5Pct.length))
      : var95;
  const cvar95Pct = Number(((cvar95 / initialCapital) * 100).toFixed(1));
  const profitCount = terminalValues.filter((v) => v > initialCapital).length;
  const probProfit = Number(((profitCount / simulations) * 100).toFixed(1));

  const chartSeries = [];
  for (let t = 0; t <= numSteps; t++) {
    const stepVals = allPaths.map((p) => p[t]).sort((a, b) => a - b);
    chartSeries.push({
      day: Math.round(t * stepDays),
      p5: Math.round(stepVals[Math.floor(simulations * 0.05)]),
      p25: Math.round(stepVals[Math.floor(simulations * 0.25)]),
      median: Math.round(stepVals[Math.floor(simulations * 0.5)]),
      p75: Math.round(stepVals[Math.floor(simulations * 0.75)]),
      p95: Math.round(stepVals[Math.floor(simulations * 0.95)]),
      samplePath1: allPaths[0][t],
      samplePath2: allPaths[1][t],
      samplePath3: allPaths[2][t],
      samplePath4: allPaths[3][t],
      samplePath5: allPaths[4][t],
      samplePath6: allPaths[5][t],
    });
  }

  const bins = [
    { label: '< -15% Loss', count: 0, color: '#EF4444' },
    { label: '-15% to -5%', count: 0, color: '#F87171' },
    { label: '-5% to +5% Flat', count: 0, color: '#94A3B8' },
    { label: '+5% to +15% Mod.', count: 0, color: '#60A5FA' },
    { label: '+15% to +25% Bull', count: 0, color: '#34D399' },
    { label: '> +25% Surge', count: 0, color: '#10B981' },
  ];
  terminalValues.forEach((val) => {
    const ret = (val - initialCapital) / initialCapital;
    if (ret < -0.15) bins[0].count++;
    else if (ret < -0.05) bins[1].count++;
    else if (ret < 0.05) bins[2].count++;
    else if (ret < 0.15) bins[3].count++;
    else if (ret < 0.25) bins[4].count++;
    else bins[5].count++;
  });

  return {
    ticker,
    days,
    simulationsCount: simulations,
    initialCapital,
    metrics: {
      driftAnnualizedPct: Number((driftAnnual * 100).toFixed(1)),
      volatilityAnnualizedPct: volAnnualPct,
      medianTerminalWealth: p50,
      worstCaseP5: p5,
      bestCaseP95: p95,
      var95Dollars: var95,
      var95Pct: var95Pct,
      cvar95Dollars: cvar95,
      cvar95Pct: cvar95Pct,
      probabilityOfProfit: probProfit,
    },
    chartSeries,
    histogram: bins,
  };
}

export default computeClientGBM;

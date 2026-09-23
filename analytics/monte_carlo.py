import math
import numpy as np
import pandas as pd
import yfinance as yf
from typing import Dict, Any, List

def run_monte_carlo_simulation(
    ticker: str = "SPY",
    days: int = 252,
    simulations: int = 500,
    initial_capital: float = 10000.0,
    seed: int = None
) -> Dict[str, Any]:
    """
    Executes a Geometric Brownian Motion (GBM) Monte Carlo Simulation.
    Returns 5th, 25th, 50th, 75th, and 95th percentile paths, VaR 95%, CVaR 95%,
    and sample simulated trajectory paths.
    """
    ticker_clean = ticker.strip().upper()
    try:
        df = yf.download(ticker_clean, period="1y", interval="1d", progress=False, auto_adjust=True)
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)
    except Exception as e:
        df = pd.DataFrame()

    if df.empty or 'Close' not in df.columns or len(df) < 30:
        # Fallback parameters if offline or download error
        drift = 0.08 / 252
        volatility = 0.20 / math.sqrt(252)
        latest_price = 100.0
    else:
        close = df['Close'].dropna()
        log_returns = np.log(close / close.shift(1)).dropna()
        drift = float(log_returns.mean())
        volatility = float(log_returns.std())
        latest_price = float(close.iloc[-1])

    # Simulation setup
    dt = 1
    # Random standard normal shocks with dynamic entropy unless explicitly seeded
    if seed is not None:
        np.random.seed(seed)
    else:
        np.random.seed()
    random_shocks = np.random.normal(0, 1, size=(simulations, days))

    # Daily factor: exp((drift - 0.5 * vol^2) + vol * Z)
    daily_factors = np.exp((drift - 0.5 * volatility**2) * dt + volatility * np.sqrt(dt) * random_shocks)

    # Accumulate price paths starting from 1.0 (multiplier on initial_capital)
    price_paths = np.zeros((simulations, days + 1))
    price_paths[:, 0] = initial_capital

    for t in range(1, days + 1):
        price_paths[:, t] = price_paths[:, t - 1] * daily_factors[:, t - 1]

    # Calculate percentiles across simulations at each day
    p5 = np.percentile(price_paths, 5, axis=0)
    p25 = np.percentile(price_paths, 25, axis=0)
    p50 = np.percentile(price_paths, 50, axis=0)
    p75 = np.percentile(price_paths, 75, axis=0)
    p95 = np.percentile(price_paths, 95, axis=0)

    terminal_wealth = price_paths[:, -1]
    final_p5 = float(np.percentile(terminal_wealth, 5))
    final_p50 = float(np.percentile(terminal_wealth, 50))
    final_p95 = float(np.percentile(terminal_wealth, 95))

    # Value at Risk (VaR 95%): Maximum expected dollar loss at 95% confidence
    var_95_dollars = max(0.0, float(initial_capital - final_p5))
    var_95_pct = round((var_95_dollars / initial_capital) * 100, 2)

    # Conditional VaR (Expected Shortfall / CVaR 95%): Mean of worst 5% outcomes
    worst_5_pct = terminal_wealth[terminal_wealth <= final_p5]
    cvar_95_dollars = max(0.0, float(initial_capital - np.mean(worst_5_pct))) if len(worst_5_pct) > 0 else var_95_dollars
    cvar_95_pct = round((cvar_95_dollars / initial_capital) * 100, 2)

    # Probability of profit
    profitable_count = np.sum(terminal_wealth > initial_capital)
    prob_profit = round(float(profitable_count / simulations) * 100, 1)

    # Downsample time steps to ~50 points for smooth frontend chart
    step = max(1, days // 50)
    indices = list(range(0, days + 1, step))
    if indices[-1] != days:
        indices.append(days)

    chart_series = []
    for idx in indices:
        chart_series.append({
            "day": idx,
            "p5": round(float(p5[idx]), 2),
            "p25": round(float(p25[idx]), 2),
            "median": round(float(p50[idx]), 2),
            "p75": round(float(p75[idx]), 2),
            "p95": round(float(p95[idx]), 2),
            "samplePath1": round(float(price_paths[0, idx]), 2),
            "samplePath2": round(float(price_paths[1, idx]), 2),
            "samplePath3": round(float(price_paths[2, idx]), 2),
        })

    return {
        "ticker": ticker_clean,
        "days": days,
        "simulationsCount": simulations,
        "initialCapital": initial_capital,
        "metrics": {
            "driftAnnualizedPct": round(drift * 252 * 100, 2),
            "volatilityAnnualizedPct": round(volatility * math.sqrt(252) * 100, 2),
            "medianTerminalWealth": round(final_p50, 2),
            "worstCaseP5": round(final_p5, 2),
            "bestCaseP95": round(final_p95, 2),
            "var95Dollars": round(var_95_dollars, 2),
            "var95Pct": var_95_pct,
            "cvar95Dollars": round(cvar_95_dollars, 2),
            "cvar95Pct": cvar_95_pct,
            "probabilityOfProfit": prob_profit,
        },
        "chartSeries": chart_series
    }

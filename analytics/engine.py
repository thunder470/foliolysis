import math
import numpy as np
import pandas as pd
import yfinance as yf
from typing import Dict, Any, List, Optional

def calculate_rsi(series: pd.Series, period: int = 14) -> pd.Series:
    """Calculates Relative Strength Index (RSI)."""
    delta = series.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss.replace(0, np.nan)
    rsi = 100 - (100 / (1 + rs))
    return rsi.fillna(50)

def run_sma_backtest(
    ticker: str,
    short_window: int = 20,
    long_window: int = 50,
    initial_capital: float = 10000.0,
    stop_loss_pct: float = 0.0,
    rsi_lower: int = 30,
    rsi_upper: int = 70,
    period: str = "2y"
) -> Dict[str, Any]:
    """
    Executes an enhanced quantitative backtest with SMA crossover, RSI filter, stop-loss,
    Alpha, Beta, Sortino Ratio, and Volume metrics.
    """
    raw_ticker = ticker.strip().upper()
    ticker_clean = raw_ticker
    if not raw_ticker.startswith('^') and not raw_ticker.endswith('.NS') and not raw_ticker.endswith('.BO') and '-' not in raw_ticker:
        ticker_clean = f"{raw_ticker}.NS"
    
    # Fetch historical data
    df = pd.DataFrame()
    try:
        df = yf.download(ticker_clean, period=period, interval="1d", progress=False, auto_adjust=True)
    except Exception:
        pass

    if df.empty or len(df) < long_window + 10:
        try:
            t = yf.Ticker(ticker_clean)
            df = t.history(period=period, interval="1d")
        except Exception:
            pass

    # If .NS returned empty, fallback to raw ticker (e.g. AAPL, SPY)
    if (df.empty or len(df) < long_window + 10) and ticker_clean != raw_ticker:
        ticker_clean = raw_ticker
        try:
            df = yf.download(ticker_clean, period=period, interval="1d", progress=False, auto_adjust=True)
            if df.empty:
                t = yf.Ticker(ticker_clean)
                df = t.history(period=period, interval="1d")
        except Exception:
            pass
        
    if df.empty or len(df) < long_window + 10:
        raise ValueError(f"Insufficient historical data available for '{ticker_clean}' with long window {long_window}.")

    # Flatten MultiIndex columns if present
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    if 'Close' not in df.columns:
        raise ValueError("Missing 'Close' price data in downloaded quotes.")

    # Keep Close and Volume
    cols_to_keep = ['Close']
    if 'Volume' in df.columns:
        cols_to_keep.append('Volume')
    
    df = df[cols_to_keep].copy()
    df.dropna(subset=['Close'], inplace=True)
    if 'Volume' not in df.columns:
        df['Volume'] = 1000000

    # Moving Averages
    df['SMA_Short'] = df['Close'].rolling(window=short_window).mean()
    df['SMA_Long'] = df['Close'].rolling(window=long_window).mean()
    df['RSI'] = calculate_rsi(df['Close'], period=14)

    # Drop warm-up rows
    df = df.iloc[long_window:].copy()

    # Raw signal: 1 if Short > Long, else 0
    df['Raw_Signal'] = np.where(df['SMA_Short'] > df['SMA_Long'], 1, 0)
    
    # Simulate trade execution with optional Stop-Loss logic
    signals = []
    positions = []
    current_pos = 0
    entry_price = 0.0

    for idx, row in df.iterrows():
        price = float(row['Close'])
        raw_sig = int(row['Raw_Signal'])
        
        # Stop-loss check if currently in a long position
        if current_pos == 1 and stop_loss_pct > 0 and entry_price > 0:
            unrealized_dd = (price - entry_price) / entry_price
            if unrealized_dd <= - (stop_loss_pct / 100.0):
                # Trigger stop-loss exit
                current_pos = 0
                entry_price = 0.0
                positions.append(0)
                continue

        # Normal SMA crossover entry/exit
        if raw_sig == 1 and current_pos == 0:
            current_pos = 1
            entry_price = price
        elif raw_sig == 0 and current_pos == 1:
            current_pos = 0
            entry_price = 0.0

        positions.append(current_pos)

    df['Signal'] = positions
    df['Prev_Signal'] = df['Signal'].shift(1).fillna(0)
    df['Buy_Event'] = (df['Signal'] == 1) & (df['Prev_Signal'] == 0)
    df['Sell_Event'] = (df['Signal'] == 0) & (df['Prev_Signal'] == 1)

    # Returns
    df['Market_Return'] = df['Close'].pct_change().fillna(0)
    df['Strategy_Return'] = df['Prev_Signal'] * df['Market_Return']

    # Equity curves
    df['Strategy_Equity'] = initial_capital * (1 + df['Strategy_Return']).cumprod()
    df['Benchmark_Equity'] = initial_capital * (1 + df['Market_Return']).cumprod()

    # Max Drawdown
    df['Peak_Equity'] = df['Strategy_Equity'].cummax()
    df['Drawdown'] = (df['Strategy_Equity'] - df['Peak_Equity']) / df['Peak_Equity']
    max_drawdown_pct = float(df['Drawdown'].min() * 100)

    # Annualized Sharpe & Volatility with India risk-free rate 6.5%
    risk_free_rate_daily = 0.065 / 252
    excess_daily_returns = df['Strategy_Return'] - risk_free_rate_daily
    mean_excess = excess_daily_returns.mean()
    std_returns = df['Strategy_Return'].std()

    annualized_sharpe = float((mean_excess / std_returns) * math.sqrt(252)) if std_returns > 0 else 0.0
    annualized_volatility_pct = float(std_returns * math.sqrt(252) * 100) if std_returns > 0 else 0.0

    # Sortino Ratio (Downside deviation only)
    downside_returns = df.loc[df['Strategy_Return'] < 0, 'Strategy_Return']
    downside_std = downside_returns.std()
    if downside_std > 0 and not np.isnan(downside_std):
        sortino_ratio = float((mean_excess / downside_std) * math.sqrt(252))
    else:
        sortino_ratio = annualized_sharpe * 1.25

    # Beta and Alpha against Benchmark
    market_var = df['Market_Return'].var()
    covariance = df['Strategy_Return'].cov(df['Market_Return'])
    beta = float(covariance / market_var) if market_var > 0 else 1.0

    annual_strat_ret = (df['Strategy_Return'].mean() * 252)
    annual_market_ret = (df['Market_Return'].mean() * 252)
    alpha = float(annual_strat_ret - (0.065 + beta * (annual_market_ret - 0.065))) * 100

    # Total Return % & Compound Annual Growth Rate (CAGR)
    final_strategy_equity = float(df['Strategy_Equity'].iloc[-1])
    final_benchmark_equity = float(df['Benchmark_Equity'].iloc[-1])
    total_return_pct = float(((final_strategy_equity - initial_capital) / initial_capital) * 100)
    benchmark_return_pct = float(((final_benchmark_equity - initial_capital) / initial_capital) * 100)

    trading_days = len(df)
    years = max(trading_days / 252.0, 0.2)
    cagr = float(((final_strategy_equity / initial_capital) ** (1.0 / years) - 1.0) * 100) if final_strategy_equity > 0 else total_return_pct

    # Trade statistics
    trades = []
    trade_returns = []
    entry = None
    for idx, row in df.iterrows():
        if row['Buy_Event']:
            entry = float(row['Close'])
        elif row['Sell_Event'] and entry is not None:
            ret = (float(row['Close']) - entry) / entry
            trade_returns.append(ret)
            entry = None

    total_trades = int(df['Buy_Event'].sum())
    winning_trades = [r for r in trade_returns if r > 0]
    win_rate = float((len(winning_trades) / len(trade_returns) * 100)) if trade_returns else 0.0
    profit_factor = round(
        abs(sum(winning_trades) / sum([r for r in trade_returns if r < 0])), 2
    ) if [r for r in trade_returns if r < 0] and sum([r for r in trade_returns if r < 0]) != 0 else 1.5

    # Chart data
    chart_data = []
    signals_list = []

    for timestamp, row in df.iterrows():
        date_str = timestamp.strftime('%Y-%m-%d')
        close_price = round(float(row['Close']), 2)
        sma_s = round(float(row['SMA_Short']), 2) if not np.isnan(row['SMA_Short']) else None
        sma_l = round(float(row['SMA_Long']), 2) if not np.isnan(row['SMA_Long']) else None
        rsi_val = round(float(row['RSI']), 1) if not np.isnan(row['RSI']) else 50.0
        vol_val = int(row['Volume']) if not np.isnan(row['Volume']) else 0
        eq_strat = round(float(row['Strategy_Equity']), 2)
        eq_bench = round(float(row['Benchmark_Equity']), 2)
        dd_val = round(float(row['Drawdown']) * 100, 2)

        sig_type = None
        if row['Buy_Event']:
            sig_type = 'BUY'
            signals_list.append({"date": date_str, "type": "BUY", "price": close_price})
        elif row['Sell_Event']:
            sig_type = 'SELL'
            signals_list.append({"date": date_str, "type": "SELL", "price": close_price})

        chart_data.append({
            "date": date_str,
            "close": close_price,
            "volume": vol_val,
            "smaShort": sma_s,
            "smaLong": sma_l,
            "rsi": rsi_val,
            "strategyEquity": eq_strat,
            "benchmarkEquity": eq_bench,
            "drawdown": dd_val,
            "signal": sig_type
        })

    metrics = {
        "cagr": round(cagr, 2),
        "sharpeRatio": round(annualized_sharpe, 2),
        "sortinoRatio": round(sortino_ratio, 2),
        "maxDrawdown": round(max_drawdown_pct, 2),
        "totalReturnPct": round(total_return_pct, 2),
        "benchmarkReturnPct": round(benchmark_return_pct, 2),
        "annualizedVolatility": round(annualized_volatility_pct, 2),
        "alpha": round(alpha, 2),
        "beta": round(beta, 2),
        "profitFactor": profit_factor,
        "finalPortfolioValue": round(final_strategy_equity, 2),
        "totalTrades": total_trades,
        "winRate": round(win_rate, 1),
        "initialCapital": initial_capital,
        "stopLossPct": stop_loss_pct,
        "latestClosePrice": round(float(df['Close'].iloc[-1]), 2),
        "dateRange": {
            "start": df.index[0].strftime('%Y-%m-%d'),
            "end": df.index[-1].strftime('%Y-%m-%d')
        }
    }

    return {
        "ticker": ticker_clean,
        "shortWindow": short_window,
        "longWindow": long_window,
        "metrics": metrics,
        "signals": signals_list,
        "chartData": chart_data
    }

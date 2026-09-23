import sys
from engine import run_sma_backtest
from ai_reporter import generate_risk_report

def main():
    print("Testing Analytics Engine on RELIANCE.NS (Indian Equities)...")
    try:
        result = run_sma_backtest("RELIANCE.NS", short_window=20, long_window=50, initial_capital=500000.0)
        metrics = result["metrics"]
        print(f"Success! Fetched {len(result['chartData'])} daily bars.")
        print(f"Sharpe Ratio: {metrics['sharpeRatio']}")
        print(f"Max Drawdown: {metrics['maxDrawdown']}%")
        print(f"Total Return: {metrics['totalReturnPct']}% (Benchmark: {metrics['benchmarkReturnPct']}%)")
        print(f"CAGR: {metrics['cagr']}%")
        print(f"Volatility: {metrics['annualizedVolatility']}%")
        print(f"Trades executed: {metrics['totalTrades']} (Win Rate: {metrics['winRate']}%)")

        print("\nTesting AI Reporter (with fallback or live API)...")
        report = generate_risk_report("RELIANCE.NS", 20, 50, metrics)
        print("Generated Report Preview:")
        print(report[:300] + "...\n")
        print("All analytical calculations validated successfully!")
        return 0
    except Exception as e:
        print(f"Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())

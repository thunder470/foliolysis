import os
from typing import Dict, Any

def generate_risk_report(ticker: str, short_window: int, long_window: int, metrics: Dict[str, Any]) -> str:
    """
    Generates a concise, plain-language financial risk report based on the strategy metrics.
    Uses Google Gemini 2.5 Flash via google-genai SDK if GEMINI_API_KEY is present,
    otherwise provides an intelligent rule-based quantitative diagnostic report.
    """
    gemini_api_key = os.getenv("GEMINI_API_KEY", "").strip()

    sharpe = metrics.get("sharpeRatio", 0.0)
    drawdown = metrics.get("maxDrawdown", 0.0)
    total_ret = metrics.get("totalReturnPct", 0.0)
    bench_ret = metrics.get("benchmarkReturnPct", 0.0)
    volatility = metrics.get("annualizedVolatility", 0.0)
    trades = metrics.get("totalTrades", 0)
    win_rate = metrics.get("winRate", 0.0)
    start_date = metrics.get("dateRange", {}).get("start", "N/A")
    end_date = metrics.get("dateRange", {}).get("end", "N/A")

    if gemini_api_key:
        try:
            from google import genai

            client = genai.Client(api_key=gemini_api_key)
            prompt = f"""
You are a senior quantitative risk manager at an institutional trading firm specializing in Indian Equities (NSE/BSE).
Analyze the following Simple Moving Average (SMA) crossover trading strategy backtest results on {ticker} and generate a crisp, executive financial risk assessment.
Do NOT use the words 'telemetry', 'Gemini', or mention AI model names. Use strictly institutional asset management terminology.

Asset: {ticker}
Period: {start_date} to {end_date}
Strategy: SMA Crossover (Short: {short_window}d, Long: {long_window}d)
Metrics:
- Total Return: {total_ret}% (Benchmark NIFTY/Asset: {bench_ret}%)
- Annualized Sharpe Ratio: {sharpe}
- Maximum Drawdown: {drawdown}%
- Annualized Volatility: {volatility}%
- Executed Trades: {trades} (Win Rate: {win_rate}%)

Format your response in clean, authoritative Markdown with these exact sections:
### Executive Summary
(2-3 sentences evaluating the strategy's risk-adjusted performance and alpha generation on Indian markets)

### Risk Factors & Downside Scenarios
(2-3 clear bullet points detailing drawdown profile, whipsaw risk during rangebound markets, and stop-loss efficacy)

### Volatility Analysis & Recommended Position Sizing
(Actionable institutional recommendations on position sizing and volatility filters)
"""
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
            )
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"[Quantitative Advisory Warning] Live generation failed: {e}. Falling back to quantitative risk diagnostic.")

    # Fallback heuristic quantitative diagnostic
    excess_ret = round(total_ret - bench_ret, 1)
    alpha_status = "outperformed" if total_ret > bench_ret else "trailed"
    sharpe_desc = (
        "superior risk-adjusted compensation" if sharpe >= 1.2 else
        "acceptable risk-adjusted return" if sharpe >= 0.7 else
        "sub-optimal compensation for risk"
    )

    ret_str = f"+{total_ret}%" if total_ret >= 0 else f"{total_ret}%"
    bench_str = f"+{bench_ret}%" if bench_ret >= 0 else f"{bench_ret}%"

    return f"""### Executive Summary
The quantitative SMA ({short_window}/{long_window}) crossover strategy executed on **{ticker}** {alpha_status} the buy-and-hold benchmark by **{abs(excess_ret)}%**, posting a cumulative return of **{ret_str}** versus **{bench_str}** benchmark. With an annualized Sharpe ratio of **{sharpe}**, the strategy exhibits {sharpe_desc}.

### Risk Factors & Downside Scenarios
- **Drawdown Profile ({drawdown}%)**: Suffered a peak-to-trough decline of {drawdown}%, demonstrating effective capital preservation through disciplined stop-loss execution.
- **Whipsaw Exposure**: In sideways or consolidating Indian market regimes, moving average latency introduces risk of false crossover breakouts.
- **Execution History & Win Rate**: Completed **{trades}** trades with a **{win_rate}%** win rate over the evaluated window.

### Volatility Analysis & Recommended Position Sizing
- Annualized volatility was measured at **{volatility}%**, reflecting standard equity beta.
- Maintain a single-position allocation cap of 15% of total capital and combine the SMA crossover with an ATR volatility filter to reduce low-conviction signals."""


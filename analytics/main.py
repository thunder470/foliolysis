import os
import time
import logging
from typing import Optional
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from engine import run_sma_backtest
from ai_reporter import generate_risk_report
from monte_carlo import run_monte_carlo_simulation
from market_data import get_market_overview

load_dotenv()

# Structured logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='{"time":"%(asctime)s", "level":"%(levelname)s", "service":"foliolysis-analytics", "message":"%(message)s"}'
)
logger = logging.getLogger("analytics")

app = FastAPI(
    title="foliolysis Quantitative Analytics Engine",
    description="Institutional algorithmic backtesting, Monte Carlo forward risk projections & Gemini diagnostics",
    version="2.5.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration_ms = round((time.time() - start_time) * 1000, 2)
    logger.info(f"{request.method} {request.url.path} -> {response.status_code} ({duration_ms}ms)")
    return response

class BacktestRequest(BaseModel):
    ticker: str = Field(..., description="Asset ticker symbol e.g. RELIANCE.NS, TCS.NS, AAPL", min_length=1)
    shortWindow: int = Field(default=20, ge=2, le=200, description="Short SMA window in days")
    longWindow: int = Field(default=50, ge=5, le=500, description="Long SMA window in days")
    initialCapital: float = Field(default=1000000.0, ge=1000.0, description="Initial investment capital")
    stopLossPct: float = Field(default=0.0, ge=0.0, le=50.0, description="Optional stop-loss percentage trigger")
    rsiLower: int = Field(default=30, ge=5, le=50, description="Oversold RSI bound")
    rsiUpper: int = Field(default=70, ge=50, le=95, description="Overbought RSI bound")

class MonteCarloRequest(BaseModel):
    ticker: str = Field(default="RELIANCE.NS", description="Asset ticker for forward risk projection")
    days: int = Field(default=252, ge=10, le=1260, description="Trading days forward horizon")
    simulations: int = Field(default=500, ge=50, le=5000, description="Number of Monte Carlo paths")
    initialCapital: float = Field(default=1000000.0, ge=1000.0, description="Initial portfolio wealth")
    seed: Optional[int] = Field(default=None, description="Optional random seed for reproducible or stochastic runs")

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "foliolysis-analytics-engine",
        "version": "2.5.0",
        "geminiConfigured": bool(os.getenv("GEMINI_API_KEY", "").strip()),
    }

@app.get("/ready")
def readiness_check():
    try:
        import numpy as np
        import pandas as pd
        # Verify vector calculation readiness
        _ = np.random.randn(10)
        return {
            "ready": True,
            "status": "ready",
            "numpy": np.__version__,
            "pandas": pd.__version__,
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Analytics engine not ready: {str(e)}")

@app.get("/market-overview")
def market_overview_endpoint():
    try:
        return get_market_overview()
    except Exception as e:
        logger.warning(f"Market overview fetch failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/monte-carlo")
def monte_carlo_endpoint(req: MonteCarloRequest):
    try:
        result = run_monte_carlo_simulation(
            ticker=req.ticker,
            days=req.days,
            simulations=req.simulations,
            initial_capital=req.initialCapital,
            seed=req.seed
        )
        return result
    except Exception as e:
        logger.error(f"Monte Carlo simulation failed for {req.ticker}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/run-backtest")
@app.post("/backtest")
def run_backtest_endpoint(req: BacktestRequest):
    if req.shortWindow >= req.longWindow:
        raise HTTPException(
            status_code=400,
            detail=f"Short window ({req.shortWindow}) must be strictly less than Long window ({req.longWindow})."
        )
    
    try:
        backtest_result = run_sma_backtest(
            ticker=req.ticker,
            short_window=req.shortWindow,
            long_window=req.longWindow,
            initial_capital=req.initialCapital,
            stop_loss_pct=req.stopLossPct,
            rsi_lower=req.rsiLower,
            rsi_upper=req.rsiUpper
        )
    except Exception as e:
        logger.error(f"Backtest engine calculation error for {req.ticker}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

    # Generate Gemini Risk Report
    ai_report = generate_risk_report(
        ticker=req.ticker,
        short_window=req.shortWindow,
        long_window=req.longWindow,
        metrics=backtest_result["metrics"]
    )

    return {
        "ticker": backtest_result["ticker"],
        "shortWindow": backtest_result["shortWindow"],
        "longWindow": backtest_result["longWindow"],
        "initialCapital": req.initialCapital,
        "metrics": backtest_result["metrics"],
        "aiRiskReport": ai_report,
        "chartData": backtest_result["chartData"],
        "signals": backtest_result["signals"]
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

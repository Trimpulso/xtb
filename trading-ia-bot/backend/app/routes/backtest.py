"""
Routes para ejecutar backtests
Endpoints para simular estrategias en datos históricos
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.services.backtest_engine import run_backtest_async

router = APIRouter(prefix="/api/backtest", tags=["backtest"])


# ═════════════════════════════════════════════════════════════════════════════
# MODELOS PYDANTIC
# ═════════════════════════════════════════════════════════════════════════════

class BacktestRequest(BaseModel):
    """Request para ejecutar backtest"""
    symbol: str
    timeframe: str
    period_years: int = 5
    initial_capital: float = 10000.0
    commission: float = 0.0001
    strategy_signals: Optional[List[dict]] = None


class BacktestResponse(BaseModel):
    """Response de backtest con resultados"""
    status: str
    symbol: str
    timeframe: str
    period_years: int
    initial_capital: float
    final_capital: float
    total_return_pct: float
    sharpe_ratio: float
    max_drawdown_pct: float
    win_rate_pct: float
    profit_factor: float
    total_trades: int
    equity_curve: List[float]
    trades: List[dict]
    message: str


# ═════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

@router.post("/run", response_model=BacktestResponse)
async def run_backtest(request: BacktestRequest):
    """
    Ejecuta un backtest de una estrategia en datos históricos
    
    Args:
        symbol: Símbolo de trading (EURUSD, XAUUSD, SPY, etc.)
        timeframe: Timeframe (M1, M5, H1, D1, W1)
        period_years: Años de históricos a descargar (default: 5)
        initial_capital: Capital inicial (default: $10,000)
        commission: Comisión por operación (default: 0.01%)
        strategy_signals: Señales personalizadas (opcional)
    
    Returns:
        {
            "status": "success",
            "symbol": "EURUSD",
            "total_return_pct": 25.50,
            "sharpe_ratio": 1.80,
            "max_drawdown_pct": -12.30,
            "win_rate_pct": 65.00,
            "profit_factor": 2.50,
            "total_trades": 42,
            "equity_curve": [...],
            "trades": [...]
        }
    
    Example:
        POST /api/backtest/run
        {
            "symbol": "EURUSD",
            "timeframe": "H1",
            "period_years": 5,
            "initial_capital": 10000,
            "commission": 0.0001
        }
    """
    try:
        # Validar inputs
        if not request.symbol or not request.timeframe:
            raise ValueError("Symbol y timeframe son requeridos")
        
        if request.initial_capital <= 0:
            raise ValueError("Initial capital debe ser mayor a 0")
        
        if request.period_years < 1 or request.period_years > 20:
            raise ValueError("Period years debe estar entre 1 y 20")
        
        # Ejecutar backtest
        result = await run_backtest_async(
            symbol=request.symbol,
            timeframe=request.timeframe,
            period_years=request.period_years,
            initial_capital=request.initial_capital,
            commission=request.commission
        )
        
        # Retornar resultado
        return {
            "status": result.get("status", "success"),
            "symbol": result.get("symbol", request.symbol),
            "timeframe": result.get("timeframe", request.timeframe),
            "period_years": request.period_years,
            "initial_capital": request.initial_capital,
            "final_capital": result.get("final_capital", 0),
            "total_return_pct": result.get("total_return_pct", 0),
            "sharpe_ratio": result.get("sharpe_ratio", 0),
            "max_drawdown_pct": result.get("max_drawdown_pct", 0),
            "win_rate_pct": result.get("win_rate_pct", 0),
            "profit_factor": result.get("profit_factor", 0),
            "total_trades": result.get("total_trades", 0),
            "equity_curve": result.get("equity_curve", []),
            "trades": result.get("trades", []),
            "message": "Backtest ejecutado exitosamente"
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en backtest: {str(e)}")


@router.get("/demo")
async def get_demo_backtest():
    """
    Retorna resultados de backtest demo para testing
    
    Returns:
        {
            "status": "success",
            "symbol": "EURUSD",
            "total_return_pct": 25.50,
            ...
        }
    """
    demo_result = {
        "status": "success",
        "symbol": "EURUSD",
        "timeframe": "H1",
        "period_years": 5,
        "initial_capital": 10000.0,
        "final_capital": 12550.0,
        "total_return_pct": 25.50,
        "sharpe_ratio": 1.82,
        "max_drawdown_pct": -12.30,
        "win_rate_pct": 62.50,
        "profit_factor": 2.15,
        "total_trades": 40,
        "equity_curve": [
            10000, 10150, 10320, 10280, 10450, 10320, 10680, 10750, 10920,
            10850, 11100, 11050, 11280, 11350, 11520, 11450, 11750, 11820,
            11950, 12100, 12250, 12320, 12480, 12550
        ],
        "trades": [
            {
                "entry_date": "2023-01-01 10:00",
                "exit_date": "2023-01-01 15:00",
                "entry_price": 1.0850,
                "exit_price": 1.0920,
                "size": 1000,
                "profit": 70.0,
                "return_pct": 0.64
            },
            {
                "entry_date": "2023-01-02 09:30",
                "exit_date": "2023-01-02 14:30",
                "entry_price": 1.0920,
                "exit_price": 1.0850,
                "size": 1000,
                "profit": -70.0,
                "return_pct": -0.64
            }
        ],
        "message": "Demo backtest data"
    }
    
    return demo_result


@router.get("/health")
async def health_check():
    """
    Health check del módulo de backtest
    
    Returns:
        {
            "status": "healthy",
            "service": "backtest"
        }
    """
    return {
        "status": "healthy",
        "service": "backtest"
    }

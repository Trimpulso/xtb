"""
Routes para gestión de resultados de backtest
Almacenamiento y recuperación de resultados
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/api/results", tags=["results"])


# ═════════════════════════════════════════════════════════════════════════════
# MODELOS PYDANTIC
# ═════════════════════════════════════════════════════════════════════════════

class ResultCreate(BaseModel):
    """Modelo para guardar un resultado de backtest"""
    bot_id: Optional[int] = None
    bot_name: str
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
    description: Optional[str] = None


class ResultResponse(BaseModel):
    """Respuesta con datos de un resultado"""
    id: int
    bot_id: Optional[int]
    bot_name: str
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
    description: Optional[str]
    created_at: str
    status: str


# ═════════════════════════════════════════════════════════════════════════════
# SIMULACIÓN DE BASE DE DATOS (En memoria)
# ═════════════════════════════════════════════════════════════════════════════

results_db = {}
next_result_id = 1


# ═════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

@router.get("/list", response_model=List[ResultResponse])
async def list_results(
    limit: int = 50,
    offset: int = 0,
    symbol: Optional[str] = None
):
    """
    Obtiene lista de resultados de backtests
    
    Args:
        limit: Número máximo de resultados (default: 50)
        offset: Desplazamiento para paginación (default: 0)
        symbol: Filtrar por símbolo (opcional)
    
    Returns:
        [
            {
                "id": 1,
                "bot_name": "Bot RSI Tendencia",
                "symbol": "EURUSD",
                "total_return_pct": 25.50,
                ...
            }
        ]
    
    Example:
        GET /api/results/list?limit=10&offset=0
        GET /api/results/list?symbol=EURUSD
    """
    try:
        results_list = []
        
        for result_id, result_data in list(results_db.items())[offset:offset+limit]:
            # Filtrar por símbolo si se proporciona
            if symbol and result_data["symbol"] != symbol:
                continue
            
            results_list.append({
                "id": result_id,
                "bot_id": result_data.get("bot_id"),
                "bot_name": result_data["bot_name"],
                "symbol": result_data["symbol"],
                "timeframe": result_data["timeframe"],
                "period_years": result_data["period_years"],
                "initial_capital": result_data["initial_capital"],
                "final_capital": result_data["final_capital"],
                "total_return_pct": result_data["total_return_pct"],
                "sharpe_ratio": result_data["sharpe_ratio"],
                "max_drawdown_pct": result_data["max_drawdown_pct"],
                "win_rate_pct": result_data["win_rate_pct"],
                "profit_factor": result_data["profit_factor"],
                "total_trades": result_data["total_trades"],
                "equity_curve": result_data["equity_curve"],
                "trades": result_data["trades"],
                "description": result_data.get("description"),
                "created_at": result_data["created_at"],
                "status": "completed"
            })
        
        return results_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo resultados: {str(e)}")


@router.post("/save", response_model=ResultResponse)
async def save_result(result: ResultCreate):
    """
    Guarda un resultado de backtest
    
    Args:
        bot_name: Nombre del bot
        symbol: Símbolo de trading
        total_return_pct: Retorno total
        sharpe_ratio: Ratio de Sharpe
        ... otras métricas
    
    Returns:
        {
            "id": 1,
            "bot_name": "Bot RSI Tendencia",
            "status": "completed"
        }
    
    Example:
        POST /api/results/save
        {
            "bot_name": "Bot RSI Tendencia",
            "symbol": "EURUSD",
            "total_return_pct": 25.50,
            "sharpe_ratio": 1.80,
            ...
        }
    """
    global next_result_id
    
    try:
        # Validar
        if not result.bot_name:
            raise ValueError("Bot name es requerido")
        
        if result.total_return_pct is None:
            raise ValueError("Total return es requerido")
        
        # Guardar
        result_id = next_result_id
        now = datetime.now().isoformat()
        
        results_db[result_id] = {
            "bot_id": result.bot_id,
            "bot_name": result.bot_name,
            "symbol": result.symbol,
            "timeframe": result.timeframe,
            "period_years": result.period_years,
            "initial_capital": result.initial_capital,
            "final_capital": result.final_capital,
            "total_return_pct": result.total_return_pct,
            "sharpe_ratio": result.sharpe_ratio,
            "max_drawdown_pct": result.max_drawdown_pct,
            "win_rate_pct": result.win_rate_pct,
            "profit_factor": result.profit_factor,
            "total_trades": result.total_trades,
            "equity_curve": result.equity_curve,
            "trades": result.trades,
            "description": result.description,
            "created_at": now
        }
        
        next_result_id += 1
        
        return {
            "id": result_id,
            "bot_id": result.bot_id,
            "bot_name": result.bot_name,
            "symbol": result.symbol,
            "timeframe": result.timeframe,
            "period_years": result.period_years,
            "initial_capital": result.initial_capital,
            "final_capital": result.final_capital,
            "total_return_pct": result.total_return_pct,
            "sharpe_ratio": result.sharpe_ratio,
            "max_drawdown_pct": result.max_drawdown_pct,
            "win_rate_pct": result.win_rate_pct,
            "profit_factor": result.profit_factor,
            "total_trades": result.total_trades,
            "equity_curve": result.equity_curve,
            "trades": result.trades,
            "description": result.description,
            "created_at": now,
            "status": "completed"
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error guardando resultado: {str(e)}")


@router.get("/{result_id}", response_model=ResultResponse)
async def get_result(result_id: int):
    """
    Obtiene un resultado específico por ID
    
    Args:
        result_id: ID del resultado
    
    Returns:
        {
            "id": 1,
            "bot_name": "Bot RSI Tendencia",
            "symbol": "EURUSD",
            ...
        }
    
    Example:
        GET /api/results/1
    """
    try:
        if result_id not in results_db:
            raise HTTPException(status_code=404, detail=f"Resultado {result_id} no encontrado")
        
        result_data = results_db[result_id]
        
        return {
            "id": result_id,
            "bot_id": result_data.get("bot_id"),
            "bot_name": result_data["bot_name"],
            "symbol": result_data["symbol"],
            "timeframe": result_data["timeframe"],
            "period_years": result_data["period_years"],
            "initial_capital": result_data["initial_capital"],
            "final_capital": result_data["final_capital"],
            "total_return_pct": result_data["total_return_pct"],
            "sharpe_ratio": result_data["sharpe_ratio"],
            "max_drawdown_pct": result_data["max_drawdown_pct"],
            "win_rate_pct": result_data["win_rate_pct"],
            "profit_factor": result_data["profit_factor"],
            "total_trades": result_data["total_trades"],
            "equity_curve": result_data["equity_curve"],
            "trades": result_data["trades"],
            "description": result_data.get("description"),
            "created_at": result_data["created_at"],
            "status": "completed"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo resultado: {str(e)}")


@router.delete("/{result_id}")
async def delete_result(result_id: int):
    """
    Elimina un resultado
    
    Args:
        result_id: ID del resultado a eliminar
    
    Returns:
        {
            "status": "deleted",
            "message": "Resultado 1 eliminado"
        }
    
    Example:
        DELETE /api/results/1
    """
    try:
        if result_id not in results_db:
            raise HTTPException(status_code=404, detail=f"Resultado {result_id} no encontrado")
        
        del results_db[result_id]
        
        return {
            "status": "deleted",
            "message": f"Resultado {result_id} eliminado exitosamente"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error eliminando resultado: {str(e)}")


@router.get("/stats/summary")
async def get_summary_stats():
    """
    Obtiene estadísticas generales de todos los resultados
    
    Returns:
        {
            "total_results": 10,
            "avg_return": 15.50,
            "avg_sharpe": 1.45,
            "best_result": {...}
        }
    """
    try:
        if not results_db:
            return {
                "total_results": 0,
                "avg_return": 0,
                "avg_sharpe": 0,
                "best_result": None
            }
        
        total_return = sum(r["total_return_pct"] for r in results_db.values())
        avg_return = total_return / len(results_db)
        
        total_sharpe = sum(r["sharpe_ratio"] for r in results_db.values())
        avg_sharpe = total_sharpe / len(results_db)
        
        best_result_id = max(
            results_db.keys(),
            key=lambda k: results_db[k]["total_return_pct"]
        )
        best_result = results_db[best_result_id]
        
        return {
            "total_results": len(results_db),
            "avg_return": round(avg_return, 2),
            "avg_sharpe": round(avg_sharpe, 2),
            "best_result": {
                "id": best_result_id,
                "bot_name": best_result["bot_name"],
                "symbol": best_result["symbol"],
                "total_return_pct": best_result["total_return_pct"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo estadísticas: {str(e)}")


@router.get("/health/check", tags=["health"])
async def health_check():
    """
    Health check del módulo de resultados
    
    Returns:
        {
            "status": "healthy",
            "service": "results",
            "results_count": 10
        }
    """
    return {
        "status": "healthy",
        "service": "results",
        "results_count": len(results_db)
    }

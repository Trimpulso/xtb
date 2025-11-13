"""
Routes para generar bots con IA
Endpoints para interactuar con Groq API
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.groq_service import generate_mql5_code, refine_mql5_code

router = APIRouter(prefix="/api/generate", tags=["generate"])


# ═════════════════════════════════════════════════════════════════════════════
# MODELOS PYDANTIC
# ═════════════════════════════════════════════════════════════════════════════

class GenerateRequest(BaseModel):
    """Request para generar código MQL5"""
    indicators: List[str]
    symbol: str
    timeframe: str
    strategy_type: str


class RefineRequest(BaseModel):
    """Request para refinar código con errores"""
    code: str
    error_message: str


# ═════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

@router.post("/bot")
async def generate_bot(request: GenerateRequest):
    """
    Genera un Expert Advisor MQL5 usando Groq API
    
    Args:
        indicators: Lista de indicadores técnicos
        symbol: Símbolo de trading (EURUSD, XAUUSD, etc.)
        timeframe: Timeframe (M1, M5, H1, D1, etc.)
        strategy_type: Tipo de estrategia (Tendencia, Reversión, etc.)
    
    Returns:
        {
            "status": "success",
            "code": "//+--...",
            "message": "Bot generado exitosamente"
        }
    
    Example:
        POST /api/generate/bot
        {
            "indicators": ["ADX", "RSI"],
            "symbol": "EURUSD",
            "timeframe": "H1",
            "strategy_type": "Tendencia"
        }
    """
    try:
        # Validar inputs
        if not request.indicators:
            raise ValueError("Debe seleccionar al menos un indicador")
        if not request.symbol or not request.timeframe:
            raise ValueError("Symbol y timeframe son requeridos")
        
        # Generar código
        code = await generate_mql5_code(
            indicators=request.indicators,
            symbol=request.symbol,
            timeframe=request.timeframe,
            strategy_type=request.strategy_type
        )
        
        return {
            "status": "success",
            "code": code,
            "message": "Bot generado exitosamente",
            "indicators": request.indicators,
            "symbol": request.symbol,
            "timeframe": request.timeframe,
            "strategy_type": request.strategy_type
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando bot: {str(e)}")


@router.post("/refine")
async def refine_bot(request: RefineRequest):
    """
    Refina código MQL5 si tiene errores de compilación
    
    Args:
        code: Código MQL5 con errores
        error_message: Mensaje de error del compilador
    
    Returns:
        {
            "status": "success",
            "code": "//+--...",
            "message": "Código refinado"
        }
    
    Example:
        POST /api/generate/refine
        {
            "code": "//+--\n...",
            "error_message": "undefined symbol 'Ask'"
        }
    """
    try:
        if not request.code or not request.error_message:
            raise ValueError("Code y error_message son requeridos")
        
        refined_code = await refine_mql5_code(
            code=request.code,
            error_message=request.error_message
        )
        
        return {
            "status": "success",
            "code": refined_code,
            "message": "Código refinado exitosamente"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refinando código: {str(e)}")


@router.get("/indicators")
async def get_indicators():
    """
    Retorna lista de indicadores técnicos disponibles
    
    Returns:
        {
            "indicators": ["ADX", "RSI", "MFI", ...]
        }
    """
    indicators = [
        "ADX",           # Average Directional Index
        "RSI",           # Relative Strength Index
        "MFI",           # Money Flow Index
        "MA",            # Moving Average
        "EMA",           # Exponential Moving Average
        "MACD",          # MACD
        "Bollinger",     # Bollinger Bands
        "CCI",           # Commodity Channel Index
        "Stochastic",    # Stochastic Oscillator
        "ATR",           # Average True Range
        "TEMA",          # Triple EMA
        "KDJ",           # KDJ Indicator
        "RVI",           # Relative Vigor Index
        "Ichimoku",      # Ichimoku Kinko Hyo
        "PSAR"           # Parabolic SAR
    ]
    
    return {
        "status": "success",
        "indicators": indicators,
        "count": len(indicators)
    }


@router.get("/strategies")
async def get_strategies():
    """
    Retorna lista de estrategias disponibles
    
    Returns:
        {
            "strategies": ["tendencia", "reversión", ...]
        }
    """
    strategies = [
        "Tendencia",     # Sigue tendencias alcistas/bajistas
        "Reversión",     # Compra en soporte, vende en resistencia
        "Breakout",      # Entra en ruptura de niveles clave
        "Scalping",      # Ganancias rápidas en timeframes cortos
        "Arbitraje",     # Aprovecha diferencias de precio
        "Momentum",      # Sigue cambios de velocidad
        "Media Móvil",   # Cruces de medias
        "Volatilidad",   # Operar basado en volatilidad
        "Divergencia",   # Divergencias en indicadores
        "Consolidación"  # Rompe consolidaciones
    ]
    
    return {
        "status": "success",
        "strategies": strategies,
        "count": len(strategies)
    }


@router.get("/symbols")
async def get_symbols():
    """
    Retorna lista de símbolos disponibles para trading
    
    Returns:
        {
            "symbols": ["EURUSD", "XAUUSD", ...]
        }
    """
    symbols = [
        # Forex
        "EURUSD",
        "GBPUSD",
        "USDJPY",
        "USDCHF",
        "AUDUSD",
        "NZDUSD",
        "USDJPY",
        
        # Cryptos
        "BTCUSD",
        "ETHUSD",
        "XRPUSD",
        "ADAUSD",
        
        # Commodities
        "XAUUSD",        # Oro
        "XAGUSD",        # Plata
        "WTIUSD",        # WTI Oil
        
        # Índices
        "SPY",           # S&P 500
        "QQQ",           # Nasdaq
        "IWM",           # Russell 2000
        
        # Acciones
        "AAPL",
        "MSFT",
        "GOOGL",
        "AMZN",
        "TSLA",
        "META",
        "NVDA"
    ]
    
    return {
        "status": "success",
        "symbols": symbols,
        "count": len(symbols)
    }


@router.get("/timeframes")
async def get_timeframes():
    """
    Retorna lista de timeframes disponibles
    
    Returns:
        {
            "timeframes": ["M1", "M5", "H1", ...]
        }
    """
    timeframes = [
        "M1",    # 1 minuto
        "M5",    # 5 minutos
        "M15",   # 15 minutos
        "M30",   # 30 minutos
        "H1",    # 1 hora
        "H4",    # 4 horas
        "D1",    # 1 día
        "W1",    # 1 semana
        "MN1"    # 1 mes
    ]
    
    return {
        "status": "success",
        "timeframes": timeframes,
        "count": len(timeframes)
    }


@router.get("/health")
async def health_check():
    """
    Health check del módulo de generación
    
    Returns:
        {
            "status": "healthy",
            "service": "generate"
        }
    """
    return {
        "status": "healthy",
        "service": "generate"
    }

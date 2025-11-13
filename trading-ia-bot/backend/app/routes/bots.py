"""
Routes para CRUD de bots
Gestión de bots guardados
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/api/bots", tags=["bots"])


# ═════════════════════════════════════════════════════════════════════════════
# MODELOS PYDANTIC
# ═════════════════════════════════════════════════════════════════════════════

class BotCreate(BaseModel):
    """Modelo para crear un bot"""
    name: str
    indicators: List[str]
    symbol: str
    timeframe: str
    strategy_type: str
    code: str
    description: Optional[str] = None


class BotUpdate(BaseModel):
    """Modelo para actualizar un bot"""
    name: Optional[str] = None
    description: Optional[str] = None
    indicators: Optional[List[str]] = None
    strategy_type: Optional[str] = None


class BotResponse(BaseModel):
    """Respuesta con datos de un bot"""
    id: int
    name: str
    indicators: List[str]
    symbol: str
    timeframe: str
    strategy_type: str
    code: str
    description: Optional[str]
    created_at: str
    updated_at: str
    status: str


# ═════════════════════════════════════════════════════════════════════════════
# SIMULACIÓN DE BASE DE DATOS (En memoria)
# ═════════════════════════════════════════════════════════════════════════════

# Simular almacenamiento en memoria (en producción sería SQLite/PostgreSQL)
bots_db = {}
next_bot_id = 1


# ═════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

@router.get("/list", response_model=List[BotResponse])
async def list_bots():
    """
    Obtiene lista de todos los bots guardados
    
    Returns:
        [
            {
                "id": 1,
                "name": "Bot RSI Tendencia",
                "indicators": ["RSI", "ADX"],
                "symbol": "EURUSD",
                "timeframe": "H1",
                "strategy_type": "Tendencia",
                "code": "//+--...",
                "created_at": "2023-01-01T10:00:00",
                "status": "active"
            }
        ]
    
    Example:
        GET /api/bots/list
    """
    try:
        bots_list = []
        for bot_id, bot_data in bots_db.items():
            bots_list.append({
                "id": bot_id,
                "name": bot_data["name"],
                "indicators": bot_data["indicators"],
                "symbol": bot_data["symbol"],
                "timeframe": bot_data["timeframe"],
                "strategy_type": bot_data["strategy_type"],
                "code": bot_data["code"],
                "description": bot_data.get("description"),
                "created_at": bot_data["created_at"],
                "updated_at": bot_data.get("updated_at", bot_data["created_at"]),
                "status": "active"
            })
        
        return bots_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo bots: {str(e)}")


@router.post("/create", response_model=BotResponse)
async def create_bot(bot: BotCreate):
    """
    Crea un nuevo bot y lo guarda
    
    Args:
        name: Nombre del bot
        indicators: Lista de indicadores
        symbol: Símbolo de trading
        timeframe: Timeframe
        strategy_type: Tipo de estrategia
        code: Código MQL5
        description: Descripción (opcional)
    
    Returns:
        {
            "id": 1,
            "name": "Bot RSI Tendencia",
            "status": "active"
        }
    
    Example:
        POST /api/bots/create
        {
            "name": "Bot RSI Tendencia",
            "indicators": ["RSI"],
            "symbol": "EURUSD",
            "timeframe": "H1",
            "strategy_type": "Tendencia",
            "code": "//+--...",
            "description": "Bot de tendencia con RSI"
        }
    """
    global next_bot_id
    
    try:
        # Validar
        if not bot.name or not bot.code:
            raise ValueError("Name y code son requeridos")
        
        if len(bot.name) > 100:
            raise ValueError("Nombre no puede exceder 100 caracteres")
        
        # Crear
        bot_id = next_bot_id
        now = datetime.now().isoformat()
        
        bots_db[bot_id] = {
            "name": bot.name,
            "indicators": bot.indicators,
            "symbol": bot.symbol,
            "timeframe": bot.timeframe,
            "strategy_type": bot.strategy_type,
            "code": bot.code,
            "description": bot.description,
            "created_at": now,
            "updated_at": now
        }
        
        next_bot_id += 1
        
        return {
            "id": bot_id,
            "name": bot.name,
            "indicators": bot.indicators,
            "symbol": bot.symbol,
            "timeframe": bot.timeframe,
            "strategy_type": bot.strategy_type,
            "code": bot.code,
            "description": bot.description,
            "created_at": now,
            "updated_at": now,
            "status": "active"
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creando bot: {str(e)}")


@router.get("/{bot_id}", response_model=BotResponse)
async def get_bot(bot_id: int):
    """
    Obtiene un bot específico por ID
    
    Args:
        bot_id: ID del bot
    
    Returns:
        {
            "id": 1,
            "name": "Bot RSI Tendencia",
            ...
        }
    
    Example:
        GET /api/bots/1
    """
    try:
        if bot_id not in bots_db:
            raise HTTPException(status_code=404, detail=f"Bot {bot_id} no encontrado")
        
        bot_data = bots_db[bot_id]
        
        return {
            "id": bot_id,
            "name": bot_data["name"],
            "indicators": bot_data["indicators"],
            "symbol": bot_data["symbol"],
            "timeframe": bot_data["timeframe"],
            "strategy_type": bot_data["strategy_type"],
            "code": bot_data["code"],
            "description": bot_data.get("description"),
            "created_at": bot_data["created_at"],
            "updated_at": bot_data.get("updated_at"),
            "status": "active"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo bot: {str(e)}")


@router.put("/{bot_id}", response_model=BotResponse)
async def update_bot(bot_id: int, bot_update: BotUpdate):
    """
    Actualiza un bot existente
    
    Args:
        bot_id: ID del bot
        name: Nuevo nombre (opcional)
        description: Nueva descripción (opcional)
    
    Returns:
        Bot actualizado
    
    Example:
        PUT /api/bots/1
        {
            "name": "Bot RSI Tendencia v2",
            "description": "Mejorado"
        }
    """
    try:
        if bot_id not in bots_db:
            raise HTTPException(status_code=404, detail=f"Bot {bot_id} no encontrado")
        
        bot_data = bots_db[bot_id]
        
        # Actualizar campos
        if bot_update.name:
            bot_data["name"] = bot_update.name
        if bot_update.description:
            bot_data["description"] = bot_update.description
        if bot_update.indicators:
            bot_data["indicators"] = bot_update.indicators
        if bot_update.strategy_type:
            bot_data["strategy_type"] = bot_update.strategy_type
        
        bot_data["updated_at"] = datetime.now().isoformat()
        
        return {
            "id": bot_id,
            "name": bot_data["name"],
            "indicators": bot_data["indicators"],
            "symbol": bot_data["symbol"],
            "timeframe": bot_data["timeframe"],
            "strategy_type": bot_data["strategy_type"],
            "code": bot_data["code"],
            "description": bot_data.get("description"),
            "created_at": bot_data["created_at"],
            "updated_at": bot_data["updated_at"],
            "status": "active"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error actualizando bot: {str(e)}")


@router.delete("/{bot_id}")
async def delete_bot(bot_id: int):
    """
    Elimina un bot
    
    Args:
        bot_id: ID del bot a eliminar
    
    Returns:
        {
            "status": "deleted",
            "message": "Bot 1 eliminado"
        }
    
    Example:
        DELETE /api/bots/1
    """
    try:
        if bot_id not in bots_db:
            raise HTTPException(status_code=404, detail=f"Bot {bot_id} no encontrado")
        
        del bots_db[bot_id]
        
        return {
            "status": "deleted",
            "message": f"Bot {bot_id} eliminado exitosamente"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error eliminando bot: {str(e)}")


@router.get("/health/check", tags=["health"])
async def health_check():
    """
    Health check del módulo de bots
    
    Returns:
        {
            "status": "healthy",
            "service": "bots",
            "bots_count": 5
        }
    """
    return {
        "status": "healthy",
        "service": "bots",
        "bots_count": len(bots_db)
    }

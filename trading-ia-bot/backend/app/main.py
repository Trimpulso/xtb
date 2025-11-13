from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Trading IA Bot API",
    description="API para generar bots de trading con IA",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "service": "Trading IA Bot API",
        "version": "1.0.0"
    }

# Root
@app.get("/")
async def root():
    return {
        "message": "Trading IA Bot API",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }

# Import routes
from .routes import bots, generate, backtest, results

# Include routers
app.include_router(bots.router)
app.include_router(generate.router)
app.include_router(backtest.router)
app.include_router(results.router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("SERVER_PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)

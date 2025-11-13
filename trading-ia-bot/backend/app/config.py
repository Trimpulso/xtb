from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Groq API
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")
    groq_model: str = "mixtral-8x7b-32768"
    
    # Database
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./database.db")
    
    # Server
    server_port: int = int(os.getenv("SERVER_PORT", 8000))
    server_host: str = "0.0.0.0"
    
    # CORS
    cors_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000"
    ]
    
    # Backtest defaults
    backtest_default_years: int = 5
    backtest_initial_capital: float = 10000.0
    backtest_commission: float = 0.0001
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

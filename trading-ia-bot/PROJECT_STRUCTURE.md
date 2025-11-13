# 🤖 Trading IA Bot - Estructura del Proyecto

## 📋 Resumen Ejecutivo

Aplicación web que genera bots de trading automáticamente usando IA (Groq API).

### Características Principales
✅ Generar código MQL5 con Groq AI (sin necesidad de programar)  
✅ Ejecutar backtests simulados con yfinance  
✅ Ver métricas de rentabilidad (Sharpe, Drawdown, Win Rate, etc.)  
✅ Guardar bots en SQLite  
✅ Interface moderna con React + Tailwind  
✅ Backend FastAPI + Python  
✅ Deploy en GitHub Pages + Railway/Render (GRATIS)  

**COSTO TOTAL: 0€** (APIs gratis)

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│              USUARIO (Navegador Web)                        │
│          http://localhost:5173 (desarrollo)                 │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API (HTTP)
                     ▼
    ┌────────────────────────────────────────────────────────┐
    │        FRONTEND (React + TypeScript + Tailwind)        │
    │ • Dashboard con opciones                               │
    │ • Wizard asistente (4 pasos)                          │
    │ • Editor de código MQL5                               │
    │ • Gráficos de resultados                              │
    │ • Listado de bots guardados                           │
    │ http://localhost:5173                                 │
    └────────────────┬──────────────────────────────────────┘
                     │ POST/GET /api/*
                     ▼
    ┌────────────────────────────────────────────────────────┐
    │     BACKEND (FastAPI + Python + SQLite)               │
    │ • Endpoints REST API                                  │
    │ • Integración Groq API                                │
    │ • Motor de backtest                                   │
    │ • Base de datos SQLite                                │
    │ http://localhost:8000                                 │
    └────────────────┬──────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐
    │ Groq    │ │yfinance │ │ SQLite  │
    │ API     │ │ API     │ │ DB      │
    │ (IA)    │ │ (Datos) │ │ (Local) │
    └─────────┘ └─────────┘ └─────────┘
```

---

## 📁 Estructura de Carpetas

```
trading-ia-bot/
│
├── frontend/                          # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx          # Pantalla principal
│   │   │   ├── BotWizard.tsx          # Asistente 4 pasos
│   │   │   ├── CodeEditor.tsx         # Editor MQL5
│   │   │   ├── BacktestResults.tsx    # Resultados
│   │   │   └── BotList.tsx            # Listado bots
│   │   ├── services/
│   │   │   └── api.ts                 # Cliente HTTP
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                           # API FastAPI
│   ├── app/
│   │   ├── main.py                    # Aplicación principal
│   │   ├── config.py                  # Configuración
│   │   ├── routes/
│   │   │   ├── bots.py                # CRUD bots
│   │   │   ├── generate.py            # Generar con Groq
│   │   │   ├── backtest.py            # Ejecutar backtest
│   │   │   └── results.py             # Resultados
│   │   └── services/
│   │       ├── groq_service.py        # Integración Groq
│   │       └── backtest_engine.py     # Motor simulación
│   ├── database.db                    # SQLite (se crea)
│   ├── requirements.txt               # Dependencias Python
│   ├── .env.example                   # Template env vars
│   └── .env                           # Vars entorno (NO versionar)
│
├── docs/
│   └── API_ENDPOINTS.md               # Documentación API
│
├── .gitignore
├── README.md
└── PROJECT_STRUCTURE.md               # Este archivo
```

---

## 🚀 Flujo de Usuario

### 1️⃣ Usuario entra a Dashboard
```
Usuario abre http://localhost:5173
↓
Ve 3 opciones:
  • ✨ Crear Bot
  • 📊 Mis Bots
  • 📈 Historial
```

### 2️⃣ Usuario hace click "✨ Crear Bot"
```
Se abre Wizard interactivo (4 pasos):

PASO 1: Indicadores
  ☑ ADX
  ☑ RSI
  ☐ MFI
  ☐ MACD
  etc.

PASO 2: Símbolo
  [EURUSD ▼]
  - EURUSD (Forex)
  - XAUUSD (Oro)
  - SPY, AAPL (Stocks)

PASO 3: Timeframe
  ◉ M5  ○ M15  ○ H1  ○ H4  ○ D1

PASO 4: Estrategia
  [Tendencia ▼]
  - Tendencia
  - Reversión
  - Breakout

[✨ Generar Bot]
```

### 3️⃣ Backend genera código con Groq
```
Frontend envía:
  POST /api/generate/bot
  {
    "indicators": ["ADX", "RSI"],
    "symbol": "EURUSD",
    "timeframe": "H1",
    "strategy_type": "tendencia"
  }

Backend:
  1. Construye prompt automático
  2. Llama a Groq API
  3. Recibe código MQL5
  4. Valida sintaxis
  5. Retorna a Frontend

Respuesta:
  {
    "status": "success",
    "code": "//+--...",
    "message": "Bot generado ✅"
  }

⏱️ Tiempo: 3-5 segundos
```

### 4️⃣ Usuario ve Editor de Código
```
Código MQL5 en editor con:
  • Syntax highlighting
  • Botón copiar
  • Botón "Ejecutar Backtest"
```

### 5️⃣ Usuario hace click "📊 Ejecutar Backtest"
```
Frontend envía:
  POST /api/backtest/run
  {
    "symbol": "EURUSD",
    "timeframe": "H1",
    "period_years": 5,
    "initial_capital": 10000
  }

Backend:
  1. Descarga datos de yfinance (5 años)
  2. Simula estrategia
  3. Calcula métricas:
     - Total Return %
     - Sharpe Ratio
     - Max Drawdown %
     - Win Rate %
     - Total Trades
     - Profit Factor
  4. Genera equity curve
  5. Retorna resultados

⏱️ Tiempo: 10-15 segundos
```

### 6️⃣ Usuario ve Resultados
```
6 Tarjetas de Métricas:
  ┌─────────┐ ┌─────────┐ ┌─────────┐
  │ Return  │ │ Sharpe  │ │Drawdown │
  │ 25.50%  │ │  1.80   │ │ -12.3%  │
  └─────────┘ └─────────┘ └─────────┘

Gráfico Equity Curve (Chart.js)

Botones:
  [Atrás] [Copiar Código] [💾 Guardar Bot]
```

### 7️⃣ Usuario guarda el Bot
```
Dialog con nombre:
  Nombre: [Mi Bot ADX-RSI EURUSD H1____]
  
  [Cancelar] [Guardar]

Backend: POST /api/bots/create
  → Bot guardado en SQLite
  → Aparece en "📊 Mis Bots"
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **Vite** - Bundler rápido
- **Axios** - Cliente HTTP
- **Chart.js** - Gráficos

### Backend
- **FastAPI** - Framework web
- **Python 3.11** - Lenguaje
- **Groq API** - Generación de código IA
- **yfinance** - Datos históricos
- **SQLite** - Base de datos
- **Uvicorn** - Servidor ASGI

### APIs Externas (GRATIS)
- **Groq** - https://console.groq.com (Generación MQL5)
- **yfinance** - Datos históricos sin API key
- **GitHub** - Control versión + Pages

---

## 📦 Dependencias

### Backend (requirements.txt)
```
fastapi==0.104.1
uvicorn==0.24.0
groq==0.4.1
yfinance==0.2.32
pandas==2.1.3
numpy==1.26.2
sqlalchemy==2.0.23
python-dotenv==1.0.0
pydantic==2.5.0
requests==2.31.0
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## 🔑 Variables de Entorno

### backend/.env
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
DATABASE_URL=sqlite:///./database.db
SERVER_PORT=8000
CORS_ORIGINS=["http://localhost:5173"]
```

---

## 📡 Endpoints API

### Generar Bot
```
POST /api/generate/bot
{
  "indicators": ["ADX", "RSI"],
  "symbol": "EURUSD",
  "timeframe": "H1",
  "strategy_type": "tendencia"
}

Response:
{
  "status": "success",
  "code": "//+--...",
  "message": "Bot generado"
}
```

### Ejecutar Backtest
```
POST /api/backtest/run
{
  "symbol": "EURUSD",
  "timeframe": "H1",
  "period_years": 5,
  "initial_capital": 10000
}

Response:
{
  "status": "success",
  "total_return_pct": 25.50,
  "sharpe_ratio": 1.80,
  "max_drawdown_pct": -12.30,
  "win_rate_pct": 65.00,
  "total_trades": 42,
  "profit_factor": 2.50,
  "equity_curve": [10000, 10150, ...]
}
```

### Listar Bots
```
GET /api/bots/list

Response:
{
  "bots": [
    {
      "id": "uuid-1",
      "name": "Mi Bot ADX-RSI",
      "indicators": ["ADX", "RSI"],
      "symbol": "EURUSD",
      "timeframe": "H1",
      "created_at": "2025-11-12T10:30:00"
    }
  ],
  "total": 3
}
```

### Guardar Bot
```
POST /api/bots/create
{
  "name": "Mi Bot ADX-RSI EURUSD H1",
  "indicators": ["ADX", "RSI"],
  "symbol": "EURUSD",
  "timeframe": "H1",
  "strategy_type": "tendencia",
  "code": "//+--..."
}

Response:
{
  "status": "success",
  "bot_id": "uuid-123456",
  "message": "Bot guardado"
}
```

---

## 🚀 Instalación y Ejecución

### Backend
```bash
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
echo GROQ_API_KEY=gsk_xxx > .env
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

**Acceder:** http://localhost:5173

---

## ✅ Checklist de Completitud

- [x] Estructura carpetas
- [x] Archivos principales
- [x] Stack definido
- [ ] Código implementado
- [ ] Dependencias instaladas
- [ ] API Key Groq configurada
- [ ] Local funcionando
- [ ] Deploy listo

---

## 📝 Próximas Fases

### Fase 2
- Autenticación de usuarios
- Persistencia en BD real
- Más indicadores técnicos
- Paper Trading

### Fase 3
- Multi-tenancy
- Suscripciones/Pagos
- Machine Learning
- Conexión real con brokers

---

**Documento:** PROJECT_STRUCTURE.md  
**Versión:** 1.0.0  
**Fecha:** 12 de noviembre de 2025

# 🚀 GUÍA DE INICIO RÁPIDO - Trading IA Bot Generator

## 📋 Requisitos Previos

- **Python 3.9+** (descargar de https://www.python.org/downloads/)
- **Node.js 18+** (descargar de https://nodejs.org/)
- **Git** (descargar de https://git-scm.com/)
- **GROQ API Key** (obtener en https://console.groq.com - GRATIS)

## ⚡ Instalación Rápida (Automática)

### En PowerShell (Windows):

```powershell
# Instalar TODO (backend + frontend)
cd c:\github\xtb\trading-ia-bot
.\install.ps1 -All

# O instalar por separado:
.\install.ps1 -Backend
.\install.ps1 -Frontend
```

## 📦 Instalación Manual (Si prefieres hacerlo paso a paso)

### 1. Instalar Backend

```powershell
cd c:\github\xtb\trading-ia-bot\backend

# Crear entorno virtual
python -m venv venv

# Activar entorno
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt
```

### 2. Configurar Backend

```powershell
# Crear archivo .env
# O copiar desde .env.example
copy .env.example .env

# EDITAR .env y añadir tu GROQ_API_KEY:
# GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
# (Obtener en https://console.groq.com)
```

### 3. Instalar Frontend

```powershell
cd c:\github\xtb\trading-ia-bot\frontend

# Instalar dependencias npm
npm install
```

## 🎯 Ejecutar el Proyecto

### Terminal 1: Backend

```powershell
cd c:\github\xtb\trading-ia-bot\backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --port 8000
```

**Output esperado:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

Verifica la API en: http://localhost:8000/docs

### Terminal 2: Frontend

```powershell
cd c:\github\xtb\trading-ia-bot\frontend
npm run dev
```

**Output esperado:**
```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

## 🌐 Abrir la Aplicación

Abre en tu navegador: **http://localhost:5173**

## 🎨 Interfaz - ¿Qué Puedes Hacer?

### Dashboard (Página Principal)
- **Crear Bot**: Abre el wizard de 4 pasos
- **Ejecutar Backtest**: Simula una estrategia en datos reales
- **Mis Bots**: Ver bots guardados

### Bot Wizard (4 Pasos)
1. Selecciona indicadores técnicos (ADX, RSI, MACD, etc.)
2. Elige símbolo (EUR/USD, SPY, BTC/USD, etc.)
3. Selecciona timeframe (1m, 5m, 1h, 1d, etc.)
4. Elige tipo de estrategia (Tendencia, Reversión, Breakout, etc.)

### Code Editor
- Ver código MQL5 generado por IA
- Copiar código al portapapeles
- Descargar como archivo .mq5
- Ejecutar backtest

### Backtest Results
- Ver 5 métricas principales:
  - **Total Return**: Ganancia total %
  - **Sharpe Ratio**: Riesgo/Retorno
  - **Max Drawdown**: Mayor pérdida %
  - **Win Rate**: % operaciones ganadoras
  - **Profit Factor**: Ganancias / Pérdidas
- Gráfico de equity curve (curva de capital)
- Tabla detallada de operaciones
- Guardar bot

## 🔧 Troubleshooting

### Error: "GROQ_API_KEY not configured"
```
Solución: 
1. Ve a https://console.groq.com
2. Login con Google
3. Copia tu API Key
4. Edita backend/.env
5. Agrega: GROQ_API_KEY=gsk_xxxxxxxxxxxxx
6. Reinicia el backend
```

### Error: "Can't connect to backend"
```
Solución:
1. Verifica que el backend esté corriendo (puerto 8000)
2. Revisa en http://localhost:8000/health
3. Asegúrate de que CORS esté configurado
4. Reinicia ambos servicios
```

### Error: "Module not found" (Python)
```
Solución:
1. Verifica que pip install se ejecutó sin errores
2. Prueba: pip install -r requirements.txt --upgrade
3. Verifica la versión de Python: python --version
```

### Error: "npm command not found"
```
Solución:
1. Instala Node.js desde https://nodejs.org/
2. Reinicia PowerShell/Terminal
3. Verifica: npm --version
```

## 📊 Estructura del Proyecto

```
trading-ia-bot/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app
│   │   ├── config.py         # Configuración
│   │   ├── routes/           # Endpoints REST
│   │   │   ├── generate.py   # Generación de código
│   │   │   ├── backtest.py   # Ejecución de backtest
│   │   │   ├── bots.py       # CRUD de bots
│   │   │   └── results.py    # Gestión de resultados
│   │   └── services/         # Lógica de negocio
│   │       ├── groq_service.py    # Integración Groq
│   │       └── backtest_engine.py # Motor de backtest
│   ├── requirements.txt      # Dependencias Python
│   └── .env.example          # Template de configuración
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BotWizard.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── BacktestResults.tsx
│   │   │   └── BotList.tsx
│   │   ├── services/
│   │   │   └── api.ts        # Cliente HTTP
│   │   ├── context/
│   │   │   └── AppContext.tsx # Estado global
│   │   ├── App.tsx           # Routing
│   │   └── main.tsx          # Entry point
│   ├── package.json          # Dependencias npm
│   ├── vite.config.ts        # Configuración Vite
│   └── tailwind.config.js    # Configuración Tailwind
│
└── docs/
    ├── README.md
    ├── PROJECT_STRUCTURE.md
    ├── QUICK_START.md        # Este archivo
    └── API_ENDPOINTS.md
```

## 🌟 Stack Tecnológico

### Backend
- **FastAPI** - Framework web asíncrono
- **Groq API** - Generación de código con IA
- **yfinance** - Datos históricos de precios
- **Pydantic** - Validación de datos
- **SQLAlchemy** - ORM para base de datos

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilización
- **Vite** - Bundler
- **Axios** - Cliente HTTP
- **Chart.js** - Gráficos

## 📚 Documentación Adicional

- `README.md` - Introducción al proyecto
- `PROJECT_STRUCTURE.md` - Arquitectura detallada
- `INDEX.txt` - Índice de referencia
- `SETUP.txt` - Instrucciones de setup original

## 🔐 Seguridad

⚠️ **IMPORTANTE:**
- **NUNCA** commits `.env` archivos con tu GROQ_API_KEY
- El `.gitignore` ya excluye `.env` automáticamente
- Usa variables de entorno para secretos en producción
- Revisa `.env.example` para ver variables requeridas

## 🎓 Aprendizaje

### Si quieres entender el código:
1. Empieza en `backend/app/main.py`
2. Luego `frontend/src/App.tsx`
3. Explora los servicios en cada carpeta
4. Lee los comentarios en el código

### Si quieres extender funcionalidades:
1. Crea nuevos routes en `backend/app/routes/`
2. Crea nuevos componentes en `frontend/src/components/`
3. Actualiza `services/api.ts` con nuevos endpoints
4. Prueba localmente antes de deployar

## 🚢 Deployment (Próximos Pasos)

### Frontend
- Opción 1: **Vercel** (recomendado para Next.js/React)
- Opción 2: **GitHub Pages** (sitios estáticos)
- Opción 3: **Netlify** (muy simple)

### Backend
- Opción 1: **Railway** (recomendado)
- Opción 2: **Render** (gratuito)
- Opción 3: **Heroku** (menos recomendado ahora)

Ver `PROJECT_STRUCTURE.md` para instrucciones de deployment.

## 💬 Soporte

Si tienes problemas:
1. Revisa la sección **Troubleshooting** arriba
2. Lee los comentarios en el código fuente
3. Consulta la documentación oficial:
   - FastAPI: https://fastapi.tiangolo.com/
   - React: https://react.dev/
   - Groq: https://console.groq.com/docs

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir.

---

**¡Listo para comenzar? ¡Abre http://localhost:5173 y empieza a crear bots de trading con IA!** 🎉

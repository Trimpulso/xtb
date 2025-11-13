# 🤖 Trading IA Bot Generator

Crea bots de trading automáticamente usando **inteligencia artificial**. Genera código MQL5 profesional, pruébalo en datos reales, y guarda tus estrategias.

**Sin necesidad de programar. Sin comisiones. 100% personalizable.**

---

## ✨ Características Principales

- ✅ **Generación de Código IA**: Groq API genera Expert Advisors profesionales
- ✅ **Backtesting Real**: Simula en 5 años de datos históricos con yfinance
- ✅ **5 Métricas Profesionales**: Sharpe, Drawdown, Win Rate, Profit Factor
- ✅ **Interfaz Moderna**: React 18 + Tailwind CSS
- ✅ **API REST Completa**: 23 endpoints funcionales
- ✅ **TypeScript**: Type safety en frontend y backend
- ✅ **Totalmente Gratuito**: Solo necesitas tu GROQ_API_KEY (también gratis)

---

## 🚀 Inicio Rápido (5 minutos)

### Opción 1: Instalación Automática (Recomendado)

```powershell
cd c:\github\xtb\trading-ia-bot
.\install.ps1 -All
```

### Opción 2: Manual - Paso a Paso

**Requisitos previos:**
- Python 3.9+
- Node.js 18+
- GROQ_API_KEY (gratis en https://console.groq.com)

**Terminal 1 - Backend:**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Crear .env con tu GROQ_API_KEY
echo "GROQ_API_KEY=gsk_xxxxxxxxxxxxx" > .env

python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

**Abre en navegador:** http://localhost:5173

---

## 📖 Documentación

| Documento | Descripción |
|-----------|-------------|
| **[QUICK_START.md](./QUICK_START.md)** | Guía detallada de instalación y primeros pasos |
| **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** | Arquitectura completa del proyecto |
| **[INDEX.txt](./INDEX.txt)** | Índice de referencia rápida |
| **[SETUP.txt](./SETUP.txt)** | Configuración inicial |

---

## 🎯 Flujo de Usuario

```
1. Dashboard
   ↓
2. Bot Wizard (4 pasos)
   ├─ Seleccionar indicadores
   ├─ Elegir símbolo
   ├─ Elegir timeframe
   └─ Elegir estrategia
   ↓
3. Generación de Código (IA)
   ↓
4. Code Editor
   ├─ Ver código MQL5
   ├─ Copiar al portapapeles
   └─ Descargar archivo
   ↓
5. Backtest
   ├─ Descargar datos históricos
   ├─ Simular operaciones
   └─ Calcular métricas
   ↓
6. Resultados
   ├─ 5 métricas principales
   ├─ Gráfico equity curve
   ├─ Tabla de operaciones
   └─ Guardar bot
   ↓
7. Mis Bots
   └─ Administrar bots guardados
```

---

## 🛠️ Stack Tecnológico

### Backend
```
FastAPI (Async Web Framework)
├─ Groq API (LLM para código)
├─ yfinance (Datos históricos)
├─ Pydantic (Validación)
└─ SQLAlchemy (ORM)
```

### Frontend
```
React 18 (UI Library)
├─ React Router (Navegación)
├─ TypeScript (Type Safety)
├─ Tailwind CSS (Estilos)
├─ Vite (Bundler)
├─ Axios (HTTP Client)
└─ Chart.js (Gráficos)
```

---

## 📊 Endpoints Disponibles (23 Total)

### Generate Endpoints
```
POST   /api/generate/bot          → Generar código MQL5
POST   /api/generate/refine       → Refinar código si hay errores
GET    /api/generate/indicators   → Listar indicadores disponibles
GET    /api/generate/strategies   → Listar estrategias
GET    /api/generate/symbols      → Listar símbolos
GET    /api/generate/timeframes   → Listar timeframes
```

### Backtest Endpoints
```
POST   /api/backtest/run          → Ejecutar backtest
GET    /api/backtest/demo         → Demo data (sin API key)
```

### Bots Endpoints
```
GET    /api/bots/list             → Listar bots guardados
POST   /api/bots/create           → Crear bot
GET    /api/bots/{id}             → Obtener bot por ID
PUT    /api/bots/{id}             → Actualizar bot
DELETE /api/bots/{id}             → Eliminar bot
```

### Results Endpoints
```
GET    /api/results/list          → Listar resultados
POST   /api/results/save          → Guardar resultado
GET    /api/results/{id}          → Obtener resultado
DELETE /api/results/{id}          → Eliminar resultado
GET    /api/results/stats/summary → Estadísticas agregadas
```

---

## 🎨 Componentes Frontend

| Componente | Descripción | Líneas |
|-----------|-------------|--------|
| **Dashboard.tsx** | Página principal con opciones | 120 |
| **BotWizard.tsx** | 4-step wizard para crear bots | 253 |
| **CodeEditor.tsx** | Visualizador de código MQL5 | 178 |
| **BacktestResults.tsx** | Resultados con gráficos y métricas | 200 |
| **BotList.tsx** | Tabla de bots guardados | 200 |

---

## 🏗️ Estructura del Proyecto

```
trading-ia-bot/
├── backend/                      (FastAPI Server)
│   ├── app/
│   │   ├── main.py              # Entry point
│   │   ├── config.py            # Configuration
│   │   ├── routes/              # API Endpoints
│   │   │   ├── generate.py      # Generación de código
│   │   │   ├── backtest.py      # Ejecución de backtest
│   │   │   ├── bots.py          # CRUD de bots
│   │   │   └── results.py       # Gestión de resultados
│   │   └── services/            # Business Logic
│   │       ├── groq_service.py  # Integración Groq
│   │       └── backtest_engine.py # Motor de simulación
│   ├── requirements.txt          # Dependencias Python
│   ├── .env.example             # Template de env
│   └── venv/                    # Entorno virtual
│
├── frontend/                     (React + Vite)
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BotWizard.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── BacktestResults.tsx
│   │   │   └── BotList.tsx
│   │   ├── services/
│   │   │   └── api.ts           # Cliente HTTP
│   │   ├── context/
│   │   │   └── AppContext.tsx   # Estado global
│   │   ├── App.tsx              # Routing
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Estilos globales
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── docs/                         (Documentación)
│   ├── README.md                # Este archivo
│   ├── QUICK_START.md           # Guía de inicio
│   ├── PROJECT_STRUCTURE.md     # Arquitectura
│   ├── API_ENDPOINTS.md         # Especificación API
│   └── ...más documentación
│
└── install.ps1                  # Script instalación
```

---

## 🔐 Obtener GROQ_API_KEY

1. Ve a: https://console.groq.com
2. Login con Google (sin credencial requerida)
3. En el Dashboard, click en "API Keys"
4. Click "Create New Key"
5. Copia la key (comienza con `gsk_`)
6. Pégala en `backend/.env`:
   ```
   GROQ_API_KEY=gsk_tu_api_key_aqui
   ```

**El tier gratuito de Groq incluye:**
- ✅ Modelo mixtral-8x7b-32768 gratis
- ✅ 30 requests por minuto
- ✅ Generación completa de código

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/health
```

### Documentación Interactiva
```
http://localhost:8000/docs        # Swagger UI
http://localhost:8000/redoc       # ReDoc
```

### Frontend Tests (próximos pasos)
```bash
cd frontend
npm run test
```

---

## 🐛 Troubleshooting

### "GROQ_API_KEY not configured"
```
Solución: Configura la key en backend/.env
Ver sección "Obtener GROQ_API_KEY" arriba
```

### "Can't connect to backend"
```
Solución:
1. Verifica puerto 8000: http://localhost:8000/health
2. Revisa CORS en backend/app/main.py
3. Reinicia ambos servicios
```

### "npm command not found"
```
Solución: Instala Node.js desde https://nodejs.org/
```

### "ModuleNotFoundError" (Python)
```
Solución:
cd backend
pip install -r requirements.txt --upgrade
```

---

## 📚 Recursos Útiles

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **Groq Console**: https://console.groq.com/
- **MQL5 Documentation**: https://www.mql5.com/en/docs
- **Tailwind CSS**: https://tailwindcss.com/

---

## 🎓 Aprende a Usar

1. **Principiante**: Sigue [QUICK_START.md](./QUICK_START.md)
2. **Intermedio**: Lee [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. **Avanzado**: Explora el código fuente y personaliza

---

## 🚀 Deployment

### Frontend
- **Vercel** (Recomendado)
- **Netlify**
- **GitHub Pages**

### Backend
- **Railway** (Recomendado)
- **Render**
- **AWS Lambda**

Ver [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) para instrucciones detalladas.

---

## 📄 Licencia

MIT License - Libre para usar, modificar y distribuir.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

## 💡 Ideas Futuras

- [ ] Base de datos persistente (SQLite/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Histórico de backtest
- [ ] Compartir estrategias
- [ ] Marketplace de bots
- [ ] Trading live (conexión a broker)
- [ ] Alertas y notificaciones
- [ ] API pública

---

## 📞 Soporte

Si tienes dudas o problemas:
1. Revisa la documentación
2. Consulta la sección Troubleshooting
3. Abre un issue en GitHub

---

## 🎉 ¡Listo para Comenzar?

```powershell
.\install.ps1 -All
```

Luego abre: **http://localhost:5173**

**¡Crea tu primer bot de trading con IA ahora mismo!** 🚀
4. Selecciona timeframe (H1, M15, etc.)
5. Selecciona estrategia (Tendencia, Reversión, etc.)
6. Click **"✨ Generar Bot"** → IA genera código MQL5
7. Click **"📊 Ejecutar Backtest"** → Simula los últimos 5 años
8. Ver resultados y métricas
9. **"💾 Guardar Bot"** → Guardado en base de datos

---

## 🏗️ Estructura Carpetas

```
trading-ia-bot/
├── frontend/          # React app
├── backend/           # FastAPI
├── docs/              # Documentación
├── README.md
└── PROJECT_STRUCTURE.md
```

Ver `PROJECT_STRUCTURE.md` para detalles completos.

---

## 🔧 Configuración Entorno

### backend/.env
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
DATABASE_URL=sqlite:///./database.db
SERVER_PORT=8000
```

---

## 📡 Endpoints API

- `POST /api/generate/bot` - Generar bot con Groq
- `POST /api/backtest/run` - Ejecutar backtest
- `GET /api/bots/list` - Listar bots guardados
- `POST /api/bots/create` - Guardar nuevo bot
- `GET /api/generate/indicators` - Indicadores disponibles
- `GET /api/generate/symbols` - Símbolos disponibles
- `GET /api/generate/strategies` - Estrategias disponibles
- `GET /api/generate/timeframes` - Timeframes disponibles

---

## ⚙️ Tecnologías

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Chart.js

### Backend
- FastAPI
- Python 3.11
- Groq API (IA)
- yfinance (datos)
- SQLite

### APIs Externas
- **Groq** - Generación de código MQL5
- **yfinance** - Datos históricos
- **GitHub** - Version control

---

## 🚀 Deploy

### Frontend (GitHub Pages)
```bash
cd frontend
npm run deploy
```

### Backend (Railway/Render)
```bash
1. Push a GitHub
2. Conectar Railway/Render
3. Agregar GROQ_API_KEY
4. Deploy automático
```

---

## 🐛 Troubleshooting

**"ModuleNotFoundError: No module named 'fastapi'"**
```bash
pip install -r requirements.txt
```

**"Error connecting to Groq API"**
1. Verificar GROQ_API_KEY en .env
2. Verificar que la API Key es válida

**"CORS error"**
1. Asegurar Backend ejecutándose en puerto 8000
2. Frontend en puerto 5173

---

## 📚 Documentación Completa

Ver `PROJECT_STRUCTURE.md` para:
- Arquitectura detallada
- Flujo completo de usuario
- Stack tecnológico
- Endpoints con ejemplos JSON
- Instalación paso a paso
- Deployment a producción

---

## 📝 Licencia

MIT

---

**Versión:** 1.0.0  
**Última actualización:** 12 de noviembre de 2025

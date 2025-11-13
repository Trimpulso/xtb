# Trading IA Bot Generator 🤖

**Generador automático de bots de trading con IA**

[![Python 3.9+](https://img.shields.io/badge/Python-3.9%2B-blue)](https://www.python.org/)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-brightgreen)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18-blue)](https://react.dev/)

---

## ⚡ Quick Start (10-15 minutos)

```bash
# 1. Clonar
git clone https://github.com/Trimpulso/xtb.git
cd xtb/trading-ia-bot

# 2. Instalar (automático)
.\install.ps1 -All                    # Windows
chmod +x install.sh && ./install.sh -all  # macOS/Linux

# 3. Configurar (agrega tu GROQ_API_KEY)
# Edita: backend/.env

# 4. Ejecutar (dos terminales)
# Terminal 1:
cd backend
python -m uvicorn app.main:app --reload

# Terminal 2:
cd frontend
npm run dev

# 5. Abrir
# http://localhost:5173
```

---

## 📚 Documentación

| Documento | Propósito |
|-----------|----------|
| **[START_HERE.md](trading-ia-bot/START_HERE.md)** | 👈 **Empieza aquí** - Guía de navegación |
| [EXECUTE_FROM_GITHUB.md](trading-ia-bot/EXECUTE_FROM_GITHUB.md) | Paso a paso detallado |
| [VISUAL_GUIDE.md](trading-ia-bot/VISUAL_GUIDE.md) | Ejemplos con output real |
| [QUICK_REFERENCE.md](trading-ia-bot/QUICK_REFERENCE.md) | Referencia rápida |
| [PROJECT_STRUCTURE.md](trading-ia-bot/PROJECT_STRUCTURE.md) | Arquitectura técnica |

---

## 🎯 ¿Qué hace?

1. **Genera código MQL5** automáticamente usando IA (Groq API)
2. **Backtests estrategias** con 5 años de datos reales
3. **Calcula 5 métricas** financieras profesionales:
   - Total Return (%)
   - Sharpe Ratio
   - Max Drawdown
   - Win Rate
   - Profit Factor
4. **Guarda bots** para reutilizar después

---

## 🛠️ Stack Técnico

| Componente | Tecnología |
|-----------|-----------|
| Backend | FastAPI (Python) |
| Frontend | React 18 + TypeScript |
| Bundler | Vite |
| Estilos | Tailwind CSS |
| HTTP Client | Axios |
| Gráficos | Chart.js |
| IA | Groq API |
| Datos | yfinance |
| Build Tool | Vite |

---

## 📋 Requisitos

- **Git** 2.30+
- **Python** 3.9+
- **Node.js** 18+
- **GROQ_API_KEY** (gratis en https://console.groq.com)

---

## 🚀 Características

✅ Generación IA de código MQL5 profesional
✅ Backtesting con datos reales
✅ 5 métricas financieras
✅ Interfaz moderna y responsive
✅ Guardado de estrategias
✅ Instalación automática
✅ Cross-platform (Windows/macOS/Linux)
✅ 100% documentado
✅ Listo para producción

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Archivos | 79 |
| Líneas de código | 5,300+ |
| Endpoints | 23 |
| Componentes | 5 |
| Documentación | 12+ archivos |
| Tiempo de setup | 10-15 minutos |

---

## 🔑 Configuración Clave

### GROQ_API_KEY

1. Ve a: https://console.groq.com
2. Login con Google
3. Copia tu API Key
4. Agrega a `backend/.env`:
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxx
   ```

**Es gratis** - 30 requests/minuto (suficiente para personal)

---

## 📁 Estructura

```
trading-ia-bot/
├── START_HERE.md ⭐
├── EXECUTE_FROM_GITHUB.md
├── VISUAL_GUIDE.md
├── QUICK_REFERENCE.md
├── install.ps1 (Windows)
├── install.sh (macOS/Linux)
├── backend/
│   ├── app/main.py (FastAPI)
│   ├── app/routes/ (23 endpoints)
│   ├── app/services/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/components/ (5 componentes)
│   ├── src/services/api.ts (17 métodos)
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── docs/
```

---

## 🎓 Flujo de Usuario

1. **Dashboard** - 3 opciones principales
2. **Crear Bot** - 4 pasos (indicadores → símbolo → timeframe → estrategia)
3. **Generar** - IA genera código MQL5
4. **Code Editor** - Ver/copiar/descargar código
5. **Backtest** - Simular estrategia
6. **Resultados** - Ver 5 métricas + gráficos
7. **Guardar** - Bot guardado en "Mis Bots"
8. **Reutilizar** - Editar o eliminar bots guardados

---

## 🆘 ¿Problemas?

Consulta **[VISUAL_GUIDE.md](trading-ia-bot/VISUAL_GUIDE.md)** - tiene soluciones para:
- Port 8000 ya en uso
- GROQ_API_KEY no configurada
- ModuleNotFoundError
- Cannot connect to backend
- Y más...

---

## 📞 Soporte

- **Documentación**: Todos los .md en `trading-ia-bot/`
- **Issues**: Abre un issue en GitHub
- **Setup**: Lee START_HERE.md

---

## ✅ Verificación

Después de ejecutar, deberías ver:

```
✓ Terminal 1: "Application startup complete" (Puerto 8000)
✓ Terminal 2: "Local: http://localhost:5173"
✓ Navegador: Trading IA Bot Generator (funciona!)
```

---

## 🎉 ¡Listo!

**Desde cero a funcionando: 10-15 minutos**

1. Lee [START_HERE.md](trading-ia-bot/START_HERE.md)
2. Elige un documento según tu necesidad
3. Sigue los pasos
4. ¡Disfruta!

---

## 📝 Licencia

Uso personal / Educativo

---

## 🚀 Actualizado

**Última versión**: 1.0.0
**Fecha**: 12 de noviembre de 2025
**Estado**: ✅ Producción

---

**¡Gracias por usar Trading IA Bot Generator! 🎊**

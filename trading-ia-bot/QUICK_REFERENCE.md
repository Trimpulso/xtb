# 🎯 RESUMEN EJECUTIVO - CÓMO EJECUTAR DESDE GITHUB

## ⚡ 3 Pasos Super Rápidos

```bash
# 1. Clonar
git clone https://github.com/Trimpulso/xtb.git
cd xtb/trading-ia-bot

# 2. Instalar automático
./install.ps1 -All          # Windows
# o
./install.sh -all           # macOS/Linux

# 3. Ejecutar (2 terminales)
Terminal 1: cd backend && python -m uvicorn app.main:app --reload
Terminal 2: cd frontend && npm run dev

# Abrir: http://localhost:5173
```

---

## 📚 Elige tu Documento

| Necesidad | Documento | Tiempo |
|-----------|-----------|--------|
| Solo ejecutar | `EXECUTE_FROM_GITHUB.md` | 15 min |
| Con ejemplos visuales | `VISUAL_GUIDE.md` | 20 min |
| Entender todo | `START_HERE.md` | 10 min |
| Detalles técnicos | `PROJECT_STRUCTURE.md` | 30 min |
| Resumen corto | Este archivo | 5 min |

---

## ✅ Lo que Necesitas

- ✅ Git (https://git-scm.com/)
- ✅ Python 3.9+ (https://www.python.org/)
- ✅ Node.js 18+ (https://nodejs.org/)
- ✅ GROQ_API_KEY (gratis en https://console.groq.com)

---

## 🚀 Flujo Completo

```
GitHub Clone
    ↓
./install.ps1 -All
    ↓
Obtener GROQ_API_KEY
    ↓
Editar backend/.env
    ↓
Terminal 1: Backend en puerto 8000
Terminal 2: Frontend en puerto 5173
    ↓
http://localhost:5173
    ↓
¡APP FUNCIONANDO! 🎉
```

---

## 🔑 Configuración Crítica

**Obtener GROQ_API_KEY:**
1. https://console.groq.com
2. Login con Google
3. Dashboard → API Keys → Create New Key
4. Copiar key (gsk_xxxxx)
5. Editar `backend/.env`
6. Pegar: `GROQ_API_KEY=gsk_xxxxx`

---

## 📊 Proyecto Completo

```
79 archivos | 5,300+ líneas | 23 endpoints | 5 componentes
100% Completado | 100% Documentado | 100% Listo para GitHub
```

---

## 🎯 Pasos Exactos Windows

```powershell
# 1. Abrir PowerShell (Administrador)
# 2. Navegar
cd C:\tu-carpeta

# 3. Clonar
git clone https://github.com/Trimpulso/xtb.git

# 4. Entrar
cd xtb\trading-ia-bot

# 5. Instalar
.\install.ps1 -All

# 6. Configurar (Editar backend\.env)
GROQ_API_KEY=gsk_xxxxx

# 7. Terminal 1 (Backend)
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --port 8000

# 8. Terminal 2 (Frontend)
cd frontend
npm run dev

# 9. Navegador
http://localhost:5173
```

---

## 🎯 Pasos Exactos macOS/Linux

```bash
# 1. Abrir Terminal
# 2. Navegar
cd ~/Documents

# 3. Clonar
git clone https://github.com/Trimpulso/xtb.git

# 4. Entrar
cd xtb/trading-ia-bot

# 5. Instalar
chmod +x install.sh
./install.sh -all

# 6. Configurar (Editar backend/.env)
nano backend/.env
# GROQ_API_KEY=gsk_xxxxx

# 7. Terminal 1 (Backend)
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000

# 8. Terminal 2 (Frontend)
cd frontend
npm run dev

# 9. Navegador
http://localhost:5173
```

---

## 📊 Arquitectura Simplificada

```
Tu Máquina
    ├─ Backend (Puerto 8000)
    │   └─ 23 endpoints REST
    ├─ Frontend (Puerto 5173)
    │   └─ 5 componentes React
    └─ Navegador
        └─ http://localhost:5173
```

---

## 🔍 Verificar que Funciona

```
http://localhost:8000/health        ✓ Backend OK
http://localhost:8000/docs          ✓ API Documentation
http://localhost:5173               ✓ Frontend OK
```

---

## ⏱️ Tiempos

| Paso | Tiempo |
|------|--------|
| Clonar desde GitHub | 1-2 min |
| Instalar | 2-3 min |
| Configurar API Key | 2-5 min |
| Ejecutar | 1 min |
| **TOTAL** | **6-11 min** |

**¡Con 10 minutos tienes TODO FUNCIONANDO!**

---

## 🆘 Errores Comunes

### "git: command not found"
Instala Git desde https://git-scm.com/

### "python: command not found"
Instala Python desde https://www.python.org/

### "Cannot connect to backend"
Verifica que terminal 1 esté corriendo y muestre "Application startup complete"

### "GROQ_API_KEY not configured"
Edita backend/.env y configura tu API Key

---

## ✨ ¿Qué Hace la App?

1. **Creas un Bot** (4 pasos del wizard)
2. **IA genera código MQL5** (Groq)
3. **Ejecutas Backtest** (simula)
4. **Ves Resultados** (gráficos + métricas)
5. **Guardas Bot** (reutiliza después)

---

## 📚 Documentos en Orden

1. **START_HERE.md** ← Punto de entrada
2. **EXECUTE_FROM_GITHUB.md** ← Paso a paso
3. **VISUAL_GUIDE.md** ← Con ejemplos
4. **README.md** ← Overview
5. **PROJECT_STRUCTURE.md** ← Técnico

---

## 🎉 ¡Listo!

```
git clone → install → configure → execute → enjoy
```

**Tiempo total:** 10 minutos ⏱️

**Resultado:** App funcionando en http://localhost:5173 ✅

---

**Repositorio:** https://github.com/Trimpulso/xtb  
**Versión:** 1.0.0  
**Estado:** Producción ✅

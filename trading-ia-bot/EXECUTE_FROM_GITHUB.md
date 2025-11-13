# 🚀 CLONAR Y EJECUTAR DESDE GITHUB

## 📋 Resumen Rápido

```bash
# 1. Clonar repositorio
git clone https://github.com/Trimpulso/xtb.git
cd xtb/trading-ia-bot

# 2. Ejecutar instalación automática
# Windows:
.\install.ps1 -All

# macOS/Linux:
bash install.sh -all

# 3. ¡Listo! Abre http://localhost:5173
```

---

## 📥 PASO 1: CLONAR EL REPOSITORIO

### Para Windows (PowerShell)

```powershell
# Crear carpeta para proyectos (opcional)
mkdir C:\Mis-Proyectos
cd C:\Mis-Proyectos

# Clonar el repositorio
git clone https://github.com/Trimpulso/xtb.git

# Entrar en la carpeta del proyecto
cd xtb\trading-ia-bot

# Ver lo que se clonó
ls -la
```

**Output esperado:**
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        12/11/2025      2:30 PM                backend
d-----        12/11/2025      2:30 PM                frontend
d-----        12/11/2025      2:30 PM                docs
-a----        12/11/2025      2:30 PM          1234 README.md
-a----        12/11/2025      2:30 PM          5678 QUICK_START.md
-a----        12/11/2025      2:30 PM          2134 install.ps1
```

### Para macOS/Linux (Bash)

```bash
# Crear carpeta para proyectos (opcional)
mkdir ~/Proyectos
cd ~/Proyectos

# Clonar el repositorio
git clone https://github.com/Trimpulso/xtb.git

# Entrar en la carpeta del proyecto
cd xtb/trading-ia-bot

# Ver lo que se clonó
ls -la
```

---

## 🔑 PASO 2: OBTENER GROQ API KEY (OBLIGATORIO)

### ¿Por qué? 
El proyecto genera código MQL5 usando IA (Groq), y necesita una API Key.

### Pasos:

1. **Abre en navegador:**
   ```
   https://console.groq.com
   ```

2. **Login con Google:**
   - Click en "Sign in with Google"
   - NO necesitas crear cuenta nueva
   - Solo autoriza acceso a Groq

3. **Obtén tu API Key:**
   - En el Dashboard, busca "API Keys"
   - Click en "Create New Key"
   - Copia la key (empieza con `gsk_`)
   - **GUÁRDALA EN UN LUGAR SEGURO**

4. **¿Gratis?**
   - ✅ SÍ, tier gratuito incluye:
     - 30 requests/minuto
     - Acceso a mixtral-8x7b-32768
     - 100% funcional para pruebas

---

## ⚙️ PASO 3: INSTALACIÓN AUTOMÁTICA

### Windows (PowerShell)

```powershell
# Asegúrate de estar en la carpeta del proyecto
cd xtb\trading-ia-bot

# Ejecutar script de instalación
.\install.ps1 -All
```

**¿Qué hace este script?**
- ✓ Crea entorno virtual Python
- ✓ Instala dependencias backend
- ✓ Instala dependencias frontend (npm)
- ✓ Crea archivo .env
- ✓ Te pide que pegues tu GROQ_API_KEY

**Output esperado:**
```
🔧 INSTALANDO BACKEND...
Creando entorno virtual...
Activando entorno virtual existente...
Instalando paquetes Python...
Creando archivo .env...
⚠️  Debes actualizar GROQ_API_KEY en C:\ruta\backend\.env

🎨 INSTALANDO FRONTEND...
Instalando paquetes npm...
npm notice it worked if it ends with ok

✨ INSTALACIÓN COMPLETADA
════════════════════════════════════════════════════════════════
```

### macOS/Linux (Bash)

```bash
# Asegúrate de estar en la carpeta del proyecto
cd xtb/trading-ia-bot

# Dar permisos de ejecución
chmod +x install.sh

# Ejecutar script de instalación
./install.sh -all
```

---

## 🔒 PASO 4: CONFIGURAR GROQ_API_KEY

### Localizar archivo .env

**Windows:**
```
C:\tu-ruta\xtb\trading-ia-bot\backend\.env
```

**macOS/Linux:**
```
~/tu-ruta/xtb/trading-ia-bot/backend/.env
```

### Editar archivo .env

El archivo debe verse así:
```
# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURACIÓN DEL BACKEND - Trading IA Bot
# ═══════════════════════════════════════════════════════════════════════════════

# GROQ API Key (obtener en https://console.groq.com)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Database
DATABASE_URL=sqlite:///./database.db

# Server
SERVER_PORT=8000
DEBUG=true
```

### ¿Cómo conseguir la API Key?
1. Ve a https://console.groq.com
2. Dashboard → API Keys
3. Copia tu key
4. Pégala en GROQ_API_KEY=gsk_xxxxx

---

## 🎯 PASO 5: EJECUTAR EL PROYECTO

### Opción A: Automática (Recomendado)

**Windows:**
```powershell
# Desde la carpeta del proyecto
cd xtb\trading-ia-bot

# Ejecutar todo en una sola línea
powershell -Command "Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd xtb\trading-ia-bot\backend; python -m uvicorn app.main:app --reload --port 8000'" ; Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd xtb\trading-ia-bot\frontend; npm run dev'
```

O más simple, **abre DOS terminales:**

### Terminal 1: Backend

**Windows (PowerShell):**
```powershell
cd xtb\trading-ia-bot\backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --port 8000
```

**macOS/Linux (Bash):**
```bash
cd xtb/trading-ia-bot/backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

**Output esperado:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Terminal 2: Frontend

**Windows (PowerShell):**
```powershell
cd xtb\trading-ia-bot\frontend
npm run dev
```

**macOS/Linux (Bash):**
```bash
cd xtb/trading-ia-bot/frontend
npm run dev
```

**Output esperado:**
```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

---

## 🌐 PASO 6: ABRIR EN NAVEGADOR

Abre tu navegador favorito y ve a:

```
http://localhost:5173
```

**¿Qué deberías ver?**

```
🤖 Trading IA Bot Generator

Crea bots de trading automáticamente con Inteligencia Artificial

┌─────────────────┬──────────────────┬─────────────────┐
│  ✨ Crear Bot   │  📊 Backtest     │  💾 Mis Bots    │
│   Genera EA     │   Simula datos   │   Administra    │
│   con IA        │   históricos     │   guardados     │
└─────────────────┴──────────────────┴─────────────────┘

Estadísticas:
  🤖 Bots Generados: 0
  📊 Backtests: 0
  💾 Bots Guardados: 0
  📈 Retorno Promedio: 0%
```

---

## ✅ VERIFICAR QUE TODO FUNCIONA

### 1. Verificar Backend

Abre en navegador:
```
http://localhost:8000/health
```

Deberías ver:
```json
{
  "status": "online",
  "service": "Trading IA Bot API",
  "version": "1.0.0"
}
```

### 2. Verificar API Documentation

Abre en navegador:
```
http://localhost:8000/docs
```

Deberías ver Swagger UI con todos los 23 endpoints.

### 3. Crear Primer Bot

En http://localhost:5173:
1. Click en "✨ Crear Bot"
2. Selecciona indicadores
3. Selecciona símbolo
4. Selecciona timeframe
5. Selecciona estrategia
6. Click "Generar Bot"
7. ¡Verás código MQL5 generado por IA!

---

## 🔄 FLUJO COMPLETO DE USUARIO

```
Abrir http://localhost:5173
        ↓
    Dashboard
        ↓
   ┌────┴────────────────────┐
   │                          │
   ↓                          ↓
Crear Bot              Mis Bots
   │                    │
   ↓                    ↓
BotWizard       Ver bots guardados
   │
   ├─ Paso 1: Indicadores
   ├─ Paso 2: Símbolo
   ├─ Paso 3: Timeframe
   └─ Paso 4: Estrategia
   │
   ↓
Code Editor (Groq API genera código)
   │
   ├─ Ver código MQL5
   ├─ Copiar
   ├─ Descargar
   └─ Ejecutar Backtest
   │
   ↓
Backtest (yfinance descarga datos, simula)
   │
   ├─ 5 métricas calculadas
   ├─ Gráfico equity curve
   ├─ Tabla de operaciones
   └─ Guardar Bot
   │
   ↓
Bot guardado en "Mis Bots"
```

---

## 📊 ARQUITECTURA DESDE GITHUB

```
GitHub (https://github.com/Trimpulso/xtb)
    ↓
git clone
    ↓
Tu Computadora
    │
    ├─ Backend (Puerto 8000)
    │   ├─ FastAPI Server
    │   ├─ Groq API Integration
    │   ├─ Backtest Engine
    │   └─ 23 Endpoints REST
    │
    ├─ Frontend (Puerto 5173)
    │   ├─ React 18
    │   ├─ 5 Componentes
    │   └─ Tailwind CSS
    │
    └─ Navegador (http://localhost:5173)
        └─ ¡Tu app funcionando!
```

---

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE:**

1. **Nunca commits `.env`**
   - El .gitignore ya lo protege
   - Tu GROQ_API_KEY nunca se sube a GitHub

2. **Credenciales locales**
   - Solo existen en tu máquina
   - No compartir con nadie

3. **En producción**
   - Usar variables de entorno del servidor
   - Usar services como Railway, Vercel

---

## 🆘 Troubleshooting

### Error: "git: command not found"
```
Solución: Instalar Git desde https://git-scm.com/
```

### Error: "python: command not found"
```
Solución: Instalar Python desde https://www.python.org/
```

### Error: "npm: command not found"
```
Solución: Instalar Node.js desde https://nodejs.org/
```

### Error: "GROQ_API_KEY not configured"
```
Solución:
1. Ir a https://console.groq.com
2. Obtener tu API Key
3. Editar backend/.env
4. Pegar: GROQ_API_KEY=gsk_xxxxx
5. Guardar y reiniciar backend
```

### Error: "Cannot connect to backend (port 8000)"
```
Solución:
1. Verificar que backend está corriendo
2. Ver http://localhost:8000/health
3. Si da error, reiniciar backend
4. Verificar GROQ_API_KEY configurada
```

### Error: "Webpack compilation failed"
```
Solución:
1. Ir a carpeta frontend
2. Eliminar node_modules: rm -rf node_modules
3. Reinstalar: npm install
4. Reiniciar: npm run dev
```

---

## 📚 Próximos Pasos

Después de clonar y ejecutar:

1. **Explora la interfaz**
   - Crea bots de prueba
   - Ejecuta backtests
   - Observa los gráficos

2. **Lee la documentación**
   - README.md - Overview
   - PROJECT_STRUCTURE.md - Arquitectura
   - INDEX.txt - Referencia rápida

3. **Personaliza**
   - Modifica componentes React
   - Agrega nuevos indicadores
   - Crea nuevas estrategias

4. **Despliega a producción**
   - Ver DEPLOYMENT.md
   - Railway (backend)
   - Vercel (frontend)

---

## 🎉 ¡Listo!

Ya tienes todo lo que necesitas para:
- ✅ Clonar desde GitHub
- ✅ Instalar automáticamente
- ✅ Ejecutar localmente
- ✅ Usar la app completamente

**¡Bienvenido a Trading IA Bot Generator!** 🚀

---

**Última actualización:** 12 de noviembre de 2025  
**Versión:** 1.0.0  
**Estado:** Producción  
**Repositorio:** https://github.com/Trimpulso/xtb

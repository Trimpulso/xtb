# 📺 GUÍA VISUAL: CÓMO EJECUTAR DESDE GITHUB

## Índice
1. [Para Windows](#windows)
2. [Para macOS](#macos)
3. [Para Linux](#linux)
4. [Flujo Completo con Ejemplos](#flujo-completo-con-ejemplos)
5. [Solución de Problemas](#solución-de-problemas)

---

## Windows

### Paso 1: Abrir PowerShell

```
Presiona: Windows + X
Selecciona: Windows PowerShell (Administrador)
```

**Verás esto:**
```
Windows PowerShell
Copyright (C) Microsoft Corporation. Todos los derechos reservados.

PS C:\Users\Tu-Usuario>
```

### Paso 2: Clonar Repositorio

```powershell
# Navegar a la carpeta donde quieres el proyecto
cd C:\Usuarios\Tu-Usuario\Documentos

# Clonar
git clone https://github.com/Trimpulso/xtb.git

# Entrar en la carpeta
cd xtb\trading-ia-bot

# Ver los archivos
ls
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

### Paso 3: Ejecutar Instalación

```powershell
# Ejecutar el script de instalación
.\install.ps1 -All
```

**Output esperado:**
```
ℹ️  Directorio del proyecto: C:\Usuarios\Tu-Usuario\Documentos\xtb\trading-ia-bot

🔧 INSTALANDO BACKEND...
Creando entorno virtual...
Activando entorno virtual existente...
Instalando paquetes Python...
Successfully installed fastapi-0.104.1 uvicorn-0.24.0 groq-0.4.1 ...
Creando archivo .env...
⚠️  Debes actualizar GROQ_API_KEY en C:\ruta\backend\.env

🎨 INSTALANDO FRONTEND...
Instalando paquetes npm...
npm notice it worked if it ends with ok

✨ INSTALACIÓN COMPLETADA
════════════════════════════════════════════════════════════════════════════════
```

### Paso 4: Configurar API Key

```powershell
# Abrir archivo .env con Notepad
notepad backend\.env
```

**Editar para que se vea así:**
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATABASE_URL=sqlite:///./database.db
SERVER_PORT=8000
DEBUG=true
```

Guarda y cierra.

### Paso 5: Ejecutar Backend

```powershell
# Terminal 1 (Backend)
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --port 8000
```

**Esperas a ver:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Paso 6: Ejecutar Frontend

```powershell
# Terminal 2 NUEVA (Frontend)
# (Abre otra ventana de PowerShell)
cd C:\tu-ruta\xtb\trading-ia-bot\frontend
npm run dev
```

**Esperas a ver:**
```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### Paso 7: Abrir en Navegador

- Abre **Chrome**, **Edge** o tu navegador favorito
- Ve a: `http://localhost:5173`
- ¡Verás la app funcionando!

---

## macOS

### Paso 1: Abrir Terminal

```
Presiona: Cmd + Espacio
Escribe: Terminal
Presiona: Enter
```

**Verás esto:**
```
usuario@MacBook-Pro ~ %
```

### Paso 2: Clonar Repositorio

```bash
# Navegar a la carpeta donde quieres el proyecto
cd ~/Documentos

# Clonar
git clone https://github.com/Trimpulso/xtb.git

# Entrar en la carpeta
cd xtb/trading-ia-bot

# Ver los archivos
ls -la
```

**Output esperado:**
```
total 256
drwxr-xr-x  12 usuario  staff   384 Nov 12 14:30 .
drwxr-xr-x   3 usuario  staff    96 Nov 12 14:30 ..
drwxr-xr-x   5 usuario  staff   160 Nov 12 14:30 backend
drwxr-xr-x   5 usuario  staff   160 Nov 12 14:30 frontend
drwxr-xr-x   3 usuario  staff    96 Nov 12 14:30 docs
-rw-r--r--   1 usuario  staff  1234 Nov 12 14:30 README.md
-rw-r--r--   1 usuario  staff  5678 Nov 12 14:30 QUICK_START.md
-rwxr-xr-x   1 usuario  staff  2134 Nov 12 14:30 install.sh
```

### Paso 3: Ejecutar Instalación

```bash
# Dar permisos de ejecución
chmod +x install.sh

# Ejecutar el script de instalación
./install.sh -all
```

**Output esperado:**
```
ℹ️  Directorio del proyecto: /Users/usuario/Documentos/xtb/trading-ia-bot

🔧 INSTALANDO BACKEND...
ℹ️  Python version: Python 3.11.5
ℹ️  Creando entorno virtual...
ℹ️  Activando entorno virtual...
✅ Backend instalado correctamente

🎨 INSTALANDO FRONTEND...
ℹ️  npm version: 10.2.0
✅ Frontend instalado correctamente

✨ INSTALACIÓN COMPLETADA
════════════════════════════════════════════════════════════════════════════════
```

### Paso 4: Configurar API Key

```bash
# Abrir archivo .env con editor de texto
nano backend/.env
```

**Editar para que se vea así:**
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATABASE_URL=sqlite:///./database.db
SERVER_PORT=8000
DEBUG=true
```

Guarda: `Ctrl + O`, `Enter`, `Ctrl + X`

### Paso 5: Ejecutar Backend

```bash
# Terminal 1 (Backend)
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

**Esperas a ver:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Paso 6: Ejecutar Frontend

```bash
# Terminal 2 NUEVA (Frontend)
# (Abre otra terminal)
cd ~/Documentos/xtb/trading-ia-bot/frontend
npm run dev
```

**Esperas a ver:**
```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### Paso 7: Abrir en Navegador

- Abre **Safari**, **Chrome** o tu navegador favorito
- Ve a: `http://localhost:5173`
- ¡Verás la app funcionando!

---

## Linux

### Paso 1: Abrir Terminal

```
Presiona: Ctrl + Alt + T
```

**Verás esto:**
```
usuario@pc:~$
```

### Paso 2: Clonar Repositorio

```bash
# Navegar a la carpeta donde quieres el proyecto
cd ~/Documentos

# Clonar
git clone https://github.com/Trimpulso/xtb.git

# Entrar en la carpeta
cd xtb/trading-ia-bot

# Ver los archivos
ls -la
```

### Paso 3: Ejecutar Instalación

```bash
# Dar permisos de ejecución
chmod +x install.sh

# Ejecutar el script de instalación
./install.sh -all
```

### Paso 4-7: Igual que macOS

---

## Flujo Completo con Ejemplos

### Scenario Real: Usuario descarga desde GitHub

```
┌─────────────────────────────────────────────────────────────────┐
│ Usuario abre GitHub: https://github.com/Trimpulso/xtb          │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Click en "Code" → "Copy" (copia URL)                           │
│ URL: https://github.com/Trimpulso/xtb.git                      │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Terminal: git clone https://github.com/Trimpulso/xtb.git       │
│                                                                  │
│ Output:                                                          │
│ Cloning into 'xtb'...                                           │
│ remote: Enumerating objects: 150, done.                         │
│ remote: Counting objects: 100% (150/150), done.                 │
│ remote: Compressing objects: 100% (120/120), done.              │
│ Receiving objects: 100% (150/150), done.                        │
│ Resolving deltas: 100% (50/50), done.                           │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Terminal: cd xtb/trading-ia-bot && ./install.ps1 -All          │
│ (o ./install.sh -all en macOS/Linux)                            │
│                                                                  │
│ Comienza instalación automática...                              │
│ • Crea entorno virtual Python                                   │
│ • Instala 10+ paquetes Python                                   │
│ • Instala 50+ paquetes npm                                      │
│ • Crea archivo .env                                             │
│ ✅ Completado en 2-3 minutos                                    │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Usuario configura: backend/.env                                 │
│ GROQ_API_KEY=gsk_xxxxxxxxxxxxx                                  │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────┬──────────────────────────────────────┐
│    Terminal 1 (Backend)  │   Terminal 2 (Frontend)              │
├──────────────────────────┼──────────────────────────────────────┤
│ cd backend               │ cd frontend                          │
│ python -m uvicorn ...    │ npm run dev                          │
│                          │                                       │
│ ✅ http://localhost:8000 │ ✅ http://localhost:5173             │
└──────────────────────────┴──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Usuario abre navegador: http://localhost:5173                   │
│                                                                  │
│ VE LA APP EN VIVO:                                              │
│ 🤖 Trading IA Bot Generator                                     │
│                                                                  │
│ ✨ Crear Bot  │  📊 Backtest  │  💾 Mis Bots                    │
│                                                                  │
│ ¡Funciona perfectamente!                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Solución de Problemas

### "command not found: git"
```bash
# Windows: Instala desde https://git-scm.com/
# macOS: brew install git
# Linux: sudo apt install git
```

### "command not found: python3"
```bash
# Ve a https://www.python.org/
# Descarga Python 3.9 o superior
# Instala
```

### "command not found: npm"
```bash
# Ve a https://nodejs.org/
# Descarga Node.js 18 o superior
# Instala (incluye npm)
```

### "ModuleNotFoundError: No module named 'fastapi'"
```bash
# En la carpeta backend:
source venv/bin/activate  # macOS/Linux
# o
.\venv\Scripts\Activate.ps1  # Windows

# Luego:
pip install -r requirements.txt
```

### "Cannot GET /health"
```bash
# Asegúrate de que backend está corriendo
# Terminal 1 debe mostrar: "Application startup complete"
# Si no, revisa que GROQ_API_KEY esté en backend/.env
```

### "Cannot connect to localhost:5173"
```bash
# Asegúrate de que frontend está corriendo
# Terminal 2 debe mostrar: "Local: http://localhost:5173"
# Si no, ejecuta: npm run dev
```

---

## Verificación Rápida

### Checklist Completo

- [ ] Git instalado: `git --version`
- [ ] Python 3.9+: `python3 --version`
- [ ] Node 18+: `npm --version`
- [ ] Repositorio clonado: `git clone ...`
- [ ] Instalación completa: `./install.ps1 -All`
- [ ] GROQ_API_KEY configurada: `backend/.env`
- [ ] Backend corriendo: http://localhost:8000/health
- [ ] Frontend corriendo: http://localhost:5173
- [ ] App visible en navegador ✅

---

## 🎉 ¡Listo!

Si ves la app en http://localhost:5173, ¡significa que FUNCIONA PERFECTAMENTE! 🚀

Ahora puedes:
- ✅ Crear bots
- ✅ Ejecutar backtests
- ✅ Ver métricas
- ✅ Guardar bots
- ✅ Explorar el código

**¡Diviértete creando bots de trading con IA!** 🤖

---

**Última actualización:** 12 de noviembre de 2025  
**Versión:** 1.0.0

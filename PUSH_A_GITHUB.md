# 🚀 SUBIR A GITHUB PASO A PASO

## ✅ ANTES DE HACER PUSH

1. **Verifica que .env NO está incluido** (debe estar en .gitignore)
2. **Verifica que node_modules NO está incluido** 
3. **Verifica que venv NO está incluido**

Si ves estos archivos listados, NO hagas push todavía.

---

## 📋 PASOS PARA SUBIR A GITHUB

### Paso 1: Configurar Git (Si es la primera vez)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 2: Inicializar repositorio (Si aún no está)

```powershell
cd c:\github\xtb
git init
git remote add origin https://github.com/Trimpulso/xtb.git
```

### Paso 3: Agregar todos los archivos

```powershell
cd c:\github\xtb
git add -A
```

### Paso 4: Verificar qué se va a subir

```powershell
git status
```

**IMPORTANTE**: Verifica que NO aparezcan:
- `.env` ❌
- `node_modules/` ❌
- `venv/` ❌
- `__pycache__/` ❌
- `.pyc` ❌

### Paso 5: Crear commit

```powershell
git commit -m "Trading IA Bot Generator - v1.0.0 - Completamente funcional y listo para ejecutar desde GitHub"
```

### Paso 6: Hacer Push

```powershell
git branch -M main
git push -u origin main
```

Si te pide usuario/contraseña, puedes:
- Usar token de GitHub (recomendado)
- O usar SSH key

---

## 🔑 USAR TOKEN DE GITHUB (Método recomendado)

### 1. Crear token en GitHub

1. Ve a: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Dale nombre: "Trading IA Bot"
4. Selecciona permisos: `repo` (full control)
5. Click "Generate token"
6. **COPIA EL TOKEN** (no podrás verlo de nuevo)

### 2. Usar el token para push

Cuando Git te pida contraseña:
```
Username: TuUsuarioGitHub
Password: (pega el token aquí)
```

---

## ⚡ COMANDOS RÁPIDOS (TODOS JUNTOS)

```powershell
cd c:\github\xtb

# Configurar git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializar
git init
git remote add origin https://github.com/Trimpulso/xtb.git

# Agregar y verificar
git add -A
git status

# Commit y push
git commit -m "Trading IA Bot Generator v1.0.0 - Completamente funcional"
git branch -M main
git push -u origin main
```

---

## ✅ VERIFICACIÓN EN GITHUB

Después de hacer push, deberías ver en GitHub:

```
https://github.com/Trimpulso/xtb/

├── trading-ia-bot/
│   ├── START_HERE.md ⭐
│   ├── EXECUTE_FROM_GITHUB.md
│   ├── VISUAL_GUIDE.md
│   ├── QUICK_REFERENCE.md
│   ├── backend/
│   ├── frontend/
│   ├── install.ps1
│   ├── install.sh
│   └── ... (otros archivos)
│
└── README.md
```

---

## 🎯 DESPUÉS DE SUBIR A GITHUB

### Para ti o cualquier usuario:

**Desde CUALQUIER computadora:**

```powershell
# 1. CLONAR
git clone https://github.com/Trimpulso/xtb.git
cd xtb/trading-ia-bot

# 2. INSTALAR (AUTOMÁTICO)
.\install.ps1 -All          # Windows
# O
chmod +x install.sh && ./install.sh -all   # macOS/Linux

# 3. CONFIGURAR
# Editar: backend/.env
# Agregar: GROQ_API_KEY=gsk_xxxxx

# 4. EJECUTAR (DOS TERMINALES)
# Terminal 1:
cd backend
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2:
cd frontend
npm run dev

# 5. ABRIR
http://localhost:5173
```

**¡LISTO EN 10-15 MINUTOS!**

---

## 🆘 PROBLEMAS COMUNES

### "fatal: repository not found"
- Verifica que la URL es correcta
- Verifica que tienes permisos en el repositorio

### "Permission denied"
- Usa HTTPS en lugar de SSH
- O configura SSH keys

### "The branch is gone. HEAD now at..."
- Normal, se actualiza el repositorio
- Continúa con normalidad

### "fatal: not a git repository"
- Asegúrate de estar en: `c:\github\xtb`
- Verifica con: `git status`

---

## 📱 VER EL REPOSITORIO EN GITHUB

Después de push:
```
https://github.com/Trimpulso/xtb
```

Verás:
- ✅ Todos los archivos
- ✅ README.md en home
- ✅ START_HERE.md para usuarios
- ✅ Instrucciones claras

---

## 🔒 SEGURIDAD - LO IMPORTANTE

**NUNCA subas a GitHub:**
- ❌ `.env` con GROQ_API_KEY
- ❌ `node_modules/` (se descarga con `npm install`)
- ❌ `venv/` (se crea con `python -m venv venv`)
- ❌ `__pycache__/` (caché de Python)
- ❌ `.pyc` (compilados Python)

**Estos están en .gitignore, así que están protegidos.**

---

## 📝 README.md RECOMENDADO PARA GITHUB

Si quieres un README en la raíz, crea `c:\github\xtb\README.md`:

```markdown
# Trading IA Bot Generator

Generador automático de bots de trading con IA.

## 🚀 Ejecutar

```bash
git clone https://github.com/Trimpulso/xtb.git
cd xtb/trading-ia-bot
.\install.ps1 -All  # Windows
# o
chmod +x install.sh && ./install.sh -all  # macOS/Linux
```

## 📚 Documentación

- **[START_HERE.md](trading-ia-bot/START_HERE.md)** - Empieza aquí
- **[EXECUTE_FROM_GITHUB.md](trading-ia-bot/EXECUTE_FROM_GITHUB.md)** - Paso a paso
- **[VISUAL_GUIDE.md](trading-ia-bot/VISUAL_GUIDE.md)** - Con ejemplos

## ⏱️ Tiempo

10-15 minutos desde cero hasta funcionando.

## 📞 Soporte

Lee la documentación en `trading-ia-bot/` para detalles completos.
```

---

## ✨ ¡LISTO!

El proyecto está 100% preparado para GitHub.

Ahora solo falta hacer:

```powershell
cd c:\github\xtb
git add -A
git commit -m "Trading IA Bot Generator v1.0.0"
git branch -M main
git push -u origin main
```

**¡Y ya estará en GitHub! 🎉**

Después, cualquiera puede clonar y ejecutar desde allí directamente.

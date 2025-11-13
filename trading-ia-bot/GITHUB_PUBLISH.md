# 🚀 INSTRUCCIONES PARA PUBLICAR EN GITHUB

## 📋 Requisitos Previos

- Git instalado: https://git-scm.com/
- Cuenta GitHub: https://github.com
- El repositorio ya existe en: https://github.com/Trimpulso/xtb

---

## 🔧 Paso 1: Preparar el Repositorio Local

### 1.1 Inicializar Git (Si aún no está)

```powershell
cd c:\github\xtb\trading-ia-bot

# Ver estado actual
git status

# Si no hay .git, inicializar:
git init
```

### 1.2 Verificar Remoto

```powershell
# Ver remoto configurado
git remote -v

# Si no hay remoto, agregarlo:
git remote add origin https://github.com/Trimpulso/xtb.git

# Verificar que se agregó correctamente:
git remote -v
```

---

## 🔒 Paso 2: Asegurar que NO Subes Secretos

### 2.1 Verificar .gitignore

```powershell
# Ver contenido de .gitignore
Get-Content .gitignore
```

**Debe incluir:**
```
# Archivos de configuración sensibles
.env
.env.local
.env.*.local

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
ENV/
env/

# Node
node_modules/
npm-debug.log*
dist/
build/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Database
*.db
database.db

# Logs
*.log
logs/
```

### 2.2 Limpiar Archivos Sensibles (Si existen)

```powershell
# Eliminar archivos sensibles del repo (pero no del disco)
git rm --cached .env
git rm --cached backend/.env
git rm --cached frontend/.env

# Confirmar cambios
git add .gitignore
git commit -m "Update .gitignore to exclude sensitive files"
```

---

## 📝 Paso 3: Agregar Cambios al Staging

```powershell
# Ver estado de archivos
git status

# Agregar todos los archivos (excepto los en .gitignore)
git add .

# Ver qué se va a subir
git status
```

**Output esperado:**
```
On branch master/main

Changes to be committed:
  new file:   frontend/src/components/Dashboard.tsx
  new file:   frontend/src/components/BotWizard.tsx
  ...más archivos
```

---

## 💬 Paso 4: Commit con Mensaje Descriptivo

```powershell
# Commit inicial
git commit -m "feat: Complete implementation of Trading IA Bot Generator

- Backend: 23 REST endpoints with FastAPI
- Frontend: 5 React components with TypeScript
- Services: Groq integration and backtest engine
- Documentation: Complete setup and API guides
- Ready for production deployment"
```

---

## 🚀 Paso 5: Push a GitHub

### 5.1 Determinar la Rama Principal

```powershell
# Ver rama actual
git branch -a

# Si estás en rama incorrecta, cambiar:
git checkout -b main  # O master, depende de tu config
```

### 5.2 Hacer Push

```powershell
# Push a la rama main/master
git push -u origin main

# O si usas master:
git push -u origin master
```

**Primera vez (requiere autenticación):**
- Opción 1: Usar GitHub CLI `gh auth login`
- Opción 2: Generar Personal Access Token (PAT)
- Opción 3: Usar SSH key

---

## 🔑 Paso 6: Autenticación en GitHub (Si es Necesario)

### Opción A: GitHub CLI (Recomendado)

```powershell
# Instalar GitHub CLI
winget install github.cli

# Autenticarse
gh auth login

# Seleccionar opciones:
# - GitHub.com
# - HTTPS
# - Yes (autorizar con navegador)
```

### Opción B: Personal Access Token

```powershell
# 1. Ve a https://github.com/settings/tokens
# 2. Click "Generate new token"
# 3. Selecciona permisos: repo, workflow
# 4. Copiar token
# 5. En terminal (cuando pida password), pega el token

# O guardar credenciales:
git config --global credential.helper store
# Luego hace push, te pide credenciales UNA SOLA VEZ
```

### Opción C: SSH Key

```powershell
# Generar SSH key (si no tienes)
ssh-keygen -t ed25519 -C "tu@email.com"

# Agregar a ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519

# Copiar clave pública a GitHub:
# 1. Ve a https://github.com/settings/keys
# 2. Click "New SSH key"
# 3. Pega el contenido de: cat ~/.ssh/id_ed25519.pub
```

---

## ✅ Paso 7: Verificar Publicación

```powershell
# Ver remoto
git remote -v

# Ver rama actual
git branch -a

# Ver último commit
git log --oneline -n 5
```

**Ir a GitHub:**
```
https://github.com/Trimpulso/xtb
```

Deberías ver todos los archivos en el repositorio.

---

## 📌 Paso 8: Crear un Release (Opcional pero Recomendado)

```powershell
# Crear tag
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial implementation"

# Push tags a GitHub
git push origin --tags
```

**En GitHub:**
1. Ve a: https://github.com/Trimpulso/xtb/releases
2. Click "Draft a new release"
3. Selecciona tag v1.0.0
4. Agrega descripción:
```
# Trading IA Bot Generator v1.0.0

## 🎉 Initial Release

### Features
- Backend: 23 REST endpoints
- Frontend: 5 React components  
- Groq AI integration
- Backtest engine with 5 metrics
- Full TypeScript support

### Setup Instructions
See QUICK_START.md

### Technologies
- FastAPI, React 18, Tailwind CSS, Vite
```
5. Click "Publish release"

---

## 🔄 Paso 9: Configurar Rama Principal (Importante)

```powershell
# En GitHub (desde navegador):
# 1. Settings → Branches
# 2. "Default branch" → Selecciona main
# 3. Click Update
```

---

## 📝 Paso 10: Agregar Documentación en GitHub

### 10.1 Crear GitHub Wiki (Opcional)

En GitHub:
1. Tab "Wiki"
2. "Create the first page"
3. Copiar contenido de tus .md

### 10.2 Agregar Topics (Etiquetas)

En GitHub:
1. Settings (repo settings, no usuario)
2. "About" section (derecha)
3. Agregar topics: `trading`, `bot`, `ai`, `fastapi`, `react`

### 10.3 Crear CONTRIBUTING.md

```powershell
# Crear archivo
New-Item -Path "CONTRIBUTING.md" -ItemType File

# Contenido:
@"
# 🤝 Contribuir al Proyecto

## Cómo Contribuir

1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/amazing-feature`
3. Commit cambios: `git commit -m 'Add amazing feature'`
4. Push a rama: `git push origin feature/amazing-feature`
5. Abre Pull Request

## Código de Conducta

Sé respetuoso y constructivo.

## Reporte de Bugs

Abre un issue con:
- Descripción del bug
- Pasos para reproducir
- Resultado esperado
- Tu entorno (OS, Python, Node versions)

## Sugerencias

Las ideas son bienvenidas. Abre un issue para discutir.
"@ | Out-File -FilePath "CONTRIBUTING.md" -Encoding UTF8

git add CONTRIBUTING.md
git commit -m "docs: Add contributing guidelines"
git push origin main
```

---

## 🎯 Paso 11: Verificación Final

### Checklist antes de publicar:

- [ ] .env NOT commiteado
- [ ] node_modules NOT commiteado
- [ ] venv NOT commiteado
- [ ] __pycache__ NOT commiteado
- [ ] *.pyc NOT commiteado
- [ ] README.md actualizado
- [ ] QUICK_START.md presente
- [ ] package.json y requirements.txt presentes
- [ ] .gitignore correcto
- [ ] Todos los archivos importantes están incluidos

### Verificación en GitHub:

```powershell
# Después de push, verifica en navegador:
# 1. https://github.com/Trimpulso/xtb
# 2. Revisa archivos: ¿Están todos?
# 3. Revisa README: ¿Se renderiza bien?
# 4. Revisa estructura: ¿Es clara?
```

---

## 📊 Paso 12: Compartir el Repositorio

Ahora puedes compartir:

```
https://github.com/Trimpulso/xtb
```

**Comparte en:**
- LinkedIn: "Acabo de publicar Trading IA Bot Generator en GitHub..."
- Twitter: "🤖 Trading bot generator con IA #MQL5 #FastAPI #React"
- Reddit: r/algotrading, r/trading, r/programming
- Discord/Telegram: Comunidades de trading/desarrollo

---

## 🔄 Paso 13: Workflow Futuro

Para próximas actualizaciones:

```powershell
# 1. Hacer cambios en archivo
code frontend/src/App.tsx

# 2. Ver cambios
git status

# 3. Agregar cambios
git add .

# 4. Commit
git commit -m "feat: Add new feature"

# 5. Push
git push origin main
```

---

## 🆘 Troubleshooting

### "fatal: not a git repository"
```powershell
# Solución:
cd c:\github\xtb\trading-ia-bot
git init
git remote add origin https://github.com/Trimpulso/xtb.git
```

### "fatal: 'origin' does not appear to be a 'git' repository"
```powershell
# Solución:
git remote -v  # Ver remoto actual
git remote remove origin
git remote add origin https://github.com/Trimpulso/xtb.git
```

### "Permission denied (publickey)"
```powershell
# Solución: Usar HTTPS en lugar de SSH
git remote set-url origin https://github.com/Trimpulso/xtb.git
git push origin main
```

### "fatal: The current branch main has no upstream branch"
```powershell
# Solución:
git push -u origin main
```

### Archivos sensibles ya subidos
```powershell
# Solución: Usar BFG Repo Cleaner
# https://rtyley.github.io/bfg-repo-cleaner/
```

---

## 📚 Recursos

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- GitHub CLI: https://cli.github.com/

---

## ✨ Resultado Final

Después de estos pasos:

✅ Tu código en GitHub  
✅ Publicado y accesible  
✅ Con documentación completa  
✅ Listo para colaboradores  
✅ Con releases y tags  

**¡Felicidades! 🎉 Tu proyecto está publicado en GitHub**

---

**Próximos Pasos:**
1. Monitorear issues y PRs
2. Responder a contribuidores
3. Actualizar regularmente
4. Agregar features nuevas
5. Deployar en producción

---

Última actualización: 12 de noviembre de 2025  
Repositorio: https://github.com/Trimpulso/xtb

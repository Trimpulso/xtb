# 🚀 START HERE - COMIENZA AQUÍ

**¿Eres nuevo aquí?** Este es tu punto de entrada. Te guiará paso a paso.

---

## 📚 Elige tu Documento según tu Necesidad

### 🎯 Opción 1: "Solo quiero ejecutar el proyecto" ⚡

**Lee esto:** [`EXECUTE_FROM_GITHUB.md`](./EXECUTE_FROM_GITHUB.md)

```
Tiempo: 15 minutos
Pasos: 7 pasos simples
Resultado: App funcionando en http://localhost:5173
```

### 🎨 Opción 2: "Quiero ver ejemplos visuales" 👀

**Lee esto:** [`VISUAL_GUIDE.md`](./VISUAL_GUIDE.md)

```
Tiempo: 20 minutos
Pasos: Con ejemplos de output real
Resultado: Entiendes exactamente qué va a suceder
```

### 🏗️ Opción 3: "Quiero entender la arquitectura" 🔍

**Lee esto:** [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)

```
Tiempo: 30 minutos
Pasos: Explicación técnica completa
Resultado: Entiendes cómo funciona internamente
```

### 📖 Opción 4: "Quiero el resumen completo" 📋

**Lee esto:** [`README.md`](./README.md)

```
Tiempo: 10 minutos
Contenido: Overview general del proyecto
Resultado: Panorama completo
```

---

## ⚡ Quick Start (3 minutos)

Si solo quieres ver la app funcionando:

### Windows
```powershell
git clone https://github.com/Trimpulso/xtb.git
cd xtb\trading-ia-bot
.\install.ps1 -All
# Luego sigue los pasos en EXECUTE_FROM_GITHUB.md
```

### macOS/Linux
```bash
git clone https://github.com/Trimpulso/xtb.git
cd xtb/trading-ia-bot
chmod +x install.sh
./install.sh -all
# Luego sigue los pasos en EXECUTE_FROM_GITHUB.md
```

---

## 📍 Mapa de Documentación

```
START_HERE.md (Este archivo)
    ↓
    ├─→ EXECUTE_FROM_GITHUB.md       (Para ejecutar paso a paso)
    ├─→ VISUAL_GUIDE.md              (Con ejemplos visuales)
    ├─→ README.md                    (Overview general)
    ├─→ PROJECT_STRUCTURE.md         (Arquitectura completa)
    ├─→ QUICK_START.md               (Instalación rápida)
    ├─→ COMPLETION_REPORT.md         (Resumen técnico)
    ├─→ GITHUB_PUBLISH.md            (Para publicar en GitHub)
    └─→ INDEX.txt                    (Índice de referencia)
```

---

## ❓ Preguntas Frecuentes

### ¿De qué trata este proyecto?

**Trading IA Bot Generator** es una aplicación que te permite:

1. **Generar código MQL5** automáticamente usando IA
   - Selecciona indicadores técnicos
   - Selecciona símbolo, timeframe, estrategia
   - IA genera código profesional automáticamente

2. **Ejecutar backtests** en datos históricos reales
   - Descarga 5 años de datos
   - Simula tu estrategia
   - Calcula 5 métricas profesionales

3. **Ver resultados** en tiempo real
   - Gráficos de equity curve
   - Tabla detallada de operaciones
   - Guardar bots para reutilizar

### ¿Necesito saber programar?

**NO.** La interfaz es 100% visual.

Pero si sabes programar, puedes:
- Modificar componentes React
- Agregar nuevos indicadores
- Crear estrategias personalizadas

### ¿Es gratis?

**SÍ, completamente.**

Solo necesitas:
- GROQ_API_KEY (gratuita en https://console.groq.com)
- Python 3.9+ (gratuito)
- Node.js (gratuito)

### ¿Debo comprar una suscripción?

**NO.** Groq tiene tier gratuito que incluye:
- 30 requests/minuto
- Acceso a modelo LLM profesional
- 100% funcional para uso personal

### ¿Cuánto tarda la instalación?

**2-3 minutos.**

El script `install.ps1` o `install.sh` hace todo automáticamente.

### ¿En qué sistemas funciona?

- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu, Debian, etc.)

### ¿Qué requisitos de hardware?

- Mínimo: 2GB RAM, 500MB disco
- Recomendado: 4GB RAM, SSD

---

## 🎯 Flujo Típico

```
1. Clonas desde GitHub
   git clone https://github.com/Trimpulso/xtb.git

2. Ejecutas instalación automática
   ./install.ps1 -All

3. Configuras GROQ_API_KEY
   Editas backend/.env

4. Ejecutas backend y frontend
   Terminal 1: python -m uvicorn app.main:app --reload
   Terminal 2: npm run dev

5. Abres en navegador
   http://localhost:5173

6. Usas la app
   Creas bots → Ejecutas backtests → Ves resultados
```

---

## 🔑 Información Crítica

### GROQ_API_KEY

**¿Qué es?**
- Credencial para usar la IA que genera código

**¿Dónde conseguirla?**
- https://console.groq.com

**¿Cómo la configuro?**
1. Ve a https://console.groq.com
2. Login con Google (sin crear cuenta)
3. Dashboard → API Keys → Create New Key
4. Copia la key
5. Edita `backend/.env`
6. Pega: `GROQ_API_KEY=gsk_xxxxx`

**¿Es gratis?**
- ✅ SÍ, tier gratuito incluye todo

### Archivos Sensibles

⚠️ **NUNCA** compartas:
- `backend/.env` (contiene GROQ_API_KEY)
- `backend/venv/` (dependencias)
- `frontend/node_modules/` (dependencias)

El `.gitignore` ya protege estos archivos, así que no te preocupes.

---

## 🎨 Stack Tecnológico

### Backend (Python)
- **FastAPI** - Framework web asíncrono
- **Groq API** - IA para generar código
- **yfinance** - Datos históricos
- **Pydantic** - Validación de datos

### Frontend (TypeScript)
- **React 18** - Librería UI
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Vite** - Bundler
- **Chart.js** - Gráficos

### DevOps
- **Git** - Control de versiones
- **GitHub** - Repositorio
- **Docker** (opcional) - Containerización

---

## 📊 Estadísticas del Proyecto

```
Archivos entregados:     79
Líneas de código:        5,300+
Endpoints API:           23
Componentes React:       5
Documentación:           12 documentos
Estado:                  100% Completado
Calidad:                 Producción
```

---

## 🚀 Próximos Pasos

### Ahora mismo:
1. Elige un documento arriba
2. Sigue los pasos
3. ¡Disfruta!

### Después de ejecutar:
1. Crea bots de prueba
2. Explora la interfaz
3. Lee la documentación técnica
4. Personaliza según tus necesidades

### En producción:
1. Despliega backend (Railway, Render)
2. Despliega frontend (Vercel, Netlify)
3. Configura dominio propio
4. ¡Comparte con amigos!

---

## 📚 Recursos Útiles

**Documentación Oficial:**
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind: https://tailwindcss.com/

**Herramientas Necesarias:**
- Git: https://git-scm.com/
- Python: https://www.python.org/
- Node.js: https://nodejs.org/
- VSCode: https://code.visualstudio.com/

**API Utilizadas:**
- Groq: https://console.groq.com/
- yfinance: https://finance.yahoo.com/

---

## 🎓 Niveles de Profundidad

### Nivel 1: Usuario (Solo usa la app)
- Leer: `EXECUTE_FROM_GITHUB.md`
- Tiempo: 15 minutos
- Resultado: App funcionando

### Nivel 2: Técnico (Entiende la arquitectura)
- Leer: `PROJECT_STRUCTURE.md`
- Tiempo: 30 minutos
- Resultado: Comprendes cómo funciona

### Nivel 3: Desarrollador (Modifica el código)
- Lee: Código fuente
- Tiempo: Variable
- Resultado: Personalizas según necesites

### Nivel 4: DevOps (Depliega en producción)
- Leer: `GITHUB_PUBLISH.md` + `PROJECT_STRUCTURE.md`
- Tiempo: 1-2 horas
- Resultado: App en vivo en internet

---

## 🆘 Necesito Ayuda

### Si no sé qué hacer:
- Lee `VISUAL_GUIDE.md` con ejemplos

### Si tengo error de instalación:
- Revisa `EXECUTE_FROM_GITHUB.md` sección "Troubleshooting"

### Si necesito entender código:
- Lee `PROJECT_STRUCTURE.md` sección "Arquitectura"

### Si quiero publicar en GitHub:
- Lee `GITHUB_PUBLISH.md`

### Si necesito más ayuda:
- Abre issue en GitHub: https://github.com/Trimpulso/xtb/issues

---

## ✅ Checklist Antes de Empezar

- [ ] Tengo Git instalado
- [ ] Tengo Python 3.9+
- [ ] Tengo Node.js 18+
- [ ] Tengo acceso a internet
- [ ] Tengo 500MB de disco libre

Si tienes todo, ¡puedes empezar! 🎉

---

## 🎉 ¡Bienvenido!

Te alegra tener este proyecto. Ahora elige un documento de arriba y ¡comienza!

```
⏰ Tiempo hasta tener app funcionando: 15 minutos
🎯 Dificultad: Muy fácil
💡 Requisito: Solo ganas de probar
```

**¿Por dónde empiezas?**

👉 Ve a: [`EXECUTE_FROM_GITHUB.md`](./EXECUTE_FROM_GITHUB.md)

---

**Última actualización:** 12 de noviembre de 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Listo para usar

---

## Documentos Disponibles en Orden

1. ⭐ **START_HERE.md** - Este archivo (Punto de inicio)
2. 📥 **EXECUTE_FROM_GITHUB.md** - Cómo clonar y ejecutar
3. 📺 **VISUAL_GUIDE.md** - Guía con ejemplos visuales
4. 📖 **README.md** - Resumen general
5. 🏗️ **PROJECT_STRUCTURE.md** - Arquitectura técnica
6. ⚡ **QUICK_START.md** - Instalación rápida
7. 📊 **COMPLETION_REPORT.md** - Resumen de entrega
8. 🌐 **GITHUB_PUBLISH.md** - Cómo publicar en GitHub
9. 📑 **INDEX.txt** - Índice de referencia

---

**¡Gracias por usar Trading IA Bot Generator!** 🚀

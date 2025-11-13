# 🚀 PUBLICAR EN GITHUB PAGES (Consumir desde GitHub)

## ¿QUÉ ES GITHUB PAGES?

GitHub Pages permite publicar sitios web directamente desde tu repositorio GitHub, **GRATIS**.

Tu aplicación estará en: `https://Trimpulso.github.io/xtb`

---

## ✅ PASOS PARA ACTIVAR GITHUB PAGES

### Paso 1: Habilitar GitHub Pages en tu repositorio

1. Ve a: https://github.com/Trimpulso/xtb
2. Settings → Pages
3. Build and deployment:
   - Source: **GitHub Actions**
   - (Deja el workflow que creamos)
4. Click "Save"

### Paso 2: El workflow se activará automáticamente

Cuando hagas push:
- GitHub Actions construye tu app
- Deploy a GitHub Pages
- URL: `https://Trimpulso.github.io/xtb`

---

## 🔧 LO QUE HICE POR TI

✅ Actualicé `vite.config.ts` con `base: '/xtb/'`
✅ Creé `.github/workflows/deploy.yml` (GitHub Actions)
✅ El workflow se ejecuta automáticamente en cada push

---

## 📋 PRÓXIMOS PASOS

### 1. Push los cambios a GitHub

```bash
cd c:\github\xtb
git add -A
git commit -m "GitHub Pages deployment setup"
git push
```

### 2. Espera 2-3 minutos

GitHub Actions está construyendo y desplegando.

Puedes ver el progreso en:
- https://github.com/Trimpulso/xtb/actions

### 3. Abre tu app en GitHub Pages

```
https://Trimpulso.github.io/xtb
```

¡Eso es! Tu app estará en línea desde GitHub.

---

## 🎯 ¿PERO CÓMO FUNCIONA SIN BACKEND?

**Buena pregunta.** El frontend se despliega en GitHub Pages, pero necesitas que el backend (API) esté en línea también.

### OPCIÓN 1 - Backend Local (Para desarrollo)
```
Frontend: https://Trimpulso.github.io/xtb (en línea)
Backend: localhost:8000 (tu computadora)
```

Esto NO funciona porque GitHub Pages no puede conectarse a tu localhost.

### OPCIÓN 2 - Backend en un servidor (Recomendado)
```
Frontend: https://Trimpulso.github.io/xtb (GitHub Pages)
Backend: https://tu-backend.onrender.com (Render, Heroku, etc)
```

Para hacer esto:
1. Deploya el backend en Render o Railway (gratis)
2. Actualiza la URL de la API en el frontend

---

## 🔄 HACER QUE FUNCIONE CON BACKEND EN LÍNEA

### Paso 1: Crear archivo de configuración

Crea: `frontend/src/config.ts`

```typescript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

### Paso 2: Usar en api.ts

En `frontend/src/services/api.ts`, en lugar de:
```typescript
const baseURL = 'http://localhost:8000/api'
```

Usa:
```typescript
import { API_BASE_URL } from '../config';
const baseURL = API_BASE_URL;
```

### Paso 3: Agregar variable de entorno a GitHub

1. Repo → Settings → Secrets and variables → Actions
2. New repository secret:
   - Name: `REACT_APP_API_URL`
   - Value: `https://tu-backend.onrender.com/api`

### Paso 4: Actualizar workflow para incluir variable

En `.github/workflows/deploy.yml`:

```yaml
env:
  REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
```

---

## 📊 OPCIONES DE BACKEND

### 1. **Render** (Recomendado - Gratis)
```
https://render.com
- Deployer FastAPI
- Gratis con límites
- URL: https://tu-app.onrender.com
```

### 2. **Railway** (También gratis)
```
https://railway.app
- Soporta Python
- Gratis con límites
```

### 3. **Heroku** (Ahora de pago)
```
https://heroku.com
- Antes era gratis
- Ahora requiere tarjeta de crédito
```

---

## 🚀 OPCIÓN MÁS SIMPLE: USAR VERCEL PARA TODO

En lugar de GitHub Pages + Render, usa **Vercel**:

1. Ve a https://vercel.com
2. Login con GitHub
3. Import tu repo
4. Vercel detecta Next.js/React
5. Deploy automático
6. URL: https://trading-ia-bot.vercel.app

**Vercel también permite usar un backend externo.**

---

## 📝 RESUMEN

| Opción | Frontend | Backend | Costo | Configuración |
|--------|----------|---------|-------|----------------|
| **GitHub Pages + Render** | GitHub Pages | Render | Gratis | Media |
| **Vercel** | Vercel | Render/Railway | Gratis | Media |
| **GitHub Pages Local** | GitHub Pages | Tu PC | Gratis | No funciona online |

---

## ✅ LO RECOMENDADO

1. **Frontend en GitHub Pages** (que acabamos de configurar)
2. **Backend en Render** (gratis)
3. **Conectar los dos** (variables de entorno)

---

## 🎯 ACCIÓN INMEDIATA

### Si solo quieres el frontend en línea (sin backend):

```bash
cd c:\github\xtb
git add -A
git commit -m "GitHub Pages setup"
git push
```

Espera 2-3 minutos y abre:
```
https://Trimpulso.github.io/xtb
```

(Nota: No funcionará porque no hay backend, pero verás la UI)

### Si quieres backend también funcionando:

1. Deploya el backend en Render
2. Configura variables de entorno en GitHub
3. Push
4. ¡Listo!

---

## 📞 ¿NECESITAS AYUDA?

1. ¿Quieres solo el frontend en GitHub Pages?
   → Haz push y abre: https://Trimpulso.github.io/xtb

2. ¿Quieres backend también?
   → Puedo configurar Render (5 minutos)

3. ¿Prefieres Vercel para todo?
   → Puedo adaptar el proyecto (5 minutos)

¿Qué prefieres?

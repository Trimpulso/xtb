#!/usr/bin/env powershell
# ═══════════════════════════════════════════════════════════════════════════════
# INSTALACIÓN AUTOMÁTICA - Trading IA Bot
# ═══════════════════════════════════════════════════════════════════════════════
# Este script instala todas las dependencias necesarias para el proyecto

param(
    [switch]$Backend = $false,
    [switch]$Frontend = $false,
    [switch]$All = $false
)

# Directorio del proyecto
$projectRoot = Split-Path -Parent $MyInvocation.MyCommandPath
Write-Host "📂 Directorio del proyecto: $projectRoot" -ForegroundColor Cyan

# Si All está activado, instalar ambos
if ($All) {
    $Backend = $true
    $Frontend = $true
}

# ═══════════════════════════════════════════════════════════════════════════════
# BACKEND
# ═══════════════════════════════════════════════════════════════════════════════

if ($Backend -or $All) {
    Write-Host "`n🔧 INSTALANDO BACKEND..." -ForegroundColor Green
    
    $backendPath = Join-Path $projectRoot "backend"
    
    # Crear entorno virtual si no existe
    if (!(Test-Path (Join-Path $backendPath "venv"))) {
        Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
        Set-Location $backendPath
        python -m venv venv
        & ".\venv\Scripts\Activate.ps1"
    } else {
        Write-Host "Activando entorno virtual existente..." -ForegroundColor Yellow
        Set-Location $backendPath
        & ".\venv\Scripts\Activate.ps1"
    }
    
    # Instalar dependencias
    Write-Host "Instalando paquetes Python..." -ForegroundColor Yellow
    pip install -r requirements.txt
    
    # Crear archivo .env si no existe
    $envFile = Join-Path $backendPath ".env"
    if (!(Test-Path $envFile)) {
        Write-Host "Creando archivo .env..." -ForegroundColor Yellow
        @"
# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURACIÓN DEL BACKEND - Trading IA Bot
# ═══════════════════════════════════════════════════════════════════════════════

# GROQ API Key (obtener en https://console.groq.com)
# Déjalo vacío si no tienes acceso aún
GROQ_API_KEY=

# Database
DATABASE_URL=sqlite:///./database.db

# Server
SERVER_PORT=8000
DEBUG=true
"@ | Out-File -FilePath $envFile -Encoding UTF8
        
        Write-Host "⚠️  Debes actualizar GROQ_API_KEY en $envFile" -ForegroundColor Yellow
    }
    
    Write-Host "✅ Backend instalado correctamente" -ForegroundColor Green
}

# ═══════════════════════════════════════════════════════════════════════════════
# FRONTEND
# ═══════════════════════════════════════════════════════════════════════════════

if ($Frontend -or $All) {
    Write-Host "`n🎨 INSTALANDO FRONTEND..." -ForegroundColor Green
    
    $frontendPath = Join-Path $projectRoot "frontend"
    Set-Location $frontendPath
    
    # Verificar si npm está instalado
    if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "❌ npm no está instalado. Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
    
    # Instalar dependencias
    Write-Host "Instalando paquetes npm..." -ForegroundColor Yellow
    npm install
    
    Write-Host "✅ Frontend instalado correctamente" -ForegroundColor Green
}

# ═══════════════════════════════════════════════════════════════════════════════
# RESUMEN
# ═══════════════════════════════════════════════════════════════════════════════

Write-Host "`n" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✨ INSTALACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Green

Write-Host "`n📋 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "1. Obtener GROQ_API_KEY: https://console.groq.com"
Write-Host "2. Actualizar backend/.env con tu API Key"
Write-Host "3. Ejecutar backend:" -ForegroundColor White
Write-Host "   cd backend && python -m uvicorn app.main:app --reload --port 8000" -ForegroundColor Yellow
Write-Host "4. En otra terminal, ejecutar frontend:" -ForegroundColor White
Write-Host "   cd frontend && npm run dev" -ForegroundColor Yellow
Write-Host "5. Abrir en navegador: http://localhost:5173" -ForegroundColor Yellow

Write-Host "`n📚 DOCUMENTACIÓN:" -ForegroundColor Cyan
Write-Host "• README.md - Quick start"
Write-Host "• PROJECT_STRUCTURE.md - Arquitectura completa"
Write-Host "• INDEX.txt - Índice de referencia"

Write-Host "`n" -ForegroundColor Green

# Script para hacer PUSH a GitHub automáticamente

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Trading IA Bot Generator - PUSH A GITHUB                 ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: No estamos en un repositorio Git" -ForegroundColor Red
    Write-Host "Debes estar en: c:\github\xtb" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Repositorio Git encontrado" -ForegroundColor Green
Write-Host ""

# Mostrar estado actual
Write-Host "📊 ESTADO ACTUAL:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Preguntar si continuar
Write-Host "¿Deseas hacer PUSH a GitHub? (s/n)" -ForegroundColor Cyan
$confirm = Read-Host

if ($confirm -ne "s") {
    Write-Host "❌ Push cancelado" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🚀 Haciendo PUSH a GitHub..." -ForegroundColor Yellow
Write-Host ""

# Hacer push
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✅ ¡PUSH EXITOSO!                                        ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu proyecto está en:" -ForegroundColor Green
    Write-Host "  https://github.com/Trimpulso/xtb" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Los usuarios pueden clonar con:" -ForegroundColor Green
    Write-Host "  git clone https://github.com/Trimpulso/xtb.git" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Error durante el PUSH" -ForegroundColor Red
    Write-Host "Verifica que tienes credenciales configuradas" -ForegroundColor Yellow
}

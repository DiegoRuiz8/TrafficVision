# Script para iniciar el Frontend
# Uso: .\setup-and-run-frontend.ps1

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         TRAFFIC VISION - FRONTEND (REACT + VITE)          ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green

$frontendPath = "C:\Users\Diego\Development\TrafficVision\frontend"

# Verificar Node.js
Write-Host "`n[1/3] Verificando Node.js..." -ForegroundColor Cyan
$nodeVersion = & node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Node.js no encontrado" -ForegroundColor Red
    Write-Host "Descarga e instala desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✓ Node.js encontrado: $nodeVersion" -ForegroundColor Green
}

# Instalar dependencias
Write-Host "`n[2/3] Instalando/actualizando dependencias..." -ForegroundColor Cyan
Set-Location $frontendPath
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
}

# Ejecutar dev server
Write-Host "`n[3/3] Levantando servidor Vite..." -ForegroundColor Cyan
Write-Host "`nFrontend estará disponible en: http://localhost:5173" -ForegroundColor Yellow
Write-Host "API Backend en: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Para detener, presiona Ctrl+C`n" -ForegroundColor Yellow

npm run dev

Write-Host "`n✓ Frontend detenido" -ForegroundColor Green

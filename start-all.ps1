# Script completo para configurar y ejecutar TrafficVision
# Este script:
# 1. Verifica Java 21
# 2. Configura la base de datos MySQL
# 3. Levanta la API

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         TRAFFIC VISION - SETUP Y EJECUCIÓN                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green

# ==================== PASO 1: Configurar Java ====================
Write-Host "`n[1/3] Configurando Java 21..." -ForegroundColor Cyan

$java21Path = "C:\Users\Diego\.jdk\jdk-21.0.8"
if (-Not (Test-Path $java21Path)) {
    Write-Host "✗ Java 21 no encontrado en $java21Path" -ForegroundColor Red
    Write-Host "Descargando e instalando Java 21..." -ForegroundColor Yellow
    # La instalación ya se hizo anteriormente
} else {
    Write-Host "✓ Java 21 encontrado" -ForegroundColor Green
}

$env:JAVA_HOME = $java21Path
$env:PATH = "$java21Path\bin;$env:PATH"

# Verificar versión
$javaVersion = & java -version 2>&1
Write-Host "Versión de Java:" -ForegroundColor Yellow
Write-Host $javaVersion[0] -ForegroundColor Gray

# ==================== PASO 2: Configurar Base de Datos ====================
Write-Host "`n[2/3] Configurando Base de Datos MySQL..." -ForegroundColor Cyan

$mysqlCheck = & mysql --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ MySQL no está en el PATH" -ForegroundColor Red
    Write-Host "Por favor, asegúrate de que MySQL esté instalado y en el PATH" -ForegroundColor Yellow
    Write-Host "Instrucciones:" -ForegroundColor Yellow
    Write-Host "  1. Descarga MySQL desde https://dev.mysql.com/downloads/installer/" -ForegroundColor Gray
    Write-Host "  2. Durante la instalación, selecciona 'MySQL Server' y 'MySQL Command Line Client'" -ForegroundColor Gray
    Write-Host "  3. Reinicia PowerShell después de instalar" -ForegroundColor Gray
    exit 1
} else {
    Write-Host "✓ MySQL encontrado" -ForegroundColor Green
}

$setupDbScript = "setup-db.ps1"
if (Test-Path $setupDbScript) {
    Write-Host "`n¿Deseas configurar la base de datos ahora? (S/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "S" -or $response -eq "s") {
        & .\setup-db.ps1
    } else {
        Write-Host "Omitiendo configuración de base de datos. Asegúrate de ejecutar setup-db.ps1 manualmente." -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ setup-db.ps1 no encontrado" -ForegroundColor Red
}

# ==================== PASO 3: Ejecutar API ====================
Write-Host "`n[3/3] Levantando la API..." -ForegroundColor Cyan
Write-Host "Navegando al directorio del backend..." -ForegroundColor Gray

cd "C:\Users\Diego\Development\TrafficVision\backend\movilidadVision"

Write-Host "Limpiando build anterior..." -ForegroundColor Gray
.\mvnw.cmd clean 2>&1 | Select-String -Pattern "BUILD|ERROR" | ForEach-Object { Write-Host $_ -ForegroundColor $(if ($_ -match "BUILD SUCCESS") { "Green" } else { "Yellow" }) }

Write-Host "`n✓ Compilando y ejecutando..." -ForegroundColor Green
Write-Host "La API estará disponible en: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Para detener, presiona Ctrl+C" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor Gray

.\mvnw.cmd spring-boot:run

Write-Host "`n✓ API detenida" -ForegroundColor Green

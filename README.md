# TrafficVision / Movilidad y Transporte

Repositorio con la solución completa para un proyecto de análisis de movilidad y tráfico.

Estructura principal

- `backend/` : Servicios y procesamiento (Java Spring Boot + scripts de procesamiento de vídeo en Python).
- `frontend/` : Interfaz web (React + Vite + Tailwind CSS).

Resumen

El proyecto permite capturar y analizar datos de cámaras (conteo de vehículos, estadísticas por cámara, etc.) y mostrarlos en un dashboard web.

En esta raíz encontrarás documentación básica y enlaces a los README específicos de cada parte.

Cómo empezar (resumen rápido)

✅ **Setup ya completado** — Ver `SETUP_COMPLETADO.md` para detalles finales.

**Opción A: Iniciar Backend (API Java)**

```powershell
$env:JAVA_HOME = 'C:\Users\Diego\.jdk\jdk-21.0.8'
cd backend\movilidadVision
.\mvnw.cmd spring-boot:run
```

API disponible en: http://localhost:8080

**Opción B: Iniciar Frontend (React)**

```powershell
cd frontend
npm install  # solo la primera vez
npm run dev
```

Frontend disponible en: http://localhost:5173

**Opción C: Todo junto (pasos manuales)**

1. Abre 2 terminales PowerShell
2. En la primera, ejecuta los comandos del Backend
3. En la segunda, ejecuta los comandos del Frontend
4. Accede a http://localhost:5173 en el navegador

**Scripts disponibles**

- `start-all.ps1` — configura todo (Java, BD, API) en un solo comando.
- `setup-db.ps1` — configura solo la base de datos MySQL.
- `setup-db.sql` — script SQL directo.
- `setup-and-run.ps1` — configura Java y ejecuta la API.

Lee los README en `backend/` y `frontend/` para instrucciones detalladas.

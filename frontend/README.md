# Movilidad y Transporte - Frontend

Frontend del proyecto construido con React, Vite y Tailwind CSS. Basado en la plantilla TailAdmin React, incluye dashboards, gráficos y componentes reutilizables.

Tecnologías

- React
- Vite
- Tailwind CSS

Requisitos

- Node.js >= 14 (se recomienda Node 16/18+)

Instalación y ejecución (desarrollo)

1. Ir al directorio del frontend:

```
cd frontend
```

2. Instalar dependencias:

```
npm install
```

3. Ejecutar servidor de desarrollo:

```
npm run dev
```

Abrir en el navegador: `http://localhost:5173` (puerto por defecto de Vite).

Scripts útiles (definidos en `package.json`)

- `npm run dev` — arranca Vite en modo desarrollo.
- `npm run build` — compila el proyecto para producción (genera `/dist`).
- `npm run preview` — sirve localmente la build de producción.

Conexión con el backend

Por defecto el frontend realiza peticiones al backend en `http://localhost:8080` (ver ejemplos en `src/pages/Dashboard.tsx`). Si tu API corre en otra URL/puerto, actualiza las llamadas `fetch(...)` o introduce una variable de entorno para la URL base (por ejemplo: `VITE_API_BASE`) y reemplaza los `fetch` por:

```js
fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8080'}/ruta`)
```

Producción

1. Generar build:

```
npm run build
```

2. Servir (por ejemplo con `serve` o mediante un servidor estático en el deployment):

```
npm run preview
```

Notas

- Si vas a desplegar en producción, revisa las llamadas al backend y añade un mecanismo de configuración centralizada (variables de entorno o archivo `.env`).


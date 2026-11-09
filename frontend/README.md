# Frontend · Monitor de Alarmas

React + Vite. Tabla de alarmas (AG Grid), importación de CSV, exportación a Excel (SheetJS) y resumen del día (Recharts).

## Instalación y ejecución

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción
```

`.env`:

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend (por defecto `http://localhost:8000`) |
| `VITE_USE_MOCK` | `true` usa datos de prueba; `false` consume el backend |

## Arquitectura

```
src/
├── api/         Única capa que habla con el backend (httpClient, alarmasService, mocks)
├── hooks/       Lógica con estado (useAlarmas, useImportarCsv, useResumenHoy, useAhora)
├── utils/       Funciones puras (duración, formatos, exportar Excel)
├── components/  Solo presentación, reciben datos por props
└── App.jsx      Coordina estado y vista
```

Flujo: `Componente → Hook → alarmasService → httpClient → API REST`

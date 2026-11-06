# Monitor de Alarmas · Frontend

Interfaz web para importar, clasificar y consultar alarmas por criticidad. Muestra las alarmas en una tabla con filtros por nivel y su duración en vivo. Permite importar un CSV, exportar a Excel lo que se está viendo y consultar un resumen del día por hora.

## Stack

- **React + Vite**
- **AG Grid Community**: tabla con orden, paginación y colores por fila
- **SheetJS (`xlsx`)**: exportación a Excel
- **Recharts**: gráfica del resumen por hora

## Ejecución

```bash
npm install
npm run dev        # http://localhost:5173
```

Variables en `.env`:

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend (por defecto `http://localhost:8000`) |
| `VITE_USE_MOCK` | `true` usa datos de prueba; `false` consume el backend |

## Arquitectura

El código está separado en capas. **Ningún componente hace peticiones HTTP directamente.**

```
src/
├── api/          Capa de datos: única que habla con el backend
│   ├── httpClient.js        fetch + manejo de errores
│   ├── alarmasService.js    listar · importarCsv · resumenHoy
│   └── mocks.js
├── hooks/        Lógica con estado (useState / useEffect)
│   ├── useAlarmas.js        carga y recarga de alarmas
│   ├── useImportarCsv.js    estado de la importación
│   ├── useResumenHoy.js     consulta del resumen del día
│   └── useAhora.js          hora actual con intervalo
├── utils/        Funciones puras, sin React
│   ├── duracion.js          ms → "2d 4h 12m"
│   ├── formatos.js          formatos compartidos por la tabla y el Excel
│   └── exportarExcel.js
├── components/   Solo presentación: reciben datos por props
│   ├── Navbar · Filtros · TablaAlarmas · Aviso
│   └── BotonImportar · BotonExportar · ResultadoImportacion · ModalResumen
└── App.jsx       Coordina: estado del filtro, datos derivados y vista
```

```
Componente → Hook → alarmasService → httpClient → API REST
```

## Funcionalidades

| Funcionalidad | Cómo funciona |
|---|---|
| Tabla | Carga `GET /alarmas`. La duración (`ahora - fecha_creacion`) se recalcula cada 30 s. Las filas se colorean según el nivel |
| Filtros | Todos / WARN / CRÍTICO / Normal, con el conteo de cada nivel. El filtrado se hace en el cliente |
| Importar CSV | Envía el archivo a `POST /alarmas/import` (`multipart/form-data`), muestra el resultado y recarga la tabla |
| Exportar Excel | Exporta las filas filtradas (todas las páginas) con los mismos formatos de la tabla |
| Resumen del día | Modal que consulta `GET /alarmas/resumen-hoy` y grafica las alarmas por hora |

## Contratos con el backend

```jsonc
// GET /alarmas
[{ "id_alarma": 4661427, "tec_2g": 0, "tec_3g": 0, "tec_4g": 100,
   "fecha_creacion": "2026-10-10T18:37:53", "municipio": "Quetame",
   "departamento": "Cundinamarca", "notificada": "N", "nivel": "NORMAL" }]

// POST /alarmas/import   (campo: archivo)
{ "insertadas": 1490, "actualizadas": 5, "rechazadas": 4,
  "errores": [{ "fila": 12, "motivo": "FECHA_CREACION inválida" }] }

// GET /alarmas/resumen-hoy
{ "fecha": "2026-11-06", "total": 37,
  "por_hora": [{ "hora": "00:00", "cantidad": 0 }, "...24 franjas"] }
```

## Decisiones

- **La criticidad (`nivel`) la calcula el backend**; el front solo la usa para filtrar, contar y colorear.
- **Filtros y paginación en el cliente**, por el volumen esperado (miles de registros).
- **La exportación usa el mismo arreglo que la tabla**, así que respeta el filtro activo.
- **Validación del CSV en el backend**; el front solo valida la extensión para dar respuesta inmediata.
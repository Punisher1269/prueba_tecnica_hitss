# Backend · API de Alarmas

FastAPI + SQLAlchemy + MySQL. Python ≥ 3.13, gestionado con [uv](https://docs.astral.sh/uv/).

## Instalación

```bash
uv sync
mysql -u root -p < SQL/create_base.sql
mysql -u root -p prueba_hitss_alertas < SQL/table_alarmas.sql
```

`.env`:

```
APP_PORT=8000
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=**nombre base de datos**
```

## Ejecución

```bash
uv run main.py     # http://localhost:8000  ·  Swagger en /docs
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/alarmas` | Lista alarmas con su nivel calculado |
| POST | `/alarmas/import` | Importa un CSV (upsert por `id_alarma`) |
| GET | `/alarmas/resumen_hoy` | Resumen del día por hora |
| GET | `/health` | Estado del servicio |

## Arquitectura

```
routers/      Endpoints HTTP
services/     Lógica de negocio (AlarmaService) y excepciones
proccessors/  Lectura/validación del CSV y regla de criticidad
models/       Modelos SQLAlchemy
schemas/      Esquemas Pydantic
settings/     Configuración (.env) y conexión a la BD
SQL/          Scripts de creación de BD y tabla
```

**Regla de criticidad:** si todas las tecnologías disponibles (2G/3G/4G ≥ 0) están en 100 y la alarma no está notificada → `WARN` si dura > 1 h, `CRITICO` si dura > 24 h; en otro caso `NORMAL`.

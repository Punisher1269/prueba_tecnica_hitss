# Monitor de Alarmas · Prueba técnica HITSS

Aplicación para importar alarmas desde CSV, clasificarlas por criticidad (`NORMAL` / `WARN` / `CRITICO`) y consultarlas.

| Carpeta | Stack | Puerto |
|---|---|---|
| [`back/`](back/README.md) | FastAPI + SQLAlchemy + MySQL | 8000 |
| [`frontend/`](frontend/README.md) | React + Vite | 5173 |

## Inicio rápido

```bash
# 1. Base de datos (MySQL)
mysql -u root -p < back/SQL/create_base.sql
mysql -u root -p prueba_hitss_alertas < back/SQL/table_alarmas.sql

# 2. Backend
cd back && uv sync && uv run main.py

# 3. Frontend (otra terminal)
cd frontend && npm install && npm run dev
```

Abrir http://localhost:5173 · Documentación de la API: http://localhost:8000/docs

## Arquitectura

```
React (UI) ──HTTP/JSON──► FastAPI (/alarmas) ──SQLAlchemy──► MySQL
```

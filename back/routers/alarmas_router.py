from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session

import io
import pandas as pd
from settings.db import get_db
from services import AlarmaService
from schemas import AlarmaOut, ResultadoImportacion


router = APIRouter()

def get_alarma_service(db: Session = Depends(get_db)) -> AlarmaService:  # noqa: B008
    return AlarmaService(db)

@router.get("", response_model=list[AlarmaOut])
def listar(service : AlarmaService = Depends(get_alarma_service)):  # noqa: B008
    "Servicio donde calculamos la criticidad segun las condiciones dadas y las devolvemos todas"
    return service.get_alerts()


@router.post("/import", response_model=ResultadoImportacion)
async def importar(file : UploadFile, service : AlarmaService = Depends(get_alarma_service)): # noqa: B008  
    
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="El archivo debe tener extensión .csv")

    contenido = await file.read()
    
    if not contenido:
        raise HTTPException(status_code=400, detail="El archivo está vacío")
    
    return service.insert_alerts(contenido)


@router.get("/resumen_hoy")
def resumen_hoy(service : AlarmaService = Depends(get_alarma_service)):  # noqa: B008
    return service.get_resumen_hora()
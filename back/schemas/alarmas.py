from datetime import date, datetime
from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field


class Nivel(str, Enum):
    CRITICO = "CRITICO"
    WARN = "WARN"
    NORMAL = "NORMAL"


class AlarmaOut(BaseModel):
    id_alarma: int
    tec_2g: int = Field(ge=-100, le=100)
    tec_3g: int = Field(ge=-100, le=100)
    tec_4g: int = Field(ge=-100, le=100)
    fecha_creacion: datetime
    municipio: str
    departamento: str
    notificada: Literal["N", "S"]
    nivel: Nivel
    
    
class ResumenOut(BaseModel):
    fecha : date
    total : int
    por_hora : list
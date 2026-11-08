from pydantic import BaseModel


class ErrorFila(BaseModel):
    fila: int
    motivo: str


class ResultadoImportacion(BaseModel):
    insertadas: int
    actualizadas: int
    rechazadas: int
    errores: list[ErrorFila]
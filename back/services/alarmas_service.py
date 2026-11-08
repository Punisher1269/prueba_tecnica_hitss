import io
from dataclasses import dataclass
from datetime import datetime, time, timedelta

from sqlalchemy import select, func, extract
from sqlalchemy.dialects.mysql import insert as mysql_insert
from sqlalchemy.orm import Session

from models import Alarma
from proccessors.clasification import calculate_level
from proccessors.csv_alarmas import _leer_y_validar
from pprint import pprint
from schemas import AlarmaOut, ResultadoImportacion, ResumenOut

# Nombre de la columna en el CSV → nombre del campo en el modelo
MAPEO_COLUMNAS = {
    "ID_ALARMA": "id_alarma",
    "2G": "tec_2g",
    "3G": "tec_3g",
    "4G": "tec_4g",
    "FECHA_CREACION": "fecha_creacion",
    "MUNICIPIO": "municipio",
    "DEPARTAMENTO": "departamento",
    "NOTIFICADA": "notificada",
}
TAMANO_LOTE = 1000
MAX_ERRORES_REPORTADOS = 100

@dataclass
class AlarmaService:
    db : Session
    
    
    def get_alerts(self) -> list[AlarmaOut]:
        
        consultas = self.db.scalars(select(Alarma).order_by(Alarma.fecha_creacion)).all()  
        ahora = datetime.now()
            
        return [
            AlarmaOut(
                id_alarma=a.id_alarma,
                tec_2g=a.tec_2g,
                tec_3g=a.tec_3g,
                tec_4g=a.tec_4g,
                fecha_creacion=a.fecha_creacion,
                municipio=a.municipio,
                departamento=a.departamento,
                notificada=a.notificada,
                nivel=calculate_level(
                    a.tec_2g, a.tec_3g, a.tec_4g, a.notificada, a.fecha_creacion, ahora
                ),
            ) for a in consultas  
        ]
        
    
    def insert_alerts(self, contenido: bytes) -> ResultadoImportacion:
       
        validas, errores, rechazadas = _leer_y_validar(contenido)

        registros = (
            validas.rename(columns=MAPEO_COLUMNAS)[list(MAPEO_COLUMNAS.values())]
            .to_dict("records")
        )
        insertadas, actualizadas = self._upsert(registros)

        return ResultadoImportacion(
            insertadas=insertadas,
            actualizadas=actualizadas,
            rechazadas=rechazadas,
            errores=errores[:MAX_ERRORES_REPORTADOS],
        )
        
    
    def _upsert(self, registros: list[dict]) -> tuple[int, int]:
        if not registros:
            return 0, 0

        # 1. ¿Cuáles de estos IDs ya existen? (para contar insertadas vs actualizadas)
        ids = [r["id_alarma"] for r in registros]
        existentes = set(
            self.db.scalars(select(Alarma.id_alarma).where(Alarma.id_alarma.in_(ids)))
        )

        # 2. INSERT ... ON DUPLICATE KEY UPDATE, por lotes
        try:
            for i in range(0, len(registros), TAMANO_LOTE):
                lote = registros[i : i + TAMANO_LOTE]

                stmt = mysql_insert(Alarma).values(lote)
                stmt = stmt.on_duplicate_key_update(
                    tec_2g=stmt.inserted.tec_2g,
                    tec_3g=stmt.inserted.tec_3g,
                    tec_4g=stmt.inserted.tec_4g,
                    fecha_creacion=stmt.inserted.fecha_creacion,
                    municipio=stmt.inserted.municipio,
                    departamento=stmt.inserted.departamento,
                    notificada=stmt.inserted.notificada,
                )
                self.db.execute(stmt)

            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

        actualizadas = len(existentes)
        insertadas = len(ids) - actualizadas
        return insertadas, actualizadas
    
    
    def get_resumen_hora(self):
        hoy = datetime.now().date()
        inicio = datetime.combine(hoy, time.min)
        fin = hoy + timedelta(days=1)
        consultas = self.db.scalars(select(Alarma).where(Alarma.fecha_creacion >= inicio, Alarma.fecha_creacion < fin).order_by(Alarma.fecha_creacion)).all()  
        
        hora = extract("hour", Alarma.fecha_creacion)
        consultas_agrupada = self.db.execute(select(hora.label("hora"), func.count().label("cantidad")).where(Alarma.fecha_creacion >= inicio, Alarma.fecha_creacion < fin).group_by(hora)).all() 
        
        alerta_por_hora = {hora: alerta for hora, alerta in consultas_agrupada}
        alerta_por_hora_completo = [{"hora" : f"{h:02d}:00" , "cantidad" : alerta_por_hora.get(h, 0)} for h in range(24)]
        
        pprint(alerta_por_hora_completo)
        
        return ResumenOut(
            fecha=hoy,
            total=len(consultas),
            por_hora=alerta_por_hora_completo
        )
            
        

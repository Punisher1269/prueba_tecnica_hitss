from datetime import datetime, timedelta

from schemas import Nivel


def calculate_level(tec_2g: int, tec_3g: int, tec_4g: int, notificada: str, fecha_creacion: datetime, ahora: datetime):
        """Devuelve 'CRITICO', 'WARN' o 'NORMAL' según la regla de criticidad."""
        
        UNA_HORA = timedelta(hours=1)
        UN_DIA = timedelta(hours=24)
        tecnologias = (tec_2g, tec_3g, tec_4g)
        disponibles = [v for v in tecnologias if v >= 0]
          
        cumple = (
            len(disponibles) > 0
            and all(v == 100 for v in disponibles)
            and notificada == "N"
        )
        
        if not cumple:
            return Nivel.NORMAL
        
        duracion = ahora - fecha_creacion

        if duracion > UN_DIA:
            return Nivel.CRITICO
        if duracion > UNA_HORA:
            return Nivel.WARN
        return Nivel.NORMAL
    
from datetime import datetime

from sqlalchemy import CHAR, BigInteger, DateTime, Index, SmallInteger, String, func
from sqlalchemy.orm import Mapped, mapped_column

from settings.db import Base


class Alarma(Base):
    __tablename__ = "alarmas"
    __table_args__ = (Index("idx_fecha", "fecha_creacion"),)

    id_alarma: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=False)
    tec_2g: Mapped[int] = mapped_column(SmallInteger)
    tec_3g: Mapped[int] = mapped_column(SmallInteger)
    tec_4g: Mapped[int] = mapped_column(SmallInteger)
    fecha_creacion: Mapped[datetime] = mapped_column(DateTime)
    municipio: Mapped[str] = mapped_column(String(100))
    departamento: Mapped[str] = mapped_column(String(100))
    notificada: Mapped[str] = mapped_column(CHAR(1))
    importada_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    def __repr__(self) -> str:
        return f"<Alarma {self.id_alarma} {self.municipio} {self.fecha_creacion}>"
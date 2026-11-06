CREATE TABLE alarmas (
  id_alarma      BIGINT PRIMARY KEY,
  tec_2g         SMALLINT NOT NULL,
  tec_3g         SMALLINT NOT NULL,
  tec_4g         SMALLINT NOT NULL,
  fecha_creacion DATETIME NOT NULL,
  municipio      VARCHAR(100) NOT NULL,
  departamento   VARCHAR(100) NOT NULL,
  notificada     CHAR(1) NOT NULL,
  importada_en   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_fecha (fecha_creacion)
);
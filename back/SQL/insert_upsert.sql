INSERT INTO alarmas (id_alarma, tec_2g, tec_3g, tec_4g, fecha_creacion, municipio, departamento, notificada)
VALUES (...)
ON DUPLICATE KEY UPDATE
  tec_2g = VALUES(tec_2g), tec_3g = VALUES(tec_3g), tec_4g = VALUES(tec_4g),
  fecha_creacion = VALUES(fecha_creacion), notificada = VALUES(notificada);
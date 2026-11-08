export const alarmasMock = [
  // ---- Filas reales del CSV (NORMAL: fallan la condición de capacidad) ----
  { id_alarma: 4661427, tec_2g: 0, tec_3g: 0, tec_4g: 100, fecha_creacion: "2026-10-10T18:37:53", municipio: "Quetame", departamento: "Cundinamarca", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 4660640, tec_2g: 60, tec_3g: 67, tec_4g: 65, fecha_creacion: "2026-10-10T15:13:48", municipio: "Betulia", departamento: "Santander", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 4660658, tec_2g: 33, tec_3g: -100, tec_4g: 0, fecha_creacion: "2026-10-10T08:04:06", municipio: "Yavaraté", departamento: "Vaupés", notificada: "N", nivel: "NORMAL" },

  // ---- CRÍTICO: cumple las condiciones base y lleva más de 24 h ----
  { id_alarma: 9000002, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-03T17:43:00", municipio: "Leticia", departamento: "Amazonas", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000003, tec_2g: -100, tec_3g: -100, tec_4g: 100, fecha_creacion: "2026-11-05T11:43:00", municipio: "Mitú", departamento: "Vaupés", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000004, tec_2g: 100, tec_3g: 100, tec_4g: -1, fecha_creacion: "2026-11-01T17:43:00", municipio: "Puerto Carreño", departamento: "Vichada", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000005, tec_2g: 100, tec_3g: -100, tec_4g: -100, fecha_creacion: "2026-11-05T17:37:00", municipio: "Inírida", departamento: "Guainía", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000006, tec_2g: -50, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-04T17:43:00", municipio: "Quibdó", departamento: "Chocó", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000007, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-10-27T17:43:00", municipio: "San Andrés", departamento: "San Andrés", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000008, tec_2g: -100, tec_3g: 100, tec_4g: -100, fecha_creacion: "2026-11-05T05:43:00", municipio: "Mocoa", departamento: "Putumayo", notificada: "N", nivel: "CRITICO" },
  { id_alarma: 9000009, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-05T15:43:00", municipio: "Riohacha", departamento: "La Guajira", notificada: "N", nivel: "CRITICO" },

  // ---- WARN: cumple las condiciones base y lleva más de 1 h y hasta 24 h ----
  { id_alarma: 9000001, tec_2g: 100, tec_3g: -100, tec_4g: 100, fecha_creacion: "2026-11-05T20:43:00", municipio: "Medellín", departamento: "Antioquia", notificada: "N", nivel: "WARN" },
  { id_alarma: 9000010, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-06T15:43:00", municipio: "Bogotá", departamento: "Cundinamarca", notificada: "N", nivel: "WARN" },
  { id_alarma: 9000011, tec_2g: -100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-06T12:43:00", municipio: "Cali", departamento: "Valle del Cauca", notificada: "N", nivel: "WARN" },
  { id_alarma: 9000012, tec_2g: 100, tec_3g: -100, tec_4g: 100, fecha_creacion: "2026-11-06T16:37:00", municipio: "Pasto", departamento: "Nariño", notificada: "N", nivel: "WARN" },
  { id_alarma: 9000013, tec_2g: 100, tec_3g: 100, tec_4g: -100, fecha_creacion: "2026-11-05T17:49:00", municipio: "Neiva", departamento: "Huila", notificada: "N", nivel: "WARN" },
  { id_alarma: 9000014, tec_2g: -1, tec_3g: -1, tec_4g: 100, fecha_creacion: "2026-11-06T05:43:00", municipio: "Yopal", departamento: "Casanare", notificada: "N", nivel: "WARN" },
  { id_alarma: 9000015, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-06T09:43:00", municipio: "Manizales", departamento: "Caldas", notificada: "N", nivel: "WARN" },

  // ---- NORMAL: cumple las condiciones base pero lleva 1 h o menos ----
  { id_alarma: 9000016, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-06T17:13:00", municipio: "Pereira", departamento: "Risaralda", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000017, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-06T16:49:00", municipio: "Armenia", departamento: "Quindío", notificada: "N", nivel: "NORMAL" },

  // ---- NORMAL: falla alguna condición base ----
  { id_alarma: 9000018, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-04T15:43:00", municipio: "Tunja", departamento: "Boyacá", notificada: "S", nivel: "NORMAL" },
  { id_alarma: 9000019, tec_2g: 100, tec_3g: 100, tec_4g: 100, fecha_creacion: "2026-11-06T11:43:00", municipio: "Ibagué", departamento: "Tolima", notificada: "S", nivel: "NORMAL" },
  { id_alarma: 9000020, tec_2g: 100, tec_3g: 99, tec_4g: 100, fecha_creacion: "2026-11-05T01:43:00", municipio: "Villavicencio", departamento: "Meta", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000021, tec_2g: -100, tec_3g: -100, tec_4g: -100, fecha_creacion: "2026-11-04T05:43:00", municipio: "Florencia", departamento: "Caquetá", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000022, tec_2g: 100, tec_3g: 0, tec_4g: -100, fecha_creacion: "2026-11-05T11:43:00", municipio: "Sincelejo", departamento: "Sucre", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000023, tec_2g: 50, tec_3g: 50, tec_4g: 50, fecha_creacion: "2026-11-06T07:43:00", municipio: "Montería", departamento: "Córdoba", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000024, tec_2g: 0, tec_3g: 0, tec_4g: 0, fecha_creacion: "2026-11-02T23:43:00", municipio: "Valledupar", departamento: "Cesar", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000025, tec_2g: 100, tec_3g: 100, tec_4g: 13, fecha_creacion: "2026-11-05T13:43:00", municipio: "Popayán", departamento: "Cauca", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000026, tec_2g: -100, tec_3g: 100, tec_4g: 88, fecha_creacion: "2026-11-06T14:43:00", municipio: "Arauca", departamento: "Arauca", notificada: "N", nivel: "NORMAL" },
  { id_alarma: 9000027, tec_2g: 20, tec_3g: -100, tec_4g: -100, fecha_creacion: "2026-11-06T02:43:00", municipio: "San José del Guaviare", departamento: "Guaviare", notificada: "N", nivel: "NORMAL" },
];
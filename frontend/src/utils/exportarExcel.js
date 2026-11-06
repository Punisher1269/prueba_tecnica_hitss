import * as XLSX from "xlsx";
import { formatearTecnologia, formatearFecha } from "./formatos";
import { formatearDuracion } from "./duracion";

export function exportarAlarmasExcel(filas, filtro) {
  // 1. Cada alarma → un objeto con los encabezados y valores tal como se ven
  const datos = filas.map((a) => ({
    "ID Alarma": a.id_alarma,
    Municipio: a.municipio,
    Departamento: a.departamento,
    "2G": formatearTecnologia(a.tec_2g),
    "3G": formatearTecnologia(a.tec_3g),
    "4G": formatearTecnologia(a.tec_4g),
    "Fecha creación": formatearFecha(a.fecha_creacion),
    Duración: formatearDuracion(a.duracion_ms),
    Notificada: a.notificada,
    Nivel: a.nivel,
  }));

  // 2. Arreglo de objetos → hoja de Excel (las claves se vuelven encabezados)
  const hoja = XLSX.utils.json_to_sheet(datos);

  // 3. Ancho de cada columna, medido en caracteres
  hoja["!cols"] = [
    { wch: 12 }, { wch: 22 }, { wch: 20 },
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 22 }, { wch: 14 }, { wch: 11 }, { wch: 10 },
  ];

  // 4. Libro con una hoja y descarga
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Alarmas");

  const hoy = new Date().toLocaleDateString("sv-SE"); // "2026-11-06" en hora local
  XLSX.writeFile(libro, `alarmas_${filtro.toLowerCase()}_${hoy}.xlsx`);
}
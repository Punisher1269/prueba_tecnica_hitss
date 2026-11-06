import { exportarAlarmasExcel } from "../utils/exportarExcel";

export function BotonExportar({ filas, filtro }) {
  return (
    <button
      className="btn btn-secundario"
      onClick={() => exportarAlarmasExcel(filas, filtro)}
      disabled={filas.length === 0}
      title={`Exportar ${filas.length} registros`}
    >
      Exportar Excel
    </button>
  );
}
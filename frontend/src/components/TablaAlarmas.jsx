import { AgGridReact } from "ag-grid-react";
import { formatearDuracion } from "../utils/duracion";
import { formatearTecnologia, formatearFecha } from "../utils/formatos";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const tema = themeQuartz.withParams({
  fontFamily: "inherit",
  fontSize: 14,
  headerBackgroundColor: "#f8fafc",
  headerTextColor: "#475569",
  headerFontWeight: 600,
  borderColor: "#e2e8f0",
  rowHoverColor: "#f1f5f9",
  accentColor: "#2563eb",
  wrapperBorderRadius: 8,
});

function CeldaNivel({ value }) {
  return <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>;
}

const columnas = [
  { field: "id_alarma", headerName: "ID Alarma", width: 120 },
  { field: "municipio", headerName: "Municipio", flex: 1, minWidth: 140 },
  { field: "departamento", headerName: "Departamento", flex: 1, minWidth: 140 },
  { field: "tec_2g", headerName: "2G", width: 80, valueFormatter: (p) => formatearTecnologia(p.value) },
  { field: "tec_3g", headerName: "3G", width: 80, valueFormatter: (p) => formatearTecnologia(p.value) },
  { field: "tec_4g", headerName: "4G", width: 80, valueFormatter: (p) => formatearTecnologia(p.value) },
  { field: "fecha_creacion", headerName: "Fecha creación", width: 190, valueFormatter: (p) => formatearFecha(p.value) },
  {field: "duracion_ms", headerName: "Duración", width: 140, valueFormatter: (p) => formatearDuracion(p.value), 
    sort: "desc", // por defecto, las más antiguas primero 
  },
  { field: "notificada", headerName: "Notificada", width: 115 },
  { field: "nivel", headerName: "Nivel", width: 120, cellRenderer: CeldaNivel },
];

const reglasFila = {
  "fila-critico": (p) => p.data.nivel === "CRITICO",
  "fila-warn": (p) => p.data.nivel === "WARN",
};

export function TablaAlarmas({ filas, cargando }) {
  return (
    <div style={{ height: 600 }}>
      <AgGridReact
        theme={tema}
        getRowId={(p) => String(p.data.id_alarma)}
        rowData={filas}
        columnDefs={columnas}
        rowClassRules={reglasFila}
        loading={cargando}
        pagination={true}
        paginationPageSize={50}
        paginationPageSizeSelector={[25, 50, 100]}
      />
    </div>
  );
}
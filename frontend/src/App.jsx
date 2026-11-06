import { useState } from "react";
import { useAlarmas } from "./hooks/useAlarmas";
import { useAhora } from "./hooks/useAhora";
import { Filtros } from "./components/Filtros";
import { useImportarCsv } from "./hooks/useImportarCsv";
import { BotonImportar } from "./components/BotonImportar";
import { Aviso } from "./components/Aviso";
import { ResultadoImportacion } from "./components/ResultadoImportacion";
import { BotonExportar } from "./components/BotonExportar";
import { TablaAlarmas } from "./components/TablaAlarmas";
import { ModalResumen } from "./components/ModalResumen";
import { Navbar } from "./components/Navbar";
import "./App.css";

function App() {
  const [filtro, setFiltro] = useState("TODOS");
  const { alarmas, cargando, error, recargar } = useAlarmas();
  const importacion = useImportarCsv(recargar);

  const [resumenAbierto, setResumenAbierto] = useState(false);

  const visibles = alarmas.filter(
    (a) => filtro === "TODOS" || a.nivel === filtro
  );

  const ahora = useAhora(30000); // cada 30 s basta para la tabla

  // A cada alarma visible le agregamos su duración en ms
  const filas = visibles.map((a) => ({
    ...a,
    duracion_ms: ahora - new Date(a.fecha_creacion),
  })).sort((a, b) => b.duracion_ms - a.duracion_ms);

  // Cuántas alarmas hay de cada nivel
  const conteos = { TODOS: alarmas.length, CRITICO: 0, WARN: 0, NORMAL: 0 };
  alarmas.forEach((a) => conteos[a.nivel]++);

  return (
    <>
      <Navbar />
      <main className="contenedor">
        <header className="encabezado">
          <div>
            <h1>Panel de alarmas</h1>
            <p className="subtitulo">Clasificación por criticidad según tiempo activo</p>
          </div>
          <div className="acciones">
            {/* <button className="btn btn-secundario" disabled>Resumen del día</button> */}
            <button className="btn btn-secundario" onClick={() => setResumenAbierto(true)}>
              Resumen del día
            </button>
            {/* <button className="btn btn-secundario" disabled>Exportar Excel</button> */}
            <BotonExportar filas={filas} filtro={filtro} />
            {/* <button className="btn btn-primario" disabled>Importar CSV</button> */}
            <BotonImportar
              onArchivo={importacion.importar}
              importando={importacion.importando}
            />
          </div>
        </header>

        <Filtros filtroActivo={filtro} onCambiar={setFiltro} conteos={conteos} />

        {error && <Aviso tipo="error">{error}</Aviso>}

        <ResultadoImportacion
          resultado={importacion.resultado}
          error={importacion.error}
          onCerrar={importacion.limpiar}
        />

        <section className="panel">
          <div className="panel-encabezado">
            <h2>Alarmas</h2>
            <span>Mostrando {visibles.length} de {alarmas.length}</span>
          </div>
          <TablaAlarmas filas={filas} cargando={cargando} />
        </section>
      </main>
      {resumenAbierto && <ModalResumen onCerrar={() => setResumenAbierto(false)} />}
    </>
  );
}

export default App;
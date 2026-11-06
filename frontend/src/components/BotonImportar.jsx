import { useRef } from "react";

export function BotonImportar({ onArchivo, importando }) {
  const inputRef = useRef(null);

  const alSeleccionar = (e) => {
    const archivo = e.target.files[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (archivo) onArchivo(archivo);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={alSeleccionar}
      />
      <button
        className="btn btn-primario"
        onClick={() => inputRef.current.click()}
        disabled={importando}
      >
        {importando ? "Importando..." : "Importar CSV"}
      </button>
    </>
  );
}
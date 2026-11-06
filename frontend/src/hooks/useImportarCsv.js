import { useState } from "react";
import { alarmasService } from "../api/alarmasService";

export function useImportarCsv(alTerminar) {
  const [importando, setImportando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const importar = async (archivo) => {
    setResultado(null);
    setError(null);

    if (!archivo.name.toLowerCase().endsWith(".csv")) {
      setError("El archivo debe tener extensión .csv");
      return;
    }

    setImportando(true);
    try {
      const respuesta = await alarmasService.importarCsv(archivo);
      setResultado(respuesta);
      alTerminar?.(); // refresca la tabla
    } catch (e) {
      setError(e.message);
    } finally {
      setImportando(false);
    }
  };

  const limpiar = () => {
    setResultado(null);
    setError(null);
  };

  return { importar, importando, resultado, error, limpiar };
}
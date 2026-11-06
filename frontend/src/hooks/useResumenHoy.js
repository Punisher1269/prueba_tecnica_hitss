import { useEffect, useState } from "react";
import { alarmasService } from "../api/alarmasService";

export function useResumenHoy() {
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      try {
        const datos = await alarmasService.resumenHoy();
        if (!cancelado) setResumen(datos);
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargar();
    return () => { cancelado = true; };
  }, []);

  return { resumen, cargando, error };
}
import { useCallback, useEffect, useState } from "react";
import { alarmasService } from "../api/alarmasService";

export function useAlarmas() {
  const [alarmas, setAlarmas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await alarmasService.listar();
      setAlarmas(datos);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // Se ejecuta una vez al montar el componente (dos en desarrollo por StrictMode)
  useEffect(() => {
    cargar();
  }, [cargar]);

  return { alarmas, cargando, error, recargar: cargar };
}
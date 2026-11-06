import { useEffect, useState } from "react";

// Devuelve la fecha/hora actual y se actualiza cada `intervaloMs`
export function useAhora(intervaloMs = 1000) {
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), intervaloMs);
    return () => clearInterval(id);
  }, [intervaloMs]);

  return ahora;
}
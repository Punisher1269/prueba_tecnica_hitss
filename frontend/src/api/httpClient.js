const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function http(ruta, opciones = {}) {
  const respuesta = await fetch(`${BASE_URL}${ruta}`, opciones);

  if (!respuesta.ok) {
    const detalle = await respuesta.text();
    throw new Error(`Error ${respuesta.status}: ${detalle}`);
  }
  return respuesta.json();
}
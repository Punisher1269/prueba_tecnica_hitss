
export function formatearTecnologia(valor) {
  return valor < 0 ? "N/D" : valor;
}

export function formatearFecha(iso) {
  return new Date(iso).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
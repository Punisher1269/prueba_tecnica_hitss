

export function formatearDuracion(ms) {
  if (ms < 0) return "—"; // fecha en el futuro: dato inválido

  const totalMin = Math.floor(ms / 60000);
  const dias = Math.floor(totalMin / 1440);       // 1440 min = 1 día
  const horas = Math.floor((totalMin % 1440) / 60);
  const minutos = totalMin % 60;

  if (dias > 0) return `${dias}d ${horas}h ${minutos}m`;
  if (horas > 0) return `${horas}h ${minutos}m`;
  return `${minutos}m`;
}
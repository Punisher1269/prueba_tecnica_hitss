import { Aviso } from "./Aviso";

export function ResultadoImportacion({ resultado, error, onCerrar }) {
  if (error) {
    return <Aviso tipo="error" onCerrar={onCerrar}>{error}</Aviso>;
  }
  if (!resultado) return null; // null = no dibujar nada

  const { insertadas, actualizadas, rechazadas, errores = [] } = resultado;

  return (
    <Aviso tipo="exito" onCerrar={onCerrar}>
      <span>
        Importación completa: {insertadas} nuevas, {actualizadas} actualizadas,{" "}
        {rechazadas} rechazadas.
      </span>
      {errores.length > 0 && (
        <ul className="aviso-errores">
          {errores.slice(0, 5).map((e, i) => (
            <li key={`${e.fila}-${i}`}>Fila {e.fila}: {e.motivo}</li>
          ))}
        </ul>
      )}
    </Aviso>
  );
}
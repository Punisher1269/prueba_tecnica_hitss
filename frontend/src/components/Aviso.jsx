
export function Aviso({ tipo, children, onCerrar }) {
  return (
    <div className={`aviso aviso-${tipo}`}>
      <div className="aviso-contenido">{children}</div>
      {onCerrar && (
        <button className="aviso-cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
      )}
    </div>
  );
}
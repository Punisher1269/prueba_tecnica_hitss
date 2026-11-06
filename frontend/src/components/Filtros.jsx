const OPCIONES = [
  { valor: "TODOS",   etiqueta: "Todas",    descripcion: "Total importadas" },
  { valor: "CRITICO", etiqueta: "Críticas", descripcion: "Activas más de 24 h" },
  { valor: "WARN",    etiqueta: "Warn",     descripcion: "Entre 1 y 24 h" },
  { valor: "NORMAL",  etiqueta: "Normales", descripcion: "Sin distintivo" },
];

export function Filtros({ filtroActivo, onCambiar, conteos }) {
  return (
    <div className="filtros">
      {OPCIONES.map((op) => (
        <button
          key={op.valor}
          onClick={() => onCambiar(op.valor)}
          className={`tarjeta-filtro tarjeta-${op.valor.toLowerCase()} ${
            filtroActivo === op.valor ? "activa" : ""
          }`}
        >
          <span className="tarjeta-etiqueta">{op.etiqueta}</span>
          <span className="tarjeta-numero">{conteos[op.valor] ?? 0}</span>
          <span className="tarjeta-descripcion">{op.descripcion}</span>
        </button>
      ))}
    </div>
  );
}
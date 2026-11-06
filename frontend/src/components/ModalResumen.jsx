import { useEffect } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { useResumenHoy } from "../hooks/useResumenHoy";

export function ModalResumen({ onCerrar }) {
  const { resumen, cargando, error } = useResumenHoy();

  // Cerrar con la tecla Esc
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [onCerrar]);

  // Cerrar al hacer clic en el fondo oscuro (no dentro del panel)
  const alClicFondo = (e) => {
    if (e.target === e.currentTarget) onCerrar();
  };

  return (
    <div className="modal-fondo" onClick={alClicFondo}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-resumen">
        <header className="modal-encabezado">
          <div>
            <h2 id="titulo-resumen">Resumen del día</h2>
            {resumen && <p className="subtitulo">{resumen.fecha}</p>}
          </div>
          <button className="aviso-cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        </header>

        {cargando && <p className="modal-estado">Cargando resumen...</p>}
        {error && <p className="modal-estado error-texto">{error}</p>}
        {resumen && <ContenidoResumen resumen={resumen} />}
      </div>
    </div>
  );
}

function ContenidoResumen({ resumen }) {
  if (resumen.total === 0) {
    return <p className="modal-estado">Hoy no se han creado alarmas.</p>;
  }

  const pico = resumen.por_hora.reduce((max, f) => (f.cantidad > max.cantidad ? f : max));

  return (
    <>
      <div className="modal-cifras">
        <div>
          <span className="tarjeta-etiqueta">Total de hoy</span>
          <span className="tarjeta-numero">{resumen.total}</span>
        </div>
        <div>
          <span className="tarjeta-etiqueta">Hora pico</span>
          <span className="tarjeta-numero">{pico.hora}</span>
          <span className="tarjeta-descripcion">{pico.cantidad} alarmas</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={resumen.por_hora} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="hora" tick={{ fontSize: 11 }} interval={1} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(valor) => [valor, "Alarmas"]}
            labelFormatter={(hora) => `Franja ${hora}`}
          />
          <Bar dataKey="cantidad" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
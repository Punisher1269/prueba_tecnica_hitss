import { useAhora } from "../hooks/useAhora";

export function Navbar() {
  const ahora = useAhora(1000);

  return (
    <nav className="navbar">
      <div className="navbar-contenido">
        <div className="marca">
          <span className="marca-logo">MA</span>
          <span>Monitor de Alarmas</span>
        </div>
        <div className="reloj">
          <span className="reloj-punto" />
          {ahora.toLocaleString("es-CO", { dateStyle: "full", timeStyle: "medium" })}
        </div>
      </div>
    </nav>
  );
}
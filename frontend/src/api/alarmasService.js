import { http } from "./httpClient";
import { alarmasMock } from "./mocks";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const alarmasService = {

  // Servicio para obtener todas las alarmas
  listar() {
    if (USE_MOCK) return Promise.resolve(alarmasMock);
    return http("/alarmas");
  },


  // Servicio importar CSV con alertas
  async importarCsv(archivo) {
    if (USE_MOCK) {
      const texto = await archivo.text();
      const filas = texto.trim().split("\n").length - 1; // -1 por el encabezado
      await new Promise((r) => setTimeout(r, 800));      // simula la espera del servidor
      return { insertadas: filas, actualizadas: 0, rechazadas: 0, errores: [] };
    }

    const formulario = new FormData();
    formulario.append("archivo", archivo);
    return http("/alarmas/import", { method: "POST", body: formulario });
  },


  // Servicio resumen del dia
  async resumenHoy() {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      const horaActual = new Date().getHours();
      const ejemplo = [0, 0, 1, 0, 0, 2, 3, 5, 8, 6, 4, 7, 9, 5, 3, 6, 4, 2, 3, 1, 2, 0, 1, 0];
      const por_hora = ejemplo.map((cantidad, h) => ({
        hora: `${String(h).padStart(2, "0")}:00`,
        cantidad: h <= horaActual ? cantidad : 0,
      }));
      const total = por_hora.reduce((suma, f) => suma + f.cantidad, 0);
      return { fecha: new Date().toLocaleDateString("sv-SE"), total, por_hora };
    }

    return http("/alarmas/resumen_hoy");
  },
};
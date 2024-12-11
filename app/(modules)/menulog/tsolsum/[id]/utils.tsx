import { Root } from "../tsolsum-types";

export function calcularTotales(formData: Root) {
  const { detsolsum, cabsolsum } = formData;
  let subtotal = 0;
  let totalIVA = 0;

  // Verificar si la solicitud tiene reserva válida
  if (cabsolsum.reserva === "P" || cabsolsum.reserva === "E") {
    detsolsum.forEach((item) => {
      const { destino, dsp_MtoTotReng, mtototrng, porcimptos } = item;

      const montoTotalReng = parseFloat(mtototrng);
      const porcentajeImpuesto = parseFloat(porcimptos);

      if (isNaN(montoTotalReng) || isNaN(porcentajeImpuesto)) {
        console.error("Error: mtototrng o porcimptos no son números válidos.");
        return; 
      }

      // Condiciones para sumar los totales
      if (
        cabsolsum.indcomdir === "N" &&
        cabsolsum.indcompctto === "N" &&
        (destino === "COMP" || destino === "CTTO")
      ) {
        subtotal += dsp_MtoTotReng; // Sumar solo si es COMP o CTTO
        totalIVA += (montoTotalReng * porcentajeImpuesto) / 100;
      } else if (cabsolsum.indcomdir === "S" && cabsolsum.indcompctto === "N") {
        subtotal += dsp_MtoTotReng; // Sumar todos los items si es compra directa
        totalIVA += (montoTotalReng * porcentajeImpuesto) / 100;
      } else if (
        cabsolsum.indcomdir === "S" &&
        cabsolsum.indcompctto === "S" &&
        destino === "CTTO"
      ) {
        subtotal += dsp_MtoTotReng; // Sumar solo si es CTTO
        totalIVA += (montoTotalReng * porcentajeImpuesto) / 100;
      }
    });
  }

  const total = subtotal + totalIVA;

  return { subtotal, totalIVA, total };
}

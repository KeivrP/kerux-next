import { Api_Comp } from "@/server/API";

export const AnularSC = async (id: string, mensaje: string) => {
  try {
    const res = await Api_Comp.post(`/sol_compras/boton_anular_sc/id=${id}`, {
      sol_compra: {
        mensajes: mensaje,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GenerarCot = async (id: number ,feccot: string, nrorengsc: number[], numprov: number[]) => {
  try {
    const res = await Api_Comp.post(`/sol_compras/boton_generar_cotizaciones?id=${id}`, {
      feccot,
      nrorengsc: [1, 2],
      numprov: [1],
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSC = async (id: string, sol_compra: any) => {
  try {
    const res = await Api_Comp.put(`/sol_compras/${id}`, {
      sol_compra
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AnularRngSC = async (id: string, nrorengsc: string) => {
  try {
    const res = await Api_Comp.post(`/sol_compras/boton_anular_rngsc?id=${id}&nrorengsc=${nrorengsc}`, );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

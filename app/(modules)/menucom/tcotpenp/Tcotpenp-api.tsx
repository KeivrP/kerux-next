import { Api_Comp } from "@/server/API";

  export const rejectCot = async (numcot: number, fecanu: string, motivo: string) => {
    try {
      const res = await Api_Comp.post(`/cotizaciones/boton_anular_cot`, {
          numcot, 
          fecanu,
          motivo
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

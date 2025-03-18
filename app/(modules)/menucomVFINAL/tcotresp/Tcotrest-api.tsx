import { Api_Comp } from "@/server/API";

  export const rejectCot = async (numcot: number) => {
    try {
      const res = await Api_Comp.post(`/cotizaciones/boton_rechazar_cot`, {
          numcot
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

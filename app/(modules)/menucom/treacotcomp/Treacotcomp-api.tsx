import { Api_Comp } from "@/server/API";

  export const reAsignarComprador = async (numcot: number[], codcomprador: string) => {
    try {
      const res = await Api_Comp.post(`/cotizaciones/boton_reasig_comprador`, {
          numcot,
          codcomprador,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

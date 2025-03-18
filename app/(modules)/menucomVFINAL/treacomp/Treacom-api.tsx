import { Api_Comp } from "@/server/API";

  export const reAsignarComprador = async (nrosc: number[], codcomprador: string) => {
    try {
      const res = await Api_Comp.post(`/sol_compras/boton_reasig_comprador`, {
          nrosc,
          codcomprador,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

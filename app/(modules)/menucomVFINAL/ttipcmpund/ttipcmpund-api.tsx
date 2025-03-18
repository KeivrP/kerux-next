import { Api_Comp } from "@/server/API";
import { Tipocompundlist } from "./ttipcmpund-types";

export const createTipoComp = async (data: Tipocompundlist) => {
    try {
      const res = await Api_Comp.post("/tiposcomp_unidades_crud", {
        tipocomp_und: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const updateTipoComp = async (data: Tipocompundlist) => {
      try {
          const res = await Api_Comp.put(`/tiposcomp_unidades_crud`, {
              tipocompra: data.tipocompra,
              codundcmp: data.codundcmp,            
              tipocomp_und: {
                  tipocompra: data.tipocompra,
                  codundcmp: data.codundcmp,
                  formatoorden: data.formatoorden,
                  formatocambio: data.formatocambio,
                  tipocontoc: data.tipocontoc,
                  codcontoc: data.codcontoc,
              },
          });
          return res.data;
      } catch (error) {
          console.log(error);
          throw error;
      }
  };
  
  export const deleteTipoComp = async (id: string) => {
    try {
      const res = await Api_Comp.delete(`/tiposcomp_unidades_crud/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
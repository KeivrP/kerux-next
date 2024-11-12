import { Api_Doc } from "@/server/API";

export const devloverDocFin = async (id: number[]) => {
    try {
      const res = await Api_Doc.post("/documentos_origen/devolver", {
        iddoc: id,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

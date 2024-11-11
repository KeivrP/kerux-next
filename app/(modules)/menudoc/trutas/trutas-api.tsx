import { Api_Doc } from "@/server/API";
import { PasoRutas, RutaData } from "./trutas-types";

export const createRuta = async (data: RutaData) => {
    try {
        const res = await Api_Doc.post('/rutas_crud', { ruta: data });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateRuta = async (id: string, data: RutaData) => {
    try {
        const res = await Api_Doc.put(`/rutas_crud/${id}`, { ruta: data });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteRuta = async (id: string) => {
    try {
        const res = await Api_Doc.delete(`/rutas_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const pasoRutasUpdate = async (data: PasoRutas) => {
    try {
      const res = await Api_Doc.put(`/pasos_rutas_crud`, {codruta: data.codruta, paso: data.paso, pasos_ruta: data });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export const pasoRutasCreate = async (data: PasoRutas) => {
    try {
      const res = await Api_Doc.post(`/pasos_rutas_crud`, { pasos_ruta: data });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export const pasoRutasDelete = async (data: PasoRutas) => {
    try {
      const res = await Api_Doc.delete(`/pasos_rutas_crud/${data.codruta}`,{
        params: { codpaso: data.paso }
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

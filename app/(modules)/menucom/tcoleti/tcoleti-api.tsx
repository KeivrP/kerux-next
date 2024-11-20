import { Api_Comp } from "@/server/API";
import { ColetillasInterface } from "./tcoleti-types";

export const createTcoleti = async (data: ColetillasInterface) => {
    console.log(data)
    try {
      const res = await Api_Comp.post("/coletillas", {
        coletilla: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const updateTcoleti = async (id: string, data: ColetillasInterface) => {
    try {
      const res = await Api_Comp.put(`/coletillas/${id}`, {
        coletilla: data.desccolet,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const deleteTcoleti = async (id: string) => {
    try {
      const res = await Api_Comp.delete(`/coletillas/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
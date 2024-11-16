import { Response } from "@/components/toast/toast";
import { Tiporngsumlist } from "./ttiprngsum-types";
import { Api_Log } from "@/server/API";

export const updateTipRngsSumoLog = async (id: string, data: Tiporngsumlist): Promise<Response> => {
    try {
        const requestBody = {
            tiporeng: {
                limitundtrib: data.limitundtrib
            }
        };

        const res = await Api_Log.put(`tipos_rngs_crud/${id}`, requestBody);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
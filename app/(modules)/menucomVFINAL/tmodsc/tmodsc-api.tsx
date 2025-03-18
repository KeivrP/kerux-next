import { Api_Comp } from '@/server/API';
const destroyRng = async (id: number, nrorengsc: number) => {
    const url = `/sol_compras/destroy_rng?id=${id}&nrorengsc=${nrorengsc}`;
    
    try {
        const response = await Api_Comp.delete(url);
        return response.data;
    } catch (error) {
        console.error('Error making the request:', error);
        throw new Error('Failed to destroy RNG');
    }
};

export default destroyRng;

import { AxiosError } from "axios"; // Importa el tipo de error de Axios
import { Api_Comp, Api_Cont, Api_Doc, Api_Ing, Api_Log, Api_Proseg } from "./API"; // Importa las APIs
import { entities } from "./entity"; // Importa las entidades
import { useQuery } from "@tanstack/react-query"; // Importa el hook useQuery de React Query

// Define los tipos de claves de las entidades
type EntityKeys = keyof typeof entities;

// Mapa de URLs de las APIs
const apiUrls = {
  comp: Api_Comp,
  cont: Api_Cont,
  doc: Api_Doc,
  ing: Api_Ing,
  log: Api_Log,
  proseg: Api_Proseg,
};

// Interfaz para los parámetros de la consulta
interface Query {
  entity: EntityKeys; // Entidad a consultar
  params?: object; // Parámetros opcionales para la consulta
  dependency?: any[] | any; // Dependencias opcionales para la consulta
  type?: string; // Tipo de consulta opcional
  api?: keyof typeof apiUrls; // Propiedad para elegir la API a utilizar
}

// Hook personalizado para realizar consultas
export function useQueryData({ entity, params, dependency, type, api }: Query) {
  // Selecciona la URL de la API según la propiedad 'api' o utiliza la de 'log' por defecto
  const selectedApiUrl = apiUrls[api || "log"]; 

  // Función para realizar la consulta a la API
  const functionFetch = async () => {
    // Construye el endpoint basado en la entidad y el tipo
    const endpoint = type ? `${entities[entity]}/${type}` : entities[entity];

    // Realiza la solicitud GET a la API
    const response = await selectedApiUrl.get(endpoint, {
      params, // Pasa los parámetros a la solicitud
    });
    return response.data; // Retorna los datos de la respuesta
  };

  // Utiliza el hook useQuery para gestionar la consulta
  const { data, error, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: [entity, params, type, api], // Clave de consulta única
    queryFn: functionFetch, // Función de obtención de datos
  });

  // Retorna los resultados de la consulta
  return {
    refetch, // Función para volver a realizar la consulta
    isFetching, // Estado de si se está obteniendo datos
    isLoading, // Estado de si se está cargando la consulta
    error, // Error en caso de que ocurra
    data, // Datos obtenidos de la consulta
    isError, // Estado de si ocurrió un error
  };
}
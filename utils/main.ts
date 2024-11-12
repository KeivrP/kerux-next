import dayjs, { Dayjs } from "dayjs";
import * as _ from "lodash";


// Función que verifica si un objeto es una respuesta
export function isResponse(obj: any): obj is Response {
    return obj && typeof obj === 'object' && 'message' in obj;
}

// Función que verifica si un valor es un string
export function isString(value: any): value is string {
    return typeof value === 'string';
}

// Funcion para validar un value

export function getVal(data: any) {
  return data ? data : '';
}

// Función que recorta un texto a una longitud determinada
export function Slice(texto: string) {
    let textoRecortado = texto.length > 20 ? texto.slice(0, 20) + "..." : texto;
  
    // Convertir a minúsculas y luego capitalizar
    textoRecortado = textoRecortado.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  
    return textoRecortado;
}
export function SliceUSer(texto: string) {
    if (!texto) return
    let textoRecortado = texto.length > 30 ? texto.slice(0, 30) + "..." : texto;
  
    // Convertir a minúsculas y luego capitalizar
    textoRecortado = textoRecortado.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  
    return textoRecortado;
}



export function SliceTable( texto: string ) {
    const textoRecortado = texto.length > 48 ? texto.slice(0, 48) + "..." : texto;
  
    return textoRecortado
}


// Función que limita un valor a un rango específico
export const coerce = (val: number, min: number, max: number): number => {
    return (val > min) ? ((val < max) ? val : max) : min;
}

// Define los tipos de datos esperados para el componente ConditionalWrapper
type ConditionalWrapperProps = {
    condition?: boolean;
    wrapper: (children: React.ReactNode) => React.ReactNode;
    children?: React.ReactNode;
}

// Componente que renderiza su contenido envuelto en una función si se cumple una condición
export const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps): React.ReactNode => condition ? wrapper(children) : children;

// Define los tipos de datos esperados para el componente ConditionalWrapperTable
type ConditionalWrapperPropsTable = {
    condition: boolean;
    wrapper: (children: React.ReactElement<any, any>) => React.ReactElement<any, any>;
    children: React.ReactElement<any, any>; // Actualiza el tipo de dato esperado para 'children'
}

// Componente que renderiza su contenido envuelto en un componente si se cumple una condición
export const ConditionalWrapperTable = ({ condition, wrapper, children }: ConditionalWrapperPropsTable): React.ReactElement<any, any> => condition ? wrapper(children) : children;

export function calculateDays(fecha: string) {
    // Obtener la fecha actual de la máquina en milisegundos
    const fechaActual = new Date().getTime();
  
    // Convertir la fecha de recepción de la solicitud a milisegundos
    const fechaRecepcion = new Date(fecha).getTime();
  
    // Calcular la diferencia en milisegundos entre las dos fechas
    const diferenciaMilisegundos = fechaActual - fechaRecepcion;
  
    // Calcular la diferencia en días
    const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
  
    return diferenciaDias;
  }
  

   export const formatDate = (date: string) => {
      return dayjs(date).format('DD/MM/YYYY');
    }

    export function formatCurrency(amount: number | string) {
        let numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2 }).format(numericAmount);
      }

 export function replaceNullWithEmptyString(obj: any) {
    _.forOwn(obj, function(value, key) {
      if (_.isNull(value)) { // Comprueba si el valor es null
        obj[key] = ""; // Si es null, reemplázalo con una cadena vacía
      } else if (_.isObject(value)) { // Si el valor es un objeto, llama a la función de forma recursiva
        replaceNullWithEmptyString(value);
      }
    });
  }

  
      
      
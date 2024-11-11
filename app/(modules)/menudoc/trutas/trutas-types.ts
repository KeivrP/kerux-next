export interface Rutalist {
    codruta: string;
    descruta: string;
    raw_rnum_: number;
 }
 
 export interface RutaData {
    codruta: string;
    descruta: string;
 }
 
 export interface PasoRutas {
   codruta: string;
   paso: number;
   codsisaprob: string;
   codproxsis: string;
   tipoevento: string;
   descodsisaprob: string;
   descodproxsis: string;
   isNew?: boolean
}

export const TipoEventoOptions = [
   { value: "RCM", name: "Recibido Manual" },
   { value: "GEN", name: "Generado" },
   { value: "PRO", name: "Procesado" },
];
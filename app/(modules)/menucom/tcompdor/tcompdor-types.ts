export interface Compradoreslist {
    Supervisor?:   Supervisor;
    codcomprador:  string;
    codundcmp:     string;
    codusuariosup: null | string;
    nivelusuario?:  Nivelusuario;
    nombundcmp?:    string;
    nomcomprador?:  string;

   }
   
   export interface Supervisor {
    nomcomprador: string;
   }
   
   export enum Nivelusuario {
    C = "C",
    S = "S",
   }
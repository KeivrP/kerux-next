export interface Documentoslist {
    ano: number;
    appabrev: string;
    codmonedamtodoc: Codmonedamtodoc;
    codundadmorig: string;
    codundadmpro: string;
    desccodundpro: string;
    descdoc: string;
    descdocext: null | string;
    descstsdoc: string;
    desctipodoc: string;
    fecdoc: Date;
    iddoc: number;
    iddocfis: number | null;
    indreverso: Indreverso;
    mtodoc: string;
    nombre: string;
    numbenef: number;
    numidbenef: string;
    numop: number | null;
    raw_rnum_: number;
    refdoc: string;
    stsdoc: string;
    tipodoc: string;
  }
  
  export enum Codmonedamtodoc {
    Veb = "VEB",
    Vef = "VEF",
  }
  
  export enum Indreverso {
    N = "N",
    S = "S",
  }
  
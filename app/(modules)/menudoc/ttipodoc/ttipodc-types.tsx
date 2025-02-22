export interface Tipodoclist {
    codsis:        string;
    descripcion:   string;
    desctipodoc:   string;
    raw_rnum_:     number;
    tipodoc:       string;
    tipodocaumres: null | string;
    tipodocres:    null | string;
    tipodocrespre: null | string;
    tiposis:       string;
   }

   export interface Tiporngsumlist {
    desctiporeng:  string;
    limitundtrib:  number;
    raw_rnum_:     number;
    tiporengsumin: string;
   }
   

   export interface ITipoSheet {
    cabtipodoc: Cabtipodoc
    pasosruta: Pasosruum[]
  }
  
  export interface Cabtipodoc {
    tipodoc: string
    desctipodoc: string
    indrefdoc: string
    codruta: string
    tipodocref: string
    indactivo: string
    descprocint: any
  }
  
  export interface Pasosruum {
    codruta: string
    paso: number
    codsisaprob: string
    codproxsis: string
    tipoevento: string
    descodsisaprob: string
    descodproxsis: string
  }
  
export interface Documentoslist {
    ano:             number;
    appabrev:        string;
    codmoneda:       string;
    codmonedamtodoc: string;
    codsitio:        string;
    codundadmpro:    string;
    desccodundpro:   string;
    descdoc:         string;
    descdocext:      null;
    descstsdoc:      string;
    desctipodoc:     string;
    feccod:          null;
    feccre:          Date;
    fecdoc:          Date;
    fecmod:          Date;
    fecrec:          null;
    fecsts:          Date;
    fecver:          null;
    iddoc:           number;
    iddocfis:        null;
    iddocres:        null;
    idsts:           number;
    indreverso:      string;
    mensaje:         null;
    montoorig:       string;
    mtodoc:          string;
    nombre:          string;
    numbenef:        number;
    numidbenef:      string;
    numop:           null;
    origen:          string;
    raw_rnum_:       number;
    refdoc:          string;
    stsapr:          string;
    stsdoc:          string;
    tasa:            string;
    tipodoc:         string;
    usucod:          null;
    usucre:          string;
    usumod:          string;
    usurec:          null;
    ususts:          string;
    usuver:          null;
   }

   export interface DocuemtosRoot {
    cabiddoc: Cabiddoc[]
    detstsdoc: Detstsdoc[]
  }
  
  export interface Cabiddoc {
    iddoc: number
    tipodoc: string
    descdoc: string
    descdocext: string
    indreverso: string
    stsdoc: string
    descstsdoc: string
    refdoc: string
    fecdoc: string
    iddocres: any
    mtodoc: string
    origen: string
    ano: number
    mensaje: any
    numbenef: number
    numidbenef: string
    nombre: string
    appabrev: string
    codmoneda: string
    codsitio: string
    codmonedamtodoc: string
    tasa: string
    maximo_evento: MaximoEvento
    TipoDocumento: TipoDocumento
    SistemaOrigen: SistemaOrigen
    Sitio: Sitio[]
    Moneda: Moneda[]
  }
  
  export interface MaximoEvento {
    idevento: number
    tipoevento: string
    tipodoc: string
    iddoc: number
    stsevento: string
    descstsevento: string
    codsisgen: string
    codsisdest: string
    fecevento: string
    fecsts: string
    usrcre: string
    usrsts: string
    ideventodev: any
    CodSisDest: CodSisDest
  }
  
  export interface CodSisDest {
    descripcion: string
  }
  
  export interface TipoDocumento {
    desctipodoc: string
  }
  
  export interface SistemaOrigen {
    descripcion: string
  }
  
  export interface Sitio {
    nomsitio: string
  }
  
  export interface Moneda {
    nommoneda: string
  }
  
  export interface Detstsdoc {
    idsts: number
    stsant?: string
    descstsant?: string
    stsdoc: string
    rv_abbreviation: string
    fecsts: string
    ususts: string
  }
  
   
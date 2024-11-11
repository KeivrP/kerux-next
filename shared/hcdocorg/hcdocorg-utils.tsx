import { HeadersName } from "@/components/table-material/genericTable";

export interface IHcdorcorg {
  cabiddoc: Cabiddoc;
  deteventos: Detevento[];
  detdependientes: any[];
  detmaxevento: Detevento;
}

export interface Cabiddoc {
  iddoc: number;
  tipodoc: string;
  origen: string;
  refdoc: string;
  iddocref: null;
  indreverso: string;
  stsdoc: string;
  descdoc: string;
  descdocext: string;
  fecref: string | null;
  mensaje: string;
  fecdoc: string | null;
  ano: number;
  montoorig: string;
  tasa: string;
  mtodoc: string;
  numbenef: number;
  codmoneda: string;
  codsitio: string;
  TipoDocumento: TipoDocumento;
  SistemaOrigen: SistemaOrigen;
  Sitio: Sitio[];
  Moneda: Moneda[];
}

export interface Moneda {
  nommoneda: string;
}

export interface SistemaOrigen {
  descripcion: string;
}

export interface Sitio {
  nomsitio: string;
}

export interface TipoDocumento {
  desctipodoc: string;
}

export interface Detevento {
  idevento: number;
  tipoevento: string;
  desctipoevento: string;
  fecevento: string;
  codsisgen: string;
  stsevento: string;
  fecsts: string;
  codsisdest: string;
  tipodoc: string;
  iddoc: number;
  ideventodev: null;
  CodSisGen: SistemaOrigen;
  CodSisDest: SistemaOrigen;
  descstsevento: string;
  usrcre: string;
  usrsts: string;
  descripcion: string;
}

export const initialState: IHcdorcorg = {
  cabiddoc: {
    iddoc: 0,
    tipodoc: "",
    origen: "",
    refdoc: "",
    iddocref: null,
    indreverso: "",
    stsdoc: "",
    descdoc: "",
    descdocext: "",
    fecref: null,
    mensaje: "",
    fecdoc: null,
    ano: 0,
    montoorig: "",
    tasa: "",
    mtodoc: "",
    numbenef: 0,
    codmoneda: "",
    codsitio: "",
    TipoDocumento: {
      desctipodoc: "",
    },
    SistemaOrigen: {
      descripcion: "",
    },
    Sitio: [{ nomsitio: "" }],
    Moneda: [{ nommoneda: "" }],
  },
  deteventos: [],
  detdependientes: [],
  detmaxevento: {
    idevento: 0,
    tipoevento: "",
    desctipoevento: "",
    fecevento: "",
    codsisgen: "",
    stsevento: "",
    fecsts: "",
    codsisdest: "",
    tipodoc: "",
    iddoc: 0,
    ideventodev: null,
    CodSisGen: {
      descripcion: "",
    },
    CodSisDest: {
      descripcion: "",
    },
    descstsevento: "",
    usrcre: "",
    usrsts: "",
    descripcion: "",
  },
};




export const columnsHeadersHcdocorg: HeadersName[] = [
  {
    label: "Identidicador",
    icon: null,
    align: "center",
    minWidth: 160,
  },
  { label: "Tipo de Evento", icon: null, align: "left", minWidth: 180 },
  {
    label: "Fecha del Evento",
    icon: null,
    align: "center",
    minWidth: 180,
  },
  { label: "Origen", icon: null, minWidth: 120 },
  { label: "Estatus", icon: null, minWidth: 130 },
  {
    label: "Fecha",
    icon: null,
    align: "center",
    minWidth: 100,
  },
  { label: "Destino", icon: null, minWidth: 120 },
  { label: "Acciones", icon: null, align: "center", minWidth: 130 },
];


export interface ITSolRec {
  nrosc: number;
  fecsol: string;
  fecreq: string;
  fecrec: string;
  ccosto: string;
  codaccint: string;
  descsc: string;
  codcomprador: string;
  tipoevento: string;
  codsisaprob: string;
  fecing: string;
  fecsts: string;
  iddoc: number;
  idsolsum: number;
  stssc: string;
  idevento: number;
  usrsts: string;
  mensajes: string;
  mtosc: string;
  indres: string;
  iddocres: number;
  stsres: string;
  lugarentrega: string;
  codmoneda: string;
  codundcmp: string;
  tipoprocedimiento: string;
  nroprocedimiento: string;
  fecreserva: string;
  indcotizar: string;
  diasbandeja: number;
}

export interface ICabSolCompra {
  nrosc: number;
  fecsol: string;
  fecreq: string;
  fecrec: string;
  ccosto: string;
  codaccint: string;
  descsc: string;
  codcomprador: string | null;
  tipoevento: string | null;
  codsisaprob: string;
  fecing: string;
  fecsts: string;
  iddoc: number;
  idsolsum: number;
  stssc: string;
  idevento: number;
  usrsts: string;
  mensajes: string | null;
  mtosc: string | null;
  indres: string;
  iddocres: number | null;
  stsres: string;
  lugarentrega: string | null;
  codmoneda: string;
  codundcmp: string;
  tipoprocedimiento: string | null;
  nroprocedimiento: string | null;
  fecreserva: string | null;
  indcotizar: string;
  descaccint: string;
  desccorta: string;
  CentCosto: {
    nombre: string;
  };
}

export interface IDetSolCompra {
  nrosc: number;
  nrorengsc: number;
  tiporeng: string;
  coditem: string | null;
  descreng: string;
  cantsol: string;
  undsol: string;
  cantpend: string;
  stsrengsc: string;
  fecsts: string;
  idsolsum: number;
  nroreng: number;
  descadiitem: string | null;
  mtoneto: string;
  mtoimptos: string;
  porcimptos: string;
  indimptosman: string;
  mtorengsc: string;
  indcotizar: string;
  codserv: string | null;
  raw_rnum_: number;
  dsp_codigo: string | null;
}

export interface IFasigcom {
  cabsolcompra: ICabSolCompra;
  detsolcompra: IDetSolCompra;
}
export const initialDataFasigcom: IFasigcom = {
  cabsolcompra: {
    nrosc: 0,
    fecsol: "",
    fecreq: "",
    fecrec: "",
    ccosto: "",
    codaccint: "",
    descsc: "",
    codcomprador: null,
    tipoevento: null,
    codsisaprob: "",
    fecing: "",
    fecsts: "",
    iddoc: 0,
    idsolsum: 0,
    stssc: "",
    idevento: 0,
    usrsts: "",
    mensajes: null,
    mtosc: null,
    indres: "",
    iddocres: null,
    stsres: "",
    lugarentrega: null,
    codmoneda: "",
    codundcmp: "",
    tipoprocedimiento: null,
    nroprocedimiento: null,
    fecreserva: null,
    indcotizar: "",
    descaccint: "",
    desccorta: "",
    CentCosto: {
      nombre: "",
    },
  },
  detsolcompra: {
    nrosc: 0,
    nrorengsc: 0,
    tiporeng: "",
    coditem: null,
    descreng: "",
    cantsol: "",
    undsol: "",
    cantpend: "",
    stsrengsc: "",
    fecsts: "",
    idsolsum: 0,
    nroreng: 0,
    descadiitem: null,
    mtoneto: "",
    mtoimptos: "",
    porcimptos: "",
    indimptosman: "",
    mtorengsc: "",
    indcotizar: "",
    codserv: null,
    raw_rnum_: 0,
    dsp_codigo: null,
  },
};

export interface FormContextProps {
  formData: IFasigcom;
  setFormData: React.Dispatch<React.SetStateAction<IFasigcom>>;
  initialData: IFasigcom;
}

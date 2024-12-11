export interface ITsolsum {
  idsolsum: number;
  fecsol: string;
  desccorta: string;
  ccosto: string;
  stssol: string;
  desccosto: string;
  descstssol: string;
  descsolsum: string;
}

export interface Root {
  cabsolsum: Cabsolsum;
  detsolsum: Detsolsum[];
  IndCatObras: "S" | "N";
}

export interface Cabsolsum {
  idsolsum: number;
  nomubic: string;
  desccorta: string;
  ccosto: string;
  descsolsum: string;
  fecsol: string;
  fecrecsol: string;
  stssol: string;
  fecreqsol: string;
  usuing: string;
  fecing: string;
  origensol: string;
  codaccint: string;
  ano: number;
  fecstssol: string;
  indcomdir: string;
  fecapresol: string;
  mensajes: string;
  iddocres: any;
  coddependencia: string;
  reserva: string;
  telefubic: any;
  codmoneda: string;
  codundcmp: string;
  codundorig: string;
  codundadmorig: string;
  codundadmpro: string;
  codalmacendestino: any;
  mtoneto: string;
  mtoimpto: string;
  iddocexterno: any;
  indcompctto: string;
  Dependencia: Dependencia;
  CentCosto: CentCosto;
  AccInt: AccInt;
  UnidadCompra: UnidadCompra;
}

export interface Dependencia {
  descdependencia: string;
}

export interface CentCosto {
  nombre: string;
}

export interface AccInt {
  descripcion: string;
}

export interface UnidadCompra {
  nombundcmp: string;
}

export interface Detsolsum {
  idsolsum: number;
  nroreng: number;
  tiporeng: string;
  descreng: string;
  destino: string;
  unidbasica: string;
  cantpend: string;
  cantsol: string;
  coditem: string;
  descadiitem: any;
  iddoc: number;
  stsrngsol: string;
  fecstsrng: string;
  destant: any;
  codcta: string;
  precio: any;
  iddocres: any;
  porcimptos: any;
  mtototrng: any;
  codclasifsnc: any;
  codserv: any;
  dsp_CodNombNorm: string;
  dsp_DescNombNorm: string;
  dsp_DescCodCta: string;
  dsp_DescTipoReng: string;
  dsp_MtoTotReng: number;
}

export interface FsolsumFormValues {
  idsolsum: number | null;
  desccorta: string;
  coddependencia: string;
  dsp_descdependencia: string;
  ccosto: string;
  dsp_nombre: string;
  codaccint: string;
  dsp_descripcion: string;
  codundcmp: string;
  dsp_nomundcmp: string;
  nomubic: string;
  telefubic: string;
  descsolsum: string;
  stssol: "ANU" | "GEN" | "RCH" | "PGN" | "PPA" | "PAE" | "RAE" | "REV" | "ELI";
  mean_stssol: string;
  fecstssol: string;
  fecsol: string;
  fecrecsol: string;
  fecreqsol: string;
  codmoneda: string;
  iddocres: string;
  origensol: string;
  iddocexterno: string;
  mtoneto: string;
  mtoimpto: string;
  reserva: string;
  indcomdir: string;
  indcompctto: string;
  codcta: string;
  dsp_DescCodCta: string;
}
export interface RenglonInterface {
  nroreng: number;
  tiporeng: string | null;
  descreng: string;
  dsp_DescTipoReng: string;
  coditem: string;
  unidbasica: string;
  cantsol: string;
  precio: string;
  porcimptos: string;
  dsp_MtoTotReng: string;
  destino: "ALMA" | "BIEN" | "COMP" | "MTTO" | "CTTO";
  stsrngsol: string;
  dsp_DescNombNorm: string | null;
  dsp_CodNombNorm: string | null;
  codcta: string;
  dsp_DescCodCta: string;
  fecstsrng: string;
  DSP_CodMonedaPrecio: string;
  codclasifsnc: string;
}
const today = new Date();

export const initialRootData: Root = {
  cabsolsum: {
    idsolsum: 0,
    nomubic: "",
    desccorta: "",
    ccosto: "",
    descsolsum: "",
    fecsol: today.toISOString().split("T")[0],
    fecrecsol: today.toISOString().split("T")[0],
    stssol: "PGN",
    fecreqsol: "",
    usuing: "",
    fecing: "",
    origensol: "LOG",
    codaccint: "",
    ano: 0,
    fecstssol: "",
    indcomdir: "",
    fecapresol: "",
    mensajes: "",
    iddocres: null,
    coddependencia: "",
    reserva: "",
    telefubic: null,
    codmoneda: "",
    codundcmp: "",
    codundorig: "",
    codundadmorig: "",
    codundadmpro: "",
    codalmacendestino: null,
    mtoneto: "",
    mtoimpto: "",
    iddocexterno: null,
    indcompctto: "",
    Dependencia: {
      descdependencia: "",
    },
    CentCosto: {
      nombre: "",
    },
    AccInt: {
      descripcion: "",
    },
    UnidadCompra: {
      nombundcmp: "",
    },
  },
  detsolsum: [],
  IndCatObras: "N",
};

export const initialRenglon: Detsolsum = {
  idsolsum: 0,
  nroreng: 0,
  tiporeng: "",
  descreng: "",
  destino: "ALMA",
  unidbasica: "",
  cantpend: "",
  cantsol: "",
  coditem: "",
  descadiitem: null,
  iddoc: 0,
  stsrngsol: "",
  fecstsrng: "",
  destant: null,
  codcta: "",
  precio: null,
  iddocres: null,
  porcimptos: null,
  mtototrng: null,
  codclasifsnc: null,
  codserv: null,
  dsp_CodNombNorm: "",
  dsp_DescNombNorm: "",
  dsp_DescCodCta: "",
  dsp_DescTipoReng: "",
  dsp_MtoTotReng: 0,
};

export interface FormContextProps {
  formData: Root;
  setFormData: React.Dispatch<React.SetStateAction<Root>>;
  initialData: Root;
}

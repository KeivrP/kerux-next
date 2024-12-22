export interface Solsummodlist {
  ano: number;
  ccosto: string;
  codaccint: string;
  descaccint: string;
  desccorta: string;
  desccosto: string;
  numsolsum: number;
}

export interface Root {
  cabssmod: Cabssmod
  detssmod: Detssmod[]
}

export interface Cabssmod {
  numsolsum: number
  nomubic: string
  desccorta: string
  ccosto: string
  descsolsum: string
  codaccint: string
  ano: number
  codmoneda: string
  CentCosto: CentCosto
  AccInt: AccInt
}

export interface CentCosto {
  nombre: string
}

export interface AccInt {
  descripcion: string
}

export interface Detssmod {
  numsolsum: number
  nroreng: number
  tiporeng: string
  descreng: string
  destino: string
  unidbasica: string
  cantsol: string
  coditem: string
  descadiitem: any
  destant: any
  codcta: string
  precio: string
  codclasifsnc: any
  codserv: any
  dsp_CodNombNorm: string
  dsp_DescNombNorm: string
  dsp_DescCodCta: string
  dsp_DescTipoReng: string
  dsp_MtoTotReng: number
}

export const initialData: Root = {
  cabssmod: {
    numsolsum: 0,
    nomubic: "",
    desccorta: "",
    ccosto: "",
    descsolsum: "",
    codaccint: "",
    ano: 0,
    codmoneda: "",
    CentCosto: {
      nombre: ""
    },
    AccInt: {
      descripcion: ""
    }
  },
  detssmod: []
};

export interface FormContextProps {
  formData: Root;
  setFormData: React.Dispatch<React.SetStateAction<Root>>;
  initialData: Root;
}


export interface IFrengsc {
    cabsolcompra: Cabsolcompra
    detsolcompra: Detsolcompra[]
    total: number
  }
  
  export interface Cabsolcompra {
    nrosc: number
    fecsol: string
    fecreq: string
    fecrec: string
    ccosto: string
    codaccint: string
    descsc: string
    codcomprador: string
    tipoevento: any
    codsisaprob: string
    fecing: string
    fecsts: string
    iddoc: number
    idsolsum: number
    stssc: string
    idevento: number
    usrsts: string
    mensajes: any
    mtosc: any
    indres: string
    iddocres: any
    stsres: string
    lugarentrega: string
    codmoneda: string
    codundcmp: string
    tipoprocedimiento: string
    nroprocedimiento: string
    fecreserva: any
    indcotizar: string
    descaccint: string
    desccorta: string
    Comprador: Comprador
    CentCosto: CentCosto
  }
  
  export interface Comprador {
    nomcomprador: string
  }
  
  export interface CentCosto {
    nombre: string
  }
  
  export interface Detsolcompra {
    nrosc: number
    nrorengsc: number
    tiporeng: string
    coditem?: string
    descreng: string
    cantsol: string
    undsol: string
    cantpend: string
    stsrengsc: string
    fecsts: string
    idsolsum: number
    nroreng: number
    descadiitem: any
    mtoneto: string
    mtoimptos: string
    porcimptos: string
    indimptosman: string
    mtorengsc: string
    indcotizar: string
    codserv: any
    raw_rnum_: number
    dsp_codigo?: string
  }

  export const initialFrengsc: IFrengsc = {
    cabsolcompra: {
      nrosc: 0,
      fecsol: "",
      fecreq: "",
      fecrec: "",
      ccosto: "",
      codaccint: "",
      descsc: "",
      codcomprador: "",
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
      stsres: '',
      lugarentrega: "",
      codmoneda: "",
      codundcmp: "",
      tipoprocedimiento: "",
      nroprocedimiento: "",
      fecreserva: null,
      indcotizar: "",
      descaccint: "",
      desccorta: "",
      Comprador: {
        nomcomprador: "",
      },
      CentCosto: {
        nombre: "",
      },
    },
    detsolcompra: [
      
    ], // Array vacío
    total: 0,
  };
  
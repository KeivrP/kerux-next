export interface Frngalm {
    detSolsum: DetSolsum;
    itemMovAlm: ItemMovAlm;
  }
  
  export interface DetSolsum {
    idsolsum: number;
    nroreng: number;
    cantsol: string;
    coditem: string;
    descreng: string;
  }
  
  export interface ItemMovAlm {
    codalmacen: number;
    codmov: string;
    cantsugerida: string;
    cantaprobada: string;
    cantdespacho: string;
    dsp_DescAlmacen: string;
    dsp_DescMov: string;
  }
  
  export const initialFrngalm: Frngalm = {
    detSolsum: {
      idsolsum: 0,
      nroreng: 0,
      cantsol: '',
      coditem: '',
      descreng: ''
    },
    itemMovAlm: {
      codalmacen: 0,
      codmov: '',
      cantsugerida: '',
      cantaprobada: '',
      cantdespacho: '',
      dsp_DescAlmacen: '',
      dsp_DescMov: ''
    }
  };
  
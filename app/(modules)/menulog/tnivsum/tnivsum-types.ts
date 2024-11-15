export interface ITnivsum {
    nivelsum: string;
    descnivel: string;
    indgeneral: string;
    raw_rnum_?: number;

  }
  export interface IFnivsum {
    nivelsum: string;
    dsp_desccosto: string;
    ccosto: string;
  }

  export interface Root {
    cabnivaut: Cabnivaut
    detccostoniv: Detccostoniv[]
  }
  
  export interface Cabnivaut {
    nivelsum: string
    descnivel: string
    indgeneral: string
  }
  
  export interface Detccostoniv {
    nivelsum: string
    ccosto: string
    dsp_desccosto: string
  }
  
  
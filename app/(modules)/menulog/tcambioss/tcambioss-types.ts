

export interface Cambiolist {
  codmoneda:      null;
  desccambio:     string;
  feccambio:      Date;
  iddocaum:       null;
  idsolsum:       number;
  mtoimptocambio: string;
  mtonetocambio:  string;
  mtototalcambio: string;
  nrocambio:      number;
  stscamb:        string;
  usuing:         string;
 }

 export interface Detail {
  cambiolist: Cambiolist[]
  total: number
  maxPage: number
}

export interface Rnglist {
  idsolsum: number
  nrocambio: number
  nroreng: number
  tiporeng: string
  codigo: string
  coditem: string
  codserv: any
  descreng: string
  unidbasica: string
  cantsolorig: string
  cantsolcamb: any
  precioorig: string
  preciocambio: string
  porcimptoorig: string
  porcimptocamb: string
  mtototreng: number
  destino: string
  stsrngsol: string
  descadiitem: any
  codcta: number
  desccta: string
  codmoneda: string
  codclasifsnc: any
  fecultcom: string
}


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


export interface ITcambiosRoot {
  cabsolsum: Cabsolsum
  cabcambio: Cabcambio
  rengcambio: Rengcambio[]
  TotCambio: TotCambio[]
}

export interface Cabsolsum {
  idsolsum: number
  nomubic: string
  desccorta: string
  ccosto: string
  descsolsum: string
  fecsol: string
  fecrecsol: string
  stssol: string
  fecreqsol: string
  usuing: string
  fecing: string
  origensol: string
  codaccint: string
  ano: number
  fecstssol: string
  indcomdir: string
  fecapresol: any
  mensajes: any
  iddocres: number
  coddependencia: string
  reserva: string
  telefubic: string
  codmoneda: string
  codundcmp: string
  codundorig: string
  codundadmorig: string
  codundadmpro: string
  codalmacendestino: any
  mtoneto: string
  mtoimpto: string
  iddocexterno: any
  indcompctto: string
}

export interface Cabcambio {
  idsolsum: number
  nrocambio: number
  feccambio: string
  desccambio: string
  iddocaum: any
  stscamb: string
  codmoneda: any
  mtonetocambio: string
  mtoimptocambio: string
  mtototalcambio: string
  usuing: string
  descstscamb: string
}

export interface TotCambio {
  netocambio: number
  imptocambio: number
  netoproy: number
  imptoproy: number
}

export interface Rengcambio {
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

export interface NewRenCambio {
  idsolsum: number
  nroreng: number
  tiporeng: string
  codigo: string
  coditem: string
  codserv: any
  descreng: string
  unidbasica: string
  cantsol: string
  destino: string
  stsrngsol: string
  preciocambio: any
  porcimptocamb: any
}



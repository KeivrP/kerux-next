export interface Root {
  rengsolsum: Rengsolsum
  cnsprov: string
}

export interface Rengsolsum {
  idsolsum: number
  nroreng: number
  dsp_fecsol: string
  dsp_desccorta: string
  sit_renglon_compras: SitRenglonCompras
}

export interface SitRenglonCompras {
  solcompra: Solcompra
  cotizacion: Cotizacion[]
  orden_compra: OrdenCompra[]
}

export interface Solcompra {
  nrosc: number
  nrorengsc: number
  tiporeng: string
  coditem: string
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
  fecrec: string
  dsp_codigo: string
}

export interface Cotizacion {
  numcot: number
  nrorengcot: number
  nrosc: number
  nrorengsc: number
  tiporeng: string
  descrenglon: string
  stsreng: string
  coditem: string
  undsol: string
  fecsts: string
  preciounit?: string
  cantsol: string
  cantaprob: string
  fecentrega: any
  cantcotiz?: string
  cantconv?: string
  undcmp?: string
  descadiitem: any
  codcatg?: string
  porccat?: string
  inddetreng: string
  indimptoman: string
  mtoimpto: string
  mtoimptoaprob: string
  indexonerado: string
  codserv: any
  numprov: number
  nomprov: string
  cantsolicitada: number
  cantcotizada: number
  feccot: string
  total_reng: number
}

export interface OrdenCompra {
  idordcmp: number
  numoc: number
  fecoc: string
  numcot: number
  numbenef: number
  nombre: string
  cantpenoc: number
  cantactoc: number
  undcmp: string
  cantrecoc: number
  fecsts: string
  preciounit: number
  total_reng: number
}

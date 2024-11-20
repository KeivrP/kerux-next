export interface Tipocompundlist {
  codcontoc: null | string;
  codundcmp: string;
  desctipocom: string;
  formatocambio: string;
  formatoorden: null | string;
  nombundcmp: string;
  tipocompra: number;
  tipocontoc: Tipocontoc;
}

export enum Tipocontoc {
  E = "E",
  G = "G",
}

export const TipoCont = [
    {
      value: "E",
      name: "Especifico",
    },
    {
      value: "G",
      name: "General",
    },
  ];
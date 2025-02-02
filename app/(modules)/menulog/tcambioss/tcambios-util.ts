import { split, map, toNumber } from 'lodash';

export const obtenerIds = (idCodificado: string): [number, number] => {
  const [id, cambio] = split(idCodificado, '-');
  return map([id, cambio], toNumber) as [number, number];
};
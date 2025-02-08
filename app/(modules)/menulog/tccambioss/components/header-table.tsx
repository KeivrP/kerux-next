import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";

export const columnsFilter: Filter[] = [
  { id: "idsolsum", type: "number", column: "ID Solsum", value: "" },
  { id: "nrocambio", type: "number", column: "Nro Cambio", value: "" },
  { id: "desccambio", type: "desc", column: "Descripción", value: "" },
  { id: "feccambio", type: "date", column: "Fecha de Cambio", value: "" },
  { id: "stscamb", type: "desc", column: "Estatus", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "idsolsum", column: "ID Solsum" },
  { id: "nrocambio", column: "nrocambio" },
  { id: "desccambio", column: "Descripción" },
  { id: "feccambio", column: "Fecha de Cambio" },
  { id: "stscamb", column: "Estatus" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "ID Solsum", align: "center", minWidth: 140 },
  {
    label: "Cambio",

    align: "center",
    minWidth: 140,
  },
  { label: "Descripción", minWidth: 180 },
  {
    label: "Fecha",
    align: "center",
    minWidth: 140,
  },
  {
    label: "Estatus",
    align: "center",
    minWidth: 140,
  },
];


export const columnsHeadersSheet: HeadersName[] = [
  { label: "Nro", align: "right", minWidth: 20 },
  {
    label: "Tipo",

    align: "center",
    minWidth: 60,
  },
  { label: "Item/serv", minWidth: 100, align: "center" },
  {
    label: "Descripción",
    align: "left",
    minWidth: 220,
  },
  {
    label: "Unidad",
    align: "center",
    minWidth: 60,
  },
  {
    label: "Cantidad",
    align: "center",
    minWidth: 60,
  },
  {
    label: "Costo Unitario",
    align: "center",
    minWidth: 100,
  },
  {
    label: "Nvo.Cost.Unit",
    align: "center",
    minWidth: 100,

  },
  {
    label: "%",
    align: "center",
    minWidth: 20,
  },
  {
    label: "Destino",
    align: "center",
    minWidth: 40,
  },
  { label: "Total Renglon", align: "center", width: 100 },
];



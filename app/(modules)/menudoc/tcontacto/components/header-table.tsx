import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";


export const columnsFilter: Filter[] = [
  { id: "nombre", type: "desc", column: "Nombre", value: "" },
  { id: "apellido", type: "desc", column: "Apellido", value: "" },
  { id: "cedula", type: "number", column: "cedula", value: "" },
  { id: "BENEFICIARIOS.nombre", type: "desc", column: "Nombre Beneficario", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "nombre", column: "Nombre" },
  { id: "nombre", column: "Apellido" },
  { id: "apellido", column: "Cedula" },
  { id: "BENEFICIARIOS.nombre", column: "Beneficario" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Nombre", icon:null, minWidth: 140 },
  {
    label: "Apellido",
    icon: null,
    minWidth: 140,
  },
  { label: "Cedula", icon: null, minWidth: 180 },
  {
    label: "Beneficiario",
    icon: null,
    minWidth: 140,
  },
];



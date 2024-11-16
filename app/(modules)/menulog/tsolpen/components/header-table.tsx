import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { PackagePlus } from "lucide-react";
import { ITsolsum } from "../../tsolsum/tsolsum-types";

export const columnsFilter: Filter[] = [
  { id: "idsolsum", type: "number", column: "ID Solicitud", value: "" },
  { id: "fecsol", type: "date", column: "F. Solicitud", value: "" },
  { id: "fecrecsol", type: "date", column: "F. Rec. Sol.", value: "" },
  { id: "DESCCORTA", type: "desc", column: "Descripción", value: "" },
  {
    id: "CENTS_COSTO.ccosto",
    type: "number",
    column: "C. de Costo",
    value: "",
  },
  {
    id: "ACCS_INT.codaccint",
    type: "number",
    column: "U. de Compra",
    value: "",
  },
  { id: "stssol", type: "desc", column: "Estatus", value: "" },
];

export const columnsOrder: Order[] = [
  { id: "idsolsum", column: "ID Solicitud" },
  { id: "fecsol", column: "F. Solicitud" },
  { id: "fecrecsol", column: "F. Rec. Sol" },
  { id: "nombre", column: "Descripción" },
  { id: "CENTS_COSTO.ccosto", column: "C. de Costo" },
  { id: "ACCS_INT.codaccint", column: "U. de Compra" },
  { id: "stssol", column: "Estatus" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "ID Solicitud", icon: null, align: "center", minWidth: 130 },
  {
    label: "F. Solicitud",
    align: "center",
    minWidth: 140,
  },
  {
    label: "F. Rec. Sol",
    align: "center",
    minWidth: 140,
  },
  { label: "Descripción" },
  { label: "C. de Costo", minWidth: 140, align: "center" },
  { label: "U. de Compra", minWidth: 155, align: "center" },
  { label: "Estatus", minWidth: 120 },
  { label: "Acciones", align: "center", width: 100 },
];

export const Acciones = ({
  row,
  onCreate,
  onOpen,
}: {
  row: ITsolsum;
  onOpen: (id: number) => void;
  onCreate: (id: number) => void;
}) => {
  const theme = useTheme();

  return (
    <span
      style={{
        color: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
    >
      <Tooltip
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "50%",
        }}
        title="Abrir"
      >
        <IconButton
          onClick={() => onOpen(row.idsolsum)}
          color="primary"
          size="small"
        >
          <OpenIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "50%",
        }}
        title="Abrir"
      >
        <IconButton
          onClick={() => onCreate(row.idsolsum)}
          color="primary"
          size="small"
        >
          <PackagePlus color="green" size={18} />
        </IconButton>
      </Tooltip>
    </span>
  );
};

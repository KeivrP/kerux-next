'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { ITcotresp } from "../Tcotresp-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, DevolverIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "numcot", type: "number", column: "Nro. Cotiz.", value: "" },
  { id: "feccot", type: "date", column: "F. Cotizacón", value: "" },
  { id: "fecsts", type: "date", column: "F. Estatus", value: "" },
  { id: "nrosc", type: "desc", column: "#Sol. Comp.", value: "" },
  { id: "numprov", type: "desc", column: "Cod.", value: "" },
  { id: "nomprov", type: "desc", column: "Proveedor", value: "" },
  { id: "stscot", type: "desc", column: "Status", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "numcot", column: "Nro. Cotiz." },
  { id: "feccot", column: "F. Cotizacón" },
  { id: "fecsts", column: "F. Estatus" },
  { id: "nrosc", column: "#Sol. Comp." },
  { id: "numprov", column: "Cod." },
  { id: "nomprov", column: "Proveedor" },
  { id: "stscot", column: "Status" },
];

export const columnsHeadersTcotresp: HeadersName[] = [

  { label: "Nro. Cotiz.", icon: null, align: "left", minWidth: 130 },
  { label: "F. Cotizacón", icon: null, align: "left", minWidth: 130 },
  { label: "F. Estatus", icon: null, align: "left", minWidth: 130 },
  { label: "#Sol. Comp.", icon: null, align: "left", minWidth: 130 },
  { label: "Cod.", icon: null, align: "left", minWidth: 130 },
  { label: "Proveedor", icon: null, align: "left", minWidth: 130 },
  { label: "Status", icon: null, align: "left", minWidth: 130 },
  {
      label: "Acciones",
      icon: null,
      align: "center",
      width: 80,
    },

];

export const Acciones = ({
  row,
  onReject,
  onEdit,
}: {
  row: ITcotresp;
  onReject: (id: number) => void;
  onEdit: (id: number) => void;
}) => {
  const theme = useTheme();

  return (
    <span>
      <span
        style={{
         color: theme.palette.primary.main,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          paddingLeft: "16px",
          paddingRight: "16px",
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
            onClick={() => onEdit(row.numcot)}
            color="primary"
            size="small"
          >
            <OpenIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          sx={{ backgroundColor: theme.palette.background.default }}
          title="Rechazar"
        >
          <IconButton
            onClick={() => onReject(row.numcot)}
            color="primary"
            size="small"
          >
            <DevolverIcon />
          </IconButton>
        </Tooltip>
      </span>
    </span>
  );
};

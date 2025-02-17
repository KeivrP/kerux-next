'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { ITcotpenp } from "../Tcotpenp-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DevolverIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "numcot", type: "number", column: "Nro. Cotiz.", value: "" },
  { id: "stscot", type: "desc", column: "Sts.", value: "" },
  { id: "feccot", type: "date", column: "Fec. Cotiz.", value: "" },
  { id: "nrosc", type: "number", column: "#Sol. Comp.", value: "" },
  { id: "fecsts", type: "date", column: "F. Camb. Sts.", value: "" },
  { id: "numprov", type: "number", column: "Prov.", value: "" },
  { id: "nomprov", type: "desc", column: "Proveedor", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "numcot", column: "Nro. Cotiz." },
  { id: "stscot", column: "Sts." },
  { id: "feccot", column: "Fec. Cotiz." },
  { id: "nrosc", column: "#Sol. Comp." },
  { id: "fecsts", column: "F. Camb. Sts." },
  { id: "numprov", column: "Prov." },
  { id: "nomprov", column: "Proveedor" },
];

export const columnsHeadersTcotpenp: HeadersName[] = [

  { label: "Nro. Cotiz.", icon: null, align: "left", minWidth: 130 },
  { label: "Sts.", icon: null, align: "left", minWidth: 130 },
  { label: "Fec. Cotiz.", icon: null, align: "left", minWidth: 130 },
  { label: "#Sol. Comp.", icon: null, align: "left", minWidth: 130 },
  { label: "F. Camb. Sts.", icon: null, align: "left", minWidth: 130 },
  { label: "Prov.", icon: null, align: "left", minWidth: 130 },
  { label: "Proveedor", icon: null, align: "left", minWidth: 130 },
  {
      label: "Acciones",
      icon: null,
      align: "center",
      width: 80,
    },

];

export const Acciones = ({
  row,
  onEdit,
  onReject,
}: {
  row: ITcotpenp;
  onEdit: (id: number) => void;
  onReject: (id: number) => void;
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

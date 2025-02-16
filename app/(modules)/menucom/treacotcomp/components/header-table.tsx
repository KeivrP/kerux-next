'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { ITreacotcomp } from "../Treacotcomp-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "numcot", type: "number", column: "Nro. Cotiz.", value: "" },
  { id: "stscot", type: "desc", column: "Sts.", value: "" },
  { id: "feccot", type: "date", column: "F. Cotización", value: "" },
  { id: "nrosc", type: "number", column: "Nro. SC", value: "" },
  { id: "numprov", type: "number", column: "Cod. Pro", value: "" },
  { id: "nomprov", type: "desc", column: "Proveedor", value: "" },
  { id: "codcomprador", type: "desc", column: "Comprador", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "numcot", column: "Nro. Cotiz." },
  { id: "stscot", column: "Sts." },
  { id: "feccot", column: "F. Cotización" },
  { id: "nrosc", column: "Nro. SC" },
  { id: "numprov", column: "Cod. Pro" },
  { id: "nomprov", column: "Proveedor" },
  { id: "codcomprador", column: "Comprador" },
];

export const columnsHeadersTreacotcomp: HeadersName[] = [

  { label: "Nro. Cotiz.", icon: null, align: "left", minWidth: 130 },
  { label: "Sts.", icon: null, align: "left", minWidth: 130 },
  { label: "F. Cotización", icon: null, align: "left", minWidth: 130 },
  { label: "Nro. SC", icon: null, align: "left", minWidth: 130 },
  { label: "Cod. Pro", icon: null, align: "left", minWidth: 130 },
  { label: "Proveedor", icon: null, align: "left", minWidth: 130 },
  { label: "Comprador", icon: null, align: "left", minWidth: 130 },
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
}: {
  row: ITreacotcomp;
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
            onClick={() => onEdit(row.nrosc)}
            color="primary"
            size="small"
          >
            <OpenIcon />
          </IconButton>
        </Tooltip>

      </span>
    </span>
  );
};

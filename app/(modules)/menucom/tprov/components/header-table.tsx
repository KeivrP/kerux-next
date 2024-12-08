'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { ITprov } from "../Tprov-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "numprov", type: "number", column: "Número", value: "" },
  { id: "nomprov", type: "desc", column: "Nombre del Proveedor", value: "" },
  { id: "tipoprov", type: "desc", column: "Tipo", value: "" },
  { id: "numbenef", type: "number", column: "Benef.", value: "" },
  { id: "fecing", type: "desc", column: "Fecha Ingreso", value: "" },
  { id: "fecvigenciareg", type: "desc", column: "Fecha Vigencia", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "numprov", column: "Número" },
  { id: "nomprov", column: "Nombre del Proveedor" },
  { id: "tipoprov", column: "Tipo" },
  { id: "numbenef", column: "Benef." },
  { id: "fecing", column: "Fecha Ingreso" },
  { id: "fecvigenciareg", column: "Fecha Vigencia" },
];

export const columnsHeadersTprov: HeadersName[] = [

  { label: "Número", icon: null, align: "left", minWidth: 130 },
  { label: "Nombre del Proveedor", icon: null, align: "center", minWidth: 130 },
  { label: "Tipo", icon: null,  align: "center", minWidth: 130 },
  { label: "Benef.", icon: null, align: "left", minWidth: 130 },
  { label: "Fecha Ingreso", icon: null, align: "left", minWidth: 130 },
  { label: "Fecha Vigencia", icon: null, align: "left", minWidth: 130 },
    {
      label: "Acciones",
      icon: null,
      align: "center",
      width: 80,
    },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: ITprov;
  onDelete: (id: number) => void;
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
            onClick={() => onEdit(row.numprov)}
            color="primary"
            size="small"
          >
            <OpenIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          sx={{ backgroundColor: theme.palette.background.default }}
          title="Eliminar"
        >
          <IconButton
            onClick={() => onDelete(row.numprov)}
            color="primary"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </span>
    </span>
  );
};

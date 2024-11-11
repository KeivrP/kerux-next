
'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { Beneficiariolist } from "../tbenef-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "BENEFICIARIOS.numbenef", type: "number", column: "Numero del Benef", value: "" },
  { id: "BENEFICIARIOS.numid", type: "number", column: "Rif-CI", value: "" },
  { id: "BENEFICIARIOS.nombre", type: "desc", column: "Nombre", value: "" },
  { id: "BENEFICIARIOS.appabrev", type: "desc", column: "Nombre Abreviado", value: "" },
  { id: "BENEFICIARIOS.indactivo", type: "check", column: "Estatus", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "BENEFICIARIOS.numbenef", column: "Numero del Benef" },
  { id: "BENEFICIARIOS.numid", column: "Rif/CI" },
  { id: "BENEFICIARIOS.nombre", column: "Nombre" },
  { id: "BENEFICIARIOS.appabrev", column: "Nombre Abreviado" },
  { id: "BENEFICIARIOS.indactivo", column: "Estatus" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Num. Beneficiario", icon: null, align: "center", minWidth: 140 },
  {
    label: "Identificacion",
    icon: null,
    align: "center",
    minWidth: 140,
  },
  { label: "Nombre", icon: null, minWidth: 180 },
  { label: "Nombre Abreviado", icon: null, minWidth: 140 },
  {
    label: "Estatus",
    icon: null,
    align: "center",
    minWidth: 140,
  },
  { label: "Acciones", icon: null, align: "center", },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Beneficiariolist;
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
            onClick={() => onEdit(row.numbenef)}
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
            onClick={() => onDelete(row.numbenef)}
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

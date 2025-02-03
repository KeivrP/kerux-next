'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { ITreacomp } from "../Treacomp-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "nrosc", type: "number", column: "Nro. Sc", value: "" },
  { id: "idsolsum", type: "number", column: "Id. Solicitud", value: "" },
  { id: "fecsol", type: "date", column: "F. Solicitud", value: "" },
  { id: "fecrec", type: "date", column: "F. Recep.", value: "" },
  { id: "descsc", type: "desc", column: "Descripción", value: "" },
  { id: "stsres", type: "desc", column: "Sts", value: "" },
  { id: "codcomprador", type: "desc", column: "Comprador", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "nrosc", column: "Nro. Sc" },
  { id: "idsolsum", column: "Id. Solicitud" },
  { id: "fecsol", column: "F. Solicitud" },
  { id: "fecrec", column: "F. Recep." },
  { id: "descsc", column: "Descripción" },
  { id: "stsres", column: "Sts" },
  { id: "codcomprador", column: "Comprador" },
];

export const columnsHeadersTreacomp: HeadersName[] = [

  { label: "Nro. Sc", icon: null, align: "left", minWidth: 130 },
  { label: "Id. Solicitud", icon: null, align: "left", minWidth: 130 },
  { label: "F. Solicitud", icon: null, align: "left", minWidth: 130 },
  { label: "F. Recep.", icon: null, align: "left", minWidth: 130 },
  { label: "Descripción", icon: null, align: "left", minWidth: 130 },
  { label: "Sts", icon: null, align: "left", minWidth: 130 },
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
  onDelete,
  onEdit,
}: {
  row: ITreacomp;
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
            onClick={() => onEdit(row.idsolsum)}
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
            onClick={() => onDelete(row.idsolsum)}
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

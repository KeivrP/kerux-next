'use client'
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { ITtdpcomp } from "../Ttdpcomp-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "tipodoc", type: "number", column: "Tipo Doc.", value: "" },
  { id: "desctipodoc", type: "desc", column: "Desc. Tipo Doc", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "tipodoc", column: "Tipo Doc." },
  { id: "desctipodoc", column: "Desc. Tipo Doc" },
];

export const columnsHeadersTtdpcomp: HeadersName[] = [

  { label: "Tipo Doc.", icon: null, align: "left", minWidth: 130 },
  { label: "Desc. Tipo Doc", icon: null, align: "left", minWidth: 130 },
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
  row: ITtdpcomp;
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
            onClick={() => onEdit(row.tipodoc)}
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
            onClick={() => onDelete(row.tipodoc)}
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

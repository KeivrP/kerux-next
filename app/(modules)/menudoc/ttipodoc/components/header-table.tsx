import { CalendarIcon } from "@mui/x-date-pickers";

import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Tipodoclist } from "../ttipodc-types";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "tipodoc", type: "desc", column: "Tipo", value: "" },
  { id: "desctipodoc", type: "desc", column: "Descripcion", value: "" },
  { id: "codruta", type: "desc", column: "Ruta", value: "" },
  { id: "indactivo", type: "check", column: "Activo", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "tipodoc", column: "Tipo" },
  { id: "codruta", column: "Ruta" },
  { id: "desctipodoc", column: "Descripcion" },
  { id: "indactivo", column: "Activo" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Tipo", icon: null, align: "center", minWidth: 140 },
  {
    label: "Descripcion",
    icon: null,
    align: "left",
    minWidth: 140,
  },
  {
    label: "Ruta",
    icon: null,
    align: "left",
    minWidth: 140,
  },
  {
    label: "Activo",
    icon: null,
    align: "center",
    minWidth: 80,
  },
  { label: "Acciones", icon: null, align: "center" },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Tipodoclist;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) => {
  const theme = useTheme();

  return (
    <div
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
    </div>
  );
};

import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Cambiolist } from "../tcambioss-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "idsolsum", type: "number", column: "ID Solsum", value: "" },
  { id: "nrocambio", type: "number", column: "Nro Cambio", value: "" },
  { id: "desccambio", type: "desc", column: "Descripcion", value: "" },
  { id: "feccambio", type: "date", column: "Fecha de Cambio", value: "" },
  { id: "stscamb", type: "desc", column: "Estatus", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "idsolsum", column: "ID Solsum" },
  { id: "nrocambio", column: "nrocambio" },
  { id: "desccambio", column: "Descripcion" },
  { id: "feccambio", column: "Fecha de Cambio" },
  { id: "stscamb", column: "Estatus" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "ID Solsum",  align: "center", minWidth: 140 },
  {
    label: "Cambio",
   
    align: "center",
    minWidth: 140,
  },
  { label: "Descripcion",  minWidth: 180 },
  {
    label: "Fecha",
    align: "center",
    minWidth: 140,
  },
  {
    label: "Estatus",
    align: "center",
    minWidth: 140,
  },
  { label: "Acciones", align: "center", width: 100 },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Cambiolist;
  onDelete: (idsolsum: number) => void;
  onEdit: (idsolsum: number) => void;
}) => {
  const theme = useTheme();

  return (
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
  );
};

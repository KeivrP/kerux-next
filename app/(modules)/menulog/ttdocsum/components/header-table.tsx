import { Tipodoclist } from "@/app/(modules)/menudoc/ttipodoc/ttipodc-types";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";

export const columnsFilter: Filter[] = [
  { id: "TIPO_DOC_LOG.tipodoc", type: "desc", column: "Tipo Doc", value: "" },
  { id: "desctipodoc", type: "desc", column: "Descripcion", value: "" },
  { id: "TIPO_DOC_LOG.codsis", type: "desc", column: "Sistema", value: "" },
  { id: "TIPO_DOC_LOG.tiposis", type: "desc", column: "Tipo Sistema", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "TIPO_DOC_LOG.tipodoc", column: "Tipo Doc" },
  { id: "TIPO_DOC_LOG.codsis", column: "Sistema" },
  { id: "desctipodoc", column: "Descripcion" },
  { id: "TIPO_DOC_LOG.tiposis", column: "Tipo Sistema" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Tipo Doc", icon: null, align: "left", minWidth: 100 },
  {
    label: "Descripcion",
    icon: null,
    align: "left",
    minWidth: 175,
  },
  { label: "Sistema", icon: null, align: "center", minWidth: 100 },
  {
    label: "Tipo Sistema",
    icon: null,
    align: "center",
    minWidth: 100,
  },
  { label: "Acciones", icon: null, align: "center", width: 120 },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Tipodoclist;
  onDelete: (tipodoc: string) => void;
  onEdit: (tipodoc: string) => void;
}) => {
  const theme = useTheme();

  return (
    <span
      style={{
        color: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
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
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </span>
  );
};

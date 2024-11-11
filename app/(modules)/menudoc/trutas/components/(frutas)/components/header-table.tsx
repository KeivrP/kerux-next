import { HeadersName } from "@/components/table-material/genericTable";
import { PasoRutas } from "../../../trutas-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, EditIcon } from "@/components/icons/table-icon";

export const columnsHeaders: HeadersName[] = [
  { label: "Paso", icon: null, align: "center", minWidth: 140 },
  {
    label: "Sistema Origen",
    icon: null,
    align: "center",
    minWidth: 140,
  },
  { label: "Tipo de Evento", align: "center", icon: null, minWidth: 180 },
  { label: "Sistema Destino", align: "center", icon: null, minWidth: 140 },

  { label: "Acciones", icon: null, align: "center", width: 80 },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: PasoRutas;
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
            onClick={() => onEdit(row.paso)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          sx={{ backgroundColor: theme.palette.background.default }}
          title="Eliminar"
        >
          <IconButton
            onClick={() => onDelete(row.paso)}
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

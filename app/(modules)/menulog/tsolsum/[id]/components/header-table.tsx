import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, EditIcon } from "@/components/icons/table-icon";
import { Detsolsum } from "../../tsolsum-types";

export const columnsHeaders: HeadersName[] = [
  { label: "N°", align: "center", minWidth: 60 },
  { label: "Tipo", align: "left", minWidth: 80 },
  { label: "Nombre", align: "left", minWidth: 120 },
  { label: "Item", align: "center", minWidth: 100 },
  { label: "Descripción", align: "left", minWidth: 240 },
  { label: "Und.", align: "center", width: 80 },
  { label: "Cant", align: "center", width: 80 },
  { label: "Costo unitario", align: "center", minWidth: 80 },
  { label: "Iva", align: "center", width: 80 },
  { label: "Total", align: "center", minWidth: 80 },
  { label: "Destino", align: "center", width: 80 },
  { label: "Estatus", align: "center", width: 80 },
  { label: "Acción", align: "center", width: 80 },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Detsolsum;
  onDelete: (id: number) => void;
  onEdit: (id: Detsolsum) => void;
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
          title="Edit"
        >
          <IconButton
            onClick={() => onEdit(row)}
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
            onClick={() => onDelete(row.nroreng)}
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

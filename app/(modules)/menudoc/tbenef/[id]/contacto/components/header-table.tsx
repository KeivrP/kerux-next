
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Tcontactos } from "./table";


export const columnsHeaders: HeadersName[] = [
  { label: "Nombre", icon:null, minWidth: 140, align: "center" },
  {
    label: "Apellido",
    icon: null,
    minWidth: 140,
    align: "center",
  },
  { label: "Cédula", icon: null, minWidth: 180, align: "center" },
  {
    label: "Teléfono",
    icon: null,
    minWidth: 140,
    align: "center",
  },
  { label: "Email", icon: null, minWidth: 140, align: "center" },
  { label: "Tipo de contacto", icon: null, minWidth: 140, align: "center" },
  { label: "Acciones", icon: null, align: "center", },
];

interface AccionesProps {
  row: Tcontactos;
  onOpen: (row: Tcontactos) => void;
  onDelete: (id: number) => void;
}

export const Acciones = ({
  row,
  onOpen,
  onDelete,
}: AccionesProps) => {
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
        <Tooltip title="Abrir contacto">
          <IconButton
            color="primary"
            size="small"
            onClick={() => onOpen(row)}
          >
            <OpenIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar contacto">
          <IconButton
            color="primary"
            size="small"
            onClick={() => onDelete(row.idcontacto)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </span>
    </span>
  );
};



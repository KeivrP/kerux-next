import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";


export const columnsFilter: Filter[] = [
  { id: "CONTACTOS.nombre", type: "desc", column: "Nombre", value: "" },
  { id: "apellido", type: "desc", column: "Apellido", value: "" },
  { id: "cédula", type: "number", column: "cédula", value: "" },
  { id: "CBENEFICIARIOS.nombre", type: "desc", column: "Nombre Beneficiario", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "CONTACTOS.nombre", column: "Nombre" },
  { id: "nombre", column: "Apellido" },
  { id: "apellido", column: "Cédula" },
  { id: "BENEFICIARIOS.nombre", column: "Beneficiario" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Nombre", icon:null, minWidth: 140 },
  {
    label: "Apellido",
    icon: null,
    minWidth: 140,
  },
  { label: "Cédula", icon: null, minWidth: 180 },
  {
    label: "Beneficiario",
    icon: null,
    minWidth: 140,
  },
  { label: "Acciones", icon: null, align: "center", },
];

export const Acciones = ({
  row,
  onOpen,
}: {
  row: any;
  onOpen: (id: number) => void;
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
        <Tooltip title="Abrir contacto">
          <IconButton     color="primary"
            size="small" onClick={() => onOpen(row.numbenef)}>
            <OpenIcon />
          </IconButton>
        </Tooltip>
       
      </span>
    </span>
  );
};



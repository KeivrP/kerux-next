import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Cambiolist, Rengcambio } from "../tcambioss-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import LongMenu, { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  { id: "idsolsum", type: "number", column: "ID Solsum", value: "" },
  { id: "nrocambio", type: "number", column: "Nro Cambio", value: "" },
  { id: "desccambio", type: "desc", column: "Descripción", value: "" },
  { id: "feccambio", type: "date", column: "Fecha de Cambio", value: "" },
  { id: "stscamb", type: "desc", column: "Estatus", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "idsolsum", column: "ID Solsum" },
  { id: "nrocambio", column: "nrocambio" },
  { id: "desccambio", column: "Descripción" },
  { id: "feccambio", column: "Fecha de Cambio" },
  { id: "stscamb", column: "Estatus" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "ID Solsum", align: "center", minWidth: 140 },
  {
    label: "Cambio",

    align: "center",
    minWidth: 140,
  },
  { label: "Descripción", minWidth: 180 },
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


export const columnsHeadersSheet: HeadersName[] = [
  { label: "Nro", align: "right", minWidth: 20 },
  {
    label: "Tipo",

    align: "center",
    minWidth: 60,
  },
  { label: "Item/serv", minWidth: 100, align: "center" },
  {
    label: "Descripción",
    align: "left",
    minWidth: 220,
  },
  {
    label: "Unidad",
    align: "center",
    minWidth: 60,
  },
  {
    label: "Cantidad",
    align: "center",
    minWidth: 60,
  },
  {
    label: "Costo Unitario",
    align: "center",
    minWidth: 100,
  },
  {
    label: "Nvo.Cost.Unit",
    align: "center",
    minWidth: 100,

  },
  {
    label: "%",
    align: "center",
    minWidth: 20,
  },
  { label: "Total", align: "center", width: 100 },
  { label: "Acciones", align: "center", width: 100 },

];

export const AccionesSheet = ({
  row,
  onEdit,
  onDelete
}: {
  row: Rengcambio;
  onEdit: (data : Rengcambio) => void;
  onDelete: (idsolsum: number) => void;
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
          onClick={() => onEdit(row)}
          color="primary"
          size="small"
        >
          <OpenIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "50%",
        }}
        title="Abrir"
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

export const Acciones = ({
  row,
  onEdit,
  onDelete,
  onProcesar,
}: {
  row: Rengcambio;
  onEdit: (idsolsum: number, nrocambio: number) => void;
  onDelete: (idsolsum: number) => void;
  onProcesar: (idsolsum: number, nrocambio: number) => void;
}) => {
  const theme = useTheme();
  const options = ["Editar", "Eliminar"];

  const handleOptionSelect = (option: string): void => {
    if (option === "Editar") {
      onProcesar(row.idsolsum, row.nrocambio); // Llama a la función onEdit con el id de la fila
    } else if (option === "Eliminar") {
      onDelete(row.idsolsum); // Llama a la función onDelete con el id de la fila
    }
  };


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
          onClick={() => onEdit(row.idsolsum, row.nrocambio)} // Cambiado a onEdit aquí
          color="primary"
          size="small"
        >
          <OpenIcon />
        </IconButton>
      </Tooltip>
      <LongMenu options={options} onOptionSelect={handleOptionSelect} />

    </span>
  );
};
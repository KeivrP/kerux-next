import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { EditIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Tiporngsumlist } from "../ttiprngsum-types";

export const columnsFilter: Filter[] = [
    { id: "tiporengsumin", type: "desc", column: "Tipo", value: "" },
    { id: "desctiporeng", type: "desc", column: "Descripcion", value: "" },
    { id: "limitundtrib", type: "number", column: "Limite", value: "" },
];
export const columnsOrder: Order[] = [
    { id: "tiporengsumin", column: "Tipo" },
    { id: "desctiporeng", column: "Descripcion" },
    { id: "limitundtrib", column: "Limite" },

];


export const columnsHeaders: HeadersName[] = [
  { label: "Tipo", icon: null, align: "left", minWidth: 100 },
  {
    label: "Descripcion",
    icon: null,
    align: "left",
    minWidth: 175,
  },
  { label: "Limite UT", icon: null, align: "center", minWidth: 100 },
 
  { label: "Acciones", icon: null, align: "center", width: 100 },
];

export const Acciones = ({
  row,
  onEdit,
}: {
  row: Tiporngsumlist;
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
        title="Editar"
      >
        <IconButton
          onClick={() => onEdit(row.tiporengsumin)}
          color="primary"
          size="small"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

     
    </span>
  );
};

import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { ColetillasInterface } from "../tcoleti-types";

export const columnsFilter: Filter[] = [
  { id: "codcolet", type: "desc", column: "Coletilla", value: "" },
  { id: "desccolet", type: "desc", column: "Descripción", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "codcolet", column: "Coletilla" },
  { id: "desccolet", column: "Descripción" },
];

export const columnsHeaders: HeadersName[] = [
  {
    label: "Coletilla",

    align: "left",
    minWidth: 80,
    tooltip: "Coletilla",
  },
  {
    label: "Descripción",

    tooltip: "Descripción",
  },

  { label: "Acciones", align: "center", tooltip: "Acciones", width: 80 },
];


export const Acciones = ({
    row,
    onDelete,
    onEdit,
  }: {
    row: ColetillasInterface;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
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
              onClick={() => onEdit(row.codcolet)}
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
              onClick={() => onDelete(row.codcolet)}
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
  


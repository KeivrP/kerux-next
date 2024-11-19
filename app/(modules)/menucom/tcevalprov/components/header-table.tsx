import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Header } from "next/dist/lib/load-custom-routes";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { Criterioslist } from "../tcevalprov-type";

export const columnsFilter: Filter[] = [
  { id: "codcritevalprov", type: "desc", column: "Codigo", value: "" },
  { id: "desccrievalprov", type: "desc", column: "Descripcion", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "codcritevalprov", column: "Codigo"},
  { id: "desccrievalprov", column: "Descripcion" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Codigo", icon: null, align: "left", minWidth: 100 },
  {
    label: "Descripcion",
    icon: null,
    align: "left",
    minWidth: 140,
  },
  {
    label: "Acciones",
    icon: null,
    align: "center",
    width: 80,
  },
];

export const Acciones = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Criterioslist;
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
            onClick={() => onEdit(row.codcritevalprov)}
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
            onClick={() => onDelete(row.codcritevalprov)}
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

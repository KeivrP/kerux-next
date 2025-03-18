import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { RuteoUnidadeslist } from "../truteoundcmp-type";

export const columnsFilter: Filter[] = [
  { id: "RUTEO_UNDCOMPRA.codundcmp", type: "desc", column: "Unidad de compra", value: "" },
  { id: "RUTEO_UNDCOMPRA.ccosto", type: "desc", column: "Centro de costo", value: "" },
  { id: "RUTEO_UNDCOMPRA.codgrupo", type: "desc", column: "Grupo Item", value: "" },

];
export const columnsOrder: Order[] = [
  { id: "RUTEO_UNDCOMPRA.codundcmp", column: "Unidad de Compra" },
  { id: "RUTEO_UNDCOMPRA.ccosto", column: "Centro de costo" },
  { id: "RUTEO_UNDCOMPRA.codgrupo", column: "Grupo Item" },

];

export const columnsHeaders: HeadersName[] = [
    { label: "Unidad de compra", icon: null, align: "left", minWidth: 100 },
    {
      label: "Centro de costo",
      icon: null,
      align: "left",
      minWidth: 140,
    },
    { label: "Grupo Item", icon: null, minWidth: 180, align: 'center' },
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
    row: RuteoUnidadeslist;
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
              onClick={() => onEdit(row.codundcmp)}
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
              onClick={() => onDelete(row.codundcmp)}
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
  
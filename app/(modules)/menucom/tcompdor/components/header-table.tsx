import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Compradoreslist } from "../tcompdor-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
    { id: "codundcmp", type: "desc", column: "Codigo", value: "" },
    { id: "nomcomprador", type: "desc", column: "Nombre", value: "" },
    { id: "COMPRADORES.codundcmp", type: "desc", column: "Unidad", value: "" },
    { id: "nivelusuario", type: "desc", column: "Nivel Ejecucion", value: "" },
    { id: "codusuariosup", type: "desc", column: "Supervisor", value: "" },
  

];
export const columnsOrder: Order[] = [
    { id: "codundcmp", column: "Codigo" },
    { id: "nomcomprador", column: "Nombre" },
    { id: "COMPRADORES.codundcmp", column: "Unidad" },
    { id: "nivelusuario", column: "Nivel Ejecucion" },
    { id: "codusuariosup", column: "Supervisor" },

];


export const columnsHeaders: HeadersName[] = [
    { label: "Codigo", icon: null, align: "left", minWidth: 100 },
    {
      label: "Nombre",
      icon: null,
      align: "left",
      minWidth: 140,
    },
    { label: "Unidad", icon: null, minWidth: 180, align: 'left' },
    { label: "Nivel de Ejecucion", icon: null, minWidth: 180, align: 'center' },
    { label: "Supervisor", icon: null, minWidth: 180, align: 'left' },
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
    row: Compradoreslist;
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
  



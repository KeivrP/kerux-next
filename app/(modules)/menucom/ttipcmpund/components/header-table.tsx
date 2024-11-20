import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Tipocompundlist } from "../ttipcmpund-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";


export const columnsFilter: Filter[] = [
    { id: "TIPOSCOMP_UNIDAD.tipocompra", type: "number", column: "Tipo de Compra", value: "" },
    { id: "TIPOSCOMP_UNIDAD.codundcmp", type: "desc", column: "Unidad de Compra", value: "" },
    { id: "formatoorden", type: "desc", column: "Orden de compra", value: "" },
    { id: "formatocambio", type: "desc", column: "Cambio de orden", value: "" },
    { id: "tipocontoc", type: "desc", column: "Tipo de Contador", value: "" },
    { id: "codcontoc", type: "desc", column: "Contador", value: "" },
  

];
export const columnsOrder: Order[] = [
    { id: "TIPOSCOMP_UNIDAD.tipocompra", column: "Tipo de Compra" },
    { id: "TIPOSCOMP_UNIDAD.codundcmp", column: "Unidad de Compra" },
    { id: "formatoorden", column: "Orden de Compra" },
    { id: "formatocambio", column: "Cambio de orden" },
    { id: "tipocontoc", column: "Tipo de Contador" },
    { id: "codcontoc", column: "Contador" },

];


export const columnsHeaders: HeadersName[] = [
    { label: "Tipo de Compra", icon: null, align: "left", minWidth: 100 },
    {
      label: "Unidad de Compra",
      icon: null,
      align: "left",
      minWidth: 140,
    },
    {
      label: "Orden de compra",
      icon: null,
      align: "left",
      minWidth: 140,
    },
    {
      label: "Cambio de orden",
      icon: null,
      align: "left",
      minWidth: 140,
    },
    {
      label: "Tipo de Contador",
      icon: null,
      align: "left",
      minWidth: 140,
    },
    {
      label: "Contador",
      icon: null,
      align: "center",
      minWidth: 100,
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
    row: Tipocompundlist;
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
  

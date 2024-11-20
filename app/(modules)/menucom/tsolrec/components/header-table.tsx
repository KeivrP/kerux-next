import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { ITSolRec } from "../tsolrec-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";


export const columnsFilter: Filter[] = [
    { id: "iddoc", type: "number", column: "Id Doc", value: "" },
    { id: "nrosc", type: "number", column: "Nro. Solicitud", value: "" },
    { id: "descsc", type: "desc", column: "Descripción", value: "" },
    { id: "fecrec", type: "number", column: "Días", value: "" },
    { id: "idsolsum", type: "number", column: "Id Sol. Sum", value: "" },
    { id: "fecsol", type: "date", column: "F. Sol", value: "" },
    { id: "fecreq", type: "date", column: "F. Req", value: "" },
    { id: "stssc", type: "desc", column: "Estatus", value: "" },
];
export const columnsOrder: Order[] = [
    { id: "iddoc", column: "ID Doc" },
    { id: "nrosc", column: "Nro. Solicitud" },
    { id: "descsc", column: "Descripción" },
    { id: "fecrec", column: "Días" },
    { id: "idsolsum", column: "Id Sol. Sum" },
    { id: "fecsol", column: "F. Sol" },
    { id: "fecreq", column: "F. Req" },
    { id: "stssc", column: "Estatus" },
];

export const columnsHeaders: HeadersName[] = [
    { label: "Id Doc", align: "center", minWidth: 130 },
    {
        label: "Nro. Solicitud",

        align: "center",
        minWidth: 160,
    },
    { label: "Descripción", align: "left", minWidth: 350 },
    {
        label: "Días",
        align: "center",
        minWidth: 100,
        tooltip: "Días en Bandeja",
    },
    {
        label: "Id Sol. Sum",
        align: "center",
        minWidth: 140,
    },
    { label: "F. Sol.", align: "center", minWidth: 140 },
    { label: "F. Req.", align: "center", minWidth: 140 },
    { label: "Estatus", minWidth: 140 },
    { label: "Acciones", align: "center", minWidth: 160 },
];


export const Acciones = ({
    row,
    onDelete,
    onEdit,
  }: {
    row: ITSolRec;
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
  

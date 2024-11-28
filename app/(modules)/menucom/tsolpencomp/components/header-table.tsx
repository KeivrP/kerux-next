import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";


export const columnsFilter: Filter[] = [
  { id: "nrosc", type: "number", column: "Id. Doc", value: "" },
  { id: "descsc", type: "desc", column: "Descripción", value: "" },
  { id: "idsolsum", type: "number", column: "Solicitud de sum.", value: "" },
  { id: "fecsts", type: "date", column: "Fecha de Cambio", value: "" },
  { id: "stssc", type: "desc", column: "Estatus", value: "" },
  { id: "stsres", type: "desc", column: "Estimado", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "nrosc",  column: "Id. Doc"},
  { id: "descsc",  column: "Descripción"},
  { id: "idsolsum",  column: "Solicitud de sum."},
  { id: "fecsts", column: "Fecha de Cambio"},
  { id: "stssc", column: "Estatus"},
  { id: "stsres", column: "Estimado"},
];

export const columnsHeaders: HeadersName[] = [
  { label: "Id. Doc", align: "center",  minWidth:130 },
  { label: "Descripción", align: "left", minWidth:420},
  { label: "Solicitud de Sum.", align: "center",  minWidth:200 },
  { label: "Fecha de Cambio",  align: "center",  minWidth:200 },
  { label: "Estatus", minWidth:140 },
  { label: "Estimado", minWidth:140 },
  { label: "Acciones", align: "center", width: 80 },
];


export const Acciones = ({
    row,
    onFile,
  }: {
    row: any;
    onFile: (id: number) => void;
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
            sx={{ backgroundColor: theme.palette.background.default }}
            title="Abrir"
          >
            <IconButton
              onClick={() => onFile(row.nrosc)}
              color="primary"
              size="small"
            >
              <OpenIcon />
            </IconButton>
          </Tooltip>
        </span>
      </span>
    );
  };
  

import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { ITSolRec } from "../../tsolrec/tsolrec-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
    { id: "nrosc", type: "number", column: "Nro.", value: "" },
    { id: "descsc", type: "desc", column: "Descripción", value: "" },
    { id: "idsolsum", type: "number", column: "Id Sol. Sum", value: "" },
    { id: "fecsts", type: "date", column: "F. Cambio", value: "" },
    { id: "stssc", type: "desc", column: "Estatus", value: "" },
    { id: "stsres", type: "desc", column: "Estimado", value: "" },
  ];
  export const columnsOrder: Order[] = [
    { id: "nrosc",  column: "Nro."},
    { id: "descsc",  column: "Descripción"},
    { id: "idsolsum",  column: "Id Sol. Sum"},
    { id: "fecsts", column: "F. Cambio"},
    { id: "stssc", column: "Estatus"},
    { id: "stsres", column: "Estimado"},
  ];
  
  export const columnsHeaders: HeadersName[] = [
    { label: "Nro.",  align: "center",  minWidth:90 },
    { label: "Descripción", align: "left", minWidth:220},
    { label: "Id Sol. Sum",  align: "center",  minWidth:140 },
    { label: "F. Cambio",  align: "center",  minWidth:130 },
    { label: "Estatus",  minWidth:140, align: "center", },
    { label: "Estimado",  minWidth:140, align: "center", },
    { label: "Acciones",  align: "center", width: 80 },
  ];

  
export const Acciones = ({
    row,
    onFile,
  }: {
    row: ITSolRec;
    onFile: (id: ITSolRec) => void;
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
              onClick={() => onFile(row)}
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
  

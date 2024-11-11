import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { ITcevinv } from "../tcevinv-types";


export const columnsFilterEventos: Filter[] = [
  { id: "eventos_admon.IDEVENTO", type: "number", column: "ID", value: "" },
  { id: "documentos_origen.DESCDOC", type: "desc", column: "Descripción.", value: "" },
  { id: "eventos_admon.FECEVENTO", type: "date", column: "Fecha", value: "" },
  { id: "eventos_admon.IDDOC", type: "number", column: "Id.Doc", value: "" },
  { id: "eventos_admon.TIPODOC", type: "desc", column: "Tipo de Doc", value: "" },
  { id: "eventos_admon.TIPOEVENTO", type: "desc", column: "Tipo de Evento", value: "" },
  { id: "documentos_origen.FECDOC", type: "date", column: "Fecha del Documento", value: "" },
  { id: "eventos_admon.CODSISGEN", type: "desc", column: "Origen", value: "" },
  { id: "eventos_admon.CODSISDEST", type: "desc", column: "Destino", value: "" },
];
export const columnsOrderEventos: Order[] = [
  { id: "eventos_admon.IDEVENTO", column: "ID" },
  { id: "documentos_origen.DESCDOC", column: "Descripción." },
  { id: "eventos_admon.FECEVENTO", column: "Fecha" },
  { id: "eventos_admon.IDDOC", column: "Id.Doc" },
  { id: "eventos_admon.TIPODOC",  column: "Tipo de Doc" },
  { id: "eventos_admon.TIPOEVENTO",  column: "Tipo de Evento" },
  { id: "documentos_origen.FECDOC",  column: "Fecha del Documento" },
  { id: "eventos_admon.CODSISGEN",  column: "Origen" },
  { id: "eventos_admon.CODSISDEST",  column: "Destino" },
];

export const columnsHeadersEventos: HeadersName[] = [
  { label: "Id.", icon: null, align: "center",  minWidth:100 },
  { label: "Descripción", icon: null, minWidth:320  },
  { label: "Tipo", icon: null, align: 'center',  minWidth:80, tooltip: 'Tipo de Evento'},
  { label: "Fecha", icon: null, align: "center",  minWidth:140, tooltip: 'Fecha del Evento' },
  { label: "Id.Doc.", icon: null, align: "center",  minWidth:140, tooltip: 'Id Del Documento' },
  { label: "Tipo de Doc.", icon: null, align: 'center', minWidth:140, tooltip: 'Tipo del Documento' },
  { label: "F. Doc.", icon: null, align: "center",  minWidth:140, tooltip: 'Fecha del Documento' },
  { label: "Origen", icon: null,  minWidth:110, align: 'center',},
  { label: "Destino", icon: null,  minWidth:110, align: 'center',},
  { label: "Acciones", icon: null, align: "center", minWidth: 80 },
];


export const Acciones = ({
    row,
    onEdit,
  }: {
    row: ITcevinv;
    onEdit: (id: string) => void;
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
            onClick={() => onEdit(row.tipodoc)}
            color="primary"
            size="small"
          >
            <OpenIcon />
          </IconButton>
        </Tooltip>
      </span>
    );
  };
  
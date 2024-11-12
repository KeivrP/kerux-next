import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { ITDoRig } from "../tdorig-types";
import { OpenIcon } from "@/components/icons/table-icon";


export const columnsFilterMensajero: Filter[] = [
  { id: "DOCUMENTOS_ORIGEN.IDDOC", type: "number", column: "Id Doc", value: "" },
  { id: "documentos_origen.descdoc", type: "desc", column: "Descripción", value: "" },
  { id: "numidbenef", type: "desc", column: "C.I/Rif.", value: "" },
  { id: "documentos_origen.tipodoc", type: "desc", column: "Tipo", value: "" },
  { id: "stsdoc", type: "desc", column: "Estatus", value: "" },
  { id: "refdoc", type: "desc", column: "Referencia", value: "" },
  { id: "fecdoc", type: "date", column: "Fecha", value: "" },
  { id: "indreverso", type: "check", column: "Reverso", value: "" },
  { id: "mtodoc", type: "number", column: "Monto", value: "" },
  { id: "numop", type: "number", column: "Num. O/P", value: "" },
  { id: "ano", type: "number", column: "Año", value: "" },
  { id: "iddocfis", type: "number", column: "Id. Doc Fisico", value: "" },
  { id: "descdocext", type: "desc", column: "Descrip. Extendida", value: "" },
  { id: "BENEFICIARIOS.nombre", type: "desc", column: "Beneficiario", value: "" },
];

export const columnsOrderMensajero: Order[] = [
  { id: "DOCUMENTOS_ORIGEN.IDDOC", column: "ID Doc" },
  { id: "documentos_origen.descdoc", column: "Descripción" },
  { id: "numidbenef", column: "C.I/Rif." },
  { id: "documentos_origen.tipodoc", column: "Tipo" },
  { id: "stsdoc", column: "Estatus" },
  { id: "refdoc", column: "Referencia" },
  { id: "fecdoc", column: "Fecha" },
  { id: "indreverso", column: "Reverso" },
  { id: "mtodoc", column: "Monto" },
  { id: "numop", column: "Num. O/P" },
  { id: "ano", column: "Año" },
  { id: "iddocfis", column: "Id. Doc Fisico" },
  { id: "descdocext", column: "Descrip. Extendida" },
  { id: "BENEFICIARIOS.nombre", column: "Beneficiario" },
];


export const columnsHeadersMensajero: HeadersName[] = [
  { label: "Id Doc", icon: null, align: "center", minWidth: 130 },
  { label: "Descripción", icon: null, align: "left", minWidth: 200 },
  { label: "C.I/Rif.", icon: null, align: "center", minWidth: 160 },
  { label: "Tipo", icon: null, minWidth: 100, align: "center" },
  { label: "Estatus", icon: null, minWidth: 100, align: "center" },
  { label: "Referencia", icon: null, minWidth: 140, align: "center" },
  {
    label: "Fecha",
    icon: null,
    align: "center",
    minWidth: 100,
    tooltip: "Días en Bandeja",
  },
  { label: "Reverso", icon: null, align: "center", minWidth: 100, },  
  { label: "Monto", icon: null, align: "right", minWidth: 100 },
  { label: "Acción", icon: null, align: "center", minWidth: 80 },
];


export const Acciones = ({
    row,
    onOpen,
  }: {
    row: ITDoRig;
    onOpen: (id: string) => void;
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
            onClick={() => onOpen(row.tipodoc)}
            color="primary"
            size="small"
          >
            <OpenIcon />
          </IconButton>
        </Tooltip>
      </span>
    );
  };
  
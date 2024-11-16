import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Documentoslist } from "../doc-types";
import { OpenIcon } from "@/components/icons/table-icon";

export const columnsFilter: Filter[] = [
  {
    id: "DOCUMENTOS_ORIGEN.iddoc",
    type: "number",
    column: "ID Doc",
    value: "",
  },
  { id: "DOCS_LOG.stsdoc", type: "desc", column: "Estatus Doc", value: "" },
  { id: "tipodoc", type: "desc", column: "Tipo Doc", value: "" },
  { id: "DOCS_LOG.refdoc", type: "desc", column: "Referencia", value: "" },
  { id: "DOCS_LOG.fecdoc", type: "date", column: "Fecha", value: "" },
  { id: "DOCS_LOG.stsapr", type: "desc", column: "Status Apr", value: "" },
  { id: "DOCS_LOG.montoorig", type: "number", column: "Monto", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "DOCUMENTOS_ORIGEN.iddoc", column: "ID Doc" },
  { id: "DOCS_LOG.stsdoc", column: "Estatus Doc" },
  { id: "tipodoc", column: "Tipo Doc" },
  { id: "DOCS_LOG.refdoc", column: "Referencia" },
  { id: "DOCS_LOG.fecdoc", column: "Fecha" },
  { id: "DOCS_LOG.stsapr", column: "Status Apr" },
  { id: "DOCS_LOG.montoorig", column: "Monto" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "ID Doc", align: "center", minWidth: 140 },
  { label: "Estatus Doc", align: "center", minWidth: 140 },
  { label: "Tipo de Documento", align: "left", minWidth: 220 },
  { label: "Referencia", align: "center", minWidth: 140 },
  {
    label: "Fecha",

    align: "center",
    minWidth: 140,
  },
  { label: "Status Apr", minWidth: 140, align: "center" },
  {
    label: "Monto",
    align: "right",
    minWidth: 100,
  },
  { label: "Acciones", align: "center", width: 100 },
];

export const Acciones = ({
  row,
  onEdit,
}: {
  row: Documentoslist;
  onDelete: (tipodoc: string) => void;
  onEdit: (tipodoc: string) => void;
}) => {
  const theme = useTheme();

  return (
    <span
      style={{
        color: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          <OpenIcon  />
        </IconButton>
      </Tooltip>
    </span>
  );
};

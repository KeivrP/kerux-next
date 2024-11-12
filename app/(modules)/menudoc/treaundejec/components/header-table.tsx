
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { Documentoslist } from "../../tdocfin/tdocfin-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";


export const columnsFilter: Filter[] = [
    { id: "DOCUMENTOS_ORIGEN.IDDOC", type: "number", column: "Id Doc", value: "" },
    { id: "documentos_origen.descdoc", type: "desc", column: "Descripción", value: "" },
    { id: "fecdoc", type: "date", column: "Fecha", value: "" },
    { id: "documentos_origen.tipodoc", type: "desc", column: "Tipo", value: "" },
    { id: "stsdoc", type: "desc", column: "Estatus", value: "" },
    { id: "mtodoc", type: "number", column: "Monto", value: "" },
];

export const columnsOrder: Order[] = [
    { id: "DOCUMENTOS_ORIGEN.IDDOC", column: "ID Doc" },
    { id: "documentos_origen.tipodoc", column: "Tipo" },
    { id: "documentos_origen.descdoc", column: "Descripción" },
    { id: "fecdoc", column: "Fecha" },
    { id: "numidbenef", column: "U/A" },
    { id: "mtodoc", column: "Monto" },
];


export const columnsHeaders: HeadersName[] = [
    { label: "Id Doc", icon: null, align: "left", minWidth: 130 },
    { label: "Tipo", icon: null, minWidth: 140, align: "center" },
    { label: "Fecha", icon: null, minWidth: 140, align: "center" },
    { label: "Estatus", icon: null, minWidth: 80, align: "center" },
    { label: "Monto", icon: null, minWidth: 140 , align: 'right'},
    { label: "Unidad de Proceso", icon: null, align: "center", minWidth: 160 },
];

export const Acciones = ({
    row,
    onOpen,
}: {
    row: Documentoslist;
    onOpen: (id: number) => void;

}) => {
    const theme = useTheme();

    return (
        <span
            style={{
                color: theme.palette.primary.main,
                justifyContent: "space-between",
                display: "flex",
                padding: "0 20px",
                gap: "10px", // Add space between icons
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
                    onClick={() => onOpen(row.iddoc)}
                    color="primary"
                    size="small"
                >
                    <                    OpenIcon />
                </IconButton>
            </Tooltip>

        </span>
    );
};
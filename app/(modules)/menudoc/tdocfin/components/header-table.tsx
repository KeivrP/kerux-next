
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Documentoslist } from "../tdocfin-types";
import { OpenIcon } from "@/components/icons/table-icon";
import { CircleCheckBig, CircleSlash } from "lucide-react";


export const columnsFilter: Filter[] = [
    {
        id: "DOCUMENTOS_ORIGEN.IDDOC",
        type: "number",
        column: "Id Doc",
        value: "",
    },
    {
        id: "documentos_origen.descdoc",
        type: "desc",
        column: "Descripción",
        value: "",
    },
    { id: "documentos_origen.tipodoc", type: "desc", column: "Tipo", value: "" },
    { id: "ano", type: "number", column: "Año", value: "" },
    { id: "fecdoc", type: "date", column: "Fecha", value: "" },
    { id: "stsdoc", type: "desc", column: "Estatus", value: "" },
    { id: "mtodoc", type: "number", column: "Monto", value: "" },
];

export const columnsOrder: Order[] = [
    { id: "DOCUMENTOS_ORIGEN.IDDOC", column: "ID Doc" },
    { id: "documentos_origen.tipodoc", column: "Tipo" },
    { id: "stsdoc", column: "Estatus" },
    { id: "ano", column: "Año" },
    { id: "fecdoc", column: "Fecha" },
    { id: "documentos_origen.descdoc", column: "Descripción" },
    { id: "numidbenef", column: "U/A" },
    { id: "mtodoc", column: "Monto" },
];

export const columnsHeaders: HeadersName[] = [
    { label: "Id Doc", icon: null, align: "center", minWidth: 130 },
    { label: "Descripción", icon: null, minWidth: 160 },
    { label: "Tipo", icon: null, minWidth: 140, align: "center" },
    { label: "Estatus", icon: null, minWidth: 100, align: "center" },
    { label: "Año", icon: null, align: "center", minWidth: 80 },
    { label: "Fecha", icon: null, align: "center", minWidth: 140 },
    { label: "Monto", icon: null, align: "right", minWidth: 140 },
    { label: "Unidad de Proceso", icon: null, align: "center", minWidth: 160 },
    { label: "Acciones", icon: null, align: "center", minWidth: 80 },
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
        <span>
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
                        onClick={() => onOpen && onOpen(row.iddoc)}
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

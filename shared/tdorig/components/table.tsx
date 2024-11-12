"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";

import { formatCurrency, formatDate } from "@/utils/main";
import { Asterisk } from "lucide-react";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import ActionCardHeader from "@/components/card/actionCardHeader";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import Hcdocorg from "@/shared/hcdocorg/Hcdocorg";
import { ITDoRig } from "../tdorig-types";
import { Acciones, columnsFilterMensajero, columnsHeadersMensajero, columnsOrderMensajero } from "./header-table";
import { BadgeAct } from "@/components/badge/badge-act";
import RadioButtonCodUad from "@/components/radio/radioButtonUnd";

interface TdorigTableProps {
    codsis?: string;
}

export const TdorigTable = ({ codsis }: TdorigTableProps) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [order, setOrder] = useState<Order[]>([
        { column: "ID Doc", id: "iddoc", operator: "DESC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [rows, setRows] = useState<ITDoRig[]>([]);
    const [row, setRow] = useState(0);
    const [openFileTdorig, setOpenFileTdorig] = useState(false);
    const [count, setCount] = useState(0);
    const [undGenerica, setUndGenerica] = useState("");

    /* ---------------------- USEQUERY HACE EL GET DE LA BD --------------------- */
    const { data, isLoading } = useQueryData({
        entity: "documentos",
        params: { page: page + 1, per: rowsPerPage, filter, order, ua: undGenerica },
        api: "doc",
        dependency: [filter, order, page, undGenerica, rowsPerPage],
    });

    const openFile = (row: ITDoRig) => {
        setOpenFileTdorig(true);
        setRow(row.iddoc);
    };

    const closeFile: () => void = () => {
        setOpenFileTdorig(false);
    };

    useEffect(() => {
        setRows(data?.documentoslist || []);
        setCount(data?.total);
    }, [data]);

    const handlePageChange = useCallback(
        (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
            setPage(newPage);
        },
        []
    );

    const handleChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPage(0);
            setRowsPerPage(parseInt(event.target.value));
        },
        []
    );


    return (
        <>
            <ActionCardHeader
                isAddButtonVisible={false}
                onApplyFilter={(filters) => setFilter(filters)}
                columnsFilter={columnsFilterMensajero}
                onApplyOrder={(orders) => setOrder(orders)}
                columnsOrder={columnsOrderMensajero}
                setFilter={setFilter}
                setOrder={setOrder}
            >
                <RadioButtonCodUad
                    onValueChange={(selectedValue) => {
                        setUndGenerica(selectedValue);
                    }}
                />
            </ActionCardHeader>


            <div
                style={{
                    height: "71vh",
                    backgroundColor: theme.palette.background.paper,
                }}
                className="max-w-screen-xl mx-auto max-h-full overflow-y-auto"
            >
                <BaseTable
                    loading={isLoading}
                    rows={rows}
                    headers={columnsHeadersMensajero}
                    rowAction={(row: ITDoRig) => openFile(row)}
                    collapsible={{
                        visible: (row) => [
                            { content: row.iddoc, handleCollapse: true, align: "center" },
                            { content: row.descdoc, align: "left" },
                            { content: row.numidbenef, align: "center" },
                            { content: row.tipodoc, align: "center" },
                            { content: <BadgeTipodoc tipo={row.stsdoc} />, align: "center" },
                            { content: row.refdoc, align: "center" },
                            { content: formatDate(row.fecdoc), align: "center" },
                            { content: <BadgeAct status={row.indreverso} />, align: "center" },
                            { content: formatCurrency(row.mtodoc), align: "right" },
                            {
                                content: <Acciones row={row} onOpen={() => openFile(row)} />,
                                action: () => null,
                                align: "center",
                                disableTooltip: true,
                            },
                        ],

                        collapsed: (row: ITDoRig) => [
                            {
                                name: "Unidad de Proceso",
                                content:
                                    row.desccodundpro === "Unidad genérica" ? (
                                        <span style={{ display: "flex", alignItems: "center" }}>
                                            <Asterisk

                                            />
                                            Unidad Genérica{" "}
                                        </span>
                                    ) : (
                                        row.desccodundpro
                                    ),
                            },
                            { name: "Num. O/P", content: row.numop },
                            { name: "Año", content: row.ano },
                            { name: "Id Documento Fisico", content: row.iddocfis },
                            { name: "Descripción Extendida", content: row.descdocext },
                            { name: "Beneficiario", content: row.nombre },
                            { name: "Tipo de Documento", content: row.desctipodoc },
                            { name: "Moneda", content: row.codmonedamtodoc },
                        ],
                    }}
                ></BaseTable>
                <BaseTablePagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalRows={count}
                    handlePageChange={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                ></BaseTablePagination>
                {row != 0 ? (
                    <Hcdocorg
                        actionDisabled={true}
                        open={openFileTdorig}
                        row={row}
                        handleClose={closeFile}
                    />
                ) : null}
            </div>
        </>
    );
};

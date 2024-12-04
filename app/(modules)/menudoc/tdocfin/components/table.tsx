'use client'
import React, { use, useCallback, useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { Documentoslist } from "../tdocfin-types";
import { formatCurrency, formatDate } from "@/utils/main";
import Hcdocorg from "@/shared/hcdocorg/Hcdocorg";
import { useReturnsDocFin } from "../hook/useReturnDocfin";
import Checkbox from "@/components/checkbox/checkbox";
import { CornerUpLeft } from "lucide-react";
import { BadgeTipodoc } from "@/components/badge/badge-estatus";

export const TdocfinTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState<Documentoslist[]>([]);
    const [selectedRows, setSelectedRows] = useState<Documentoslist[]>([]);
    const [openFileTdorig, setOpenFileTdorig] = useState(false);


    const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "iddoc", operator: "DESC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [count, setCount] = useState(0);

    const [isPending, handleLoading] = useState(false);
    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

    const { mutate, isPending: returnsDocFin, isSuccess } = useReturnsDocFin();

    useEffect(() => {
        if (returnsDocFin) {
            handleLoading(true);
        } else handleLoading(false);
    }, [returnsDocFin, handleLoading]);

    const { data, isLoading, refetch } = useQueryData({
        entity: "documentos",
        api: "doc",
        params: {
            page: page + 1,
            per: rowsPerPage,
            filter,
            order,
            status: "FIN",
        },
        dependency: [filter, order, page, rowsPerPage],
    });

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess]);

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

    const [iddoc, setIdDoc] = useState<number>(0);

    const openFile = (row: number) => {
        setOpenFileTdorig(true);
        setIdDoc(row);
    };

    const closeFile: () => void = () => {
        setOpenFileTdorig(false);
    };

    const handleRowSelect = (row: Documentoslist) => {
        setSelectedRows((prevRows) => {
            // Si el row ya está seleccionado, lo removemos del array
            if (prevRows.includes(row)) {
                return prevRows.filter((item) => item !== row);
            }
            // Si el row no está seleccionado, lo agregamos al array
            else {
                return [...prevRows, row];
            }
        });
    };


    const handleReassignAll = () => {
        const id = selectedRows.map((row) => row.iddoc);
        mutate({ id });
        setSelectedRows([]);
    };

    return (
        <>
            <ActionCardHeader
                add={handleReassignAll}
                actions={{ color: "secondary", disabled: selectedRows.length === 0 }}
                title={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CornerUpLeft size={16} /> Reasignar
                </div>}
                onApplyFilter={(filters) => setFilter(filters)}
                columnsFilter={columnsFilter}
                onApplyOrder={(orders) => setOrder(orders)}
                columnsOrder={columnsOrder}
                setFilter={setFilter}
                setOrder={setOrder}
            />

            <div
                style={{
                    height: "71vh",
                    width: "100%",
                }}
            >
                <BaseTable
                    loading={isLoading}
                    rows={rows}
                    addCheckboxColumn={true}
                    onSelectionChange={(selectedRowIndices) => {
                        const updateSelect = selectedRowIndices.map((index) => rows[index]); // Seleccionar todo lo que aparezca
                        setSelectedRows(updateSelect);
                    }}
                    headers={columnsHeaders}
                    rowAction={(row) => console.log(row)}
                    collapsible={{
                        visible: (row) => [
                            {
                                content: (
                                    <Checkbox //selecionar uno a uno
                                        checked={selectedRows.includes(row)}
                                        onChange={() => handleRowSelect(row)}
                                    />
                                ),
                            },
                            { content: row.iddoc, align: "left", handleCollapse: true },
                            { content: row.descdoc, align: "left" },
                            { content: row.tipodoc, align: "center" },
                            { content: <BadgeTipodoc tipo={row.stsdoc} />, align: "center" },
                            { content: row.ano, align: "center" },
                            { content: formatDate(row.fecdoc), align: "center" },

                            {
                                content: `${formatCurrency(row.mtodoc)} ${row.codmonedamtodoc}`,
                                align: "right",
                            },
                            { content: row.codundadmpro, align: "center" },
                            {
                                align: "center",
                                content: (
                                    <Acciones
                                        row={row}
                                        onOpen={(a) => openFile(a)}
                                    />
                                ),
                            },
                        ],

                        collapsed: (row) => [
                            { name: "Num Benef", content: row.numidbenef },
                            { name: "Ultimo Modulo", content: row.maximo_evento.codsisgen },
                            { name: "Origen", content: row.origen },
                            { name: "Referencia", content: row.refdoc },
                            {
                                name: "Descripcion Tipo de documento",
                                content: row.desctipodoc,
                            },
                            { name: "Descripcion U/A", content: row.desccodundpro },
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
            </div>
            {iddoc != 0 &&
                <Hcdocorg
                    actionDisabled={false}
                    open={openFileTdorig}
                    row={iddoc}
                    handleClose={closeFile}
                />
            }
            <SimpleBackdrop show={isPending} />
        </>
    );
};

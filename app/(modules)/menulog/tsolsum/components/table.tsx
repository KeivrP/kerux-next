"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import {
    Acciones,
    columnsFilter,
    columnsHeaders,
    columnsOrder,
} from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";

import { ITsolsum } from "../tsolsum-types";
import { formatDate } from "@/utils/main";
import {BadgeTipodoc} from "@/components/badge/badge-estatus";
import { useGenerateTnivsum } from "../hook/useTsolsum";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { ConfirmDialog } from "@/components/modal/confirmDialog";

export const TsolsumTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState<ITsolsum[]>([]);
    const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "idsolum", operator: "ASC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [count, setCount] = useState(0);
    const [isPending, handleLoading] = useState<boolean>(false);

    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

    const { mutate: generate, isPending: generateLoading } = useGenerateTnivsum();

    useEffect(() => {
        if (generateLoading) {
            handleLoading(true);
        } else handleLoading(false);
    }, [generateLoading]);


    const { data, isLoading: updateLoading, refetch } = useQueryData({
        entity: "sols_sums",
        params: { status: ["PGN", "RCH", "RAE"], },
        dependency: [filter, order, page, rowsPerPage],
    });



    useEffect(() => {
        setRows(data?.solsumlist || []);
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

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [row, setRow] = useState<ITsolsum | null>(null);

    const handleEdit = (id: number) => {
        const edit = rows.find((row) => row.idsolsum === id) ?? null;
        setRow(edit);
        setOpenDialog(true);
    };

    const [generaID, setGenerate] = useState<number>(0);

    const openGenerate = (id: number) => {
        setGenerate(id);
        setOpenConfirm(true);
    }

    const handleConfirmDelete = () => {
        const rowToDelete = rows.find((row) => row.idsolsum === generaID);
        if (rowToDelete) {
            generate({ id: generaID });
            setOpenConfirm(false);
        }
    }

    const handleCancelDelete = () => {
        setOpenConfirm(false);
    }

    return (
        <>
            <ActionCardHeader
                add={() => setOpenDialog(true)}
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
                    loading={updateLoading}
                    rows={rows}
                    headers={columnsHeaders}
                    rowAction={(row: ITsolsum) => handleEdit(row.idsolsum)}
                    collapsible={{
                        visible: (row: ITsolsum) => [
                            { content: row.idsolsum, handleCollapse: true, align: "left" },
                            { content: formatDate(row.fecsol), align: "center" },
                            { content: row.desccorta, align: "left", whiteSpace: "normal" },
                            { content: row.ccosto, align: "center" },
                            { content: <BadgeTipodoc tipo={row.stssol} />, align: "center" },
                            {
                                content: <Acciones row={row} onOpen={handleEdit} onReject={() => { }} onGenerate={openGenerate} />,
                                action: () => null,
                                disableTooltip: true,
                            },
                        ],

                        collapsed: (row: ITsolsum) => [
                            { name: "Descripcion General", content: row?.descsolsum },
                            { name: "Centro de Costo", content: row.desccosto },
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
            <ConfirmDialog
            title={"Generar Solicitud?"}
                mode={"confirm"}
                open={openConfirm}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={`¿Estas seguro que deseas Generar la Solicitud ${rows.find((row) => row.idsolsum == generaID)?.idsolsum}?`}
            />
            <SimpleBackdrop show={isPending} />
            {/*             <DataSheet isOpen={openDialog} onClose={setOpenDialog} row={row} /> */}
        </>
    );
};

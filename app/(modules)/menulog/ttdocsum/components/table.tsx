"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";

import BadgeModule from "@/components/badge/badge-mod";
import { Tipodoclist } from "@/app/(modules)/menudoc/ttipodoc/ttipodc-types";
import { useDeleteTdocsum } from "../hook/useTtdocsum";
import { BadgeDest } from "@/components/badge/badge-dest";

export const TtdocsumTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState<Tipodoclist[]>([]);
    const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "tipodoc", operator: "DESC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [count, setCount] = useState(0);
    const [isPending, handleLoading] = useState<boolean>(false);

    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

    const { mutate, isPending: deleteLoading, isSuccess } = useDeleteTdocsum();

    const { data, isLoading, refetch } = useQueryData({
        entity: "ttdocsum",
        params: {
            page: page + 1,
            per: rowsPerPage,
            filter,
            order,
        },
        dependency: [filter, order, page, rowsPerPage],
    });

    useEffect(() => {
        if (deleteLoading) {
            handleLoading(true);
        } else handleLoading(false);
    }
        , [deleteLoading]);


    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess]);


    useEffect(() => {
        setRows(data?.tipodoclist || []);
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
    const [deleteRowId, setDeleteRowId] = useState<string>("");

    const handleDelete = (id: string) => {
        setDeleteRowId(id);
        setOpenDialog(true);
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        const rowToDelete = rows.find((row) => row.tipodoc === deleteRowId);
        if (rowToDelete) {
            mutate({ id: deleteRowId });
        } else {
            console.log(`Row with id ${deleteRowId} not found`);
        }
        setOpenDialog(false);
    };

    const handleEdit = (id: string) => {
        console.log(`Edit ${id}`);
    };
    return (
        <>
            <ActionCardHeader
                isAddButtonVisible={false}
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
                    headers={columnsHeaders}
                    rowAction={(row) => console.log(row)}
                    collapsible={{
                        visible: (row) => [
                            { content: row.tipodoc, handleCollapse: true, align: "left" },
                            { content: row.desctipodoc, align: "left" },
                            { content: <BadgeModule codmenu={row.codsis} />, align: "center" },
                            {
                                content: <BadgeDest item={row.tiposis} />,
                                align: "center",
                            },
                            {
                                content: (
                                    <Acciones
                                        row={row}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                    />
                                ),
                                action: () => null,
                                disableTooltip: true,
                            },
                        ],

                        collapsed: (row) => [
                            { name: "Tipo de Documento de reserva", content: row.tipodocres },
                            {
                                name: "Tipo de Documento de reserva previa",
                                content: row.tipodocrespre,
                            },
                            {
                                name: "Tipo de Docuemnto de aumento de reserva",
                                content: row.tipodocaumres,
                            },
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
                mode={"delete"}
                open={openDialog}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={`¿Estas seguro que deseas eliminar el Tipo de Documento ${rows.find((row) => row.tipodoc == deleteRowId)?.tipodoc
                    }?`}
            />
            <SimpleBackdrop show={isPending} />
        </>
    );
};

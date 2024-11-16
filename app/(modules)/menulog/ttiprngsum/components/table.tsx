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

import { Tiporngsumlist } from "../ttiprngsum-types";
import DataSheet from "./data-sheet";

export const TtdocsumTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState<Tiporngsumlist[]>([]);
    const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "tiporengsumin", operator: "DESC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [count, setCount] = useState(0);
    const [isPending, handleLoading] = useState<boolean>(false);

    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */


    const { data, isLoading: updateLoading, refetch } = useQueryData({
        entity: "tipo_reng_sum",
        params: { page, per: rowsPerPage, filter, order },
        dependency: [filter, order],
    });



    useEffect(() => {
        setRows(data?.tiporngsumlist || []);
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
    const [row, setRow] = useState<Tiporngsumlist | null>(null);

    const handleEdit = (id: string) => {
        const edit = rows.find((row) => row.tiporengsumin === id) ?? null;
        setRow(edit);
        setOpenDialog(true);
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
                    loading={updateLoading}
                    rows={rows}
                    headers={columnsHeaders}
                    collapsible={{
                        visible: (row: Tiporngsumlist ) => [
                            { content: row.tiporengsumin, handleCollapse: false, align: "left" },
                            { content: row.desctiporeng, align: "left" },
                            { content: row.limitundtrib, align: "center" },
                           
                            {
                                content: (
                                    <Acciones
                                        row={row}
                                        onEdit={handleEdit}
                                    />
                                ),
                                action: () => null,
                                disableTooltip: true,
                                align: "center",
                            },
                        ],

                        collapsed: () => [                        ],
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
            <DataSheet isOpen={openDialog} onClose={setOpenDialog} row={row} refetch={refetch}/>

        </>
    );
};

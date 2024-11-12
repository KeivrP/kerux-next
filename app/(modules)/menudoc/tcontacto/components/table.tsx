'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { Tipodoclist } from "../../ttipodoc/ttipodc-types";

export function TipoContacto(tipo: string) {
    switch (tipo) {
        case "EMP":
            return "Empleado";
        case "ACC":
            return "Accionista";
        case "OTR":
            return "Otro";
        default:
            return "No definido";
    }
}

export const TcontactoTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState<Tipodoclist[]>([]);
    const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "numbenef", operator: "DESC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [count, setCount] = useState(0);

    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */


    const { data, isLoading } = useQueryData({
        entity: "contactos",
        api: 'doc',
        params: {
            page: page + 1,
            per: rowsPerPage,
            filter,
            order,
        },
        dependency: [filter, order, page, rowsPerPage],
    });

    useEffect(() => {
        setRows(data?.contactolist || []);
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
                            { content: row.nombre, align: "left", handleCollapse: true, },
                            { content: row.apellido, align: "left" },
                            { content: row.cedula, align: "left" },
                            { content: row.nombre_benef, align: "left" },


                        ],

                        collapsed: (row) => [
                            { name: "Telefono", content: row.telefono },
                            {
                                name: "Correo",
                                content: row.email,
                            },
                            {
                                name: "Tipo",
                                content: TipoContacto(row.tipocontacto),
                            },
                            {
                                name: "Cargo",
                                content: row.cargo,
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

        </>
    );
};

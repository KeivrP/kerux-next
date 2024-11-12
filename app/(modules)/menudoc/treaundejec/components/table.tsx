'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import { formatCurrency, formatDate } from "@/utils/main";
import Hcdocorg from "@/shared/hcdocorg/Hcdocorg";
import Checkbox from "@/components/checkbox/checkbox";
import { CornerUpLeft } from "lucide-react";
import { useReassignDocumentUA } from "../hook/useReassignDoc";
import { OptionType } from "@/types/main";
import _ from "lodash";
import { Documentoslist } from "../../tdocfin/tdocfin-types";
import AutocompleteAsync from "@/components/ui/autocompleteAsync";


export const TreaundejecTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState<Documentoslist[]>([]);
    const [selectedRows, setSelectedRows] = useState<Documentoslist[]>([]);
    const [unidadEjecutora, setUnidadEjecutora] = useState<OptionType>({
        label: "",
        value: "",
    });

    const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "iddoc", operator: "DESC" },
    ]);
    const [filter, setFilter] = useState<Filter[]>([]);
    const [count, setCount] = useState(0);

    const [isPending, handleLoading] = useState(false);
    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

    const { mutate, isPending: reasigUpdate, isSuccess } = useReassignDocumentUA();

    useEffect(() => {
        if (reasigUpdate) {
            handleLoading(true);
        } else handleLoading(false);
        setUnidadEjecutora({ label: "", value: "" });
    }, [reasigUpdate, handleLoading]);

    const { data, isLoading, refetch } = useQueryData({
        entity: "documentos",
        api: "doc",
        params: {
            page: page + 1,
            per: rowsPerPage,
            filter,
            order,
        },
        dependency: [filter, order, page, rowsPerPage],
    });

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess]);

    const { data: lst_undEjec, isLoading: lst_loading } = useQueryData({
        entity: "lst_ujecutora",
        api: "doc",
    });

    const options: OptionType[] = _.map(lst_undEjec, (item) => {
        const label = String(item ? item.descund : "");
        const value = String(item ? item.codujec : "");

        return { label, value };
    });

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
        const codujec = unidadEjecutora.value;
        const iddoc = selectedRows.map((row) => row.iddoc);
        mutate({ iddoc, codujec });
    };

    return (
        <>
            <ActionCardHeader
                add={handleReassignAll}
                actions={{ color: "primary", disabled: selectedRows.length === 0 || unidadEjecutora.value === "" }}
                title={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CornerUpLeft size={16} /> Reasignar    
                </div>}
                onApplyFilter={(filters) => setFilter(filters)}
                columnsFilter={columnsFilter}
                onApplyOrder={(orders) => setOrder(orders)}
                columnsOrder={columnsOrder}
                setFilter={setFilter}
                setOrder={setOrder}
            >
                <AutocompleteAsync
                    text="value"
                    sx={{width: '35%'}}
                    loading={lst_loading}
                    options={options}
                    defaultValue={unidadEjecutora.label}
                    reset={lst_loading}
                    onSelectionChange={(e) =>
                        setUnidadEjecutora(e || { label: "", value: "" })
                    }
                />
            </ActionCardHeader>

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
                            { content: row.tipodoc, align: "center" },
                            { content: formatDate(row.fecdoc), align: "center" },
                            { content: <BadgeTipodoc tipo={row.stsdoc} />, align: "center" },
                            {
                                content: `${formatCurrency(row.mtodoc)} ${row.codmonedamtodoc}`,
                                align: "right",
                            },
                            { content: row.codundadmpro, align: "center" },

                        ],

                        collapsed: (row) => [
                            { name: "Descripcion", content: row.descdoc },
                            { name: "Num Benef", content: row.numidbenef },
                            {
                                name: "Descrripcion Tipo de documento",
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

            <SimpleBackdrop show={isPending} />
        </>
    );
};

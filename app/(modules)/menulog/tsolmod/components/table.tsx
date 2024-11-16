'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { Solsummodlist } from "../tsolmod-types";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";


export const TsolmodTable = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Solsummodlist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "numsolsum", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { data, isLoading } = useQueryData({
    entity: "sols_sums_mods",
    params: { page: page + 1, per: rowsPerPage, filter, order },
    dependency: [filter, order],
  });
  useEffect(() => {
    setRows(data?.solsummodlist || []);
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

  const handleDelete = (numsolsum: number) => {
    console.log(`Delete ${numsolsum}`);
  };

  const handleEdit = (numsolsum: number) => {
    console.log(`Edit ${numsolsum}`);
  };

  const handleGenerate = (numsolsum: number) => {
    console.log(`Generate ${numsolsum}`);
  }

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
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <BaseTable
          loading={isLoading}
          rows={rows}
          headers={columnsHeaders}
          rowAction={(row) => console.log(row)}
          collapsible={{
            visible: (row) => [
                { content: row.numsolsum, handleCollapse: true, align: "left" },
                { content: row.ano, align: "center" },
                { content: row.codaccint, align: "center" },
                { content: row.ccosto, align: "center" },
                { content: row.desccorta, align: "left" },
              {
                content: (
                  <Acciones
                    row={row}
                    onDelete={handleDelete}
                    onOpen={handleEdit}
                    onGenerate={handleGenerate}
                  />
                ),
                action: () => null,
                disableTooltip: true,
              },
            ],

            collapsed: (row) => [
                
                { name: "Acción Interna", content: row.descaccint },
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
    </>
  );
};

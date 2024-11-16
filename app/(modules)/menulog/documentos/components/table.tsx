'use client'
import { useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Documentoslist } from "../doc-types";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { formatCurrency, formatDate } from "@/utils/main";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";


export const TcdclogTable = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Documentoslist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "iddoc", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { data, isLoading } = useQueryData({
    entity: "docs_logs",
    params: { page: page + 1, per: rowsPerPage, filter, order },
    dependency: [filter, order],
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

  const handleDelete = (tipodoc: string) => {
    console.log(`Delete ${tipodoc}`);
  };

  const handleEdit = (tipodoc: string) => {
    console.log(`Edit ${tipodoc}`);
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
      <br />
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
              { content: row.iddoc, handleCollapse: true, align: "left" },
              { content: <BadgeTipodoc tipo={row.stsdoc}/>, align: "center" },
              { content: `${row.tipodoc} - ${row.desctipodoc}`, align: "left" },
              { content: row.refdoc , align: "center" },
              { content: formatDate(row.fecdoc) , align: "center" },
              { content: <BadgeTipodoc tipo={row.stsapr}/>, align: "center" },
              { content: formatCurrency(row.montoorig), align: "right" },
             
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
              { name: "Descripcion del Documento", content: row.descdoc },
              {
                name: "Beneficiario",
                content: `${row.numidbenef} - ${row.nombre}`,
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

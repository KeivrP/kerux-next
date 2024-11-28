'use client';
import React, { useCallback, useEffect, useState } from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { ITSolRec } from "../../tsolrec/tsolrec-types";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { formatDate } from "@/utils/main";
import { BadgeTipoComp } from "@/components/badge/badge-estatus";

export const TmodscTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState<Order[]>([ { column: 'nrosc', id: 'nrosc', operator: 'DESC' } ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [rows, setRows] = useState<ITSolRec[]>([]);
  const [count, setCount] = useState(0);

  const [visibleFSolComp, setVisibleFSolComp] = useState<boolean>(false);
  const [rowSelected, setRowSelected] = useState<ITSolRec | null>(null);

    /* ---------------------- USEQUERY HACE EL GET DE LA BD --------------------- */
  const { data, isLoading } = useQueryData({
    entity: "compra",
    params: { page, per: rowsPerPage + 1, filter, order },
    api: "comp",
    dependency: [filter, order, page, rowsPerPage]
  });
  
  
  useEffect(() => {
    setRows(data?.solcomprslist || []);
    setCount(data?.total)
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
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <BaseTable
          loading={isLoading}
          rows={rows}
          headers={columnsHeaders}
          collapsible={{
            visible: (row) => [
              { content: row.nrosc, align: "center" },
              { content: row.descsc, align: "left" },
              { content: row.idsolsum, align: "center" },
              { content: formatDate(row.fecsts), align: "center" },
              { content:<BadgeTipoComp tipo={row.stssc} />, align: "center" },
              { content:<BadgeTipoComp tipo={row.stsres} />, align: "center" },
              {
                content: <Acciones
                row={row}
                onFile={(id) => console.log(id)}
              />,
                action: () => null,
                disableTooltip: true,
              },
            ],

            collapsed: () => [
             
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

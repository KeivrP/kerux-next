'use client'

import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ITsolsum } from "../../tsolsum/tsolsum-types";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { formatDate } from "@/utils/main";
import { BadgeTipodoc } from "@/components/badge/badge-estatus";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import HistoriaDocumento from "@/shared/hcdlog/data-sheet";
import { usePathname, useRouter } from "next/navigation";


export const TsolpenTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<ITsolsum[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "ID Solicitud", id: "idsolsum", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  const { data, isLoading: updateLoading, refetch } = useQueryData({
    entity: "sols_sums",
    params: { status: ["PGN", "RCH", "RAE", "PPA", "PAE", "GEN", "ANU"], filter, order, page, rowsPerPage },
    dependency: [filter, order, page, rowsPerPage],
  });

  useEffect(() => {
    setRows(data?.solsumlist || []);
    setCount(data?.total);
  }
    , [data]);


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

  const router = useRouter()
  const pathname = usePathname();

  const handleEdit = (id: number) => {
    if (id) {
      router.push(`${pathname}/${id}`);

    }
  };

  const openGenerate = (id: number) => {
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
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <BaseTable
          loading={updateLoading}
          rows={rows}
          headers={columnsHeaders}
          collapsible={{
            visible: (row) => [
              { content: row.idsolsum, handleCollapse: true, align: "left" },
              { content: formatDate(row.fecsol), align: "center" },
              { content: formatDate(row.fecrecsol), align: "center" },
              { content: row.desccorta, align: "left" },
              { content: row.ccosto, align: "center" },
              { content: row.codaccint, align: "center" },
              { content: <BadgeTipodoc tipo={row.stssol} />, align: "center" },
              {
                content: <Acciones row={row} onOpen={handleEdit} onCreate={openGenerate} />,
                action: () => null,
                disableTooltip: true,
              },
            ],

            collapsed: (row) => [
              { name: "Solicitante", content: row.nomubic },
              { name: "Usuario", content: row.usuing },
              { name: "IdDoc reserva", content: row.iddocres },
              { name: "Acción Interna", content: row.descaccint },
              { name: "Centro de Costo", content: row.desccosto },
              { name: "Descripción Ampliada", content: row.descsolsum },
              { name: "Desc. Unidad de Compra", content: row.nombundcmp },
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

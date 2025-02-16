'use client'
import React, { useCallback, useEffect, useState } from "react";
import { ITcotresp } from "../Tcotresp-types";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { Acciones, columnsFilter, columnsHeadersTcotresp, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BadgeAct } from "@/components/badge/badge-act";
import { useReject } from "../hook/useReject";
import { formatDate } from "@/utils/main";

export const Tcotresp = () => {

  const [page, setPage] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<ITcotresp[]>([]);
  const [order, setOrder] = useState<Order[]>([
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  const { mutate, isPending: reAsingLoading } = useReject();
  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */



  const { data, isLoading, refetch } = useQueryData({
    entity: "cotizaciones",
    api: 'comp',
    params: {
      page: page + 1,
      per: rowsPerPage,
      filter,
      order,
    },
    dependency: [filter, order, page, rowsPerPage],
  });
  useEffect(() => {
    setRows(data?.Cotizacioneslist || []);
    setCount(data?.total);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [reAsingLoading]);

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
  const [deleteRowId, setDeleteRowId] = useState<number>(0);


  const handleReject = (idsolsum: number) => {
    setDeleteRowId(idsolsum);
    setOpenDialog(true);
  };
  const handleCancelReject = () => {
    setOpenDialog(false);
  };

  const handleConfirmReject = () => {
    const rowToReject = rows.find((row) => row.numcot === deleteRowId);
    if (rowToReject) {
      mutate({numcot:deleteRowId});

      setIsPending(false);
      setOpenDialog(false);

    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    } setOpenDialog(false);
  }

  const handleEdit = (idsolsum: number) => {
    console.log(`Edit ${idsolsum}`);
  };

  return (
    <>
      <ActionCardHeader
        add={() => { console.log('anadir') }}
        onApplyFilter={(filters) => setFilter(filters)}
        columnsFilter={columnsFilter}
        onApplyOrder={(orders) => setOrder(orders)}
        columnsOrder={columnsOrder}
        setFilter={setFilter}
        setOrder={setOrder}
        isAddButtonVisible={false}
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
          headers={columnsHeadersTcotresp }
          rowAction={(row) => console.log(row)}
          collapsible={{
            visible: (row) => [
                     { content: row.numcot, align: "left" },
                     { content: formatDate( row.feccot), align: "left" },
                     { content: formatDate( row.fecsts), align: "left" },
                     { content: row.nrosc, align: "left" },
                     { content: row.numprov, align: "left" },
                     { content: row.nomprov, align: "left" },
                     { content: row.stscot, align: "left" },
              {
                content: (
                  <Acciones
                    row={row}
                    onReject={handleReject}
                    onEdit={handleEdit}
                  />
                ),
                action: () => null,
                disableTooltip: true,
              },
            ],

            collapsed: () => [],
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
        mode={"alert"}
        open={openDialog}
        title={`Rechazar Cotización`}
        onConfirm={handleConfirmReject}
        onCancel={handleCancelReject}
        text={`¿Estas seguro que deseas rechazar la cotización ${rows.find((row) => row.numcot == deleteRowId)?.numcot}?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

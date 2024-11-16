'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Cambiolist } from "../tcambioss-types";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { formatDate } from "@/utils/main";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import { useDeleteTcambio } from "../hook/useTcambios";

export const TcambiosTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Cambiolist[]>([]);
  const [order, setOrder] = useState<Order[]>([         { column: "N°", id: "idsolsum", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const [isPending, handleLoading] = useState(false);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */


  const { mutate, isPending: deleteLoading, isSuccess } = useDeleteTcambio();

  useEffect(() => {
    if (deleteLoading) {
      handleLoading(true);
    } else handleLoading(false);
  }, [deleteLoading, handleLoading]);

  const { data, isLoading, refetch } = useQueryData({
    entity: "tcambioss",
    params: {
      page: page + 1,
      per: rowsPerPage,
      filter,
      order,
      status: ["PEN", "RCH"],
    },
    dependency: [filter, order, page, rowsPerPage],
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    setRows(data?.cambiolist || []);
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
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const handleDelete = (idsolsum: number) => {
    setDeleteRowId(idsolsum);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.idsolsum === deleteRowId);
    if (rowToDelete) {
      mutate({
        idsolsum: deleteRowId.toString(),
        nrocambio: rowToDelete.nrocambio.toString(),
      });
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
              { content: row.idsolsum, align: "center" },
              { content: row.nrocambio, align: "center" },
              { content: row.desccambio, align: "left" },
              { content: formatDate(row.feccambio), align: "center" },
              {
                content: <BadgeTipodoc tipo={row.stscamb} />,
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
        mode={"delete"}
        open={openDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        text={`¿Estas seguro que deseas eliminar la solicitud ${rows.find((row) => row.idsolsum == deleteRowId)?.idsolsum}?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

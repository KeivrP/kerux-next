'use client'
import React, { useCallback, useEffect, useState } from "react";
import { ITprov } from "../Tprov-types";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { Acciones, columnsFilter, columnsHeadersTprov, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { formatDate } from "@/utils/main";
import { useDeleteProveedor } from "../hook/useProv";

export const Tprov = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<ITprov[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "Número", id: "numprov", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending: deleteLoading, isSuccess } = useDeleteProveedor();


  const { data, isLoading, refetch } = useQueryData({
    entity: "proveedores",
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
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    deleteLoading ? setIsPending(true) : setIsPending(false);
  }, [deleteLoading]);

  useEffect(() => {
    setRows(data?.proveedoreslist || []);
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

  const handleDelete = (numprov: number) => {
    setDeleteRowId(numprov);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.numprov === deleteRowId);
    if (rowToDelete) {
      mutate(rowToDelete.numprov.toString());

    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    } setOpenDialog(false);
  }

  const handleEdit = (numprov: number) => {
    console.log(`Edit ${numprov}`);
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
          headers={columnsHeadersTprov}
          rowAction={(row) => console.log(row)}
          collapsible={{
            visible: (row) => [
              { content: row.numprov, align: "center" },
              { content: row.nomprov, align: "left" },
              { content: `${row.tipoprov} ${row.numbenef ? `- ${row.numbenef}` : ""}`, align: "left" },
              { content: formatDate(row.fecing), align: "center" },
              { content: row.fecvigenciareg ? formatDate(row.fecvigenciareg) : '', align: "center" },
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
        text={`¿Estas seguro que deseas eliminar el Proveedor  ${rows.find((row) => row.numprov == deleteRowId)?.numprov}?`}
      />
      <SimpleBackdrop show={isPending} />

    </>
  );
};

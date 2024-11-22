"use client";
import React, { use, useCallback, useEffect, useState } from "react";

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
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { ITSolRec } from "../tsolrec-types";
import { useDevolver } from "../hook/useTSolRec";
import { calculateDays, formatDate } from "@/utils/main";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import DevDialog from "@/components/modal/devDialog";
import DataSheet from "./data-sheet";

export const Tsolrec = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<ITSolRec[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "Nro. Solicitud", id: "nrosc", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending: deleteLoading } = useDevolver();

  const { data, isLoading, refetch } = useQueryData({
    entity: "compra",
    api: "comp",
    params: { page, per: rowsPerPage, filter, order, status: "PEN" },

    dependency: [filter, order],
  });

  useEffect(() => {
    deleteLoading ? setIsPending(true) : setIsPending(false);
  }, [deleteLoading]);

  useEffect(() => {
    setRows(data?.solcomprslist || []);
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

  const handelDevolver = (id: number) => {
    setDeleteRowId(id);
    setOpenDialog(true);
  };

  const handleCancelDevolver = () => {
    setOpenDialog(false);
  };

  const handleConfirmDevolver = () => {
    const rowToDelete = rows.find((row) => row.nrosc === deleteRowId);
    if (rowToDelete) {
      mutate(deleteRowId);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const [rowToEdit, setRowToEdit] = useState<ITSolRec | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    setIsEdit(true);
    setRowToEdit(rows.find((row) => row.nrosc === id) || null);
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
          loading={isLoading}
          rows={rows}
          headers={columnsHeaders}
          rowAction={(row) => console.log(row)}
          collapsible={{
            visible: (row) => [
              { content: row.iddoc, align: "center" },
              { content: row.nrosc, align: "center" },
              { content: row.descsc, align: "left" },
              { content: calculateDays(row.fecrec), align: "center" },
              { content: row.idsolsum, align: "center" },
              { content: formatDate(row.fecsol), align: "center" },
              { content: formatDate(row.fecreq), align: "center" },
              { content: <BadgeTipodoc tipo={row.stssc} />, align: "center" },
              {
                content: (
                  <Acciones
                    row={row}
                    onDevolver={handelDevolver}
                    onRecibir={handleEdit}
                  />
                ),
                align: "left",
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
      <DataSheet
        isOpen={isEdit}
        onClose={() => {
          setIsEdit(false);
          refetch();
        }}
        row={rowToEdit!}
      />

      <SimpleBackdrop show={isPending} />
      <DevDialog
        open={openDialog}
        handleClose={handleCancelDevolver}
        title="MENSAJE DE DEVOLUCIÓN"
        fecsol={rows.find((row) => row.nrosc === deleteRowId)?.fecsol ?? ''}
        handleConfirm={handleConfirmDevolver}
      />
    </>
  );
};

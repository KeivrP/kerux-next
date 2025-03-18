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
import { RuteoUnidadeslist } from "../truteoundcmp-type";

import DataSheet from "./data-sheet";
import { useDeleteRuteo } from "../hook/useRuteoUnd";

export const TundsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<RuteoUnidadeslist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "codundcmp", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending: deleteLoading } = useDeleteRuteo();

  const { data, isLoading, refetch } = useQueryData({
    entity: "ruteo_undscompras",
    api: "comp",
    params: { page, per: rowsPerPage, filter, order },

    dependency: [filter, order],
  });

  useEffect(() => {
    deleteLoading ? setIsPending(true) : setIsPending(false);
  }, [deleteLoading]);

  useEffect(() => {
    setRows(data?.ruteo_unidadeslist || []);
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
  const [deleteRowId, setDeleteRowId] = useState<string>("");

  const handleDelete = (id: string) => {
    setDeleteRowId(id);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.codundcmp === deleteRowId);
    if (rowToDelete) {
      mutate(deleteRowId);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const [rowToEdit, setRowToEdit] = useState<RuteoUnidadeslist | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = (id: string) => {
    setIsEdit(true);
    setRowToEdit(rows.find((row) => row.codundcmp === id) || null);
  };

  return (
    <>
      <ActionCardHeader
        add={() => {
          handleEdit("anadir");
        }}
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
              { content: `${row?.codundcmp} - ${row?.nombundcmp}`, align: "left" },
              { content: `${row?.ccosto} - ${row?.nombre}`, align: "left" },
              {
                content: row.codgrupo ? `${row?.codgrupo} - ${row?.descgrupo}` : '',
                align: "left",
              },
              {
                content: (
                  <Acciones
                    row={row}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
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
        row={rowToEdit}
      />
      <ConfirmDialog
        mode={"delete"}
        open={openDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        text={`¿Estas seguro que deseas eliminar el ruteo ${
          rows.find((row) => row.codundcmp == deleteRowId)?.codundcmp
        }?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

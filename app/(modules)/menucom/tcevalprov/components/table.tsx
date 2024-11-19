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
import { Criterioslist } from "../tcevalprov-type";

import DataSheet from "./data-sheet";
import { useDeleteCriterio } from "../hook/useCriterios";

export const TundsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Criterioslist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "codcritevalprov", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending: deleteLoading, isSuccess } = useDeleteCriterio();

  const { data, isLoading, refetch } = useQueryData({
    entity: "criterios",
    api: "comp",
    params: { page, per: rowsPerPage, filter, order },

    dependency: [filter, order],
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
    setRows(data?.criterioslist || []);
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
    const rowToDelete = rows.find((row) => row.codcritevalprov === deleteRowId);
    if (rowToDelete) {
      mutate(deleteRowId);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const [rowToEdit, setRowToEdit] = useState<Criterioslist | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = (id: string) => {
    setIsEdit(true);
    setRowToEdit(rows.find((row) => row.codcritevalprov === id) || null);
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
              { content: row.codcritevalprov, align: "left" },
              { content: row.desccrievalprov, align: "left" },

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
        text={`¿Estas seguro que deseas eliminar el Criterio ${
          rows.find((row) => row.codcritevalprov == deleteRowId)
            ?.codcritevalprov
        }?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

"use client";
import React, { useCallback, useEffect, useState } from "react";

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
import { BadgeAct } from "@/components/badge/badge-act";
import { ITnivsum } from "../tnivsum-types";
import { useDeleteNivsum } from "../hook/useNivsum";
import { usePathname, useRouter } from "next/navigation";
import DataSheet from "./data-sheet";

export const Tnivsum = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<ITnivsum[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "nivelsum", operator: "ASC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending, isSuccess } = useDeleteNivsum();

  const { data, isLoading, refetch } = useQueryData({
    entity: "nivs_auts",
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
    setRows(data?.nivautlist || []);
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
  const [rowToEdit, setRowToEdit] = useState<ITnivsum | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    setDeleteRowId(id);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.nivelsum === deleteRowId);
    if (rowToDelete) {
      console.log(`Deleting row with id ${deleteRowId}`);
      mutate(deleteRowId);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const handleEdit = (id: string) => {
    setIsEdit(true);
    setRowToEdit(rows.find((row) => row.nivelsum === id) || null);
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
              { content: row.nivelsum, align: "center" },
              { content: row.descnivel, align: "left" },
              {
                content: <BadgeAct status={row.indgeneral} />,
                align: "center",
              },

              {
                content: (
                  <Acciones
                    row={row}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onOpen={(a) => router.push(`${pathname}/${a}`)}
                  />
                ),
                align: "center",
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
        text={`¿Estas seguro quedeseas eliminar el nivel de autorización ${
          rows.find((row) => row.nivelsum == deleteRowId)?.nivelsum
        }?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

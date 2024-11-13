"use client";
import { useCallback, useEffect, useState } from "react";

import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { BaseTable } from "@/components/table-material/genericTable";
import { Rutalist } from "../trutas-types";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import { useDeleteRuta } from "../hook/useRutas";
import ActionCardHeader from "@/components/card/actionCardHeader";
import {
  Acciones,
  columnsFilter,
  columnsHeaders,
  columnsOrder,
} from "./header-table";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import EditTrutas from "./edit";
import { usePathname, useRouter } from "next/navigation";

export const TrutasTable = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [rows, setRows] = useState<Rutalist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "codruta", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rowSelected, setRowSelected] = useState<Rutalist | null>(null);
  const [ruta, setRuta] = useState<string | null>(null);
  const [deleteRowId, setDeleteRowId] = useState<string>("");


  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending: deleteLoading } = useDeleteRuta();

  const [isPendingData, handleLoading] = useState<boolean>(false);

  console.log("isSuccessRuta", isPendingData, isDrawerOpen);

  useEffect(() => {
    if (deleteLoading) {
      handleLoading(true);
    } else handleLoading(false);
  }, [deleteLoading, handleLoading]);

  const { data, isLoading, refetch } = useQueryData({
    entity: "rutas",
    api: "doc",
    params: {
      page,
      per: rowsPerPage,
      filter,
      order,
    },
    dependency: [filter, order, page, rowsPerPage],
  });
  useEffect(() => {
    setRows(data?.rutalist || []);
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

  const handleDelete = (codruta: string) => {
    setDeleteRowId(codruta);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.codruta === deleteRowId);
    if (rowToDelete) {
      mutate(deleteRowId);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const handleEdit = (codruta: string) => {
    setDrawerOpen(true);
    setRowSelected(rows.find((row) => row.codruta === codruta) || null);
    console.log(`Edit ${codruta}`);
  };

  const handleCreate = () => {
    setDrawerOpen(true);
    setRowSelected(null);
  };

  const handleOpen = (codruta: string) => {
    if (codruta) {
      setOpenModal(true);
      router.push(`${pathname}/${codruta}`);

    }
  };

  return (
    <>
      <ActionCardHeader
        add={() => {
          handleCreate();
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
              { content: row.codruta, align: "center" },
              { content: row.descruta, align: "center" },
              {
                content: (
                  <Acciones
                    row={row}
                    onOpen={handleOpen}
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
        text={`¿Estas seguro que deseas eliminar la ruta ${
          rows.find((row) => row.codruta)?.codruta
        }?`}
      />
      <EditTrutas
        isPending={handleLoading}
        row={rowSelected}
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        refetch={refetch}
      />

      <SimpleBackdrop show={isPendingData} />
    </>
  );
};

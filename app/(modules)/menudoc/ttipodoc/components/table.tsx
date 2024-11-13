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
import { Tipodoclist } from "../ttipodc-types";
import { useDeleteTipoDoc } from "../hook/useTipoDoc";
import { BadgeAct } from "@/components/badge/badge-act";

export const TtipodocTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Tipodoclist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "tipodoc", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { mutate, isPending, isSuccess } = useDeleteTipoDoc();

  const { data, isLoading } = useQueryData({
    entity: "tipo_docs",
    api: "doc",
    params: {
      page: page + 1,
      per: rowsPerPage,
      filter,
      order,
    },
    dependency: [filter, order, page, rowsPerPage, isSuccess],
  });
  useEffect(() => {
    setRows(data?.tipodoclist || []);
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
    const rowToDelete = rows.find((row) => row.tipodoc === deleteRowId);
    if (rowToDelete) {
      mutate(deleteRowId);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit ${id}`);
  };
  return (
    <>
      <ActionCardHeader
        add={() => {
          console.log("anadir");
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
              { content: row.tipodoc, align: "center" },
              { content: row.desctipodoc, align: "left" },
              { content: row.codruta, align: "left" },
              {
                content: <BadgeAct status={row.indactivo} />,
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
        text={`¿Estas seguro que deseas eliminar el Tipo de Documento ${
          rows.find((row) => row.tipodoc == deleteRowId)?.tipodoc
        }?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

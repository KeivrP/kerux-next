'use client'
import React, { useCallback, useEffect, useState } from "react";


import { Beneficiariolist } from "../tbenef-types";
import { useDeleteBenef } from "../hook/useBenef";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import FilterButton, { Filter } from "@/components/button/FilterButton";
import { Button, Typography } from "@mui/material";
import OrderButton, { Order } from "@/components/button/OrderButton";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import { useBackdrop } from "@/components/backdrop/backdrop";


export const TbenefTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Beneficiariolist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "numbenef", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const { handleLoading } = useBackdrop();

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */


  const { mutate, isSuccess } = useDeleteBenef();

  useEffect(() => {
    if (isSuccess) {
      handleLoading("", true);
    } else handleLoading("", false);
  }, [isSuccess, handleLoading]);

  const { data, isLoading } = useQueryData({
    entity: "beneficiarios",
    api: 'doc',
    params: {
      page: page + 1,
      per: rowsPerPage,
      filter,
      order,
    },
    dependency: [filter, order, page, rowsPerPage, isSuccess],
  });
  useEffect(() => {
    setRows(data?.beneficiariolist || []);
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
    const rowToDelete = rows.find((row) => row.numbenef === deleteRowId);
    if (rowToDelete) {
      mutate({
        id: deleteRowId
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
      <ActionCardHeader isAddButtonVisible={true}>
        <FilterButton
          columns={columnsFilter}
          onApplyFilter={(a) => setFilter(a)}
        />
        <OrderButton columns={columnsOrder} onApplyOrder={(a) => setOrder(a)} />
        <Button
          onClick={() => console.log("Añadir")}
          variant="contained"
          color="primary"
          disabled={false}
          sx={{ textTransform: "none" }}
        >
          <Typography variant="h3">+ AÑADIR</Typography>
        </Button>
      </ActionCardHeader>
      <br />
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
              { content: row.numbenef, align: "center" },
              { content: `${row.letraid}-${row.numid}`, align: "center" },
              { content: row.nombre, align: "left" },
              { content: row.appabrev, align: "left" },
              {
                content: row.indactivo,
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
        text={`¿Estas seguro que deseas eliminar el beneficiario ${rows.find((row) => row.numbenef == deleteRowId)?.numbenef}?`}
      />
    </>
  );
};

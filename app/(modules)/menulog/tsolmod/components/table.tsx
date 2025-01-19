'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { Solsummodlist } from "../tsolmod-types";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { usePathname, useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import { useDeleteTsolmod, useGenerateTsolmod } from "../hook/useTsolmod";
import SimpleBackdrop from "@/components/backdrop/backdrop";


export const TsolmodTable = () => {
  const theme = useTheme();
  const { mutate: deleteRng, isPending: isDeleting, isSuccess: isDelete } = useDeleteTsolmod();
  const { mutate: generaRng, isPending: isGenerando, isSuccess: isGenerado } = useGenerateTsolmod();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState<Solsummodlist[]>([]);
  const [order, setOrder] = useState<Order[]>([
    { column: "N°", id: "numsolsum", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);
  const router = useRouter()
  const pathname = usePathname();

  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */

  const { data, isLoading, refetch } = useQueryData({
    entity: "sols_sums_mods",
    params: { page: page + 1, per: rowsPerPage, filter, order },
    dependency: [filter, order],
  });
  useEffect(() => {
    setRows(data?.solsummodlist || []);
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

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmRowId, setConfirmRowId] = useState<number>(0);

  const handleDelete = (id: number) => {
    setDeleteRowId(id);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.numsolsum === deleteRowId)?.numsolsum;
    if (rowToDelete) {
      deleteRng({ id: rowToDelete });
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const handleOpen = (id: number) => {
    if (id) {
      router.push(`${pathname}/${id}`);

    }
  };

  useEffect(() => {
    if (isDelete || isGenerado) {
      refetch();
    }
  }, [isDelete, isGenerado])

  const handleGenerate = (id: number) => {
    setConfirmRowId(id);
    setOpenConfirm(true);
  };

  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmConfirm = () => {
    const rowToConfirm = rows.find((row) => row.numsolsum === confirmRowId)?.numsolsum;
    if (rowToConfirm) {
      generaRng({ id: rowToConfirm });
    } else {
      console.log(`Row with id ${confirmRowId} not found`);
    }
    setOpenConfirm(false);
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
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <BaseTable
          loading={isLoading}
          rows={rows}
          headers={columnsHeaders}
          rowAction={(row) => console.log(row)}
          collapsible={{
            visible: (row) => [
              { content: row.numsolsum, handleCollapse: true, align: "left" },
              { content: row.ano, align: "center" },
              { content: row.codaccint, align: "center" },
              { content: row.ccosto, align: "center" },
              { content: row.desccorta, align: "left" },
              {
                content: (
                  <Acciones
                    row={row}
                    onDelete={handleDelete}
                    onOpen={handleOpen}
                    onGenerate={handleGenerate}
                  />
                ),
                action: () => null,
                disableTooltip: true,
              },
            ],

            collapsed: (row) => [

              { name: "Acción Interna", content: row.descaccint },
              { name: "Centro de Costo", content: row.desccosto },

            ],
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
        text={`¿Estas seguro que deseas eliminar el numero de renglon ${rows.find((row) => row.numsolsum === deleteRowId)?.numsolsum
          }?`}
      />
      <ConfirmDialog
        mode="confirm"
        open={openConfirm}
        onConfirm={handleConfirmConfirm}
        onCancel={handleCancelConfirm}
        text={`¿Estas seguro que deseas generar el numero de renglon ${rows.find((row) => row.numsolsum === confirmRowId)?.numsolsum
          }?`}
      />
      <SimpleBackdrop show={isDeleting || isGenerando} />
    </>
  );
};

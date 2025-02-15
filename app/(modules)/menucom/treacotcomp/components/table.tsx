'use client'
import React, { useCallback, useEffect, useState } from "react";
import { ITreacotcomp } from "../Treacotcomp-types";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { Acciones, columnsFilter, columnsHeadersTreacotcomp, columnsOrder } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BadgeAct } from "@/components/badge/badge-act";
import ActionCardReasignarHeader from "@/components/card/actionCardReasignarHeader";
import Checkbox from "@/components/checkbox/checkbox";
import { useReAsignar } from "../hook/useReasignAll";

export const Treacotcomp = () => {

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<ITreacotcomp[]>([]);
  const [order, setOrder] = useState<Order[]>([
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [count, setCount] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedRows, setSelectedRows] = useState<ITreacotcomp[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const isPending = false;
  /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */


  const { mutate, isPending: reAsingLoading } = useReAsignar();

  const { data, isLoading, refetch } = useQueryData({
    entity: "cotizaciones",
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
    setRows(data?.Cotizacioneslist || []);
    setCount(data?.total);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [reAsingLoading]);

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
    const rowToDelete = rows.find((row) => row.nrosc === deleteRowId);
    if (rowToDelete) {
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    } setOpenDialog(false);
  }

  const handleEdit = (idsolsum: number) => {
    console.log(`Edit ${idsolsum}`);
  };

    const handleRowSelect = (row: ITreacotcomp) => {
        setSelectedRows((prevRows) => {
            // Si el row ya está seleccionado, lo removemos del array
            var selectedRows = prevRows;
            if (prevRows.includes(row)) {
               selectedRows = prevRows.filter((item) => item !== row);
            }
            // Si el row no está seleccionado, lo agregamos al array
            else {
                selectedRows = [...prevRows, row];
            }


           if (selectedRows.length > 0) {
            setIsSelected(true);
           }
           else {
            setIsSelected(false);
           }

          return selectedRows;
        });
    };
  return (
    <>
      <ActionCardReasignarHeader
        add={() => { console.log('anadir') }}
        onApplyFilter={(filters) => setFilter(filters)}
        columnsFilter={columnsFilter}
        onApplyOrder={(orders) => setOrder(orders)}
        columnsOrder={columnsOrder}
        setFilter={setFilter}
        setOrder={setOrder}
        isAddButtonVisible={false}
        titleButton={"REASIGNAR"}
        isAddButtonAdicionalActive={!isSelected}
        reasignar={(codComprador) => { mutate({numcot:selectedRows.map((item) => item.numcot),codcomprador:codComprador})} }
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
          headers={columnsHeadersTreacotcomp }
          rowAction={(row) => console.log(row)}
                    addCheckboxColumn={true}
                    onSelectionChange={(selectedRowIndices) => {
                        const updateSelect = selectedRowIndices.map((index) => rows[index]); // Seleccionar todo lo que aparezca
                        setSelectedRows(updateSelect);
                        if (selectedRowIndices.length > 0) {
                          setIsSelected(true);
                        }
                        else {
                          setIsSelected(false);
                        }
                    }}
          collapsible={{
            visible: (row) => [
                            {
                                content: (
                                    <Checkbox //selecionar uno a uno
                                        checked={selectedRows.includes(row)}
                                        onChange={() => handleRowSelect(row)}
                                    />
                                ),
                            },
                     { content: row.numcot, align: "left" },
                     { content: row.stscot, align: "left" },
                     { content: row.feccot, align: "left" },
                     { content: row.nrosc, align: "left" },
                     { content: row.numprov, align: "left" },
                     { content: row.nomprov, align: "left" },
                     { content: row.codcomprador, align: "left" },
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
        text={`¿Estas seguro que deseas eliminar el beneficiario ${rows.find((row) => row.nrosc == deleteRowId)?.nrosc}?`}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

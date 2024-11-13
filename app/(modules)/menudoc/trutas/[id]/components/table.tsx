/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BaseTable } from "@/components/table-material/genericTable";
import { useQueryData } from "@/server/fetch-data";
import ActionCardHeader from "@/components/card/actionCardHeader";

import { ConfirmDialog } from "@/components/modal/confirmDialog";
import { Acciones, columnsHeaders } from "./header-table";
import { PasoRutas, TipoEventoOptions } from "../../trutas-types";
import {
  useCreatePasoRuta,
  useDeletePasoRuta,
  useUpdatePasoRuta,
} from "../../hook/useRutas";
import EditFrutas from "./edit";

interface FrutasTableProps {
  id: string;
  rows: PasoRutas[];
  isLoading: boolean;
  refetch: () => void;
  setRows: React.Dispatch<React.SetStateAction<PasoRutas[]>>;
}

export const FrutasTable: React.FC<FrutasTableProps> = ({
  id,
  rows,
  isLoading,
  refetch,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);
  const [rowSelected, setRowSelected] = useState<PasoRutas | null>(null);

  const { mutate, isPending: deleteLoading } = useDeletePasoRuta();
  const { mutate: mutateUpdate, isPending: updateLoading } =
    useUpdatePasoRuta();
  const { mutate: mutateCreate, isPending: createLoading } =
    useCreatePasoRuta();

  useEffect(() => {
    if (deleteLoading || updateLoading || createLoading) {
      handleLoading(true);
    } else {
      handleLoading(false);
      refetch();
    }
  }, [deleteLoading, updateLoading, createLoading]);
  const [isPendingData, handleLoading] = useState<boolean>(false);

  useEffect(() => {
    if (deleteLoading) {
      handleLoading(true);
    } else handleLoading(false);
  }, [deleteLoading, handleLoading]);

  const handleDelete = (paso: number) => {
    setDeleteRowId(paso);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const rowToDelete = rows.find((row) => row.paso === deleteRowId);
    if (rowToDelete) {
      mutate(rowToDelete);
    } else {
      console.log(`Row with id ${deleteRowId} not found`);
    }
    setOpenDialog(false);
  };

  const handleEdit = (paso: number) => {
    setDrawerOpen(true);
    setRowSelected(rows.find((row) => row.paso === paso) || null);
    console.log(`Edit ${paso}`);
  };

  const handleCreate = () => {
    setDrawerOpen(true);
    setRowSelected(null);
  };

  return (
    <>
      <ActionCardHeader
      isAddFilterVisible={false}
      isAddOrderVisible={false}
      add={() => {
        handleCreate();
      }}
      actions={{disabled: rows.some(row => row.codproxsis === "FIN")}}
      />

      <div
      style={{
        height: "35vh",
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
          { content: row.paso, align: "center" },
          { content: row.codsisaprob, align: "center" },
          {
          content: TipoEventoOptions.find(
            (option: { value: string }) => option.value === row.tipoevento
          )?.name,
          align: "center",
          },
          { content: row.codproxsis, align: "center" },
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
      <EditFrutas
      id={id}
      rows={rows}
      isPending={handleLoading}
      row={rowSelected}
      isOpen={isDrawerOpen}
      onClose={() => setDrawerOpen(false)}
      refetch={() => {
        refetch();
      }}
      />
      <SimpleBackdrop show={isPendingData} />
    </>
  );
};

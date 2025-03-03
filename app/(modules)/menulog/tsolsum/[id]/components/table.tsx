/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BaseTable } from "@/components/table-material/genericTable";
import ActionCardHeader from "@/components/card/actionCardHeader";

import { Acciones, columnsHeaders } from "./header-table";

import {
  FormContextProps,
  initialRenglon,
  Detsolsum,
} from "../../tsolsum-types";
import BadgeModule from "@/components/badge/badge-mod";
import { formatCurrency, formatDate } from "@/utils/main";
import { Typography } from "@mui/material";
import { Input } from "@/components/ui/input";
import DataSheet from "./edit-table";
import { calcularTotales } from "../utils";
import { BadgeSolSum } from "@/components/badge/badge-log";
import { useDeleteRenglon } from "../../hook/useTsolsum";
import { ConfirmDialog } from "@/components/modal/confirmDialog";

interface DataInputProps extends FormContextProps {
  isLoading: boolean;
  refetch: () => void;
}

export const FsolsumTable: React.FC<DataInputProps> = ({
  formData,
  isLoading,
  refetch
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [rowSelected, setRowSelected] =
    useState<Detsolsum>(initialRenglon);

  const handleCreate = () => {
    const data = { ...initialRenglon, nroreng: formData.detsolsum.length + 1 }
    setRowSelected(data);
    setDrawerOpen(true);
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [idRenglon, setIdRenglon] = useState<number>(0);
  const [nroRenglon, setNroRenglon] = useState<number>(0);


  const { mutate: deleteRenglon, isPending, isSuccess } = useDeleteRenglon();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }
    , [isSuccess]);

  const handleDelete = (id: number, nro: number) => {
    setIdRenglon(id);
    setNroRenglon(nro);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    resetDeleteState();
  };

  const handleConfirmDelete = () => {
    if (idRenglon !== 0 && nroRenglon !== 0) {
      deleteRenglon({ id: idRenglon, nro: nroRenglon });
    }
    resetDeleteState();
  };

  const resetDeleteState = () => {
    setIdRenglon(0);
    setNroRenglon(0);
    setOpenDialog(false);
  };

  const handleEdit = (row: Detsolsum) => {
    setRowSelected(row);
    setDrawerOpen(true);
  };

  const { total, totalIVA, subtotal } = calcularTotales(formData);

  return (
    <>
      <ActionCardHeader
        isAddFilterVisible={false}
        isAddOrderVisible={false}
        add={() => {
          handleCreate();
        }}
      />

      <div
        style={{
          height: "70vh",
          width: "100%",
        }}
      >
        <BaseTable
          loading={isLoading}
          rows={formData.detsolsum}
          headers={columnsHeaders}
          rowAction={(row) => console.log()}
          collapsible={{
            visible: (row: Detsolsum) => [
              { content: row.nroreng, handleCollapse: true, align: "center" },
              { content: row.dsp_DescTipoReng, align: "left" },
              { content: row.dsp_DescNombNorm, align: "left" },
              { content: row.tiporeng !== "MT" ? row.codserv : row.coditem, align: "center" },
              { content: row.descreng, align: "left" },

              { content: row.unidbasica, align: "center" },
              { content: formatCurrency(row.cantsol), align: "center" },
              { content: formatCurrency(row?.precio), align: "center" },
              { content: row.porcimptos, align: "center" },
              { content: formatCurrency(row.dsp_MtoTotReng), align: "center" },
              {
                content: <BadgeModule codmenu={row.destino} />,
                align: "center",
              },
              { content: <BadgeSolSum tipo={row.stsrngsol} />, align: "center" },
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

            collapsed: (row: Detsolsum) => [
              {
                name: "Descripción del servicio, mantenimiento u obra",
                content: row.descreng,
              },
              {
                name: "Cuenta Presupuestaria",
                content: `${row.codcta} - ${row.dsp_DescCodCta}`,
              },
              {
                name: "Fecha de última compra",
                content: formatDate(row.fecstsrng),
              },

              {
                name: "Clasif. SNC",
                content: row.codclasifsnc,
              },
            ],
          }}
        >
          <Grid container spacing={2} mt={2}>
            <Grid size={4}>
              <Typography variant="h3" color="primary" mb={1.5}>
                SubTotal
              </Typography>
              <Input value={formatCurrency(subtotal)} disabled />
            </Grid>
            <Grid size={4}>
              <Typography variant="h3" color="primary" mb={1.5}>
                Impuesto
              </Typography>
              <Input value={formatCurrency(totalIVA)} disabled />
            </Grid>
            <Grid size={4}>
              <Typography variant="h3" color="primary" mb={1.5}>
                Total
              </Typography>
              <Input value={formatCurrency(total)} disabled />
            </Grid>
          </Grid>
        </BaseTable>
      </div>
      <ConfirmDialog
        mode={"delete"}
        open={openDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        text={`¿Estas seguro que deseas eliminar el renglón numero: ${nroRenglon }?`}
      />
      <DataSheet
        formData={formData}
        /*       isPending={handleLoading}
         */
        row={rowSelected}
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        refetch={() => {
          refetch();
        }}
      />
      <SimpleBackdrop show={isPending} />
    </>
  );
};

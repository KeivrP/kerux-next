/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BaseTable } from "@/components/table-material/genericTable";
import ActionCardHeader from "@/components/card/actionCardHeader";

import { Acciones, columnsHeaders } from "./header-table";

import {
  FormContextProps,
  initialRenglon,
  Detsolsum,
} from "../../../tsolsum/tsolsum-types"
import BadgeModule from "@/components/badge/badge-mod";
import { formatCurrency, formatDate } from "@/utils/main";
import { Typography } from "@mui/material";
import { Input } from "@/components/ui/input";
import { calcularTotales } from "../utils";
import { BadgeSolSum } from "@/components/badge/badge-log";
import Frengcom from "./frengcomp";

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



  const handleEdit = (row: Detsolsum) => {
    if (row.destino === "COMP") {
      setRowSelected(row);
    setDrawerOpen(true);
    } else {
     
    }
};

const { total, totalIVA, subtotal } = calcularTotales(formData);

const [open, setOpen] = useState(false)


return (
  <>
    <ActionCardHeader
      isAddFilterVisible={false}
      isAddOrderVisible={false}
      isAddButtonVisible={false}
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
        rowAction={(row) => console.log(row)}
        collapsible={{
          visible: (row: Detsolsum) => [
            { content: row.nroreng, handleCollapse: true, align: "center" },
            { content: row.dsp_DescTipoReng, align: "left" },
            { content: row.dsp_DescNombNorm, align: "left" },
            { content: row.tiporeng !== "MT" ? row.codserv : row.coditem, align: "center" },
            { content: row.descreng, align: "left" },
            {
              content: <BadgeModule codmenu={row.destino} />,
              align: "center",
            },
            { content: <BadgeSolSum tipo={row.stsrngsol} />, align: "center" },
            { content: row.unidbasica, align: "center" },
            { content: row.cantsol, align: "center" },
            { content: formatCurrency(row?.precio), align: "center" },
            { content: row.porcimptos, align: "center" },
            { content: formatCurrency(row.dsp_MtoTotReng), align: "center" },
            {
              content: (
                <Acciones
                  row={row}
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
            /*     {
                  name: "Moneda",
                  content: row.DSP_CodMonedaPrecio,
                }, */
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

    <SimpleBackdrop show={false} />

    <Frengcom open={isDrawerOpen} handleClose={() => { setDrawerOpen(false) }} idsolsum={formData.cabsolsum.idsolsum} nrorng={rowSelected.nroreng} />

  </>
);
};

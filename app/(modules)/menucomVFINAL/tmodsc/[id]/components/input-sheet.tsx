import React from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { ICabSolCompra, ITSolRec } from "../../../tsolrec/tsolrec-types";
import { Input } from "@/components/ui/input";
import { BadgeTipoComp } from "@/components/badge/badge-estatus";

interface InputSheetProps {
  isLoading?: boolean;
  rows: ICabSolCompra;
}

const InputSheet = ({ isLoading, rows }: InputSheetProps) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      {/* ---------------------- NUMERO DE SOLICITUD DE COMPRA --------------------- */}
      <Grid size={6}>
        <Typography variant="h3" color="primary">
          Nro de Solicitud
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={rows?.nrosc} disabled />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={rows?.descsc} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" color="primary" mb={1}>
          Fecha Requerida
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={rows?.fecreq} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" color="primary" mb={1}>
          Fecha de Cambio
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={rows?.fecsts} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3" color="primary">
          Comprador
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={rows?.codcomprador ?? ''} disabled />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={rows?.Comprador?.nomcomprador ?? ''} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={2.5}>
        <Typography variant="h3" color="primary" mb={1}>
          Solicitud de Suministro
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={rows?.idsolsum} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={2.5}>
        <Typography variant="h3" color="primary" mb={1}>
          Moneda
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={rows?.codmoneda} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={1}>
        <Typography variant="h3" color="primary" mb={1}>
          Estatus
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <BadgeTipoComp tipo={rows?.stssc} />
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
};

export default InputSheet;

import { SkeletonInput } from '@/components/skeleton/detail';
import { ConditionalWrapper } from '@/utils/main';
import { Typography , Grid2 as Grid, TextField, Autocomplete} from '@mui/material';
import React from 'react'
import { ITSolRec } from '../tsolrec-types';
import AutocompleteAsync from '@/components/ui/autocompleteAsync';
import { useQueryData } from '@/server/fetch-data';

interface InputSheetProps {
    data: ITSolRec;
}

const InputSheet = ({data}: InputSheetProps) => {
    const { data: dataCompradores, isLoading: loadingDataCompradores } =
    useQueryData({
      entity: "comprador",
      api: "comp",
      params: {
        codundcmp: data.codundcmp
      },
    });
    const { data: accInt, isLoading: loadingAccInt } = useQueryData({
        entity: "codaccint",
        api: "log",
        params: {
          fecsol: data.fecsol,
          ccosto: data.ccosto,
        },
      });
    let loadingComp = false;
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      {/* ---------------------- NUMERO DE SOLICITUD DE COMPRA --------------------- */}
      <Grid size={3.5}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Número de Solicitud de Compra
        </Typography>
        <ConditionalWrapper condition={loadingComp} wrapper={SkeletonInput}>
          <TextField
            value={data.nrosc}
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      {/* ----------------------------- CAMPO EDITABLE ----------------------------- */}
      <Grid size={8}>
        <ConditionalWrapper condition={loadingComp} wrapper={SkeletonInput}>
          <TextField
            sx={{ marginTop: "1.7rem" }}
            value={data.descsc}
            onChange={(e) => {
/*               handleInputChange("descsc", e.target.value);
 */            }}
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      {/* --------------------------- ID DE LA SOLICITUD --------------------------- */}
      <Grid size={3.5}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          ID Solicitud de Suministros
        </Typography>
        <ConditionalWrapper condition={loadingComp} wrapper={SkeletonInput}>
          <TextField
            value={data.idsolsum}
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={8} sx={{ marginTop: "1.7rem" }}>
        <ConditionalWrapper condition={loadingComp} wrapper={SkeletonInput}>
          <TextField
            value={
             /*  cabsolcompraO?.cabsolcompra.desccorta
                ? cabsolcompraO?.cabsolcompra.desccorta
                :  */""
            }
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      {/* -------------------------------- COMPRADOR ------------------------------- */}
      <Grid size={3.5}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Comprador
        </Typography>
        <ConditionalWrapper
          condition={false}
          wrapper={SkeletonInput}
        >
          {/* --------------------- SELECCIONA CODIGO DE COMPRADOR --------------------- */}
          <AutocompleteAsync
            text="label"
            options={dataCompradores!}
            loading={false}
            onSelectionChange={(e) => {
              
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={8} sx={{ marginTop: "1.7rem" }}>
        <ConditionalWrapper
          condition={false}
          wrapper={SkeletonInput}
        >
          <TextField
            value={'dataCompradores'}
            InputProps={{
              readOnly: true,
              style: {
                // estilos
              },
            }}
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      {/* ---------------------------- CENTRO DE COSTOS ---------------------------- */}
      <Grid size={3.5}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Centro de Costo
        </Typography>
        <ConditionalWrapper condition={loadingComp} wrapper={SkeletonInput}>
          <TextField
            value={data.ccosto}
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={8} sx={{ marginTop: "1.7rem" }}>
        <ConditionalWrapper condition={loadingComp} wrapper={SkeletonInput}>
          <TextField
            value={
             /*  cabsolcompraO?.cabsolcompra.CentCosto.nombre
                ? cabsolcompraO?.cabsolcompra.CentCosto.nombre
                : */ ""
            }
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
      {/* ----------------------------- ACCIÓN INTERNA ----------------------------- */}
      <Grid size={3.5}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Acción Interna
        </Typography>
        {/* ----------------------------- CAMPO EDITABLE ----------------------------- */}
        <ConditionalWrapper condition={loadingAccInt} wrapper={SkeletonInput}>
          <Autocomplete
            disablePortal
            options={accInt}
            size="small"
            renderInput={(params) => <TextField {...params} />}
            value={data.codaccint}
            onChange={(_, newValue) =>
              console.log("codaccint", newValue!)
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={8} sx={{ marginTop: "1.7rem" }}>
        <ConditionalWrapper condition={loadingAccInt} wrapper={SkeletonInput}>
          <TextField
            value={
             /*  descValueAI === undefined
                ? cabsolcompraO?.cabsolcompra.descaccint
                : descValueAI */
                ''
            }
            fullWidth
            size="small"
            variant="outlined"
          />
        </ConditionalWrapper>
      </Grid>
    </Grid>
  )
}

export default InputSheet
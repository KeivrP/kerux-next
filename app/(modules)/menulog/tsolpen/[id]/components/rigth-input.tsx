import React, { useEffect, useState } from "react";
import { FormContextProps } from "../../../tsolsum/tsolsum-types";
import Grid from "@mui/material/Grid2";
import { useQueryData } from "@/server/fetch-data";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ConditionalWrapper } from "@/utils/main";
import { BadgeTipodoc } from "@/components/badge/badge-estatus";
import { SkeletonInput } from "@/components/skeleton/detail";
import { Input } from "@/components/ui/input";
import { parseDate } from "@internationalized/date";
import TextDivider from "@/components/ui/textDivider";

interface DataInputProps extends FormContextProps {
  isLoading: boolean;
}

const RightInput = ({ isLoading, formData }: DataInputProps) => {
  const [reservaValue, setReservaValue] = useState<string>(formData.cabsolsum.reserva || "");
  const { data: lst_iddocres, isLoading: isLoadingIddocres } = useQueryData({
    entity: "iddocres",
  });
  const { data: lst_controlog, isLoading: isLoadingControlog } = useQueryData({
    entity: "controlog",
  });

  useEffect(() => {
    if (lst_controlog && Array.isArray(lst_controlog) && lst_controlog.length > 0) {
      let initialReservaValue = formData.cabsolsum.reserva;
      if (initialReservaValue === null || initialReservaValue === "") {
        initialReservaValue = lst_controlog[0].indestreserva === "S" ? "E" : "N";
      }
      setReservaValue(initialReservaValue);
    }
  }, [lst_controlog, formData.cabsolsum.reserva]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextDivider>Fecha</TextDivider>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" color="primary" sx={{ marginBottom: "0.65rem" }}>
          Solicitud
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            value={formData.cabsolsum.fecsol ? parseDate(formData.cabsolsum.fecsol).toString() : ""}
            disabled // Deshabilitar el input
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" color="primary" sx={{ marginBottom: "0.65rem" }}>
          Recepción
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            value={formData.cabsolsum.fecrecsol ? parseDate(formData.cabsolsum.fecrecsol).toString() : ""}
            disabled
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" color="primary" sx={{ marginBottom: "0.65rem" }}>
          Requerida
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            value={formData.cabsolsum.fecreqsol ? parseDate(formData.cabsolsum.fecreqsol).toString() : ""}
            disabled
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <TextDivider>Compra</TextDivider>
      </Grid>
      <Grid size={2.5}>
        <Typography variant="h3" color="primary" mb={1}>
          Moneda
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={formData.cabsolsum.codmoneda} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" color="primary" mb={1}>
          Compra directa
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Checkbox checked={formData.cabsolsum.indcomdir === "S"} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" color="primary" mb={1}>
          Compras y Contrato
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Checkbox checked={formData.cabsolsum.indcompctto === "S"} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <TextDivider>Reserva</TextDivider>
      </Grid>

      <Grid size={8}>
        <Typography variant="h3" color="primary"></Typography>
        <ConditionalWrapper condition={isLoadingControlog || isLoading} wrapper={SkeletonInput}>
          <RadioGroup row value={reservaValue} >
            <FormControlLabel value="N" control={<Radio />} label="Ninguna" />
            <FormControlLabel value="E" control={<Radio />} label="Establece" />
            <FormControlLabel value="P" control={<Radio />} label="Previo" />
          </RadioGroup>
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" color="primary">
          ID
        </Typography>
        <ConditionalWrapper condition={isLoadingIddocres || isLoading} wrapper={SkeletonInput}>
          <Autocomplete
            fullWidth
            disabled
            size="small"
            options={lst_iddocres}
            getOptionLabel={(option) => option.iddoc}
            renderInput={(params) => <TextField {...params} />}
            value={
              Array.isArray(lst_iddocres)
                ? lst_iddocres.find((option) => option.iddoc === formData.cabsolsum.iddocres) || null
                : null
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <TextDivider>Origen</TextDivider>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3" color="primary" mb={1}>
          Origen
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={formData.cabsolsum.origensol} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3" color="primary" mb={1}>
          Id Doc Externo
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={formData.cabsolsum.iddocexterno} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <TextDivider>Estatus</TextDivider>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Estatus
        </Typography>
        <div className="flex w-full items-center gap-4 mt-2">
          <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
            <BadgeTipodoc tipo={formData.cabsolsum.stssol} />
          </ConditionalWrapper>
          {formData.cabsolsum.stssol === "RCH" || formData.cabsolsum.stssol === "RAE" ? (
            <Box
              sx={{
                bgcolor: "#142f62",
                alignItems: "center",
                padding: 0.5,
                borderRadius: 1,
                width: "100%",
              }}
            >
              <Typography style={{ fontSize: 12 }} align="center" color="#fff">
                {formData.cabsolsum.mensajes}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default RightInput;
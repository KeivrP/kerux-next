import { SkeletonInput } from "@/components/skeleton/detail";
import { ConditionalWrapper } from "@/utils/main";
import {
  Typography,
  Grid2 as Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import React from "react";
import { FormContextProps } from "../tsolrec-types";
import { useQueryData } from "@/server/fetch-data";
import { Input } from "@/components/ui/input";

interface InputSheetProps extends FormContextProps {
  isLoading?: boolean;
}

const InputSheet = ({ formData, isLoading, setFormData }: InputSheetProps) => {
  const { data: dataCompradores, isLoading: loadingDataCompradores } =
    useQueryData({
      entity: "comprador",
      api: "comp",
      params: {
        codundcmp: formData.cabsolcompra.codundcmp,
      },
    });
  const { data: accInt, isLoading: loadingAccInt } = useQueryData({
    entity: "codaccint",
    api: "log",
    params: {
      fecsol: formData.cabsolcompra.fecsol,
      ccosto: formData.cabsolcompra.ccosto,
    },
  });

  const Comprador = React.useMemo(() => {
    if (Array.isArray(dataCompradores)) {
      return (
        dataCompradores.find(
          (comprador: { codcomprador: string }) =>
            comprador.codcomprador === formData.cabsolcompra.codcomprador
        )?.nomcomprador || ""
      );
    }
    return "";
  }, [dataCompradores, formData.cabsolcompra.codcomprador]);

  const AccionInterna = React.useMemo(() => {
    if (accInt) {
      return (
        accInt.find(
          (acc: { codaccint: string }) =>
            acc.codaccint === formData.cabsolcompra.codaccint
        )?.descripcion || ""
      );
    }
    return "";
  }, [accInt, formData.cabsolcompra.codaccint]);

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
          Número de Solicitud de Compra
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={formData.cabsolcompra.nrosc} disabled />
            </ConditionalWrapper>
          </Grid>
          {/* ----------------------------- CAMPO EDITABLE ----------------------------- */}
          <Grid size={8}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input
                value={formData.cabsolcompra.descsc}
                onChange={(e) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolcompra: {
                      ...prevFormData.cabsolcompra,
                      descsc: e.target.value,
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      {/* --------------------------- ID DE LA SOLICITUD --------------------------- */}
      <Grid size={6}>
        <Typography variant="h3" color="primary">
          ID Solicitud de Suministros
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={formData.cabsolcompra.idsolsum} disabled />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={formData.cabsolcompra.desccorta} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      {/* -------------------------------- COMPRADOR ------------------------------- */}
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Comprador
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            <ConditionalWrapper
              condition={loadingDataCompradores}
              wrapper={SkeletonInput}
            >
              {/* --------------------- SELECCIONA CODIGO DE COMPRADOR --------------------- */}
              <Autocomplete
                fullWidth
                size="small"
                options={Array.isArray(dataCompradores) ? dataCompradores : []}
                getOptionLabel={(option: { codcomprador: string }) =>
                  option.codcomprador
                }
                renderInput={(params) => <TextField {...params} />}
                value={
                  Array.isArray(dataCompradores)
                    ? dataCompradores.find(
                        (option: { codcomprador: string | undefined }) =>
                          option.codcomprador ===
                          formData.cabsolcompra.codcomprador
                      ) || null
                    : null
                }
                onChange={(_, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolcompra: {
                      ...prevFormData.cabsolcompra,
                      codcomprador: newValue?.codcomprador || "",
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8}>
            <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
              <Input value={Comprador} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>

      {/* ----------------------------- ACCIÓN INTERNA ----------------------------- */}
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Acción Interna
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            {/* ----------------------------- CAMPO EDITABLE ----------------------------- */}
            <ConditionalWrapper
              condition={loadingAccInt}
              wrapper={SkeletonInput}
            >
              <Autocomplete
                size="small"
                fullWidth
                options={accInt || []}
                getOptionLabel={(option: { codaccint: string }) =>
                  option.codaccint
                }
                renderInput={(params) => <TextField {...params} />}
                value={
                  accInt?.find(
                    (option: { codaccint: string | undefined }) =>
                      option.codaccint === formData.cabsolcompra.codaccint
                  ) || null
                }
                onChange={(_, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cabsolcompra: {
                      ...prevFormData.cabsolcompra,
                      codaccint: newValue?.codaccint || "",
                    },
                  }));
                }}
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8}>
            <ConditionalWrapper
              condition={loadingAccInt}
              wrapper={SkeletonInput}
            >
              <Input value={AccionInterna} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
      {/* ---------------------------- CENTRO DE COSTOS ---------------------------- */}
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Centro de Costo
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid size={3.5}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={formData.cabsolcompra.ccosto} disabled />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8}>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input value={formData.cabsolcompra.CentCosto.nombre} disabled />
            </ConditionalWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputSheet;

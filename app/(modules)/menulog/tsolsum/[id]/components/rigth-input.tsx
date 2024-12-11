import React, { useEffect, useState } from "react";
import { FormContextProps } from "../../tsolsum-types";
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

const RightInput = ({ isLoading, formData, setFormData }: DataInputProps) => {
  const [value, setValue] = useState<string>(""); // Estado inicial en "previo"
  const { data: lst_iddocres, isLoading: isLoadingIddocres } = useQueryData({
    entity: "iddocres",
  });
  const { data: lst_controlog, isLoading: isLoadingControlog } = useQueryData({
    entity: "controlog",
  });
  const today = new Date();
  useEffect(() => {
    if (
      lst_controlog &&
      Array.isArray(lst_controlog) &&
      lst_controlog.length > 0
    ) {
      if (
        formData.cabsolsum.reserva === null ||
        formData.cabsolsum.reserva === ""
      ) {
        if (lst_controlog[0].indestreserva === "S") {
          setValue("E");
        } else {
          setValue("N");
        }
      } else {
        setValue(formData.cabsolsum.reserva);
      }

      if (lst_controlog[0].indcatobras === "S") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          IndCatObras: "S",
        }));
      }
    }
  }, [lst_controlog, formData.cabsolsum.reserva]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setValue(newValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      cabsolsum: {
        ...prevFormData.cabsolsum,
        reserva: newValue,
        iddocres:
          newValue === "E" || newValue === "N"
            ? null
            : prevFormData.cabsolsum.iddocres,
      },
    }));
  };

  const [error, setError] = useState("");
  console.log(error);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextDivider>Fecha</TextDivider>
      </Grid>
      <Grid size={4}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Solicitud
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            max={
              formData.cabsolsum.fecrecsol && today.toISOString().split("T")[0]
            }
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  fecsol: e.target.value || "",
                },
              }))
            }
            value={
              formData.cabsolsum.fecsol
                ? parseDate(formData.cabsolsum.fecsol).toString()
                : ""
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Recepcion
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  fecrecsol: e.target.value || "",
                },
              }))
            }
            value={
              formData.cabsolsum.fecrecsol
                ? parseDate(formData.cabsolsum.fecrecsol).toString()
                : ""
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Requerida
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            min={formData.cabsolsum.fecsol || formData.cabsolsum.fecrecsol}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  fecreqsol: e.target.value || "",
                },
              }))
            }
            value={
              formData.cabsolsum.fecreqsol
                ? parseDate(formData.cabsolsum.fecreqsol).toString()
                : ""
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <TextDivider>Compra</TextDivider>
      </Grid>
      <Grid size={2}>
        <Typography variant="h3" color="primary" mb={1}>
          Moneda
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input value={formData.cabsolsum.codmoneda} disabled />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" color="primary" mb={1}>
          Compra directa
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Checkbox
            checked={formData.cabsolsum.indcomdir === "S"}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  indcomdir: e.target.checked ? "S" : "N",
                  indcompctto: e.target.checked
                    ? formData.cabsolsum.indcompctto
                    : "N",
                },
              }))
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" color="primary" mb={1}>
          Compras y Contrato
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Checkbox
            disabled={formData.cabsolsum.indcomdir === "N"}
            checked={formData.cabsolsum.indcompctto === "S"}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  indcompctto: e.target.checked ? "S" : "N",
                },
              }))
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <TextDivider>Reserva</TextDivider>
      </Grid>

      <Grid size={8}>
        <Typography variant="h3" color="primary"></Typography>
        <ConditionalWrapper
          condition={isLoadingControlog || isLoading}
          wrapper={SkeletonInput}
        >
          <RadioGroup row value={value} onChange={handleChange}>
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
        <ConditionalWrapper
          condition={isLoadingIddocres || isLoading}
          wrapper={SkeletonInput}
        >
          <Autocomplete
            fullWidth
            disabled={formData.cabsolsum.reserva !== "P"}
            size="small"
            options={lst_iddocres}
            getOptionLabel={(option) => option.iddoc} // Cambiado de iddoc a descdoc
            renderInput={(params) => <TextField {...params} />}
            value={
              Array.isArray(lst_iddocres)
                ? lst_iddocres.find(
                    (option) => option.iddoc === formData.cabsolsum.iddocres
                  ) || null
                : null
            }
            onChange={(_, newValue) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolsum: {
                  ...prevFormData.cabsolsum,
                  iddocres: newValue?.iddoc,
                },
              }));
            }}
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
          {formData.cabsolsum.stssol === "RCH" ||
          formData.cabsolsum.stssol === "RAE" ? (
            <Box
              sx={{
                bgcolor: "#142f62",
                alignItems: "center",
                padding: 0.5,
                borderRadius: 1,
                width: "100%", // Asegura que el Box tome el ancho completo
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

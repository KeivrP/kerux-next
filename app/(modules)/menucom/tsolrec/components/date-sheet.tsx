import TextDivider from "@/components/ui/textDivider";
import { ConditionalWrapper } from "@/utils/main";
import { Typography, Grid2 as Grid } from "@mui/material";
import React from "react";
import { FormContextProps } from "../tsolrec-types";
import { SkeletonInput } from "@/components/skeleton/detail";
import { parseDate } from "@internationalized/date";
import { Input } from "@/components/ui/input";
interface DateSheetProps extends FormContextProps {
  isLoading?: boolean;
}

const DateSheet = ({ formData, isLoading, setFormData }: DateSheetProps) => {
  console.log("formData", formData.cabsolcompra);
  return (
    <Grid container spacing={2}>
      {/* ---------------------------- INICIO DE DIVISOR --------------------------- */}
      <Grid size={12}>
        <TextDivider>Fecha</TextDivider>
      </Grid>
      {/* ---------------------------- INICIO DE FECHAS ---------------------------- */}
      <Grid size={3}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Estatus
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            disabled
            className="max-w-[284px]"
            value={
              formData.detsolcompra.fecsts
                ? parseDate(formData.detsolcompra.fecsts).toString()
                : ""
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Recepción
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            className="max-w-[284px]"
            disabled
            value={
              formData.cabsolcompra.fecrec
                ? parseDate(formData.cabsolcompra.fecrec).toString()
                : ""
            }
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginBottom: "0.65rem" }}
        >
          Requerida
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            className="max-w-[284px]"
            disabled
            value={
              formData.cabsolcompra.fecreq
                ? parseDate(formData.cabsolcompra.fecreq).toString()
                : ""
            }
          />
        </ConditionalWrapper>
      </Grid>
      {/* ----------------------------- CAMPO EDITABLE ----------------------------- */}
      <Grid size={3}>
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
            className="max-w-md"
            value={
              formData.cabsolcompra.fecsol
                ? parseDate(formData.cabsolcompra.fecsol).toString()
                : ""
            }
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                cabsolcompra: {
                  ...prevFormData.cabsolcompra,
                  fecsol: e.target.value || "",
                },
              }))
            }
            style={{ backgroundColor: "#fff" }}
          />
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
};

export default DateSheet;

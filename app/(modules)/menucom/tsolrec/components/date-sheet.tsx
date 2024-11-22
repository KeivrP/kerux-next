import TextDivider from "@/components/ui/textDivider";
import { ConditionalWrapper } from "@/utils/main";
import { Typography, Grid2 as Grid } from "@mui/material";
import { DatePicker } from "@nextui-org/date-picker";
import React from "react";
import { ITSolRec } from "../tsolrec-types";
import { SkeletonInput } from "@/components/skeleton/detail";
import { parseDate } from "@internationalized/date";
interface DateSheetProps {
  data: ITSolRec;
}

const DateSheet = ({ data }: DateSheetProps) => {
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
        <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
          <DatePicker
            className="max-w-[284px]"
            isDisabled
            defaultValue={data.fecsts ? parseDate(data.fecsts) : null}
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
        <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
          <DatePicker
            className="max-w-[284px]"
            isDisabled
            defaultValue={data.fecrec ? parseDate(data.fecrec) : null}
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
        <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
          <DatePicker
            className="max-w-[284px]"
            isDisabled
            defaultValue={data.fecreq ? parseDate(data.fecreq) : null}
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
        <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
          <DatePicker
            className="max-w-[284px]"
            onChange={(e) => console.log(e)}
            defaultValue={data.fecsol ? parseDate(data.fecsol) : null}
          />
          {/*    <DateAsyncPicker
              date={dayjs(data?.fecsol)}
              onSelectionChange={(e) => dispatch(updateData({ ["fecsol"]: e?.format('DD/MM/YYYY') }))}
            /> */}
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
};

export default DateSheet;

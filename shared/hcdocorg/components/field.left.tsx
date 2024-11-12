import { Box, Typography } from "@mui/material";
import { DatePicker } from "@nextui-org/date-picker";
import { useMemo } from "react";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { FormContextProps } from "../hcdocorg-utils";
import { Input } from "@/components/ui/input";
import Grid from "@mui/material/Grid2";
import { BadgeAct } from "@/components/badge/badge-act";
import { parseDate } from "@internationalized/date";

interface FieldLeftProps extends FormContextProps {
  isLoading?: boolean;
}

// FieldLeft Component
function FieldLeft({ formData, isLoading = false }: FieldLeftProps) {
  const Detalle = useMemo(() => {
    return formData?.cabiddoc;
  }, [formData]);

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Id Doc.
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={Detalle.iddoc}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Tipo
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={Detalle.tipodoc}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={6}>
        <Box paddingTop={3.5}>
          <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
            <Input
              value={
                Detalle.TipoDocumento ? Detalle.TipoDocumento.desctipodoc : ""
              }
              id="outlined-size-small"
              defaultValue="Small"
              readOnly
            />
          </ConditionalWrapper>
        </Box>
      </Grid>

      <Grid size={12}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Descripción
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={Detalle.descdoc}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Descripción Extendida
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={Detalle.descdocext ? Detalle.descdocext : ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Fecha del Documento
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <DatePicker
            className="max-w-[284px]"
            isDisabled
            defaultValue={Detalle.fecref ? parseDate(Detalle.fecref) : null}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Fecha del Registro
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <DatePicker
            defaultValue={Detalle.fecdoc ? parseDate(Detalle.fecdoc) : null}
            className="max-w-[284px]"
            isDisabled
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          Reverso
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <BadgeAct
            status={
              Detalle.indreverso === "S" || Detalle.indreverso === "N"
                ? Detalle.indreverso
                : "N"
            }
          />
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
}

export default FieldLeft;

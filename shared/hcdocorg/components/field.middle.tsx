import { useMemo } from "react";
import { capitalize } from "lodash";
import { Typography, useTheme } from "@mui/material";
import { ConditionalWrapper, formatCurrency } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { FormContextProps } from "../hcdocorg-utils";
import Grid from "@mui/material/Grid2";
import { Input } from "@/components/ui/input";

interface FieldMiddleProps extends FormContextProps {
  isLoading: boolean;
}

function FieldMiddle({ isLoading, formData: data }: FieldMiddleProps) {
  const theme = useTheme();
  const Detalle = useMemo(() => {
    return data?.cabiddoc;
  }, [data]);

  // Usando la notación de punto
  const moneda = Detalle.Moneda ? Detalle.Moneda[0].nommoneda : "";
  const sitio = Detalle.Sitio ? Detalle.Sitio[0].nomsitio : "";

  return (
    <Grid container spacing={2}>
      <Grid size={2.25}>
        <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }} >
          Sitio
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={capitalize(sitio)}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={2.25}>
        <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }} >
          Moneda
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={capitalize(moneda)}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />

        </ConditionalWrapper>
      </Grid>
      <Grid size={2.25}>
        <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }} >
          Monto Original
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={formatCurrency(Detalle.montoorig)}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />

        </ConditionalWrapper>
      </Grid>
      <Grid size={1.5}>
        <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }} >
          Tasa
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
            value={formatCurrency(Detalle.tasa)}
          />

        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }} >
          Monto del Documento
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={formatCurrency(Detalle.mtodoc)}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />

        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
}

export default FieldMiddle;

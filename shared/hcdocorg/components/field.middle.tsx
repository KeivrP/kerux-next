import { useMemo } from "react";
import { capitalize } from "lodash";
import { TextField, Typography } from "@mui/material";
import { ConditionalWrapper, formatCurrency } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { FormContextProps } from "../hcdocorg-utils";
import Grid from "@mui/material/Grid2";

interface FieldMiddleProps extends FormContextProps {
  isLoading: boolean;
}

function FieldMiddle({ isLoading, formData: data }: FieldMiddleProps) {
  const Detalle = useMemo(() => {
    return data?.cabiddoc;
  }, [data]);

  // Usando la notación de punto
  const moneda = Detalle.Moneda ? Detalle.Moneda[0].nommoneda : "";
  const sitio = Detalle.Sitio ? Detalle.Sitio[0].nomsitio : "";

  return (
    <Grid container spacing={2}>
      <Grid size={2.25}>
        <Typography variant="h3" >
          Sitio
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={capitalize(sitio)}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {
                // estilos
              },
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={2.25}>
        <Typography variant="h3" >
          Moneda
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={moneda}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {
                // estilos
              },
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={2.25}>
        <Typography variant="h3" >
          Monto Original
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={formatCurrency(Detalle.montoorig)}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {
                // estilos
              },
              inputProps: {
                style: {
                  textAlign: "right",
                },
              },
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={1.5}>
        <Typography variant="h3" >
          Tasa
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={formatCurrency(Detalle.tasa)}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {
                // estilos
              },
              inputProps: {
                style: {
                  textAlign: "right",
                },
              },
            }}
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={3}>
        <Typography variant="h3" >
          Monto del Documento
        </Typography>

        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={formatCurrency(Detalle.mtodoc)}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {
                // estilos
              },
              inputProps: {
                style: {
                  textAlign: "right",
                },
              },
            }}
          />
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
}

export default FieldMiddle;

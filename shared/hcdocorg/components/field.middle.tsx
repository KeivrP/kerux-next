
import { useMemo } from "react";
import { capitalize } from "lodash";
import { TextField, Typography } from "@mui/material";
import { ConditionalWrapper, formatCurrency } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { FormContextProps } from "../hcdocorg-utils";

interface FieldMiddleProps extends FormContextProps {
  isLoading: boolean;
}

function FieldMiddle({ isLoading, formData: data, }: FieldMiddleProps) {

  const Detalle = useMemo(() => {
    return data?.cabiddoc;
  }, [data]);
  
  // Usando la notación de punto
  const moneda = Detalle.Moneda ? Detalle.Moneda[0].nommoneda : "";
  const sitio = Detalle.Sitio ? Detalle.Sitio[0].nomsitio : "";

  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-1">
        <Typography variant="h3" className="mb-1">
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
      </div>
      <div className="col-span-1">
        <Typography variant="h3" className="mb-1">
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
      </div>
      <div className="col-span-1">
        <Typography variant="h3" className="mb-1">
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
      </div>
      <div className="col-span-1">
        <Typography variant="h3" className="mb-1">
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
      </div>
      <div className="col-span-1">
        <Typography variant="h3" className="mb-1">
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
      </div>
    </div>
 
  );
}

export default FieldMiddle;

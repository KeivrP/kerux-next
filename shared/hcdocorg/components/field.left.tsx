import { Grid, Box, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";

interface FieldLeftProps {
  isLoading: boolean;
}

function FieldLeft({ isLoading }: FieldLeftProps) {
  const Detalle = useMemo(() => {
    return data?.cabiddoc;
  }, [data]);

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full sm:w-1/4 px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Id Doc.
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={Detalle.iddoc}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {},
            }}
          />
        </ConditionalWrapper>
      </div>
      <div className="w-full sm:w-1/4 px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Tipo
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={Detalle.tipodoc}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {},
            }}
          />
        </ConditionalWrapper>
      </div>
      <div className="w-full sm:w-1/2 px-2 mb-4">
        <Box paddingTop={3.5}>
          <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
            <TextField
              value={
                Detalle.TipoDocumento ? Detalle.TipoDocumento.desctipodoc : ""
              }
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              fullWidth
              InputProps={{
                readOnly: true,
                style: {},
              }}
            />
          </ConditionalWrapper>
        </Box>
      </div>
      <div className="w-full px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Descripción
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={Detalle.descdoc}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              style: {},
            }}
          />
        </ConditionalWrapper>
      </div>
      <div className="w-full px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Descripción Extendida
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            value={Detalle.descdocext ? Detalle.descdocext : ""}
            fullWidth
            maxRows={5}
            multiline
            InputProps={{
              readOnly: true,
            }}
          />
        </ConditionalWrapper>
      </div>
      <div className="w-full sm:w-5/12 px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Fecha del Documento
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <DatePicker
            defaultValue={Detalle.fecref ? dayjs(Detalle.fecref) : null}
            readOnly
            slotProps={{ textField: { size: "small" } }}
          />
        </ConditionalWrapper>
      </div>
      <div className="w-full sm:w-5/12 px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Fecha del Registro
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <DatePicker
            defaultValue={Detalle.fecdoc ? dayjs(Detalle.fecdoc) : null}
            readOnly
            slotProps={{ textField: { size: "small" } }}
          />
        </ConditionalWrapper>
      </div>
      <div className="w-full sm:w-2/12 px-2 mb-4">
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          Reverso
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          {/* {ChipStatusRevDoc(Detalle.indreverso)} */}
        </ConditionalWrapper>
      </div>
    </div>
  );
}

export default FieldLeft;

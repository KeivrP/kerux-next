import { SkeletonInput } from "@/components/skeleton/detail";
import { Input } from "@/components/ui/input";
import { ConditionalWrapperTable } from "@/utils/main";
import { Grid2 as Grid, Typography, TextField, Box } from "@mui/material";

import dayjs from "dayjs";
import { useMemo } from "react";
import { Solcompra } from "./frecomp-types";
import { Label } from "@/components/ui/label";

interface FrengcomProps {
  isLoading: boolean;
  idsolsum: number;
  dsp_fecsol: string;
  dsp_desccorta: string;
  solCompra: Solcompra;
}

const FrngcomInput = ({ isLoading, idsolsum, dsp_fecsol, dsp_desccorta, solCompra }: FrengcomProps) => {
  return (
    <>
      <Grid size={3}>
        <Label className="text-sm text-[#142F62]">Id. Solicitud de Suministro</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            fullWidth
            size="small"
            disabled
            value={idsolsum}
          />
        </ConditionalWrapperTable>
      </Grid>
      <Grid size={3}>
        <Label className="text-sm text-[#142F62]">Fecha</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            value={dsp_fecsol}
            disabled
          />
        </ConditionalWrapperTable>
      </Grid>
      <Grid size={6}>
        <Label className="text-sm text-[#142F62]">
          Descripción de la Solicitud de Suministro
        </Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            fullWidth
            size="small"
            disabled
            value={dsp_desccorta}
          />
        </ConditionalWrapperTable>
      </Grid>
      <Grid size={3}>
        <Label className="text-sm text-[#142F62]">Nro. de Solicitud de Compra</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            fullWidth
            size="small"
            disabled
            value={solCompra?.nrosc}
          />
        </ConditionalWrapperTable>
      </Grid>
      <Grid size={3}>
        <Label className="text-sm text-[#142F62]">Fecha</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <Input
            type="date"
            value={solCompra?.fecrec ? dayjs(solCompra.fecrec).format('YYYY-MM-DD') : ''}
            disabled
          />
        </ConditionalWrapperTable>
      </Grid>
      <Grid size={6}>
        <Label className="text-sm text-[#142F62]">Descripción del Servicio de Compra</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            fullWidth
            size="small"
            disabled
            value={solCompra?.descreng}
          />
        </ConditionalWrapperTable>
      </Grid>
      <Grid size={3}>
        <Label className="text-sm text-[#142F62]">Nro. de Renglón en S.C.</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            fullWidth
            size="small"
            disabled
            value={solCompra?.nroreng}
          />
        </ConditionalWrapperTable>
      </Grid>

      <Grid size={5}>
        <Label className="text-sm text-[#142F62]">Descripción del reglón</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            fullWidth
            size="small"
            disabled
            value={solCompra?.descreng}
          />
        </ConditionalWrapperTable>
      </Grid>

      <Grid size={2}>
        <Label className="text-sm text-[#142F62]">Cantidad Solicitada</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            size="small"
            disabled
            value={parseInt(solCompra?.cantsol)}
          />
        </ConditionalWrapperTable>
      </Grid>

      <Grid size={2}>
        <Label className="text-sm text-[#142F62]">Unidades</Label>
        <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
          <TextField
            size="small"
            disabled
            value={solCompra?.undsol}
          />
        </ConditionalWrapperTable>
      </Grid>
    </>
  );
};

export default FrngcomInput;

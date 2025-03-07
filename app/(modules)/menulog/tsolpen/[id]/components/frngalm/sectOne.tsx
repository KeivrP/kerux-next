import { SkeletonInput } from "@/components/skeleton/detail";
import { ConditionalWrapper } from "@/utils/main";
import { Grid2 as Grid, TextField, Tooltip, Typography } from "@mui/material";
import { DetSolsum, Frngalm } from "../../../tsolpen-types";
import { useEffect, useState } from "react";

export type Loading = {
  loading: boolean;
  row: Frngalm
};

export const SectOne = ({ loading, row }: Loading) => {
  const [dets, setDets] = useState<DetSolsum>()

  useEffect(()=> {
    if(row){
      setDets(row.detSolsum)
    }
  }, [row])
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={1}
    >
      {/* -------------------------------- SOLICITUD ------------------------------- */}
      <Grid size={2}>
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{ marginBottom: "0.65rem" }}
        >
          ID Solicitud
        </Typography>
        <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
          <TextField
            value={dets?.idsolsum || ""}
            fullWidth
            size="small"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </ConditionalWrapper>
      </Grid>
      {/* ---------------------------------- #RNG ---------------------------------- */}
      <Grid size={1}>
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{ marginBottom: "0.65rem" }}
        >
          #Rng
        </Typography>
        <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
          <TextField
            value={dets?.nroreng || ""}
            fullWidth
            size="small"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </ConditionalWrapper>
      </Grid>
      {/* ---------------------------------- ITEM ---------------------------------- */}
      <Grid size={2}>
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{ marginBottom: "0.65rem" }}
        >
          Item
        </Typography>
        <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
          <TextField
            value={dets?.coditem || ""}
            fullWidth
            size="small"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </ConditionalWrapper>
      </Grid>
      {/* ------------------------------- DESCRIPCIÓN ------------------------------ */}
      <Grid size={7}>
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{ marginBottom: "0.65rem" }}
        >
          Descripción
        </Typography>
        <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
          <Tooltip title={dets?.descreng || ""}>
            <TextField
              value={dets?.descreng || ""}
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Tooltip>
        </ConditionalWrapper>
      </Grid>
    </Grid>
  );
};

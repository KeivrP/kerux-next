import { SkeletonInput } from "@/components/skeleton/detail";
import { ConditionalWrapper } from "@/utils/main";
import { Grid2 as Grid, TextField, Tooltip, Typography } from "@mui/material";
import { DetSolsum } from "../../../tsolpen-types";

export type Loading = {
  loading: boolean;
  detSolSum: DetSolsum
};

export const SectOne = ({ loading, detSolSum }: Loading) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      sx={{ marginBottom: "0.65rem" }}
    >
      {/* -------------------------------- SOLICITUD ------------------------------- */}
      <Grid size={2}>
      <Typography
        variant="h3"
        color="primary.dark"
        sx={{ marginBottom: "0.65rem" }}
      >
        Solicitud
      </Typography>
      <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
        <TextField
        value={detSolSum?.idsolsum || ""}
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
        value={detSolSum?.nroreng || ""}
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
        value={detSolSum?.coditem || ""}
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
      <Grid size={6}>
      <Typography
        variant="h3"
        color="primary.dark"
        sx={{ marginBottom: "0.65rem" }}
      >
        Descripción
      </Typography>
      <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
        <Tooltip title={detSolSum?.descreng || ""}>
        <TextField
          value={detSolSum?.descreng || ""}
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

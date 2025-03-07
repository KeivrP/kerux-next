import { Grid2 as Grid, TextField, Typography } from "@mui/material";
import { Loading } from "./sectOne";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { useEffect, useState } from "react";
import { ItemMovAlm } from "../../../tsolpen-types";

export const SectTwo = ({ loading, row }: Loading) => {
  const [itemMovAlm, setItemMovAlm] = useState<ItemMovAlm>()
  useEffect(() => {
    if (row) {
      setItemMovAlm(row.itemMovAlm)
    }
  }, [row])

  return (
    <>
      {/* --------------------------------- ALMACÉN -------------------------------- */}
      <Grid container spacing={1} sx={{ marginBottom: "0.65rem" }}>
        <Grid container size={3}>
          <Typography
            variant="h3"
            color="primary.dark"
          >
            Almacén
          </Typography>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <TextField
              value={itemMovAlm?.codalmacen}
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </ConditionalWrapper>
        </Grid>
        <Grid size={9} sx={{ marginTop: loading ? "1.9rem" : "0rem" }}>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <TextField
              sx={{ marginTop: "1.9rem" }}
              value={itemMovAlm?.dsp_DescAlmacen}
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </ConditionalWrapper>
        </Grid>
      </Grid>
      {/* ------------------------------- MOVIMIENTO ------------------------------- */}
      <Grid container spacing={1} sx={{ marginBottom: "0.65rem" }}>
        <Grid size={3}>
          <Typography
            variant="h3"
            color="primary.dark"
            sx={{ marginBottom: "0.65rem" }}
          >
            Movimiento
          </Typography>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <TextField
              value={itemMovAlm?.codmov}
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </ConditionalWrapper>
        </Grid>
        <Grid size={9} sx={{ marginTop: loading ? "1.9rem" : "0rem" }}>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <TextField
              sx={{ marginTop: "1.9rem" }}
              value={itemMovAlm?.dsp_DescMov}
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </ConditionalWrapper>
        </Grid>
      </Grid>
    </>
  );
};

import { Box, Divider, Grid2 as Grid, Paper, Typography, useTheme } from "@mui/material";

import { Loading } from "./sectOne";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";


export const SectThree = ({ loading, row }: Loading) => {
  const theme = useTheme();

  return (
    <>
      <Grid size={12}>
        <Typography variant="h3" color="primary.dark">
          Cantidad
        </Typography>
        <Divider sx={{ marginBottom: "0.65rem" }} />
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 100,
            height: 100,
          },
        }}
      >
        {/* ------------------------------- SOLICITADA ------------------------------- */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: "10px",
            background: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            color="primary.dark"
            sx={{
              marginTop: "0.65rem",
            }}
          >
            Solicitada
          </Typography>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <Typography
              color="primary.dark"
              sx={{
                fontSize: "29px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                marginBottom: "0.65rem",
                marginTop: "0.65rem",
              }}
            >
              {row.detSolsum?.cantsol.slice(0, -2)}
            </Typography>
          </ConditionalWrapper>
          <Typography color="primary.dark" variant="helper">
            *unidad
          </Typography>
        </Paper>
        {/* ------------------------------- SUGERIDA ------------------------------- */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: "10px",
            background: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            color="primary.dark"
            sx={{
              marginTop: "0.65rem",
            }}
          >
            Sugerida
          </Typography>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <Typography
              color="primary.dark"
              sx={{
                fontSize: "29px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                marginBottom: "0.65rem",
                marginTop: "0.65rem",
              }}
            >
              {row.itemMovAlm?.cantsugerida.slice(0, -2)}
            </Typography>
          </ConditionalWrapper>
          <Typography color="primary.dark" variant="helper">
            Cajas
          </Typography>
        </Paper>
        {/* ------------------------------- APROBADA ------------------------------- */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: "10px",
            background: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            color="primary.dark"
            sx={{
              marginTop: "0.65rem",
            }}
          >
            Aprobada
          </Typography>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <Typography
              color="primary.dark"
              sx={{
                fontSize: "29px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                marginBottom: "0.65rem",
                marginTop: "0.65rem",
              }}
            >
              {row.itemMovAlm?.cantaprobada.slice(0, -2)}
            </Typography>
          </ConditionalWrapper>
          <Typography color="primary.dark" variant="helper">
            Cajas
          </Typography>
        </Paper>
        {/* ------------------------------- DESPACHO ------------------------------- */}
        <Paper
          sx={{
            borderRadius: "10px",
            background: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            color="primary.dark"
            sx={{
              marginTop: "0.65rem",
            }}
          >
            Despacho
          </Typography>
          <ConditionalWrapper condition={loading} wrapper={SkeletonInput}>
            <Typography
              color="primary.dark"
              sx={{
                fontSize: "29px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                marginBottom: "0.65rem",

                marginTop: "0.65rem",
              }}
            >
              {row.itemMovAlm?.cantdespacho.slice(0, -2)}
            </Typography>
          </ConditionalWrapper>
          <Typography color="primary.dark" variant="helper">
            Cajas
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { Container, Typography, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import { IFnivsum, Root } from "../tnivsum-types";
import { Grid2 as Grid } from '@mui/material'
import { BadgeAct } from "@/components/badge/badge-act";
import { Input } from "@/components/ui/input";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import Table from "./componets/table";

export default function FnivsumPage() {
  const params = useParams();
  const theme = useTheme();
  const { id } = params;
  const [rows, setRows] = useState<Root>();


  const { data, isLoading, refetch } = useQueryData({
    entity: "ccostos_crud",
    type: `show?nivelsum=${id}`,
    dependency: [id],
  });

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <Grid container spacing={2} padding={2}>
          <Grid size={3}>
            <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }}>
              Nivel
            </Typography>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input
                value={rows?.cabnivaut?.nivelsum ?? ''}
                defaultValue='Small'
                readOnly
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={8}>
            <Typography variant="h3" sx={{ marginBottom: 1, color: theme.palette.primary.main }}>
              Descripción
            </Typography>
            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
              <Input
                value={rows?.cabnivaut?.descnivel ?? ''}
                readOnly
              />
            </ConditionalWrapper>
          </Grid>
          <Grid size={1}>
            <Typography variant="h3" sx={{ marginBottom: 2, color: theme.palette.primary.main }}>
              Ind General 
            </Typography>
            <BadgeAct status={rows?.cabnivaut?.indgeneral === "S" ? "S" : "N"} />
          </Grid>
          <Grid size={12}>
            <Table rows={rows?.detccostoniv ?? []} refetch={refetch} isLoadind={isLoading} nivelsum={rows?.cabnivaut?.nivelsum!} />
          </Grid>
        </Grid>

      </Container>
    </>
  );
}

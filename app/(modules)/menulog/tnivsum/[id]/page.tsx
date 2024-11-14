"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { Container, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import { IFnivsum } from "../tnivsum-types";

export default function FnivsumPage() {
  const params = useParams();
  const theme = useTheme();
  const { id } = params;
  const [rows, setRows] = useState<IFnivsum[]>([]);
  const [fnivsum, setFnivsum] = useState<{ codruta: string; descruta: string }>({
    codruta: "",
    descruta: "",
  });

  const { data, isLoading, refetch } = useQueryData({
    entity: "pasos_rutas",
    api: "doc",
    type: id as string,
    dependency: [id],
  });

  useEffect(() => {
    setRows(data?.pasosruta || []);
    setFnivsum(data?.ruta || { codruta: "", descruta: "" });
  }, [data]);

  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs />
   
      </Container>
    </>
  );
}

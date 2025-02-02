"use client";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";

import Loader from "@/components/backdrop/loader";
import DataSheet from "./components/data-sheet";
import { obtenerIds } from "../tcambios-util";

export default function Fcambios() {
  const params = useParams();
  const { id: idCodificado } = params;

  const [id, cambio] = obtenerIds(idCodificado as string);

  if (!idCodificado) {
    return <></>
  }

  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <DataSheet id={id} cambio={cambio} />
      </Container>
    </Suspense>

  );
}

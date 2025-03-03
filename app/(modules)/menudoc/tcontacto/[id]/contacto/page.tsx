"use client";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";

import Loader from "@/components/backdrop/loader";
import { TcontactoTable } from "./components/table";

export default function Fbenef() {
  const params = useParams();
  const { id } = params;


  if (!id) {
    return <></>
  }

  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <TcontactoTable/>
      </Container>
    </Suspense>

  );
}

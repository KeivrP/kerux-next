import React, { Suspense } from "react";
import { TbenefTable } from "./components/table";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";

const TbenefPage = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <TbenefTable />
      </Container>
    </Suspense>
  );
};

export default TbenefPage;

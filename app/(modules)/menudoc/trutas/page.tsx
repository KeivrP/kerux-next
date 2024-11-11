import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";
import { TrutasTable } from "./components/table";

const TbenefPage = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <TrutasTable />
      </Container>
    </Suspense>
  );
};

export default TbenefPage;

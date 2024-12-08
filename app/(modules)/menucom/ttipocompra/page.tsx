import React, { Suspense } from "react";
import { Ttipocomp } from "./components/table";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";

const Page = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <Ttipocomp />
      </Container>
    </Suspense>
  );
};

export default Page;

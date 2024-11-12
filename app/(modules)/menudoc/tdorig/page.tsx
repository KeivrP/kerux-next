import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";
import { TdorigTable } from "@/shared/tdorig/components/table";

const Page = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <TdorigTable />
      </Container>
    </Suspense>
  );
};

export default Page;

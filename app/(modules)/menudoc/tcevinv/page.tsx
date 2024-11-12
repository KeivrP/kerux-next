import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";
import { TcevinvTable } from "@/shared/tcevinv/components/table";

const Page = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <TcevinvTable />
      </Container>
    </Suspense>
  );
};

export default Page;

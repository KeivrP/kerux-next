import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Loader from "@/components/backdrop/loader";
import { TsolpenCompTable } from "./components/table";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="xl">
        <Breadcrumbs />
          <TsolpenCompTable />
      </Container>
    </Suspense>
  );
};

export default page;

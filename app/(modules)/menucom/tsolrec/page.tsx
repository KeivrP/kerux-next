import React, { Suspense } from "react";
import { Breadcrumbs, Container } from "@mui/material";
import Loader from "@/components/backdrop/loader";
import { Tsolrec } from "./components/table";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <Tsolrec />
      </Container>
    </Suspense>
  );
};

export default page;

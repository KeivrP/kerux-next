import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";
import TtcambiossQuery from "./components/ttcambios-query";

const Page = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <TtcambiossQuery />
      </Container>
    </Suspense>
  );
};

export default Page;

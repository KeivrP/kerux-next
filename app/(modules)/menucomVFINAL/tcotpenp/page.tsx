import React, { Suspense } from "react";
import { Tcotpenp } from "./components/table";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";

const Page = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <Tcotpenp />
      </Container>
    </Suspense>
  );
};

export default Page;

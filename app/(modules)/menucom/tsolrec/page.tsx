import React, { Suspense } from "react";
import { Breadcrumbs, Container } from "@mui/material";
import Loader from "@/components/backdrop/loader";
import { Tsolrec } from "./components/table";
import { FormProviderFasigcom } from "@/provider/fasigcom-provider";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <FormProviderFasigcom>
          <Tsolrec />
        </FormProviderFasigcom>
      </Container>
    </Suspense>
  );
};

export default page;

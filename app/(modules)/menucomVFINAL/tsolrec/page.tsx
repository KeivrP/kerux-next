import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Loader from "@/components/backdrop/loader";
import { Tsolrec } from "./components/table";
import { FormProviderFasigcom } from "@/provider/fasigcom-provider";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Container maxWidth="xl">
        <FormProviderFasigcom>
        <Breadcrumbs />
          <Tsolrec />
        </FormProviderFasigcom>
      </Container>
    </Suspense>
  );
};

export default page;

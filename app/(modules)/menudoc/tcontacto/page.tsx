import React, { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";
import { TcontactoTable } from "./components/table";

const Page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Container maxWidth="xl">
                <Breadcrumbs />
                <TcontactoTable />
            </Container>
        </Suspense>
    );
};

export default Page;

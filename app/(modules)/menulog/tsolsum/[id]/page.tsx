"use client";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import Loader from "@/components/backdrop/loader";
import {
  FormProviderFsolsum,
} from "@/provider/fsolsum-provider";
import DataSheet from "./components/data-sheet";

export default function Fsolsum() {
  const params = useParams();
  const { id } = params;

  if(!id){
    return <></>
  }

  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <FormProviderFsolsum>
            <DataSheet id={id.toString()} />
        </FormProviderFsolsum>
      </Container>
    </>
  );
}

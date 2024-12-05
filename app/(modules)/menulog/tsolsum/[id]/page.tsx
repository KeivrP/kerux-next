"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { Container, Typography, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import TextDivider from "@/components/ui/textDivider";
import { Input } from "@/components/ui/input";
import { FrutasTable } from "./components/table";

export default function TrutasPage() {
  const params = useParams();
  const theme = useTheme();
  const { id } = params;

 
  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <div className="p-6 flex flex-col gap-4">
          <div>
            <TextDivider>Codigo de la Ruta</TextDivider>
          </div>
          {id}
        </div>
      </Container>
    </>
  );
}

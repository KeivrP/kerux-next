"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { Container, Typography, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import TextDivider from "@/components/ui/textDivider";
import { Input } from "@/components/ui/input";
import InputSheet from "./components/input-sheet";
import { IFasigcom, ITSolRec } from "../../tsolrec/tsolrec-types";
import TableSheet from "./components/table-sheet";

export default function TrutasPage() {
  const params = useParams();
  const theme = useTheme();
  const { id } = params;
  const [rows, setRows] = useState<IFasigcom>();


  const { data: rowSelectedData, isLoading } = useQueryData({
    entity: "compra",
    api: "comp",
    type: `${id}`,
    dependency: [id],
  });


  useEffect(() => {
    setRows(rowSelectedData);
  }, [rowSelectedData]);

  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs />
        <div className="p-6 flex flex-col gap-4">
          <div>
            <TextDivider>Codigo de la Ruta</TextDivider>
          </div>
          <InputSheet isLoading={isLoading} rows={rows?.cabsolcompra!} />
          <div>
          <TableSheet rows={rows?.detsolcompra ?? []} isLoading={isLoading}/>
          </div>
        </div>
      </Container>
    </>
  );
}

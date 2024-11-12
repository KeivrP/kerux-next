"use client";
import { Container, TextField } from "@mui/material";

import { Suspense, useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import TextDivider from "@/components/ui/textDivider";
import { FrutasTable } from "./components/table";
import { PasoRutas } from "../trutas-types";
import { Input } from "@/components/ui/input";
import Loader from "@/components/backdrop/loader";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";

interface FrutasViewProps {
  params: { id: string };
}

const FrutasView: React.FC<FrutasViewProps> = ({params}) => {
  const [rows, setRows] = useState<PasoRutas[]>([]);
  const [ruta, setRuta] = useState<{ codruta: string; descruta: string }>({
    codruta: "",
    descruta: "",
  });

  console.log(params.id);

  const { data, isLoading, refetch } = useQueryData({
    entity: "pasos_rutas",
    api: "doc",
    type: params.id,
    dependency: [params.id],
  });

  useEffect(() => {
    setRows(data?.pasosruta || []);
    setRuta(data?.ruta || { codruta: "", descruta: "" });
  }, [data]);

  return (
    <Suspense fallback={<Loader/>}>
    <Container maxWidth="xl">
      <Breadcrumbs />
    <div className="p-6 flex flex-col gap-4">
      <div>
        <TextDivider>Codigo de la Ruta</TextDivider>
      </div>
      <div className="flex-1">
        <Input defaultValue={`${ruta.codruta}`} disabled />
      </div>
      <div className="flex-5">
        <Input defaultValue={`${ruta.descruta}`} disabled />
      </div>
      <div>
        <TextDivider>Pasos de la Ruta</TextDivider>
      </div>
      <div>
        <FrutasTable
          id={ruta.codruta}
          rows={rows}
          refetch={refetch}
          setRows={setRows}
          isLoading={isLoading}
        />
      </div>
    </div>
    </Container>
    </Suspense>

  );
};

export default FrutasView;

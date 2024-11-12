'use client'
import { TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import TextDivider from "@/components/ui/textDivider";
import { FrutasTable } from "./components/table";
import { PasoRutas } from "../trutas-types";

interface FrutasViewProps {

}

const FrutasView: React.FC<FrutasViewProps> = ({

}) => {
  const [rows, setRows] = useState<PasoRutas[]>([]);
  const [ruta, setRuta] = useState<{ codruta: string; descruta: string }>({
    codruta: "",
    descruta: "",
  });

  const { data, isLoading, refetch } = useQueryData({
    entity: "pasos_rutas",
    api: "doc",
    type: '0',
    dependency: [0],
  });

  useEffect(() => {
    setRows(data?.pasosruta || []);
    setRuta(data?.ruta || { codruta: "", descruta: "" });
  }, [data]);

  return (

    <div className="p-6 flex flex-col gap-4">
      <div>
        <TextDivider>Codigo de la Ruta</TextDivider>
      </div>
      <div className="flex-1">
        <TextField fullWidth size='small' value={`${ruta.codruta}`} disabled />
      </div>
      <div className="flex-5">
        <TextField fullWidth size='small' value={`${ruta.descruta}`} disabled />
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
  );
};

export default FrutasView;

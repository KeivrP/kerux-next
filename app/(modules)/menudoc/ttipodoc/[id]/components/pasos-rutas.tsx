import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@mui/material";
import { ITipoSheet } from "../../ttipodc-types";
import { BaseTable } from "@/components/table-material/genericTable";
import { columnsHeaders } from "./header-table";
import BadgeModule from "@/components/badge/badge-mod";
import { useQueryData } from "@/server/fetch-data";

export const PasosRutaForm = () => {
  const { control, watch } = useFormContext<ITipoSheet>();
  
  const { fields } = useFieldArray({
    control,
    name: "pasosruta"
  });

  const id = watch("cabtipodoc.codruta");

  const { data, isLoading } = useQueryData({
    entity: "pasos_rutas",
    api: "doc",
    enabled: !!id,
    type: id.toString(),
    dependency: [id],
  });

  const pasosRutas = data?.pasosruta;


  return (
    <Card className="mb-4">
      <CardHeader className="bg-muted py-2 text-[#142F62]" title="Pasos Rutas" />
      <CardContent className="p-4">
       <BaseTable
         loading={isLoading}
         rows={pasosRutas ? pasosRutas : fields }
         headers={columnsHeaders}
         rowAction={(row) => console.log(row)}
         collapsible={{
         visible: (row) => [
           { content: row.paso, align: "center" },
           { content: <BadgeModule codmenu={row.codsisaprob} />, align: "center" },
           { content: row.tipoevento, align: "center" },
          
           { content:  <BadgeModule codmenu={row.codproxsis} />, align: "center" },
         
         ],
 
         collapsed: () => [],
         }}
       ></BaseTable>
      </CardContent>
    </Card>
  );
};
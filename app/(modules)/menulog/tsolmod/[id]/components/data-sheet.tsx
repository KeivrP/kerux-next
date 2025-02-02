import React from "react";
import { Typography } from "@mui/material";
import { CircleSlash, CircleX } from "lucide-react";
import { useQueryData } from "@/server/fetch-data";
import Tabs from "@/components/ui/tabs";

import ButtonForms from "@/components/button/buttonForms";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { useGenerateTnivsum, useUpdateFsolsum } from "../../../tsolsum/hook/useTsolsum";
import { useFormContextTsolmod } from "@/provider/tsolmod-provider";
import SupplyRequestForm from "./data-input";
import { FsolmodTable } from "./table";
import { useGenerateTsolmod, useUpdateTsolmod } from "../../hook/useTsolmod";

interface DataSheetProps {
  id: string;
}

const DataSheet = ({ id }: DataSheetProps) => {
  const { formData, setFormData, initialData } = useFormContextTsolmod();

  const {
    data,
    isLoading,
    refetch
  } = useQueryData({
    entity: "sols_sums_mods_crud",
    dependency: [id],
    type: `${id}`,
  });

  console.log(data);


  const { mutate: generateMutate, isPending: isGenerating, isSuccess: isSuccesgen } = useGenerateTsolmod();
  const { mutate: updateMutate, isPending: isUpdating, isSuccess: isSuccesup } = useUpdateTsolmod();



  React.useEffect(() => {
    if (isSuccesgen || isSuccesup) {
      refetch();
    }
  }, [isSuccesgen || isSuccesup])

  // Actualizar formData cuando lleguen nuevos datos
  React.useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data, setFormData]);

  // Determinar si hay cambios para habilitar el botón de guardar
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(formData.cabssmod) !== JSON.stringify(data?.cabsolsum);
  }, [formData?.cabssmod, data?.cabssmod]);



  const tabs = React.useMemo(() => [
    {
      id: "tab1",
      label: "Datos de la Solicitud",
      children: (
        <SupplyRequestForm
          isLoading={isLoading}
          formData={formData}
          setFormData={setFormData}
          initialData={initialData}

        />
      ),
    },
    {
      id: "tab2",
      label: "Renglones de la Solicitud",
      disabled: !formData?.cabssmod.numsolsum,
      children: (
        <FsolmodTable
          isLoading={isLoading}
          formData={formData}
          setFormData={setFormData}
          initialData={initialData}
          refetch={refetch}
        />
      ),
    },
  ], [id, isLoading, formData, setFormData, initialData]);

  const isLoaderVisible = isGenerating || isUpdating;

  const handleSave = () => {
    const id = formData?.cabssmod.numsolsum || null;
    updateMutate({ id, data: formData.cabssmod });
  };

  return (
    <div>
      <Tabs tabs={tabs}>


        <ButtonForms
          onClick={() => generateMutate({ id: formData?.cabssmod.numsolsum, })}
          sx={{ color: "alert" }}
        >
          <CircleSlash size={18} />
          <Typography variant="h3" marginLeft={1}>
            Generar
          </Typography>
        </ButtonForms>
        {hasChanges && (
          <ButtonForms
            onClick={handleSave}
            disabled={!hasChanges}
            variant="contained"
            color="primary"
          >
            Guardar
          </ButtonForms>
        )}


      </Tabs>

      <SimpleBackdrop show={isLoaderVisible} />
    </div>
  );
};

export default DataSheet;
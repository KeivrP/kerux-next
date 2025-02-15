import React from "react";
import { Typography } from "@mui/material";
import { CircleSlash, CircleX, SaveIcon } from "lucide-react";
import { useFormContextFsolsum } from "@/provider/fsolsum-provider";
import { useQueryData } from "@/server/fetch-data";
import { useAnularTnivsum, useGenerateTnivsum, useUpdateFsolsum } from "../../hook/useTsolsum";
import Tabs from "@/components/ui/tabs";
import DataInput from "./data-input";
import { FsolsumTable } from "./table";
import ButtonForms from "@/components/button/buttonForms";
import SimpleBackdrop from "@/components/backdrop/backdrop";

interface DataSheetProps {
  id: string;
}

const DataSheet = ({ id }: DataSheetProps) => {
  const { formData, setFormData, initialData } = useFormContextFsolsum();

  const {
    data: solsumData,
    isLoading,
    refetch
  } = useQueryData({
    entity: "sols_sums_crud",
    params: { idsolsum: id },
    dependency: [id],
    type: "show",
  });

  const { mutate: updateMutate, isPending: isUpdating, isSuccess: isSuccesup } = useUpdateFsolsum();

  const { mutate: generateMutate, isPending: isGenerating, isSuccess: isSuccesgen } = useGenerateTnivsum();

  const { mutate: anularMutate, isPending: isAnulating, isSuccess: isSuccesanu } = useAnularTnivsum();

  React.useEffect(() => {
    if (isSuccesup || isSuccesgen || isSuccesanu) {
      refetch();
    }
  }, [isSuccesanu, isSuccesgen, isSuccesup])

  // Actualizar formData cuando lleguen nuevos datos
  React.useEffect(() => {
    if (solsumData) {
      setFormData(solsumData);
    }
  }, [solsumData, setFormData]);

  // Determinar si hay cambios para habilitar el botón de guardar
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(formData?.cabsolsum) !== JSON.stringify(solsumData?.cabsolsum);
  }, [formData?.cabsolsum, solsumData?.cabsolsum]);

  const handleSave = () => {
    const id = formData?.cabsolsum?.idsolsum || null;
    updateMutate({ id, data: formData.cabsolsum });
  };

  const tabs = React.useMemo(() => [
    {
      id: "tab1",
      label: "Datos de la Solicitud",
      children: (
        <DataInput
          isLoading={!isNaN(Number(id)) && isLoading}
          formData={formData}
          setFormData={setFormData}
          initialData={initialData}
        />
      ),
    },
    {
      id: "tab2",
      label: "Renglones de la Solicitud",
      disabled: !formData?.cabsolsum?.idsolsum,
      children: (
        <FsolsumTable
          isLoading={!isNaN(Number(id)) && isLoading}
          formData={formData}
          setFormData={setFormData}
          initialData={initialData}
          refetch={refetch}
        />
      ),
    },
  ], [id, isLoading, formData, setFormData, initialData]);

  const isLoaderVisible = isUpdating || isAnulating || isGenerating;

  return (
    <div>
      <Tabs tabs={tabs}>
        {formData?.cabsolsum.stssol !== "ANU" && (
          <ButtonForms
            onClick={() => anularMutate({ id: formData?.cabsolsum?.idsolsum })}
            sx={{ color: "alert" }}
          >
            <CircleX size={18} color="#Ba1a1a" />
            <Typography variant="h3" marginLeft={1} color="alert">
              Anular
            </Typography>
          </ButtonForms>
        )}

        <ButtonForms
          onClick={() => generateMutate({ id: formData?.cabsolsum?.idsolsum })}
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
            color="primary"
          >
            <SaveIcon size={18} />
            <Typography variant="h3" marginLeft={1}>
              Guardar
            </Typography>
          </ButtonForms>
        )}
      </Tabs>

      <SimpleBackdrop show={isLoaderVisible} />
    </div>
  );
};

export default DataSheet;
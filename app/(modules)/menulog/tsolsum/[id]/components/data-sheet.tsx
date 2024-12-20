import { useFormContextFsolsum } from "@/provider/fsolsum-provider";
import { useQueryData } from "@/server/fetch-data";
import React, { useEffect, useState } from "react";

interface DataSheetProps {
  id: string;
}

import Tabs from "@/components/ui/tabs";
import DataInput from "./data-input";
import { FsolsumTable } from "./table";
import ButtonForms from "@/components/button/buttonForms";
import { CircleSlash, CircleX } from "lucide-react";
import { Typography, Button } from "@mui/material";
import { useAnularTnivsum, useGenerateTnivsum, useUpdateFsolsum } from "../../hook/useTsolsum";
import SimpleBackdrop from "@/components/backdrop/backdrop";

const DataSheet = ({ id }: DataSheetProps) => {
  const { formData, setFormData, initialData } = useFormContextFsolsum();
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const { mutate, isPending, isSuccess } = useUpdateFsolsum();
  const { mutate: Generate, isPending: isPendingGenerate, isSuccess: isSuccesGenerate } = useGenerateTnivsum();
  const { mutate: Anular, isPending: isPendingAnular, isSuccess: isSuccesAnular } = useAnularTnivsum();

  const { data: solsumData, isLoading, refetch } = useQueryData({
    entity: "sols_sums_crud",
    params: {
      idsolsum: id,
    },
    dependency: [id],
    type: "show",
  });

  useEffect(() => {
    if (solsumData) {
      setFormData(solsumData);
    }
  }, [solsumData, isLoading, isSuccess]);

  useEffect(() => {
    setIsSaveButtonEnabled(
      JSON.stringify(formData?.cabsolsum) !==
      JSON.stringify(solsumData?.cabsolsum)
    );
  }, [formData, solsumData, isLoading, isSuccess]);

  const tabs = [
    {
      id: "tab1",
      label: "Datos de la Solicitud",
      children: (
        <DataInput
          isLoading={!isNaN(Number(id)) ? isLoading : false}
          formData={formData}
          setFormData={setFormData}
          initialData={initialData}
        />
      ),
    },
    {
      id: "tab2",
      disabled: formData?.cabsolsum.idsolsum === 0,
      label: "Renglones de la Solicitud",
      children: (
        <FsolsumTable
          isLoading={!isNaN(Number(id)) ? isLoading : false}
          formData={formData}
          setFormData={setFormData}
          initialData={initialData}
        />
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess || isSuccesGenerate || isSuccesAnular) {
      refetch();
    }
  }, [isSuccess]);

  const handleSave = () => {
    mutate({ id: formData?.cabsolsum?.idsolsum === 0 ? null : formData?.cabsolsum?.idsolsum, data: formData.cabsolsum });
    console.log("Formulario guardado.");
  };

  const handleGenerate = () => {
    Generate({ id: formData?.cabsolsum?.idsolsum });
  }

  const handleAnular = () => {
    Anular({ id: formData?.cabsolsum?.idsolsum });
  }

  return (
    <div>
      <Tabs tabs={tabs}>
        {formData?.cabsolsum.stssol !== "ANU" && (
          <ButtonForms
            onClick={handleAnular}
            sx={{ color: "alert" }}
          >
            <CircleX size={18} color="#Ba1a1a" />
            <Typography variant="h3" marginLeft={1} color="alert">
              Anular
            </Typography>
          </ButtonForms>)}
        <ButtonForms
          onClick={handleGenerate}
          sx={{ color: "alert" }}
        >
          <CircleSlash size={18} />
          <Typography variant="h3" marginLeft={1}>
            Generar
          </Typography>
        </ButtonForms>
        {isSaveButtonEnabled && (
          <Button
            onClick={handleSave}
            disabled={!isSaveButtonEnabled}
            variant="contained"
            size="small"
            color="primary"
          >
            Guardar
          </Button>
        )}
      </Tabs>
      <SimpleBackdrop show={isPending || isPendingAnular || isPendingGenerate} />

    </div>
  );
};

export default DataSheet;

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
import { useUpdateFsolsum } from "../../hook/useTsolsum";
import SimpleBackdrop from "@/components/backdrop/backdrop";

const DataSheet = ({ id }: DataSheetProps) => {
  const { formData, setFormData, initialData } = useFormContextFsolsum();
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const { mutate, isSuccess, isPending } = useUpdateFsolsum();

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
  }, [solsumData, isLoading]);

  useEffect(() => {
    setIsSaveButtonEnabled(
      JSON.stringify(formData?.cabsolsum) !==
        JSON.stringify(solsumData?.cabsolsum)
    );
  }, [formData, solsumData, isLoading]);

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

  const handleSave = () => {
    
    mutate({ id: formData?.cabsolsum?.idsolsum === 0 ? null : formData?.cabsolsum?.idsolsum, data: formData.cabsolsum });
    refetch()
    console.log("Formulario guardado.");
  };

  return (
    <div>
      <Tabs tabs={tabs}>
        <ButtonForms
          onClick={() => {
            console.log();
          }}
          sx={{ color: "alert" }}
        >
          <CircleX size={18} color="#Ba1a1a" />
          <Typography variant="h3" marginLeft={1} color="alert">
            Anular
          </Typography>
        </ButtonForms>
        <ButtonForms />
        <ButtonForms
          onClick={() => {
            console.log();
          }}
          sx={{ color: "alert" }}
        >
          <CircleSlash size={18} />
          <Typography variant="h3" marginLeft={1}>
            Generar
          </Typography>
        </ButtonForms>
        <ButtonForms />
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
      <SimpleBackdrop show={isPending} />

    </div>
  );
};

export default DataSheet;

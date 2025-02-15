import React from "react";
import { Typography } from "@mui/material";
import { CircleSlash, CircleX, SaveIcon } from "lucide-react";
import { useFormContextFsolsum } from "@/provider/fsolsum-provider";
import { useQueryData } from "@/server/fetch-data";
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


  return (
    <div>
      <Tabs tabs={tabs} >
        <></>
        </Tabs>
  

       


    </div>
  );
};

export default DataSheet;
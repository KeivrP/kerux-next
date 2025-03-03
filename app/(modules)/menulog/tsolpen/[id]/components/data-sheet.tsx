import React from "react";
import { Typography } from "@mui/material";
import { PackagePlus } from "lucide-react";
import { useFormContextFsolsum } from "@/provider/fsolsum-provider";
import { useQueryData } from "@/server/fetch-data";
import Tabs from "@/components/ui/tabs";
import DataInput from "./data-input";
import { FsolsumTable } from "./table";
import ButtonForms from "@/components/button/buttonForms";

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

        <ButtonForms
          onClick={() => { }}
          sx={{ color: "alert" }}
        >
          <PackagePlus color="green" size={18} />
          <Typography variant="h3" marginLeft={1}>
            Crear Modelo
          </Typography>
        </ButtonForms>
      </Tabs>





    </div>
  );
};

export default DataSheet;
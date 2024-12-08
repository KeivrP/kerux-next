import { useFormContextFsolsum } from "@/provider/fsolsum-provider";
import { useQueryData } from "@/server/fetch-data";
import React, { useEffect } from "react";

interface DataSheetProps {
  id: string;
}

import Tabs from "@/components/ui/tabs";
import DataInput from "./data-input";
import { FsolsumTable } from "./table";
import ButtonForms from "@/components/button/buttonForms";
import { CircleSlash } from "lucide-react";
import { Typography } from "@mui/material";

const DataSheet = ({ id }: DataSheetProps) => {
  const { formData, setFormData, initialData } = useFormContextFsolsum();

  const { data: solsumData, isLoading } = useQueryData({
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
  }, [solsumData]);

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
  return (
    <div>
      <Tabs tabs={tabs}>
        <ButtonForms
          onClick={() => {
            console.log();
          }}
          sx={{ color: "alert" }}
        >
          <CircleSlash size={18} />
          <Typography variant="h3" marginLeft={1}>
            Rechazar
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
            Rechazar
          </Typography>
        </ButtonForms>
        <ButtonForms />
      </Tabs>{" "}
    </div>
  );
};

export default DataSheet;

import { TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { PasoRutas } from "../../trutas-types";
import { useQueryData } from "@/server/fetch-data";
import ModalDialog from "@/components/modal/modalDialog";
import TextDivider from "@/components/ui/textDivider";
import { FrutasTable } from "./components/table";

interface FrutasViewProps {
  open: boolean;
  handleClose: () => void;
  row: string;
}

export const FrutasView: React.FC<FrutasViewProps> = ({
  open,
  handleClose,
  row,
}) => {
  const [rows, setRows] = useState<PasoRutas[]>([]);
  const [ruta, setRuta] = useState<{ codruta: string; descruta: string }>({
    codruta: "",
    descruta: "",
  });

  const { data, isLoading, refetch } = useQueryData({
    entity: "pasos_rutas",
    api: "doc",
    type: row,
    dependency: [row],
  });

  useEffect(() => {
    setRows(data?.pasosruta || []);
    setRuta(data?.ruta || { codruta: "", descruta: "" });
  }, [data]);

  return (
    <ModalDialog
      dialogOpen={open}
      handleClose={handleClose}
      title="Ficha de las rutas"
      disableCancelButton={true} // Pass the prop to disable the cancel button
      width="md"
    >
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
    </ModalDialog>
  );
};

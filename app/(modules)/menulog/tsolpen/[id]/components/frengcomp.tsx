'use client'
import ModalDialog from "@/components/modal/modalDialog";
import { useQueryData } from "@/server/fetch-data";
import {
  Grid2 as Grid, Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import FrngcomInput from "./frecomp/frngcom_inputs";
import FrengcomTable from "./frecomp/frengcom_table";
import FrengcomTable2 from "./frecomp/frengcom_table2";
import { useEffect, useState } from "react";
import { Rengsolsum, Solcompra } from "./frecomp/frecomp-types";

interface FrengComProps {
  open: boolean;
  handleClose: () => void;
  row: number;
  nrorng: number;
  idsolsum: number;
}

const Frengcom = ({
  open,
  handleClose,
  row,
  nrorng,
  idsolsum,
}: FrengComProps) => {
  const [cnsprov, setCnsprov] = useState("");
  const [rengsolsum, setRengsolsum] = useState<Rengsolsum>();

  //TODO crear los estados iniciales de cada unno


  const { data, isLoading } = useQueryData({
    entity: "rengs_sums",
    api: "log",
    params: {
      idsolsum: idsolsum,
      nroreng: nrorng,
    },
    dependency: [row],
  });

  useEffect(() => {
    if (data) {
      setCnsprov(data.cnsprov);
      setRengsolsum(data.rengsolsum);
    }
  }, [data]);


  console.log(data);

  return (
    <ModalDialog
      dialogOpen={open}
      handleClose={handleClose}
      title="Situación del Renglón en Compras"
      disableCancelButton={true} // Pass the prop to disable the cancel button
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        px={5}
        mb={3}
        spacing={2}
      >
        <FrngcomInput
          isLoading={isLoading}
          idsolsum={idsolsum}
          dsp_fecsol={rengsolsum?.dsp_fecsol || ""}
          dsp_desccorta={rengsolsum?.dsp_desccorta || ""}
          solCompra={rengsolsum?.sit_renglon_compras.solcompra || {} as Solcompra}
        />
        <Card className="">
          <CardHeader className="bg-muted py-2 text-[#142F62]" title="Cotizaciones" />
          <CardContent className="p-4">
            <Grid size={12}>
              <FrengcomTable cotizacion={rengsolsum?.sit_renglon_compras.cotizacion || []} isLoading={isLoading} />
            </Grid>
          </CardContent>
        </Card>
        {cnsprov === "S" && (
          <Card className="">
            <CardHeader className="bg-muted py-2 text-[#142F62]" title="Ordenes de Compra" />
            <CardContent className="p-4">
              <Grid size={12}>
                <FrengcomTable2 orden_compra={rengsolsum?.sit_renglon_compras.orden_compra || []} isLoading={isLoading} />
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>
    </ModalDialog>
  );
};

export default Frengcom;
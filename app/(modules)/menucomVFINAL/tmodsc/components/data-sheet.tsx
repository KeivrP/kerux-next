"use client";
import ModalDialog from "@/components/modal/modalDialog";
import React, { useState } from "react";
import {
  Grid2 as Grid,
  Divider,
} from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";

import { ICabSolCompra, ITSolRec } from "../../tsolrec/tsolrec-types";
import InputSheet from "../[id]/components/input-sheet";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  rows: ICabSolCompra;
}

export default function DataSheet({
  isOpen,
  onClose,
  rows,
}: dataSheetProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <ModalDialog
        width="lg"
        title="MODIFICACIÓN DE SOLICITUD DE COMPRA"
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        {/* INICIO GRID VE EL BORDE DE LA FICHA */}
        <Grid container spacing={2} paddingX={8}>
          <Grid size={12}>
            <Divider
              textAlign="left"
              sx={{
                width: "100%",
              }}
            ></Divider>
          </Grid>

          <Grid size={12}>
            <InputSheet isLoading={isPending} rows={rows} />
          </Grid>

          <Grid size={12}>
            {/*    <DateSheet isLoading={isLoading}
              formData={formData}
              setFormData={setFormData}
              initialData={initialData} /> */}
          </Grid>
        </Grid>
      </ModalDialog>
      <SimpleBackdrop show={isPending} />
    </>
  );
}

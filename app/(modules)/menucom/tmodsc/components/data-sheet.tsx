"use client";
import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Grid2 as Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";

import { useQueryData } from "@/server/fetch-data";
import { AsignarIcon } from "@/components/icons/table-icon";
import { ITSolRec } from "../../tsolrec/tsolrec-types";
import InputSheet from "../[id]/components/input-sheet";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  rows: ITSolRec;
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

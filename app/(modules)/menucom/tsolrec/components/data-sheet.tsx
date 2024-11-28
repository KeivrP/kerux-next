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
import { IFasigcom, ITSolRec } from "../tsolrec-types";
import InputSheet from "./input-sheet";
import DateSheet from "./date-sheet";
import { useFormContextFasigcom } from "@/provider/fasigcom-provider";
import { useAsignar } from "../hook/useTSolRec";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: number;
}

export default function DataSheet({
  isOpen,
  onClose,
  row,
}: dataSheetProps): JSX.Element {
  const { formData, setFormData, initialData } = useFormContextFasigcom();

  const { data: rowSelectedData, isLoading } = useQueryData({
    entity: "compra",
    api: "comp",
    type: `${row}`,
    dependency: [row],
  });

  useEffect(() => {
    if (rowSelectedData) {
      setFormData(rowSelectedData);
    }
  }, [rowSelectedData]);

  const { mutate, isPending: updateLoading, isSuccess } = useAsignar(); 


  const [isPending, setIsPending] = useState(false);

    useEffect(() => {
    if (updateLoading) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [updateLoading]);

    useEffect(() => {
    if (isSuccess) {
      onClose(false);
    }
  }, [isSuccess]);

  return (
    <>
      <ModalDialog
        width="md"
        title="Asignar comprador a la solicitud"
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <Box
          sx={{
            mt: -2,
            px: 8,
            display: "flex",
            justifyContent: "flex-end",
            pb: 2,
          }}
        >
          <ButtonForms
            type="submit"
            title="Guardar"
            className="bg-blue-950 text-white ml-4 hover:bg-blue-800 transition duration-200 gap-2 p-2"
            onClick={() => {
              mutate({
                id: row,
                codcomprador: formData.cabsolcompra.codcomprador!,
                descsc: formData.cabsolcompra.descsc,
                fecsol: formData.cabsolcompra.fecsol,
                codaccint: formData.cabsolcompra.codaccint,
              });
            }
            }
          >
            <AsignarIcon fill="white" />
            Asignar
          </ButtonForms>
        </Box>
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
            <InputSheet
              isLoading={isLoading}
              formData={formData}
              setFormData={setFormData}
              initialData={initialData}
            />
          </Grid>

          <Grid size={12}>
              <DateSheet isLoading={isLoading}
              formData={formData}
              setFormData={setFormData}
              initialData={initialData} />
            </Grid>
        </Grid>
      </ModalDialog>
      <SimpleBackdrop show={isPending} />
    </>
  );
}

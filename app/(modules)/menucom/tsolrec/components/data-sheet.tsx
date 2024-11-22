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
import { ITSolRec } from "../tsolrec-types";
import InputSheet from "./input-sheet";
import DateSheet from "./date-sheet";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: ITSolRec
}

export default function DataSheet({
  isOpen,
  onClose,
  row,
}: dataSheetProps): JSX.Element {
  /*  const {
    mutate: mutateUpdate,
    isPending: updateLoading,
    isSuccess: isSuccessUP,
  } = useUpdateCompradores();
 */

  const { data: accInt, isLoading: loadingAccInt } = useQueryData({
    entity: "codaccint",
    api: "log",
    params: {
      fecsol: row?.fecsol,
      ccosto: row?.ccosto,
    },
  });

  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {},
  });

  console.log(row);

  useEffect(() => {
    if (isOpen) {
      reset({});
    }
  }, [isOpen, row]);

  const onSubmit = (data: ITSolRec) => {
    console.log({ data });
  };

  /*   useEffect(() => {
    if (updateLoading) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [updateLoading]); */

  /*   useEffect(() => {
    if (isSuccessUP) {
      onClose(false);
    }
  }, [isSuccessUP]);
 */
  return (
    <>
      <ModalDialog
        width="xs"
        title="Asignar comprador a la solicitud"
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              mt: -2,
              px: 8,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ButtonForms
              type="submit"
              title="Guardar"
              className="bg-blue-950 text-white ml-4 hover:bg-blue-800 transition duration-200"
            >
              <AsignarIcon />
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
              <InputSheet data={row} />
            </Grid>
            <Grid size={12}>
              <DateSheet data={row} />
            </Grid>
          </Grid>
        </form>
      </ModalDialog>
      <SimpleBackdrop show={isPending} />
    </>
  );
}

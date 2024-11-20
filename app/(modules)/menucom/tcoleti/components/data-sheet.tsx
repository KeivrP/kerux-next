import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { ColetillasInterface } from "../tcoleti-types";
import { useCreateTColeti, useUpdateTColeti } from "../hooks/useTcoleti";


interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: ColetillasInterface | null;
}

export default function DataSheet({
  isOpen,
  onClose,
  row,
}: dataSheetProps): JSX.Element {
  const {
    mutate: mutateUpdate,
    isPending: updateLoading,
    isSuccess: isSuccessUP,
  } = useUpdateTColeti();
  const {
    mutate: mutateCreate,
    isPending: createLoading,
    isSuccess,
  } = useCreateTColeti();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      codcolet: "",
      desccolet: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        codcolet: row?.codcolet || "",
        desccolet: row?.desccolet || "",
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: ColetillasInterface) => {
    if (row) {
      mutateUpdate({ id: row?.codcolet ?? "", data });
    } else {
      mutateCreate(data);
    }
  };

  useEffect(() => {
    if (updateLoading || createLoading) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [updateLoading, createLoading]);

  useEffect(() => {
    if (isSuccess || isSuccessUP) {
      onClose(false);
    }
  }, [isSuccess, isSuccessUP]);

  return (
    <>
      <ModalDialog
        width="xs"
        title={row ? "Editar Coletilla" : "Crear nuevo Coletilla"}
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 p-4">
            <div>
              <Typography variant="h3" color="primary">
                Coletilla
              </Typography>
              <TextField
                id="codcolet"
                {...register("codcolet", {
                  required: "Codigo Requerido",
                  maxLength: {
                    value: 3,
                    message: "Nivel sum no puede ser mayor de 3 dígitos",
                  },
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.codcolet}
                helperText={errors.codcolet?.message}
              />
            </div>

            <div className="col-span-2">
              <Typography variant="h3" color="primary">
                Descripcion
              </Typography>
              <TextField
                id="descnivsum"
                {...register("desccolet", {
                  required: "Descripcion",
                })}
                size="small"
                variant="outlined"
                fullWidth
                multiline
                margin="normal"
                error={!!errors.desccolet}
                helperText={errors.desccolet?.message}
              />
            </div>
          </div>
          <ButtonForms
            type="submit"
            title="Guardar"
            className="bg-blue-950 text-white ml-4 hover:bg-blue-800 transition duration-200"
          >
            Guardar
          </ButtonForms>
        </form>
      </ModalDialog>
      <SimpleBackdrop show={isPending} />
    </>
  );
}

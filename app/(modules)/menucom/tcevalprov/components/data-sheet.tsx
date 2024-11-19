import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { useCreateCriterio, useUpdateCriterio } from "../hook/useCriterios";
import { Criterioslist } from "../tcevalprov-type";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: Criterioslist | null;
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
  } = useUpdateCriterio();
  const {
    mutate: mutateCreate,
    isPending: createLoading,
    isSuccess,
  } = useCreateCriterio();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      codcritevalprov: "",
      desccrievalprov: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        codcritevalprov: row?.codcritevalprov || "",
        desccrievalprov: row?.desccrievalprov || "",
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: Criterioslist) => {
    if (row) {
      mutateUpdate({ id: row?.codcritevalprov ?? "", data });
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
        title={row ? "Editar Criterio" : "Crear nuevo Criterio"}
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 p-4">
            <div>
              <Typography variant="h3" color="primary">
                Codigo
              </Typography>
              <TextField
                id="codcritevalprov"
                {...register("codcritevalprov", {
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
                error={!!errors.codcritevalprov}
                helperText={errors.codcritevalprov?.message}
              />
            </div>

            <div className="col-span-2">
              <Typography variant="h3" color="primary">
                Descripcion
              </Typography>
              <TextField
                id="descnivsum"
                {...register("desccrievalprov", {
                  required: "Descripcion",
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.desccrievalprov}
                helperText={errors.desccrievalprov?.message}
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

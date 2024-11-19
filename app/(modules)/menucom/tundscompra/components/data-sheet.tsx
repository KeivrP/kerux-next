import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import Toogle from "@/components/ui/toogle";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { Indmanejaserv, UnidsCompraslist } from "../tundscompra-type";
import { useCreateUndComp, useUpdateUndComp } from "../hook/useUndComp";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: UnidsCompraslist | null;
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
  } = useUpdateUndComp();
  const {
    mutate: mutateCreate,
    isPending: createLoading,
    isSuccess,
  } = useCreateUndComp();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      codundcmp: "",
      indmanejaserv: Indmanejaserv.N,
      nombundcmp: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        codundcmp: row?.codundcmp || "",
        indmanejaserv: row?.indmanejaserv || Indmanejaserv.N,
        nombundcmp: row?.nombundcmp || "",
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: UnidsCompraslist) => {
    if (row) {
      mutateUpdate({ id: row?.codundcmp ?? "", data });
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
        title={row ? "Editar Unidad de Compra" : "Crear nuevo Unidad de Compra"}
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
                id="codundcmp"
                {...register("codundcmp", {
                  required: "Nivel sum es requerido",
                  maxLength: {
                    value: 3,
                    message: "Nivel sum no puede ser mayor de 3 dígitos",
                  },
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.codundcmp}
                helperText={errors.codundcmp?.message}
              />
            </div>
            <div className="col-span-1">
              <Typography variant="h3" color="primary" marginBottom={3}>
                Servicio
              </Typography>
              <Toogle
                isChecked={row?.indmanejaserv === Indmanejaserv.S}
                onToggle={(value) => {
                  register("indmanejaserv").onChange({
                    target: {
                      name: "indmanejaserv",
                      value: value ? Indmanejaserv.S : Indmanejaserv.N,
                    },
                  });
                }}
              />
            </div>
            <div className="col-span-2">
              <Typography variant="h3" color="primary">
                Nombre
              </Typography>
              <TextField
                id="descnivsum"
                {...register("nombundcmp", {
                  required: "Descripcion nivel",
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.nombundcmp}
                helperText={errors.nombundcmp?.message}
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

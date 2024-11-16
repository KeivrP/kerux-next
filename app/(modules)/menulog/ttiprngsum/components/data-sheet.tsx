import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { useUpdateTipoReng } from "../hook/useTriprngsum";
import { Tiporngsumlist } from "../ttiprngsum-types";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: Tiporngsumlist | null;
  refetch: () => void;
}

export default function DataSheet({
  isOpen,
  onClose,
  row,
  refetch,
}: dataSheetProps): JSX.Element {
  const { mutate, isPending, isSuccess } = useUpdateTipoReng();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      tiporengsumin: "",
      desctiporeng: "N",
      limitundtrib: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        tiporengsumin: row?.tiporengsumin || "",
        desctiporeng: row?.desctiporeng || "N",
        limitundtrib: row?.limitundtrib || 0,
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: Tiporngsumlist) => {
    mutate({ data, id: row?.tiporengsumin ?? "" });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose(false);
      refetch();
    }
  }, [isSuccess, onClose]);

  return (
    <>
      <ModalDialog
        width="xs"
        title={
          row
            ? "Editar Tipo de Renglon Suministro"
            : "Crear nuevo Tipo de Renglon Suministro"
        }
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 p-4">
            <div>
              <Typography variant="h3" color="primary">
                Tipo
              </Typography>
              <TextField
                id="tiporengsumin"
                {...register("tiporengsumin", {
                  required: "Nivel sum es requerido",
                  maxLength: {
                    value: 3,
                    message: "Nivel sum no puede ser mayor de 3 dígitos",
                  },
                })}
                size="small"
                variant="outlined"
                fullWidth
                disabled
                margin="normal"
                error={!!errors.tiporengsumin}
                helperText={errors.tiporengsumin?.message}
              />
            </div>
            <div className="col-span-1">
              <Typography variant="h3" color="primary">
                Descripcion
              </Typography>
              <TextField
                id="desctiporeng"
                {...register("desctiporeng", {
                  required: "Descripcion nivel",
                })}
                size="small"
                variant="outlined"
                fullWidth
                disabled
                margin="normal"
                error={!!errors.desctiporeng}
                helperText={errors.desctiporeng?.message}
              />
            </div>
            <div className="col-span-2">
              <Typography variant="h3" color="primary">
                Limite UT
              </Typography>
              <TextField
                id="limitundtrib"
                {...register("limitundtrib", {
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
                error={!!errors.limitundtrib}
                helperText={errors.limitundtrib?.message}
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

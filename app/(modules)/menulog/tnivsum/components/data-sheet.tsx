import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import { ITnivsum } from "../tnivsum-types";
import Toogle from "@/components/ui/toogle";
import { useUpdateNivsum } from "../hook/useNivsum";
import SimpleBackdrop from "@/components/backdrop/backdrop";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: ITnivsum | null;
}

export default function DataSheet({
  isOpen,
  onClose,
  row,
}: dataSheetProps): JSX.Element {
  const { mutate, isPending, isSuccess } = useUpdateNivsum();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nivelsum: "",
      indgeneral: "N",
      descnivel: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        nivelsum: row?.nivelsum || "",
        indgeneral: row?.indgeneral || "N",
        descnivel: row?.descnivel || "",
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: ITnivsum) => {
    mutate({ data, id: row?.nivelsum ?? "" });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose(false);
    }
  }, [isSuccess, onClose]);

  return (
    <>
      <ModalDialog
        width="xs"
        title={
          row
            ? "Editar Nivel de Autorizacion"
            : "Crear nuevo Nivel de Autorizacion"
        }
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 p-4">
            <div>
              <Typography variant="h3" color="primary">
                Nivel
              </Typography>
              <TextField
                id="nivelsum"
                {...register("nivelsum", {
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
                error={!!errors.nivelsum}
                helperText={errors.nivelsum?.message}
              />
            </div>
            <div className="col-span-1">
              <Typography variant="h3" color="primary" marginBottom={3}>
                Ind General
              </Typography>
              <Toogle
                isChecked={row?.indgeneral === "S"}
                onToggle={(value) => {
                  register("indgeneral").onChange({
                    target: {
                      name: "indgeneral",
                      value: value ? "S" : "N",
                    },
                  });
                }}
              />
            </div>
            <div className="col-span-2">
              <Typography variant="h3" color="primary">
                Descripcion Nivel Sum
              </Typography>
              <TextField
                id="descnivsum"
                {...register("descnivel", {
                  required: "Descripcion nivel",
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.descnivel}
                helperText={errors.descnivel?.message}
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

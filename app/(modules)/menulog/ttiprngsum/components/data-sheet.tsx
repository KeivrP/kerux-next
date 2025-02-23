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
            ? "Editar Tipo de Renglón Suministro"
            : "Crear nuevo Tipo de Renglón Suministro"
        }
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingRight: '1rem' }}>
              <ButtonForms type="submit" variant="contained" color="primary" size="large" sx={{ width: 100 }}>
                Guardar
              </ButtonForms>
            </div>
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
                Descripción
              </Typography>
              <TextField
                id="desctiporeng"
                {...register("desctiporeng", {
                  required: "Descripción nivel",
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
                Límite UT
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
         
        </form>
      </ModalDialog>
      <SimpleBackdrop show={isPending} />
    </>
  );
}

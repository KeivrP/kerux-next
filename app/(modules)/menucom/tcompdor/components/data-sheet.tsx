import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { useUpdateCompradores } from "../hook/useCompradores";
import { Compradoreslist, Nivelusuario } from "../tcompdor-types";
import { useQueryData } from "@/server/fetch-data";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: Compradoreslist | null;
}

export default function DataSheet({
  isOpen,
  onClose,
  row,
}: dataSheetProps): JSX.Element {
  const { data: lst_superusuarios } = useQueryData({
    entity: "lst_superusuarios",
    api: "comp",
    dependency: [],
  });
  const { data: lst_undscompras } = useQueryData({
    entity: "lst_undscompras",
    api: "comp",
    dependency: [],
  });

  const {
    mutate: mutateUpdate,
    isPending: updateLoading,
    isSuccess: isSuccessUP,
  } = useUpdateCompradores();

  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      codcomprador: "",
      nomcomprador: "",
      codundcmp: "",
      nombundcmp: "",
      codusuariosup: "",
      nivelusuario: Nivelusuario.C,
    },
  });

  console.log(row)

  useEffect(() => {
    if (isOpen) {
      reset({
        codcomprador: row?.codcomprador || "",
        nomcomprador: row?.nomcomprador || "",
        codundcmp: row?.codundcmp || "",
        nombundcmp: row?.nombundcmp || "",
        codusuariosup: row?.codusuariosup || "",
        nivelusuario: row?.nivelusuario || Nivelusuario.C,
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: Compradoreslist) => {
    mutateUpdate({ data });
  };

  useEffect(() => {
    if (updateLoading) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [updateLoading]);

  useEffect(() => {
    if (isSuccessUP) {
      onClose(false);
    }
  }, [isSuccessUP]);

  return (
    <>
      <ModalDialog
        width="xs"
        title={"Editar Compradores"}
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4">
            <div>
              <Typography variant="h3" color="primary" marginY={2}>
                Unidad de Compra
              </Typography>
              <Controller
                name="codundcmp"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={lst_undscompras || []}
                    getOptionLabel={(option: {
                      codundcmp: string;
                      nombundcmp: string;
                    }) => option.codundcmp + " - " + option.nombundcmp}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.codundcmp}
                        helperText={errors.codundcmp?.message}
                      />
                    )}
                    value={
                      lst_undscompras?.find(
                        (option: { codundcmp: string | undefined }) =>
                          option.codundcmp === field.value
                      ) || null
                    }
                    onChange={(_, value) =>
                      field.onChange(value?.codundcmp || "")
                    }
                  />
                )}
              />
            </div>

            <div>
              <Typography variant="h3" color="primary" marginY={2}>
                Supervisor
              </Typography>
              <Controller
                name="nomcomprador"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={lst_superusuarios || []}
                    getOptionLabel={(option: { nomcomprador: string }) =>
                      option.nomcomprador
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.nomcomprador}
                        helperText={errors.nomcomprador?.message}
                      />
                    )}
                    value={
                      lst_superusuarios?.find(
                        (option: { nomcomprador: string | undefined }) =>
                          option.nomcomprador === field.value
                      ) || null
                    }
                    onChange={(_, value) =>
                      field.onChange(value?.nomcomprador || "")
                    }
                  />
                )}
              />
            </div>

            <div className="px-4 mb-4">
              <div>
                <Typography variant="h3" color="primary" marginY={2}>
                  Nivel de Usuario
                </Typography>
                <Controller
                  name="nivelusuario"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      <FormControlLabel
                        value={Nivelusuario.C}
                        control={<Radio />}
                        label="Comprador"
                      />
                      <FormControlLabel
                        value={Nivelusuario.S}
                        control={<Radio />}
                        label="Supervisor"
                      />
                    </RadioGroup>
                  )}
                />
              </div>
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

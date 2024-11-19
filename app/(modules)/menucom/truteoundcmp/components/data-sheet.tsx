import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, TextField, Typography } from "@mui/material";
import Toogle from "@/components/ui/toogle";
import SimpleBackdrop from "@/components/backdrop/backdrop";

import { useQueryData } from "@/server/fetch-data";
import { useCreateRuteo, useUpdateRuteo } from "../hook/useRuteoUnd";
import { RuteoUnidadeslist } from "../truteoundcmp-type";
import AutocompleteAsync, {
  AutocompleteOption,
} from "@/components/ui/autocompleteAsync";

interface dataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: RuteoUnidadeslist | null;
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
  } = useUpdateRuteo();
  const {
    mutate: mutateCreate,
    isPending: createLoading,
    isSuccess,
  } = useCreateRuteo();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      codundcmp: "",
      nombundcmp: "",
      ccosto: "",
      codgrupo: "",
      descgrupo: "",
      nombre: "",
    },
  });

  const { data: lst_undscompras } = useQueryData({
    entity: "lst_undscompras",
    api: "comp",
  });

  const { data: lst_ccostos } = useQueryData({
    entity: "lst_ccosto",
    api: "comp",
  });

  const { data: lst_grupos } = useQueryData({
    entity: "lst_codgrupo",
    api: "comp",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        codundcmp: row?.codundcmp || "",
        nombundcmp: row?.nombundcmp || "",
        ccosto: row?.ccosto || "",
        codgrupo: row?.codgrupo || "",
        descgrupo: row?.descgrupo || "",
        nombre: row?.nombre || "",
      });
    }
  }, [isOpen, row]);

  const onSubmit = (data: RuteoUnidadeslist) => {
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
          <div className="gap-4 p-4">
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
                          option.codundcmp === row?.codundcmp
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
                Centro de Costo
              </Typography>
              <Controller
                name="ccosto"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={lst_ccostos || []}
                    getOptionLabel={(option: {
                      ccosto: string;
                      nombre: string;
                    }) => option.ccosto + " - " + option.nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.ccosto}
                        helperText={errors.ccosto?.message}
                      />
                    )}
                    value={
                      lst_ccostos?.find(
                        (option: { ccosto: string | undefined }) =>
                          option.ccosto === row?.ccosto
                      ) || null
                    }
                    onChange={(_, value) => field.onChange(value?.ccosto || "")}
                  />
                )}
              />
            </div>
            <div>
              <Typography variant="h3" color="primary" marginY={2}>
                Grupo Item
              </Typography>
              <Controller
                name="codgrupo"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={lst_grupos || []}
                    getOptionLabel={(option: {
                      codgrupo: string;
                      descgrupo: string;
                    }) => option.codgrupo + " - " + option.descgrupo}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.codgrupo}
                        helperText={errors.codgrupo?.message}
                      />
                    )}
                    value={
                      lst_grupos?.find(
                        (option: { codgrupo: string | undefined }) =>
                          option.codgrupo === row?.codgrupo
                      ) || null
                    }
                    onChange={(_, value) =>
                      field.onChange(value?.codgrupo || "")
                    }
                  />
                )}
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

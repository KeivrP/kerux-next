/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, TextField, Typography, useTheme } from "@mui/material";
import { useCreatePasoRuta, useUpdatePasoRuta } from "../../hook/useRutas";
import { PasoRutas, TipoEventoOptions } from "../../trutas-types";
import { useQueryData } from "@/server/fetch-data";
import Grid from "@mui/material/Grid2";
import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";

interface EditTrutasProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: PasoRutas | null;
  rows: PasoRutas[];
  isPending: (value: boolean) => void;
  refetch: () => void;
  id: string;
}

const EditFrutas: React.FC<EditTrutasProps> = ({
  id,
  isOpen,
  onClose,
  row,
  rows,
  isPending,
  refetch,
}) => {
  const { data: lst } = useQueryData({
    entity: "lst_sistemas",
    api: "doc",
    dependency: [],
  });
  const {
    mutate: mutateUpdate,
    isPending: updateLoading,
    isSuccess,
  } = useUpdatePasoRuta();
  const {
    mutate: mutateCreate,
    isPending: createLoading,
    isSuccess: createSucces,
  } = useCreatePasoRuta();

  const theme = useTheme();

  useEffect(() => {
    if (updateLoading || createLoading) {
      isPending(true);
    } else isPending(false);
  }, [updateLoading, createLoading, isPending]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paso: row?.paso || 0,
      codsisaprob: row?.codsisaprob || "",
      tipoevento: row?.tipoevento || "",
      codproxsis: row?.codproxsis || "",
      codruta: row?.codruta || "",
      descodsisaprob: row?.descodsisaprob || "",
      descodproxsis: row?.descodproxsis || "",
    },
  });
  const initialFormValues = React.useMemo(() => {
    if (row) {
      return {
        paso: row.paso,
        codsisaprob: row.codsisaprob,
        tipoevento: row.tipoevento,
        codproxsis: row.codproxsis,
        descodsisaprob: row.descodsisaprob,
        descodproxsis: row.descodproxsis,
      };
    } else if (rows.length > 0) {
      const findLastPaso = rows[rows.length - 1];
      if (findLastPaso) {
        return {
          paso: Number(findLastPaso.paso) + 1,
          codsisaprob: findLastPaso.codproxsis,
          tipoevento: "",
          codproxsis: "",
          descodsisaprob: findLastPaso.descodproxsis,
          descodproxsis: "",
        };
      }
    }
    return {
      paso: 0,
      codsisaprob: "",
      tipoevento: "",
      codproxsis: "",
      codruta: "",
      descodsisaprob: "",
      descodproxsis: "",
    };
  }, [row, rows]);

  useEffect(() => {
    reset(initialFormValues);
  }, [initialFormValues, reset]);

  useEffect(() => {
    if (isSuccess || createSucces) {
      refetch();
    }
  }, [isSuccess, createSucces]);
  const onSubmit = (data: PasoRutas) => {
    if (row) {
      const input = {
        ...data,
        codruta: id,
        descodproxsis: row.descodproxsis,
        descodsisaprob: row.descodsisaprob,
      };
      mutateUpdate(input);
      onClose(false);
    } else {
      const input = {
        ...data,
        codruta: id,
        descodproxsis: "",
        descodsisaprob: "",
      };
      mutateCreate(input);
      onClose(false);
    }
  };

  return (
    <div>
      <ModalDialog
   
        width="sm"
        title={row ? "Editar ruta" : "Crear nueva ruta"}
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} padding={4}>
            <Grid size={6}>
              <Typography variant="h3" color="primary">
                Paso
              </Typography>
              <TextField
                id="paso"
                {...register("paso", {
                  required: "Paso es requerido",
                  maxLength: {
                    value: 3,
                    message: "Paso no puede tener más de 3 caracteres",
                  },
                })}
                size="small"
                variant="outlined"
                fullWidth
                disabled
                margin="normal"
                error={!!errors.paso}
                helperText={errors.paso?.message}
              />
            </Grid>
            <Grid size={6}>
              <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                Sistema Origen
              </Typography>
              <Controller
                name="codsisaprob"
                control={control}
                rules={{ required: "Sistema Origen es requerido" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    disabled={rows.length != 0}
                    size="small"
                    options={lst || []}
                    getOptionLabel={(option: { codsis: string }) =>
                      option.codsis
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Origen" />
                    )}
                    onChange={(_, value) => field.onChange(value?.codsis)}
                    value={
                      lst?.find(
                        (option: { codsis: string | undefined }) =>
                          option.codsis === field.value
                      ) || null
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                Tipo de Evento
              </Typography>
              <Controller
                name="tipoevento"
                control={control}
                rules={{ required: "Tipo Evento es requerido" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    size="small"
                    options={TipoEventoOptions || []}
                    getOptionLabel={(option: { name: string }) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Evento" />
                    )}
                    onChange={(_, value) => field.onChange(value?.value)}
                    value={
                      TipoEventoOptions?.find(
                        (option: { value: string | undefined }) =>
                          option.value === field.value
                      ) || null
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                Sistema Destino
              </Typography>
              <Controller
                name="codproxsis"
                control={control}
                rules={{ required: "Sistema Destino es requerido" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    size="small"
                    options={lst || []}
                    getOptionLabel={(option: { codsis: string }) =>
                      option.codsis
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Destino" />
                    )}
                    onChange={(_, value) => field.onChange(value?.codsis)}
                    value={
                      lst?.find(
                        (option: { codsis: string | undefined }) =>
                          option.codsis === field.value
                      ) || null
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <ButtonForms
                type="submit"
                sx={{ bgcolor: theme.palette.primary.main, color: "white" }}
              >
                Guardar
              </ButtonForms>
            </Grid>
          </Grid>
        </form>
      </ModalDialog>
    </div>
  );
};

export default EditFrutas;

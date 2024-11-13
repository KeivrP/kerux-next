/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TopDrawer from "@/components/modal/top-drawe";
import React, { useEffect } from "react";
import { RutaData, Rutalist } from "../trutas-types";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import { useCreateRuta, useUpdateRuta } from "../hook/useRutas";
import ButtonForms from "@/components/button/buttonForms";

interface EditTrutasProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: Rutalist | null;
  isPending: (value: boolean) => void;
  refetch: () => void;
}

const EditTrutas: React.FC<EditTrutasProps> = ({
  isOpen,
  onClose,
  row,
  isPending,
  refetch,
}) => {
  const {
    mutate: mutateUpdate,
    isPending: updateLoading,
    isSuccess,
  } = useUpdateRuta();
  const {
    mutate: mutateCreate,
    isPending: createLoading,
    isSuccess: createSucces,
  } = useCreateRuta();

  useEffect(() => {
    if (updateLoading || createLoading) {
      isPending(true);
    } else isPending(false);
  }, [updateLoading, createLoading, isPending]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      codruta: row?.codruta || "",
      descruta: row?.descruta || "",
    },
  });

  useEffect(() => {
    if (isSuccess || createSucces) {
      refetch();
      onClose(false);
      reset({
        codruta: "",
        descruta: "",
      });
    }
  }, [isSuccess, createSucces]);
  const onSubmit = (data: RutaData) => {
    if (row) {
      mutateUpdate({ id: row.codruta, data });
    } else {
      mutateCreate(data);
    }
  };

  useEffect(() => {
    reset({
      codruta: row?.codruta || "",
      descruta: row?.descruta || "",
    });
  }, [row, reset]);

  return (
    <div>
      <TopDrawer
        position="left"
        title={row ? "Editar ruta" : "Crear nueva ruta"}
        isOpen={isOpen}
        onClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Typography variant="h3" color="primary">
              Codigo ruta
            </Typography>
            <TextField
              id="codruta"
              {...register("codruta", {
                required: "Codigo ruta es requerido",
                maxLength: {
                  value: 3,
                  message: "Codigo ruta no puede tener más de 3 caracteres",
                },
              })}
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.codruta}
              helperText={errors.codruta?.message}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h3" color="primary">
              Descripcion Ruta
            </Typography>
            <TextField
              id="descruta"
              {...register("descruta", {
                required: "Descripcion ruta es requerida",
              })}
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.descruta}
              helperText={errors.descruta?.message}
            />
          </div>
          <ButtonForms
            type="submit"
            title="Guardar"
            className="bg-blue-950 text-white w-full hover:bg-blue-800 transition duration-200"
          >
            Guardar
          </ButtonForms>
        </form>
      </TopDrawer>
    </div>
  );
};

export default EditTrutas;

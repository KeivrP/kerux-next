import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Autocomplete, TextField, Typography } from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { Detsolsum, Root } from "../../tsolsum-types";
import Grid from "@mui/material/Grid2";
import { ConditionalWrapper } from "@/utils/main";
import { useQueryData } from "@/server/fetch-data";
import { SkeletonInput } from "@/components/skeleton/detail";

interface DataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: Detsolsum;
  formData: Root;
}

export default function DataSheet({
  isOpen,
  onClose,
  formData,
  row,
}: DataSheetProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nroreng: 0,
      tiporeng: "",
      coditem: "",
      unidbasica: "",
      cantsol: "",
      precio: "",
      porcimptos: "",
      descreng: "",
      codcta: "",
      codclasifsnc: "",
      destino: "",
      descadiitem: "",
      stsrngsol: "",
      mtototrng: "",
      codserv: "",
      codnombre: ""
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        nroreng: row.nroreng || 0,
        tiporeng: row.tiporeng || "",
        coditem: row.coditem || "",
        unidbasica: row.unidbasica || "",
        cantsol: row.cantsol || "",
        precio: row.precio || "",
        codnombre: row.dsp_CodNombNorm,
        porcimptos: row.porcimptos || "",
        descreng: row.descreng || "",
        codcta: row.codcta || "",
        codclasifsnc: row.codclasifsnc || "",
        destino: row.destino,
        descadiitem: row.descadiitem,
        stsrngsol: row.stsrngsol,
        mtototrng: row.mtototrng,
        codserv: row.codserv,
      });
    }
  }, [isOpen, row, reset]);

  const { data: lst_tiporengsum, isLoading: isLoadingTipo } = useQueryData({
    entity: "tiporengsum",
  });

  const { data: lst_codclasifsnc, isLoading: isLoadingCodClasfi } =
    useQueryData({
      entity: "codclasifsnc",
    });

  const { data: lst_ctaspresup, isLoading: isLoadingCtasPresup } = useQueryData(
    {
      entity: "ctaspresup",
      params: {
        fecsol: formData.cabsolsum.fecsol,
      },
    }
  );

  const { data: lst_nombnorm, isLoading: isLoadingNombnorm } = useQueryData({
    entity: "nombnorm",
    dependency: [getValues("tiporeng")],
  });

  const { data: lst_itemcat, isLoading: isLoadingItemcat } = useQueryData({
    entity: "itemcat",
    params: {
      idsolsum: formData.cabsolsum.idsolsum,
      codnombre: getValues("codnombre"),
      tiporeng: getValues("tiporeng"),
      coditem: getValues("coditem")
    },
    dependency: [getValues("codnombre"), getValues()],
  });

  const { data: lst_unidmedida, isLoading: isLoadingUnidad } = useQueryData({
    entity: "unidmedida",
  });

  const { data: lst_porcimptos } = useQueryData({
    entity: "porcimptos",
  });

  const { data: lst_servicioscat, isLoading: isLoadingServicioscat } =
    useQueryData({
      entity: "servicioscat",
      params: {
        tiporeng: getValues("tiporeng"),
        idsolsum: formData.cabsolsum.idsolsum,
      },
      dependency: [getValues("tiporeng")],
    });

  const { data: lst_ctas, isLoading: isLoadinCtas } = useQueryData({
    entity: "ctas",
    params: {
      coditem: getValues("coditem"),
      fecsol: formData.cabsolsum.fecsol,
    },
    dependency: [getValues("coditem")],
  });

  const onSubmit = (data: any) => {
    // Aquí puedes manejar el envío de datos
    console.log(data);
    onClose(false);
  };
const Item = useMemo(() => getValues("tiporeng") === "MT" ? lst_itemcat : lst_servicioscat, [getValues("tiporeng")])
  console.log(getValues());

  return (
    <>
      <ModalDialog
        width="md"
        title={
          row.nroreng !== 0
            ? `Editar Renglón ${row.nroreng}`
            : "Crear nuevo Renglón"
        }
        dialogOpen={isOpen}
        handleClose={() => onClose(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} padding={2}>
            <Grid size={2.5}>
              <Typography variant="h3" color="primary" mb={2}>
                Tipo Renglón
              </Typography>
              <ConditionalWrapper
                condition={isLoadingTipo}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  fullWidth
                  size="small"
                  {...register("tiporeng", { required: "Item requerido" })}
                  options={
                    Array.isArray(lst_tiporengsum) ? lst_tiporengsum : []
                  }
                  getOptionLabel={(option) => option.desctiporeng}
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_tiporengsum)
                      ? lst_tiporengsum.find(
                          (option) =>
                            option.tiporengsumin === getValues("tiporeng")
                        )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue(
                      "tiporeng",
                      newValue ? newValue.tiporengsumin : ""
                    );
                  }}
                />
                {!!errors.tiporeng && (
                  <Typography color="error">
                    {errors.tiporeng?.message} ff
                  </Typography>
                )}
              </ConditionalWrapper>
            </Grid>

            <Grid size={3.5}>
              <Typography variant="h3" color="primary" mb={2}>
                Nombre Renglón
              </Typography>
              <ConditionalWrapper
                condition={isLoadingNombnorm}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  fullWidth
                  disabled={getValues("tiporeng") !== "MT"}
                  size="small"
                  {...register("codnombre", {
                    required:
                      getValues("tiporeng") === "MT"
                        ? "Nombre requerido"
                        : undefined,
                  })}
                  options={Array.isArray(lst_nombnorm) ? lst_nombnorm : []}
                  getOptionLabel={(option) => option.nombrenorm}
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_nombnorm)
                      ? lst_nombnorm.find(
                          (option) =>
                            option.codnombre === getValues("codnombre")
                        )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("codnombre", newValue ? newValue.codnombre : "");
                  }}
                />
                {!!errors.codnombre && (
                  <Typography color="error">
                    {errors.codnombre?.message} ff
                  </Typography>
                )}
              </ConditionalWrapper>
            </Grid>

            <Grid size={6}>
              <Typography variant="h3" color="primary" mb={2}>
                Item
              </Typography>
              <ConditionalWrapper
                condition={isLoadingItemcat}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  id="coditem"
                  fullWidth
                  size="small"
                  {...register("coditem", { required: "Item requerido" })}
                  options={Array.isArray(lst_itemcat) ? lst_itemcat : []}
                  getOptionLabel={(option) =>
                    `${option.coditem} - ${option.dsp_DescAmpliada}`
                  }
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_itemcat)
                      ? lst_itemcat.find(
                          (option) => option.coditem === getValues("coditem")
                        )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("coditem", newValue ? newValue.coditem : "");
                    setValue("unidbasica", newValue ? newValue.unidbasica : "");
                    setValue("codcta", newValue ? newValue.codcta : "");
                    setValue(
                      "codclasifsnc",
                      newValue ? newValue.codclasifsnc : ""
                    );
                    setValue("destino", newValue ? newValue.tiposumin : "");
                    setValue(
                      "descadiitem",
                      newValue ? newValue.descadicional : ""
                    );
                    setValue(
                      "descreng",
                      newValue ? newValue.dsp_DescAmpliada : ""
                    );
/*                     setValue("codmoneda", newValue ? newValue.codmoneda : ""); */            
      }}
                />
                {!!errors.tiporeng && (
                  <Typography color="error">
                    {errors.coditem?.message} ff
                  </Typography>
                )}
              </ConditionalWrapper>
            </Grid>

            <Grid size={2}>
              <Typography variant="h3" color="primary" mb={2}>
                Unidad
              </Typography>
              <ConditionalWrapper
                condition={isLoadingUnidad}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  fullWidth
                  size="small"
                  id="unidbasica"
                  {...register("unidbasica", {
                    required:
                      getValues("tiporeng") === "SV" ||
                      getValues("tiporeng") === "MA" ||
                      getValues("tiporeng") === "OB" ||
                      getValues("tiporeng") === "AD"
                        ? "Unidad requerida"
                        : undefined,
                  })}
                  options={Array.isArray(lst_unidmedida) ? lst_unidmedida : []}
                  getOptionLabel={(option) => option.nomunidad}
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_unidmedida)
                      ? lst_unidmedida.find(
                          (option) =>
                            option.unidmedida === getValues("unidbasica")
                        )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("unidbasica", newValue ? newValue.unidmedida : "");
                  }}
                  disabled={
                    !(
                      getValues("tiporeng") === "SV" ||
                      getValues("tiporeng") === "MA" ||
                      getValues("tiporeng") === "OB" ||
                      getValues("tiporeng") === "AD"
                    )
                  }
                />
                {!!errors.unidbasica && (
                  <Typography color="error">
                    {errors.unidbasica?.message} ff
                  </Typography>
                )}
              </ConditionalWrapper>
            </Grid>

            <Grid size={3}>
              <Typography variant="h3" color="primary">
                Cantidad
              </Typography>
              <TextField
                id="cantsol"
                {...register("cantsol", { required: "Cantidad requerida" })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.cantsol}
                helperText={errors.cantsol?.message}
              />
            </Grid>

            <Grid size={4}>
              <Typography variant="h3" color="primary">
                Costo Unidad
              </Typography>
              <TextField
                id="precio"
                {...register("precio", {
                  required:
                    formData.cabsolsum.reserva !== "N"
                      ? "Costo requerido"
                      : undefined,
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.precio}
                helperText={errors.precio?.message}
                disabled={formData.cabsolsum.reserva === "N"}
              />
            </Grid>

            <Grid size={3}>
              <Typography variant="h3" color="primary">
                IVA
              </Typography>
              <TextField
                id="porcimptos"
                {...register("porcimptos", {
                  required:
                    formData.cabsolsum.reserva !== "N"
                      ? "IVA requerido"
                      : undefined,
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.porcimptos}
                helperText={errors.porcimptos?.message}
                disabled={formData.cabsolsum.reserva === "N"}
              />
            </Grid>

            <Grid size={12}>
              <Typography variant="h3" color="primary">
                Descripción
              </Typography>
              <TextField
                id="descreng"
                {...register("descreng", {
                  required:
                    getValues("tiporeng") === "MT"
                      ? "Descripción requerida"
                      : undefined,
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.descreng}
                helperText={errors.descreng?.message}
                disabled={getValues("tiporeng") !== "MT"}
              />
            </Grid>

            <Grid size={6}>
              <Typography variant="h3" color="primary" mb={2}>
                Cuenta Presupuestaria
              </Typography>
              <ConditionalWrapper
                condition={isLoadinCtas}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  fullWidth
                  size="small"
                  options={Array.isArray(lst_ctas) ? lst_ctas : []}
                  getOptionLabel={(option) => option.codcta}
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_ctas)
                      ? lst_ctas.find(
                          (option: { codcta: string; nombre: string }) =>
                            option.codcta === getValues("codcta")
                        )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("codcta", newValue ? newValue.codcta : "");
                  }}
                />
              </ConditionalWrapper>
            </Grid>

            <Grid size={6}>
              <Typography variant="h3" color="primary" mb={2}>
                Clasif. SNC
              </Typography>
              <ConditionalWrapper
                condition={isLoadingCodClasfi}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  fullWidth
                  size="small"
                  options={
                    Array.isArray(lst_codclasifsnc) ? lst_codclasifsnc : []
                  }
                  getOptionLabel={(option) => option.codclasifsnc}
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_codclasifsnc)
                      ? lst_codclasifsnc.find(
                          (option) =>
                            option.codclasifsnc === getValues("codclasifsnc")
                        )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue(
                      "codclasifsnc",
                      newValue ? newValue.codclasifsnc : ""
                    );
                  }}
                />
              </ConditionalWrapper>
            </Grid>
          </Grid>
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

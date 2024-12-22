import ButtonForms from "@/components/button/buttonForms";
import ModalDialog from "@/components/modal/modalDialog";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Autocomplete, TextField, Typography } from "@mui/material";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { Detsolsum, Root } from "../../tsolsum-types";
import Grid from "@mui/material/Grid2";
import { ConditionalWrapper } from "@/utils/main";
import { useQueryData } from "@/server/fetch-data";
import { SkeletonInput } from "@/components/skeleton/detail";
import { useUpdateRenglon } from "../../hook/useTsolsum";
import { showNotification } from "@/components/toast/toast";

interface DataSheetProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  row: Detsolsum;
  formData: Root;
  refetch: () => void
}

export default function DataSheet({
  isOpen,
  onClose,
  formData,
  row,
  refetch
}: DataSheetProps): JSX.Element {
  const { mutate, isPending, isSuccess } = useUpdateRenglon()

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
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
      codnombre: "",
    }
  });

  const tiporeng = watch("tiporeng");
  const coditem = watch("coditem");
  const codnombre = watch("codnombre");
  const unidbasica = watch('unidbasica')

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

  useEffect(() => {
    if (tiporeng === "SV") {
      setValue("destino", "COMP");
    } else if (tiporeng === "MA") {
      setValue("destino", "MTTO");
    } else if (["OB", "AD"].includes(tiporeng)) {
      setValue("destino", "CTTO");
    } else {
      setValue("destino", "");
    }
  }, [tiporeng]);

  const { data: lst_nombnorm, isLoading: isLoadingNombnorm } = useQueryData({
    entity: "nombnorm",
    dependency: [tiporeng],
  });

  const { data: lst_itemcat, isLoading: isLoadingItemcat } = useQueryData({
    entity: "itemcat",
    params: {
      idsolsum: formData.cabsolsum.idsolsum,
      codnombre: codnombre,
      tiporeng: tiporeng,
      coditem: coditem,
    },
    dependency: [codnombre, getValues()],
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
        tiporeng: tiporeng,
        idsolsum: formData.cabsolsum.idsolsum,
        codserv: getValues("codserv"),
      },
      dependency: [tiporeng],
    });

  const { data: lst_ctas, isLoading: isLoadinCtas } = useQueryData({
    entity: "ctas",
    params: {
      coditem: coditem,
      fecsol: formData.cabsolsum.fecsol,
    },
    dependency: [coditem],
  });
  
  const onSubmit = (data: any) => {
    const isContratoOrAdendum = tiporeng === "OB" || tiporeng === "AD";
    const hasContratoOrAdendum = formData.detsolsum.some(
      (renglon) => renglon.tiporeng === "OB" || renglon.tiporeng === "AD"
    );

    if (isContratoOrAdendum && hasContratoOrAdendum) {
      showNotification({ message: "Solo se permite un renglón de tipo Contrato o Adendum.", mode: "error", alert: "A" });
      return;
    }
    mutate({ id: formData.cabsolsum.idsolsum, data, nro: row.nroreng });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch()
      onClose(false)
    }

  }, [isSuccess])

  const ItemServ = () => {
    return tiporeng === "MT" ? (
      <>
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
                  (option) => option.coditem === coditem
                )
                : null
            }
            onChange={(_, newValue) => {
              setValue("coditem", newValue ? newValue.coditem : "");
              setValue("unidbasica", newValue ? newValue.unidbasica : "");
              setValue("codcta", newValue ? newValue.codcta : "");
              setValue("codclasifsnc", newValue ? newValue.codclasifsnc : "");
              setValue("destino", newValue ? newValue.tiposumin : "");
              setValue("descadiitem", newValue ? newValue.descadicional : "");
              setValue("descreng", newValue ? newValue.dsp_DescAmpliada : "");
              /*                     setValue("codmoneda", newValue ? newValue.codmoneda : ""); */
            }}
          />
          {!!errors.tiporeng && (
            <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>{errors.coditem?.message} ff</Typography>
          )}
        </ConditionalWrapper>
      </>
    ) : (
      <>
        <Typography variant="h3" color="primary" mb={2}>
          Servicio
        </Typography>
        <ConditionalWrapper
          condition={isLoadingServicioscat}
          wrapper={SkeletonInput}
        >
          <Autocomplete
            id="codserv"
            {...register("codserv", {
              required:
                (formData.IndCatObras === "S" &&
                  tiporeng === "OB") ||
                  tiporeng === "AD"
                  ? "Codigo de servicio reuqerdio requerida"
                  : undefined,
            })}
            fullWidth
            size="small"
            {...register("codserv", { required: "Item requerido" })}
            options={Array.isArray(lst_servicioscat) ? lst_servicioscat : []}
            getOptionLabel={(option) =>
              `${option.codserv} - ${option.descripcion}`
            }
            renderInput={(params) => <TextField {...params} />}
            value={
              Array.isArray(lst_servicioscat)
                ? lst_servicioscat.find(
                  (option) => option.codserv === getValues("codserv")
                )
                : null
            }
            onChange={(_, newValue) => {
              setValue("codserv", newValue ? newValue.codserv : "");
              setValue("unidbasica", newValue ? newValue.unidbasica : "");
              setValue("codcta", newValue ? newValue.codcta : "");
              setValue("codclasifsnc", newValue ? newValue.codclasifsnc : "");
              setValue("destino", newValue ? newValue.tiposumin : "");
              setValue("descadiitem", newValue ? newValue.descadicional : "");
              setValue("descreng", newValue ? newValue.dsp_DescAmpliada : "");
              /*                     setValue("codmoneda", newValue ? newValue.codmoneda : ""); */
            }}
          />
          {!!errors.tiporeng && (
            <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>{errors.codserv?.message} ff</Typography>
          )}
        </ConditionalWrapper>
      </>
    );
  };


  const Cuentas = () => {
    return tiporeng === "MT" ? (
      <>
        <Typography variant="h3" color="primary" mb={2}>
          Cuenta Presupuestaria
        </Typography>
        <ConditionalWrapper condition={isLoadinCtas} wrapper={SkeletonInput}>
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
      </>
    ) : (
      <>
        <Typography variant="h3" color="primary" mb={2}>
          Cuenta Presupuestaria
        </Typography>
        <ConditionalWrapper condition={isLoadingCtasPresup} wrapper={SkeletonInput}>
          <Autocomplete
            fullWidth
            size="small"
            options={Array.isArray(lst_ctaspresup) ? lst_ctaspresup : []}
            getOptionLabel={(option) => option.codcta}
            renderInput={(params) => <TextField {...params} />}
            value={
              Array.isArray(lst_ctaspresup)
                ? lst_ctaspresup.find(
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
      </>
    );
  };



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
                          option.tiporengsumin === tiporeng
                      )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue(
                      "tiporeng",
                      newValue ? newValue.tiporengsumin : ""
                    );
                    setValue("codserv", "");
                    setValue("coditem", "");
                  }}
                />
                {!!errors.tiporeng && (
                  <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>
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
                  disabled={tiporeng !== "MT"}
                  size="small"
                  {...register("codnombre", {
                    required:
                      tiporeng === "MT"
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
                          option.codnombre === codnombre
                      )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("codnombre", newValue ? newValue.codnombre : "");
                  }}
                />
                {!!errors.codnombre && (
                  <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>
                    {errors.codnombre?.message} ff
                  </Typography>
                )}
              </ConditionalWrapper>
            </Grid>

            <Grid size={6}>{ItemServ()}</Grid>

            <Grid size={2.5}>
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
                      tiporeng === "SV" ||
                        tiporeng === "MA" ||
                        tiporeng === "OB" ||
                        tiporeng === "AD"
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
                          option.unidmedida === unidbasica
                      ) || null
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("unidbasica", newValue ? newValue.unidmedida : "");
                  }}
                  disabled={tiporeng === "MT"}
                />
                {!!errors.unidbasica && (
                  <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>
                    {errors.unidbasica?.message}
                  </Typography>
                )}
              </ConditionalWrapper>
            </Grid>

            <Grid size={2.5}>
              <Typography variant="h3" color="primary" >
                Cantidad
              </Typography>
              <TextField
                id="cantsol"
                {...register("cantsol", {
                  required: "Cantidad requerida",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo se permiten números",
                  },
                })}
                size="small"
                type="number"
                inputMode="numeric"
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
                type="number"
                fullWidth
                inputMode="numeric"
                margin="normal"
                error={!!errors.precio}
                helperText={errors.precio?.message}
                disabled={formData.cabsolsum.reserva === "N"}
              />
            </Grid>

            <Grid size={3}>
              <Typography variant="h3" color="primary" mb={2}>
                IVA
              </Typography>
              <ConditionalWrapper
                condition={isLoadinCtas}
                wrapper={SkeletonInput}
              >
                <Autocomplete
                  fullWidth
                  size="small"
                  {...register("porcimptos", {
                    required:
                      formData.cabsolsum.reserva !== "N"
                        ? "IVA requerido"
                        : undefined,
                  })}
                  disabled={formData.cabsolsum.reserva === "N"}
                  options={Array.isArray(lst_porcimptos) ? lst_porcimptos : []}
                  getOptionLabel={(option) => option.desccatg}
                  renderInput={(params) => <TextField {...params} />}
                  value={
                    Array.isArray(lst_porcimptos)
                      ? lst_porcimptos.find(
                        (option: { porccat: string; desccatg: string }) =>
                          option.porccat === getValues("porcimptos")
                      )
                      : null
                  }
                  onChange={(_, newValue) => {
                    setValue("porcimptos", newValue ? newValue.porccat : "");
                  }}
                />
              </ConditionalWrapper>
              {!!errors.porcimptos && (
                <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>IVA es requerido</Typography>
              )}
            </Grid>

            <Grid size={12}>
              <Typography variant="h3" color="primary">
                Descripción
              </Typography>
              <TextField
                id="descreng"
                {...register("descreng", {
                  required:
                    tiporeng !== "MT"
                      ? "Descripción requerida"
                      : undefined,
                })}
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.descreng}
                helperText={errors.descreng?.message}
                disabled={tiporeng === "MT"}
              />
            </Grid>

            <Grid size={6}>{Cuentas()}</Grid>
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

'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ModalDialog from "@/components/modal/modalDialog";
import ButtonForms from "@/components/button/buttonForms";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { Tipodoc } from "../ttdocsum-types";
import { useUpdateTipoDoc } from "../hook/useTtdocsum";
import { useQueryData } from "@/server/fetch-data";
import Grid from "@mui/material/Grid2";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";

interface DataSheetProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    row: string,
    refetch: () => void;
}

export default function DataSheet({
    isOpen,
    onClose,
    row,
    refetch,
}: DataSheetProps): JSX.Element {
    const { mutate, isPending, isSuccess } = useUpdateTipoDoc();
    const [rows, setRows] = useState<Tipodoc | null>(null);
    const { data, isLoading } = useQueryData({
        entity: "tipos_docs",
        dependency: [row],
        type: `${row}`,
    });
    const { data: tipo, isLoading: isLoadingTip } = useQueryData({
        entity: "lst_tipodoc_log",
        api: "doc",
        dependency: [row],
    });
    const { data: tdres, isLoading: isLoadingTdres } = useQueryData({
        entity: "lst_tdres_log",
        api: "doc",
        dependency: [row],
    });

    console.log(tipo, tdres)

    // Cargar los datos en el estado cuando se reciban
    useEffect(() => {
        if (data) {
            setRows(data.tipodoc);
        }
    }, [data]);

    // Hook de formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            codsis: "",
            tipodoc: "",
            tipodocres: "",
            tipodocrespre: null,
            tipodocaumres: null,
            tiposis: "DEST", // Valor por defecto
        },
    });

    // Resetear los valores cuando se abra el modal y haya datos
    useEffect(() => {
        if (isOpen && rows) {
            reset({
                codsis: rows?.codsis || "",
                tipodoc: rows?.tipodoc || "",
                tipodocres: rows?.tipodocres || "",
                tipodocrespre: rows?.tipodocrespre || null,
                tipodocaumres: rows?.tipodocaumres || null,
                tiposis: rows?.tiposis || "DEST", // Valor por defecto
            });
        }
    }, [isOpen, rows, reset]);

    // Función de envío del formulario
    const onSubmit = (data: Tipodoc) => {
        mutate({ data });
    };

    // Cerrar el modal después de éxito
    useEffect(() => {
        if (isSuccess) {
            onClose(false);
            refetch();
        }
    }, [isSuccess, onClose]);

    return (
        <>
            <ModalDialog
                width="md"
                title={row ? `Editar Tipo de Documento ${row}` : "Crear nuevo Tipo de Documento"}
                dialogOpen={isOpen}
                handleClose={() => onClose(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} p={2}>
                        <Grid size={3}>
                            <Typography variant="h3" color="primary">
                                Tipo de Documento
                            </Typography>
                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                            <TextField
                                id="tipodoc"
                                {...register("tipodoc", {
                                    required: "El tipo de documento es requerido",
                                })}
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.tipodoc}
                                helperText={errors.tipodoc?.message}
                            />
                            </ConditionalWrapper>
                        </Grid>

                        <Grid size={4.5}>
                            <Typography variant="h3" color="primary">
                                Tipo de Documento Resumen
                            </Typography>
                            <TextField
                                id="tipodocres"
                                {...register("tipodocres", {
                                    required: "El tipo de documento resumen es requerido",
                                })}
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.tipodocres}
                                helperText={errors.tipodocres?.message}
                            />
                        </Grid>

                        <Grid size={4.5}>
                            <Typography variant="h3" color="primary">
                                Código del Sistema
                            </Typography>
                            <TextField
                                id="codsis"
                                {...register("codsis", {
                                    required: "El código del sistema es requerido",
                                })}
                                size="small"
                                variant="outlined"
                                fullWidth
                                disabled
                                margin="normal"
                                error={!!errors.codsis}
                                helperText={errors.codsis?.message}
                            />
                        </Grid>

                        <Grid size={6}>
                            <Typography variant="h3" color="primary">
                                Tipo de Documento Resumen Previo
                            </Typography>
                            <TextField
                                id="tipodocrespre"
                                {...register("tipodocrespre")}
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.tipodocrespre}
                                helperText={errors.tipodocrespre?.message}
                            />
                        </Grid>

                        <Grid size={6}>
                            <Typography variant="h3" color="primary">
                                Tipo de Documento Aumentado Resumen
                            </Typography>
                            <TextField
                                id="tipodocaumres"
                                {...register("tipodocaumres")}
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.tipodocaumres}
                                helperText={errors.tipodocaumres?.message}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="h3" color="primary">
                                Tipo del Sistema
                            </Typography>
                            <FormControl component="fieldset" error={!!errors.tiposis}>
                                <RadioGroup
                                    id="tiposis"
                                    {...register("tiposis", {
                                        required: "El tipo del sistema es requerido",
                                    })}
                                    defaultValue="DEST"
                                >
                                    <FormControlLabel value="DEST" control={<Radio />} label="Destino" />
                                    <FormControlLabel value="ORIG" control={<Radio />} label="Origen" />
                                </RadioGroup>
                                {errors.tiposis && (
                                    <Typography variant="body2" color="error">
                                        {errors.tiposis.message}
                                    </Typography>
                                )}
                            </FormControl>
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

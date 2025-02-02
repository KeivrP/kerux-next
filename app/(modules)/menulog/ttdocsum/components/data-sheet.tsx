'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ModalDialog from "@/components/modal/modalDialog";
import ButtonForms from "@/components/button/buttonForms";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { ITipoList, ITipodoc } from "../ttdocsum-types";
import { useCreateTipoDoc, useUpdateTipoDoc } from "../hook/useTtdocsum";
import { useQueryData } from "@/server/fetch-data";
import Grid from "@mui/material/Grid2";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import BadgeModule from "@/components/badge/badge-mod";
import { BadgeDest } from "@/components/badge/badge-dest";

interface DataSheetProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    row: ITipodoc | string,
    refetch: () => void;
    tipo: ITipoList[]
    isTipoLoading: boolean
}

export default function DataSheet({
    isOpen,
    onClose,
    row,
    refetch,
    tipo,
    isTipoLoading
}: DataSheetProps): JSX.Element {
    const { mutate, isPending, isSuccess } = useUpdateTipoDoc();
    const { mutate: create, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateTipoDoc();
    const [rows, setRows] = useState<ITipodoc>()
    const { data: tdres, isLoading: isLoadingTdres } = useQueryData({
        entity: "lst_tdres_log",
        api: "doc",
        dependency: [row],
    });

    useEffect(() => {
        setRows(row as ITipodoc);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            codsis: "",
            tipodoc: "",
            tipodocres: "",
            tipodocrespre: "",
            tipodocaumres: "",
            tiposis: "DEST" as "DEST" | "ORIG",
            desctipodoc: "",
            descripcion: ""
        },
    });

    const tipodoc = watch("tipodoc");
    const tipodocres = watch("tipodocres");
    const tipodocrespre = watch("tipodocrespre");
    const tipodocaumres = watch("tipodocaumres");
    const codsis = watch("codsis");

    useEffect(() => {
        if (rows) {
            setValue("codsis", rows.codsis || "");
            setValue("tipodoc", rows.tipodoc || "");
            setValue("tipodocres", rows.tipodocres || "");
            setValue("tipodocrespre", rows.tipodocrespre || "");
            setValue("tipodocaumres", rows.tipodocaumres || "");
            setValue("tiposis", rows.tiposis || "DEST" as "DEST" | "ORIG");
            setValue("desctipodoc", rows.desctipodoc || "");
            setValue("descripcion", rows.descripcion || "");
        }
    }, [rows]);

    const onSubmit = (data: ITipodoc) => {
        if (row) {
            mutate({ data });
        } else {
            create({ data });
        }
    };

    useEffect(() => {
        if (isSuccess || isSuccessCreate) {
            onClose(false);
            refetch();
        }
    }, [isSuccess, isSuccessCreate, onClose]);

    const getDeestipo = (tipoD: string): string => {
        return Array.isArray(tdres) ? tdres.find((item) => item.tipodoc === tipoD)?.desctipodoc || "" : "";
    };


    return (
        <>
            <ModalDialog
                width="md"
                title={row ? `Editar Tipo de Documento ${rows?.tipodoc}` : "Crear nuevo Tipo de Documento"}
                dialogOpen={isOpen}
                handleClose={() => onClose(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span className="flex justify-end mr-4">
                        <ButtonForms
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ width: 100 }}
                        >
                            Guardar
                        </ButtonForms>
                    </span>
                    <Grid container spacing={1} p={2}>
                        <Grid size={3}>
                            <Typography variant="h3" color="primary" mb={1} >
                                Tipo Doc
                            </Typography>
                            <ConditionalWrapper
                                condition={isTipoLoading}
                                wrapper={SkeletonInput}
                            >
                                {row ? (
                                    <TextField
                                        id="tipodoc"
                                        {...register("tipodoc")}
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                    />
                                ) : (
                                    <>
                                        <Autocomplete
                                            fullWidth
                                            size="small"
                                            {...register("tipodoc")}
                                            options={
                                                Array.isArray(tipo) ? tipo : []
                                            }
                                            getOptionLabel={(option) => option.tipodoc}
                                            renderInput={(params) => <TextField {...params} />}
                                            value={
                                                Array.isArray(tipo)
                                                    ? tipo.find(
                                                        (option) =>
                                                            option.tipodoc === tipodoc
                                                    )
                                                    : null
                                            }
                                            onChange={(_, newValue) => {
                                                setValue(
                                                    "tipodoc",
                                                    newValue ? newValue.tipodoc : ""
                                                );
                                                setValue("codsis", newValue?.codsis ?? "");
                                                setValue("desctipodoc", newValue?.desctipodoc || "");
                                                setValue("tiposis", newValue ? newValue.tiposis as "DEST" | "ORIG" : "DEST");
                                            }}
                                        />
                                        {!!errors.tipodoc && (
                                            <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>
                                                {errors.tipodoc?.message}
                                            </Typography>
                                        )}
                                    </>
                                )}


                            </ConditionalWrapper>
                        </Grid>

                        <Grid size={7} mt={1.5}>

                            <TextField
                                id="desctipodoc"
                                {...register("desctipodoc")}
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                disabled

                            />
                        </Grid>

                        <Grid size={1}>
                            <Typography variant="h3" color="primary" mb={1.5}>
                                Sistema
                            </Typography>
                            <BadgeModule codmenu={codsis} />
                        </Grid>
                        <Grid size={1}>
                            <Typography variant="h3" color="primary" mb={1.5}>
                                Tipo
                            </Typography>
                            <span className="flex items-center mt-4">

                                <BadgeDest item={watch("tiposis")} />
                            </span>
                        </Grid>

                        <Grid size={4.5}>

                            <Typography variant="h3" color="primary" mb={1}>
                                Tipo Documento Reserva
                            </Typography>
                            <ConditionalWrapper condition={isLoadingTdres} wrapper={SkeletonInput}>

                                <Autocomplete
                                    fullWidth
                                    loading={isLoadingTdres}

                                    size="small"
                                    {...register("tipodocres")}
                                    options={
                                        Array.isArray(tdres) ? tdres : []
                                    }
                                    getOptionLabel={(option) => option.tipodoc}
                                    renderInput={(params) => <TextField {...params} />}
                                    value={
                                        Array.isArray(tdres)
                                            ? tdres.find(
                                                (option) =>
                                                    option.tipodoc === tipodocres
                                            ) || null
                                            : null
                                    }
                                    onChange={(_, newValue) => {
                                        setValue(
                                            "tipodocres",
                                            newValue ? newValue.tipodoc : ""
                                        );
                                    }}
                                />

                            </ConditionalWrapper>
                        </Grid>

                        <Grid size={7} mt={1.5}>

                            <TextField
                                id="tipodocres"
                                value={getDeestipo(tipodocres)}
                                size="small"
                                variant="outlined"
                                fullWidth
                                disabled
                                margin="normal"

                            />
                        </Grid>

                        <Grid size={4.5}>

                            <Typography variant="h3" color="primary" mb={1}>
                                Tipo Documento Reserva Previa
                            </Typography>
                            <ConditionalWrapper condition={isLoadingTdres} wrapper={SkeletonInput}>

                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    {...register("tipodocrespre")}
                                    options={
                                        Array.isArray(tdres) ? tdres : []
                                    }
                                    getOptionLabel={(option) => option.tipodoc}
                                    renderInput={(params) => <TextField {...params} />}
                                    loading={isLoadingTdres}
                                    value={
                                        Array.isArray(tdres)
                                            ? tdres.find(
                                                (option) =>
                                                    option.tipodoc === tipodocrespre
                                            ) || null
                                            : null
                                    }
                                    onChange={(_, newValue) => {
                                        setValue(
                                            "tipodocrespre",
                                            newValue ? newValue.tipodoc : ""
                                        );
                                    }}
                                />

                            </ConditionalWrapper>
                        </Grid>

                        <Grid size={7} mt={1.5}>

                            <TextField
                                id="tipodocrespre"
                                value={getDeestipo(tipodocrespre)}
                                size="small"
                                variant="outlined"
                                fullWidth
                                disabled
                                margin="normal"

                            />
                        </Grid>

                        <Grid size={4.5}>

                            <Typography variant="h3" color="primary" mb={1}>
                                Tipo de Documento de Aumento de Reserva
                            </Typography>
                            <ConditionalWrapper condition={isLoadingTdres} wrapper={SkeletonInput}>

                                <Autocomplete
                                    fullWidth
                                    loading={isLoadingTdres}

                                    size="small"
                                    {...register("tipodocaumres")}
                                    options={
                                        Array.isArray(tdres) ? tdres : []
                                    }
                                    getOptionLabel={(option) => option.tipodoc}
                                    renderInput={(params) => <TextField {...params} />}
                                    value={
                                        Array.isArray(tdres)
                                            ? tdres.find(
                                                (option) =>
                                                    option.tipodoc === tipodocaumres
                                            ) || null
                                            : null
                                    }
                                    onChange={(_, newValue) => {
                                        setValue(
                                            "tipodocaumres",
                                            newValue ? newValue.tipodoc : ""
                                        );
                                    }}
                                />

                            </ConditionalWrapper>
                        </Grid>

                        <Grid size={7} mt={1.5}>

                            <TextField
                                id="tipodocaumres"
                                value={getDeestipo(tipodocaumres)}
                                size="small"
                                variant="outlined"
                                fullWidth
                                disabled
                                margin="normal"

                            />
                        </Grid>

                    </Grid>

                </form>
            </ModalDialog>
            <SimpleBackdrop show={isPending || isPendingCreate} />
        </>
    );
}

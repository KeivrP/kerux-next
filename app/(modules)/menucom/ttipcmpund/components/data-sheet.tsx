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

import { useQueryData } from "@/server/fetch-data";
import { Tipocompundlist, Tipocontoc } from "../ttipcmpund-types";
import {
    useCreateTipoCompUnd,
    useUpdateTipoCompUnd,
} from "../hook/useTipoCompUnd";

interface dataSheetProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    row: Tipocompundlist | null;
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
    } = useUpdateTipoCompUnd();
    const {
        mutate: mutateCreate,
        isPending: createLoading,
        isSuccess,
    } = useCreateTipoCompUnd();
    const [isPending, setIsPending] = useState(false);
    const {
        watch,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        defaultValues: {
            tipocontoc: Tipocontoc.E,
            codcontoc: "",
            codundcmp: "",
            desctipocom: "",
            formatocambio: "",
            nombundcmp: "",
            formatoorden: "",
            tipocompra: 0,
        },
    });

    const { data: lst_tipocompra } = useQueryData({
        entity: "lst_tipocompra",
        api: "comp",
        dependency: [],
    });
    const { data: lst_undscompras } = useQueryData({
        entity: "lst_undscompras",
        api: "comp",
        dependency: [],
    });
    const { data: lst_reportes } = useQueryData({
        entity: "lst_reportes",
        api: "comp",
        dependency: [],
    });
    const { data: lst_contador } = useQueryData({
        entity: "lst_contador",
        api: "comp",
        dependency: [],
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                codundcmp: row?.codundcmp || "",
                nombundcmp: row?.nombundcmp || "",
                tipocontoc: row?.tipocontoc || Tipocontoc.E,
                codcontoc: row?.codcontoc || "",
                desctipocom: row?.desctipocom || "",
                formatocambio: row?.formatocambio || "",
                formatoorden: row?.formatoorden || "",
                tipocompra: row?.tipocompra || 0,
            });
        }
    }, [isOpen, row]);

    const onSubmit = (data: Tipocompundlist) => {
        if (row) {
            mutateUpdate({ data });
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
                width="sm"
                title={row ? "Editar Unidad de Compra" : "Crear nuevo Unidad de Compra"}
                dialogOpen={isOpen}
                handleClose={() => onClose(false)}
            >
             <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-4">
                        <div>
                            <Typography variant="h3" color="primary" marginY={2}>
                                Tipo de Compra
                            </Typography>
                            <Controller
                                name="tipocompra"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        fullWidth
                                        options={lst_tipocompra || []}
                                        getOptionLabel={(option: {
                                            tipocompra: string;
                                            desctipocom: string;
                                        }) => option.tipocompra + " - " + option.desctipocom}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.tipocompra}
                                                helperText={errors.tipocompra?.message}
                                            />
                                        )}
                                        value={
                                            lst_tipocompra?.find(
                                                (option: { tipocompra: string | undefined | number }) =>
                                                    option.tipocompra === field.value
                                            ) || null
                                        }
                                        onChange={(_, value) =>
                                            field.onChange(value?.tipocompra || "")
                                        }
                                    />
                                )}
                            />
                        </div>
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
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4">
                        <div>
                            <Typography variant="h3" color="primary" marginY={2}>
                                Orden de compra
                            </Typography>
                            <Controller
                                name="formatoorden"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        fullWidth
                                        options={lst_reportes || []}
                                        getOptionLabel={(option: { nombrerdf: string }) =>
                                            option.nombrerdf
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.formatoorden}
                                                helperText={errors.formatoorden?.message}
                                            />
                                        )}
                                        value={
                                            lst_reportes?.find(
                                                (option: { nombrerdf: string | undefined }) =>
                                                    option.nombrerdf === field.value
                                            ) || null
                                        }
                                        onChange={(_, value) =>
                                            field.onChange(value?.nombrerdf || "")
                                        }
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Typography variant="h3" color="primary" marginY={2}>
                                Cambio de orden
                            </Typography>
                            <Controller
                                name="formatocambio"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        fullWidth
                                        options={lst_reportes || []}
                                        getOptionLabel={(option: { nombrerdf: string }) =>
                                            option.nombrerdf
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.formatocambio}
                                                helperText={errors.formatocambio?.message}
                                            />
                                        )}
                                        value={
                                            lst_reportes?.find(
                                                (option: { nombrerdf: string | undefined }) =>
                                                    option.nombrerdf === field.value
                                            ) || null
                                        }
                                        onChange={(_, value) =>
                                            field.onChange(value?.nombrerdf || "")
                                        }
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Typography variant="h3" color="primary" marginY={2}>
                                Contador
                            </Typography>
                            <Controller
                                name="codcontoc"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        fullWidth
                                        options={lst_contador || []}
                                        getOptionLabel={(option: { codcontador: string }) =>
                                            option.codcontador
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.formatocambio}
                                                helperText={errors.formatocambio?.message}
                                            />
                                        )}
                                        value={
                                            lst_contador?.find(
                                                (option: { codcontador: string | undefined }) =>
                                                    option.codcontador === field.value
                                            ) || null
                                        }
                                        onChange={(_, value) =>
                                            field.onChange(value?.codcontador || "")
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="px-4 mb-4">
                        <div>
                            <Typography variant="h3" color="primary" marginY={2}>
                                Tipo Contador
                            </Typography>
                            <Controller
                                name="tipocontoc"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        row
                                        value={field.value}
                                        onChange={(event) => field.onChange(event.target.value)}
                                    >
                                        <FormControlLabel
                                            value={Tipocontoc.E}
                                            control={<Radio />}
                                            label="Especifico"
                                        />
                                        <FormControlLabel
                                            value={Tipocontoc.G}
                                            control={<Radio />}
                                            label="General"
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </div>
                    </div>
                    <ButtonForms
                        disabled={!watch("codundcmp")}
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

'use client'
import React, { useEffect, useState } from "react";
import {
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    Grid2 as Grid,
    Card,
    Box,
    CardHeader,
    CardContent,
    Autocomplete,
} from "@mui/material";
import { Controllist } from "../fctrllog-types";
import { useQueryData } from "@/server/fetch-data";
import { useFctrLog } from "../hook/useFctrlog";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonCheck } from "@/components/skeleton/detail";
import { SkeletonList } from "@/components/skeleton/list";
import { useForm } from "react-hook-form";
import SimpleBackdrop from "@/components/backdrop/backdrop";


function FctrllogFile() {
    // Definimos la forma del formulario con control
    const {
        watch,
        register,
        setValue,
        reset
    } = useForm<Controllist>({
        defaultValues: {
            indaprcompmixtas: "",
            indcatobras: "",
            indcontratacion: "",
            indestreserva: "",
            indpac: "",
            indvalalmdest: "",
            indvalccostoppto: "",
            sistcontratacion: "",

        }
    });

    const [loading, setLoading] = useState(false);
    const { mutate, isPending: updateLoading, isSuccess: successLoading } = useFctrLog();

    // Query para obtener datos iniciales
    const { data, isLoading } = useQueryData({
        entity: "ctrls_logs",
    });

    // Query para lista de sistemas
    const { data: lst, isLoading: isLoadingLst } = useQueryData({
        entity: "lst_sistemas",
        api: "doc",
    });

    // Actualizar formulario cuando lleguen los datos
    useEffect(() => {
        if (data?.controllist?.[0]) {
            reset(data.controllist[0]); // Actualiza todos los campos con los datos del servidor
        }
    }, [data, reset]);

    // Manejar estado de loading
    useEffect(() => {
        setLoading(updateLoading);
    }, [updateLoading]);

    // Manejador de cambios mejorado
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = event.target as HTMLInputElement;
        const checked = (event.target as HTMLInputElement).checked;
        const newValue = type === "checkbox" ? (checked ? "S" : "N") : value;

        // Actualizar el formulario localmente
        setValue(name as keyof Controllist, newValue);

        // Enviar al servidor
        mutate({
            data: {
                ...watch(), // Obtener todos los valores actuales del formulario
                [name]: newValue,
            },
        });
    };

    return (
        <>

            <Grid container spacing={2} padding={2}>
                <Card className="">
                    <CardHeader className="bg-muted py-2 text-[#142F62]" title="Parametros de control" />
                    <CardContent className="p-4">
                        <Grid container spacing={2} padding={2}>

                            <Grid size={{ lg: 4, xs: 12 }}>
                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={watch("indvalccostoppto") === "S"}
                                                onChange={handleChange}
                                                name="indvalccostoppto"
                                            />
                                        }
                                        label="Validar centro de costo de presupuesto"
                                    />
                                </ConditionalWrapper>
                            </Grid>
                            <Grid size={{ lg: 4, xs: 12 }}>
                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={watch("indestreserva") === "S"}
                                                onChange={handleChange}
                                                name="indestreserva"
                                            />
                                        }
                                        label="Las solicitudes de suministros establecen reserva presupuestaria"
                                    />
                                </ConditionalWrapper>
                            </Grid>
                            <Grid size={{ lg: 4, xs: 12 }}>
                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={watch("indcatobras") === "S"}
                                                onChange={handleChange}
                                                name="indcatobras"
                                            />
                                        }
                                        label="Validar que los items de obras esten catalogados"
                                    />
                                </ConditionalWrapper>
                            </Grid>
                            <Grid size={{ lg: 4, xs: 12 }}>
                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={watch("indaprcompmixtas") === "S"}
                                                onChange={handleChange}
                                                name="indaprcompmixtas"
                                            />
                                        }
                                        label="Confirmar compras mixtas por el modulo de Almacen"
                                    />
                                </ConditionalWrapper>
                            </Grid>
                            <Grid size={{ lg: 4, xs: 12 }}>
                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={watch("indvalalmdest") === "S"}
                                                onChange={handleChange}
                                                name="indvalalmdest"
                                            />
                                        }
                                        label="Validar almacen destino"
                                    />

                                </ConditionalWrapper>
                            </Grid>
                            <Grid size={{ lg: 4, xs: 12 }}>
                                {isLoadingLst ? (
                                    <SkeletonList number={2}>
                                        <>
                                        </>
                                    </SkeletonList>
                                ) : (

                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        loading={isLoadingLst}
                                        options={Array.isArray(lst) ? lst : []}
                                        getOptionLabel={(option) => {
                                            // Si option es null o undefined, retornar string vacío
                                            if (!option) return '';
                                            // Si option es un string (caso cuando el usuario está escribiendo), retornar ese string
                                            if (typeof option === 'string') return option;
                                            // En caso contrario, retornar el formato deseado
                                            return option.codsis;
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                {...register("sistcontratacion", {
                                                    required: "Este campo es requerido"
                                                })}
                                            />
                                        )}
                                        value={
                                            Array.isArray(lst)
                                                ? lst.find(option => option.codsis === watch('sistcontratacion')) || null
                                                : null
                                        }
                                        onChange={(_, newValue) => {
                                            setValue("sistcontratacion", newValue ? newValue.codsis : "", {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                                shouldTouch: true
                                            });

                                            handleChange({
                                                target: {
                                                    name: "sistcontratacion",
                                                    value: newValue ? newValue.codsis : ""
                                                }
                                            } as React.ChangeEvent<HTMLInputElement>);
                                        }}
                                        onInputChange={(_, newInputValue) => {
                                            if (!newInputValue) {
                                                setValue("sistcontratacion", "", {
                                                    shouldValidate: true,
                                                    shouldDirty: true,
                                                    shouldTouch: true
                                                });
                                            }
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            // Si cualquiera de los dos es null o undefined, retornar false
                                            if (!option || !value) return false;
                                            // Comparar los códigos
                                            return option.codsis === value.codsis;
                                        }}
                                        noOptionsText="No hay opciones disponibles"
                                        loadingText="Cargando..."
                                        freeSolo={false} // No permitir valores que no estén en la lista
                                        autoComplete // Habilitar autocompletado
                                        autoHighlight
                                    />

                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Grid size={{ lg: 6, xs: 12 }}>
                    <Card className="">
                        <CardHeader className="bg-muted py-2 text-[#142F62]" title="Integración con el módulo de Contrataciones Públicas" />
                        <CardContent className="p-4">
                            <Grid container spacing={2} padding={2}>
                                <Grid size={4}>
                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={watch("indcontratacion") === "S"}
                                                    onChange={handleChange}
                                                    name="indcontratacion"
                                                />
                                            }
                                            label="Integración con Contrataciones Públicas?"
                                        />
                                    </ConditionalWrapper>
                                </Grid>
                                <Grid size={8}>
                                    <Box
                                        sx={{
                                            background: "linear-gradient(45deg, #ADD8E6, #87CEEB)",
                                            padding: 2,
                                            borderRadius: 4,
                                            boxShadow: 3,
                                        }}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            <b>Activado:</b> Indica si Logistica esta Integrado con el
                                            modulo de Contrataciones Publicas
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Integración con el módulo de Planificación Anual de Compras - PAC */}
                <Grid size={{ lg: 6, xs: 12 }}>

                    <Card className="">
                        <CardHeader className="bg-muted py-2 text-[#142F62]" title="Integración con el módulo de Planificación Anual de Compras - PAC" />
                        <CardContent className="p-4">
                            <Grid container spacing={2} padding={2}>
                                <Grid size={4}>
                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={watch("indpac") === "S"}
                                                    onChange={handleChange}
                                                    name="indpac"
                                                />
                                            }
                                            label="Integración con PAC?"
                                        />

                                    </ConditionalWrapper>
                                </Grid>
                                <Grid size={8}>
                                    <Box
                                        sx={{
                                            background: "linear-gradient(45deg, #ADD8E6, #87CEEB)",
                                            padding: 2,
                                            borderRadius: 4,
                                            boxShadow: 3,
                                        }}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            <b>Activado:</b> Indica si Logistica esta integrado con el
                                            modulo de Planificacion Anual de Compras.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>


            </Grid >
            <SimpleBackdrop show={loading} />
        </>

    );
}

export default FctrllogFile;

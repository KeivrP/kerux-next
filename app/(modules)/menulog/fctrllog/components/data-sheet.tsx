'use client'
import React, { useEffect, useState } from "react";
import {
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    Grid2 as Grid,
    Container,
    Card,
    Box,
} from "@mui/material";
import { Controllist } from "../fctrllog-types";
import { useQueryData } from "@/server/fetch-data";
import { useFctrLog } from "../hook/useFctrlog";
import TextDivider from "@/components/ui/textDivider";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonCheck } from "@/components/skeleton/detail";
import { SkeletonList } from "@/components/skeleton/list";


function FctrllogFile() {
    const [estadoControles, setEstadoControles] = useState<Controllist>({
        indaprcompmixtas: "",
        indcatobras: "",
        indcontratacion: "",
        indestreserva: "",
        indpac: "",
        indvalalmdest: "",
        indvalccostoppto: "",
        raw_rnum_: 0,
        sistcontratacion: "",
    });

    const [loading, handleLoading] = useState(false);
    const { mutate, isPending: updateLoading, isSuccess: succesLoadinf } = useFctrLog();

    const { data, isLoading } = useQueryData({
        entity: "ctrls_logs",
        dependency: [succesLoadinf],
    });

    const { data: lst, isLoading: isloadinglst } = useQueryData({
        entity: "lst_sistemas",
        api: "doc",
        dependency: []
    });

    useEffect(() => {
        if (updateLoading) {
            handleLoading(true);
        } else handleLoading(false);
    }, [updateLoading, handleLoading]);

    useEffect(() => {
        if (data && data.controllist) {
            setEstadoControles(data.controllist[0]);
        }
    }, [data]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = event.target as HTMLInputElement;
        const checked = (event.target as HTMLInputElement).checked;
        const newValue = type === "checkbox" ? (checked ? "S" : "N") : value;

        mutate({
            data: {
                ...estadoControles,
                [name]: newValue,
            },
        });
    };

    return (



        <Grid container spacing={2} padding={2}>

            <Grid size={12}>
                <TextDivider> Parametros de control</TextDivider>
            </Grid>

            <Grid size={{ lg: 4, xs: 12 }}>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={estadoControles?.indvalccostoppto === "S"}
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
                                checked={estadoControles?.indestreserva === "S"}
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
                                checked={estadoControles?.indcatobras === "S"}
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
                                checked={estadoControles?.indaprcompmixtas === "S"}
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
                                checked={estadoControles?.indvalalmdest === "S"}
                                onChange={handleChange}
                                name="indvalalmdest"
                            />
                        }
                        label="Validar almacen destino"
                    />

                </ConditionalWrapper>
            </Grid>

            <Grid size={12}>
                <TextDivider>
                    Integración con el módulo de Contrataciones Públicas
                </TextDivider>
            </Grid>
            {/* Integración con el módulo de Contrataciones Públicas */}

            <Grid size={4}>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={estadoControles?.indcontratacion === "S"}
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
            <Grid size={12}>
                {isloadinglst ? (
                    <SkeletonList number={1}>
                        <>
                        </>
                    </SkeletonList>
                ) : (
                    <TextField
                        label="Sistema destino de Contrataciones Públicas"
                        value={estadoControles.sistcontratacion}
                        onChange={handleChange}
                        select
                        fullWidth
                        name="sistcontratacion"
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="">Seleccione una opción</option>
                        {lst?.map((item: { codsis: string; descripcion: string }) => (
                            <option key={item.codsis} value={item.codsis}>
                                {item.descripcion}
                            </option>
                        ))}
                    </TextField>
                )}
            </Grid>

            {/* Integración con el módulo de Planificación Anual de Compras - PAC */}
            <Grid size={12}>
                <TextDivider>
                    Integración con el módulo de Planificación Anual de Compras - PAC
                </TextDivider>
            </Grid>
            <Grid size={4}>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonCheck}>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={estadoControles?.indpac === "S"}
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

    );
}

export default FctrllogFile;

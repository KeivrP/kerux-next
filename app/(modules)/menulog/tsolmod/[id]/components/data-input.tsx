import React from 'react';
import {

    TextField,
    Grid2 as Grid,
    Typography,
    Autocomplete,

} from '@mui/material';
import TextDivider from '@/components/ui/textDivider';
import { Input, Textarea } from '@/components/ui/input';
import { ConditionalWrapper } from '@/utils/main';
import { SkeletonInput } from '@/components/skeleton/detail';
import { FormContextProps } from '../../tsolmod-types';
import { useQueryData } from '@/server/fetch-data';

interface DataInputProps extends FormContextProps {
    isLoading: boolean;
}

const SupplyRequestForm = ({ isLoading, formData, setFormData }: DataInputProps) => {

    const { data: lst_ccosto, isLoading: isLoadingCcosto } = useQueryData({
        entity: "ccosto",
        params: {
            idsolsum: formData.cabssmod.numsolsum,
        },
    });

    const { data: lst_codaccint, isLoading: isLstCcint } = useQueryData({
        entity: "codaccint",
        params: {
            fecsol: formData.cabssmod.ano,
            ccosto: formData.cabssmod.ccosto,
        },
        dependency: [formData.cabssmod.ccosto],
    });




    const Ccosto = React.useMemo(() => {
        if (Array.isArray(lst_ccosto)) {
            return (
                lst_ccosto.find(
                    (dependencia: { ccosto: string }) =>
                        dependencia.ccosto === formData.cabssmod.ccosto
                )?.nombre || ""
            );
        }
        return "";
    }, [lst_ccosto, formData.cabssmod.ccosto]);

    const CodAccionInt = React.useMemo(() => {
        if (Array.isArray(lst_codaccint)) {
            return (
                lst_codaccint.find(
                    (dependencia: { codaccint: string }) =>
                        dependencia.codaccint === formData.cabssmod.codaccint
                )?.descripcion || ""
            );
        }
        return "";
    }, [lst_codaccint, formData.cabssmod.codaccint]);

    return (

        <Grid container spacing={2}>
            <Grid size={12}>
                <TextDivider>Solicitud de suministro modelo</TextDivider>
            </Grid>
            {/* Primera fila */}
            <Grid size={6} spacing={1}>
                <Typography variant="h3" color="primary" mt={1}>
                    Nro. sol
                </Typography>
                <Grid container spacing={1} >

                    <Grid size={{ xs: 12, md: 2 }} >
                        <TextField
                            defaultValue={formData.cabssmod.numsolsum}
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <TextField
                            defaultValue={formData.cabssmod.descsolsum}
                            size="small"
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>

            {/* Segunda fila */}
            <Grid size={6} container spacing={1} >

                <Grid size={{ xs: 12, md: 4 }} >
                    <Typography variant="h3" color="primary" mt={1}>
                        Año
                    </Typography>
                    <TextField
                        defaultValue={formData.cabssmod.ano}
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} >
                    <Typography variant="h3" color="primary" mt={1}>
                        Moneda
                    </Typography>
                    <TextField
                        defaultValue={formData.cabssmod.codmoneda}
                        size="small"
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Grid size={12}>
                <Typography variant="h3" color="primary">
                    Centro de Costo
                </Typography>
                <Grid container spacing={1} mt={1}>
                    <Grid size={{ lg: 4, xl: 3, md: 6 }}>

                        <ConditionalWrapper
                            condition={isLoadingCcosto}
                            wrapper={SkeletonInput}
                        >
                            {/* --------------------- SELECCIONA DEPENDENCIA --------------------- */}
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={Array.isArray(lst_ccosto) ? lst_ccosto : []}
                                getOptionLabel={(option: { ccosto: string }) => option.ccosto}
                                renderInput={(params) => <TextField {...params} />}
                                value={
                                    Array.isArray(lst_ccosto)
                                        ? lst_ccosto.find(
                                            (option: { ccosto: string | undefined }) =>
                                                option.ccosto === formData.cabssmod.ccosto
                                        ) || null
                                        : null
                                }
                                onChange={(_, newValue) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        cabssmod: {
                                            ...prevFormData.cabssmod,
                                            ccosto: newValue?.ccosto || "",
                                        },
                                    }));
                                }}
                            />
                        </ConditionalWrapper>
                    </Grid>

                    <Grid size={{ lg: 8, xl: 9, md: 6 }}>
                        <ConditionalWrapper
                            condition={isLoadingCcosto}
                            wrapper={SkeletonInput}
                        >
                            <TextField
                                value={Ccosto}
                                size="small"
                                fullWidth
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </ConditionalWrapper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={12}>
                <Typography variant="h3" color="primary">
                    Accion Interna
                </Typography>
                <Grid container spacing={1} mt={1}>
                    <Grid size={{ lg: 4, xl: 3, md: 6 }}>

                        <ConditionalWrapper
                            condition={formData.cabssmod.ccosto ? isLstCcint : isLoading}
                            wrapper={SkeletonInput}
                        >
                            {/* --------------------- SELECCIONA DEPENDENCIA --------------------- */}
                            <Autocomplete
                                disabled={!formData.cabssmod.ccosto}
                                fullWidth
                                size="small"
                                options={Array.isArray(lst_codaccint) ? lst_codaccint : []}
                                getOptionLabel={(option: { codaccint: string }) =>
                                    option.codaccint
                                }
                                renderInput={(params) => <TextField {...params} />}
                                value={
                                    Array.isArray(lst_codaccint)
                                        ? lst_codaccint.find(
                                            (option: { codaccint: string | undefined }) =>
                                                option.codaccint === formData.cabssmod.codaccint
                                        ) || null
                                        : null
                                }
                                onChange={(_, newValue) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        cabssmod: {
                                            ...prevFormData.cabssmod,
                                            codaccint: newValue?.codaccint || "",
                                        },
                                    }));
                                }}
                            />
                        </ConditionalWrapper>
                    </Grid>
                    <Grid size={{ lg: 8, xl: 9, md: 6 }}>
                        <ConditionalWrapper
                            condition={formData.cabssmod.ccosto ? isLstCcint : isLoading}
                            wrapper={SkeletonInput}
                        >
                            <TextField
                                value={CodAccionInt}
                                size="small"
                                fullWidth
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />

                        </ConditionalWrapper>
                    </Grid>
                </Grid>
            </Grid>

            {/* Quinta fila */}
            <Grid size={12}>
                <Typography variant="h3" color="primary" mt={1}>
                    Solicitante
                </Typography>
                <TextField
                    defaultValue={formData.cabssmod.nomubic}
                    size="small"
                    fullWidth
                />
            </Grid>

            {/* Sexta fila */}
            <Grid size={12}>
                <Typography variant="h3" color="primary" mt={1}>
                    Descripción
                </Typography>
                <Textarea
                    defaultValue={formData.cabssmod.descsolsum}
                    rows={2}
                />
            </Grid>
        </Grid>

    );
};

export default SupplyRequestForm;
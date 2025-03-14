import { BadgeSolSum } from '@/components/badge/badge-log'
import { SkeletonInput } from '@/components/skeleton/detail'
import { ConditionalWrapper, ConditionalWrapperTable } from '@/utils/main'
import { Typography, Grid2 as Grid, TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { IFrengsc } from '../../tsolpencomp-types'

interface FieldsInputProps {
    isLoading: boolean
}

const FieldsInput = ({ isLoading }: FieldsInputProps) => {
    const { register, watch } = useFormContext<IFrengsc>();


    return (
        <Grid container spacing={2}>
            <Grid size={2}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    N° de Solicitud
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.nrosc")} size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={6}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Descripción
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.descsc")} size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={2}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Fecha de Solicitud
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.fecsol")} type='date' size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapper>
            </Grid>
            <Grid size={2}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Código del Comprador
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.codcomprador")} size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={6}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Nombre del Comprador
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.Comprador.nomcomprador")} size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={2}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Fecha de Cambio
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.fecsts")} size="small" type='date'
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapper>
            </Grid>
            <Grid size={1}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Moneda
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.codmoneda")} size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={1}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Estatus
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <BadgeSolSum tipo={watch("cabsolcompra.stssc")} />
                </ConditionalWrapperTable>
            </Grid>
            <Grid size={2}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Solicitud de Suministro
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.idsolsum")} size="small"
                        fullWidth InputProps={{
                            readOnly: true,
                            style: {
                                // estilos
                            },
                        }} />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={4}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Lugar de Entrega
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.lugarentrega")} size="small"
                        fullWidth
                    />

                </ConditionalWrapperTable>
            </Grid>
            <Grid size={3}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Tipo de Procedimiento
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.tipoprocedimiento")} size="small"
                        fullWidth
                    />
                </ConditionalWrapperTable>
            </Grid>
            <Grid size={3}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                    Número de Procedimiento
                </Typography>
                <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                    <TextField {...register("cabsolcompra.nroprocedimiento")} size="small"
                        fullWidth
                    />
                </ConditionalWrapperTable>
            </Grid>
        </Grid>
    )
}

export default FieldsInput
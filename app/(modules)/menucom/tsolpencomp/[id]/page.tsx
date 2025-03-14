"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { Card, CardContent, CardHeader, Container, useTheme, Grid2 as Grid, Button, Typography, Box } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/breadcumbs";
import { IFrengsc, initialFrengsc } from "../tsolpencomp-types";
import { FormProvider, useForm } from "react-hook-form";
import FieldsInput from "./components/fields-input";
import FieldsTable from "./components/fields-table";
import Tvarproc from "./components/tvarproc";
import { useUpdateSC } from "../hook/useTipoCompUnd";
import ButtonForms from "@/components/button/buttonForms";
import SimpleBackdrop from "@/components/backdrop/backdrop";


export default function TrutasPage() {
    const params = useParams();
    const { id } = params;


    if (!id) {
        return (
            <>
            </>
        )
    }

    const { mutate, isPending, isSuccess } = useUpdateSC()


    const { data, isLoading, refetch } = useQueryData({
        entity: "compra",
        type: id.toString(),
        api: "comp",
        params: {},
        dependency: [id],
    });

    const methods = useForm<IFrengsc>({
        defaultValues: {
            cabsolcompra: initialFrengsc.cabsolcompra,
            detsolcompra: initialFrengsc.detsolcompra,
            total: initialFrengsc.total

        }

    })

    const SaveSC = (() => {
        const sol_compra = {
            lugarentrega: methods.watch('cabsolcompra.lugarentrega'),
            tipoprocedimiento: methods.watch('cabsolcompra.tipoprocedimiento'),
            nroprocedimiento: methods.watch('cabsolcompra.nroprocedimiento')
        }
        mutate({ id: methods.watch('cabsolcompra.nrosc').toString(), sol_compra })

    })

    useEffect(() => {
        if (data) {
            methods.reset({
                cabsolcompra: data.cabsolcompra,
                detsolcompra: data.detsolcompra,
                total: data.total
            });
        }

    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Breadcrumbs />
                    <ButtonForms
                        onClick={SaveSC}
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={data?.cabsolcompra === methods.watch('cabsolcompra')}
                        sx={{ width: 100, marginLeft: 2 }} // Agrega marginLeft para separar los componentes
                    >
                        Guardar
                    </ButtonForms>
                </Box>
                <FormProvider {...methods}>
                    <Card className="mb-4">
                        <CardHeader className="bg-muted py-2 text-[#142F62]" title="Reglones de la S.C para la Emisión de Cotizacion por proveedor" />
                        <CardContent className="p-4">
                            <FieldsInput isLoading={isLoading} />

                        </CardContent>
                    </Card>

                    <FieldsTable isLoading={isLoading} refetch={refetch} />


                </FormProvider>
            </Container>
            <SimpleBackdrop show={isPending} />
        </>
    );
}

'use client'
import React, { useEffect, useState } from "react";
import { Autocomplete, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useQueryData } from "@/server/fetch-data";
import { AccionesSheet, columnsHeadersSheet } from "../../components/header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import { ConditionalWrapper, formatDate } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { BadgeTipodoc } from "@/components/badge/badge-estatus";
import BadgeModule from "@/components/badge/badge-mod";
import { ITcambiosRoot, Rengcambio } from "../../tcambioss-types";

interface DataSheetProps {
    id: number;
    cambio: number;

}

export default function DataSheet({
    id,
    cambio
}: DataSheetProps): JSX.Element {
    const [rows, setRows] = useState<ITcambiosRoot>()

    const {
        register,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: {
            cabsolsum: {
                idsolsum: 0,
                nomubic: '',
                desccorta: '',
                ccosto: '',
                descsolsum: '',
                fecsol: '',
                fecrecsol: '',
                stssol: '',
                fecreqsol: '',
                usuing: '',
                fecing: '',
                origensol: '',
                codaccint: '',
                ano: 0,
                fecstssol: '',
                indcomdir: '',
                fecapresol: null,
                mensajes: null,
                iddocres: 0,
                coddependencia: '',
                reserva: '',
                telefubic: '',
                codmoneda: '',
                codundcmp: '',
                codundorig: '',
                codundadmorig: '',
                codundadmpro: '',
                codalmacendestino: null,
                mtoneto: '',
                mtoimpto: '',
                iddocexterno: null,
                indcompctto: '',
            },
            cabcambio: {
                idsolsum: 0,
                nrocambio: 0,
                feccambio: '',
                desccambio: '',
                iddocaum: null,
                stscamb: '',
                codmoneda: null,
                mtonetocambio: '',
                mtoimptocambio: '',
                mtototalcambio: '',
                usuing: '',
                descstscamb: '',
            },
            TotCambio:
            {
                netocambio: 0,
                imptocambio: 0,
                netoproy: 0,
                imptoproy: 0
            },
        },
    });


    const { data, isLoading } = useQueryData({
        entity: "tcmabios_show",
        dependency: [id, cambio],  // Remove watch('cabsolsum.idsolsum') from here
        params: {
            idsolsum: id === 0 ? watch('cabsolsum.idsolsum') : id,
            nrocambio: cambio === 0 ? 1 : cambio
        },
        enabled: (watch('cabsolsum.idsolsum') || id) !== 0,

    });
    const { data: lst_porcmptos, isLoading: lst_porcimptos } = useQueryData({
        entity: "lst_porcimptos",
        dependency: [],

    });
    const { data: lst_sscmabios, isLoading: lst_sscambios } = useQueryData({
        entity: "lst_sscambios",
        dependency: [],

    });

    useEffect(() => {
        if (data) {
            setRows(data)
        }
    }, [data]
    )

    useEffect(() => {
        console.log('idsolsum changed:', watch('cabsolsum.idsolsum'));
    }, [watch('cabsolsum.idsolsum')]);

    useEffect(() => {
        if (rows && Object.keys(rows).length > 0) {
            console.log(rows, 'jejej')
            setValue('cabsolsum', rows.cabsolsum);
            setValue('cabcambio', rows.cabcambio);
            if (rows.TotCambio) {
                setValue('TotCambio', rows.TotCambio[0]);
            }
        }
    }, [rows])

    const idsolsum = watch("cabsolsum.idsolsum");


    return (

        <div className="">
        {/* Supply Request Section */}
        <Card className="mb-4">
            <CardHeader className="bg-muted py-2 text-[#142F62]" title="Solicitud de suministro" />
            <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* First Row */}
                    <div className="col-span-6 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">Id. sum.</Label>
                        {id > 0 ? (
                            <Input value={id} readOnly className="bg-muted" />
                        ) : (
                            <ConditionalWrapper condition={lst_sscambios} wrapper={SkeletonInput}>
                                <Autocomplete
                                    fullWidth
                                    loading={lst_sscambios}
                                    size="small"
                                    {...register("cabsolsum.idsolsum", { required: "Tipo requerido" })}
                                    options={Array.isArray(lst_sscmabios) ? lst_sscmabios : []}
                                    getOptionLabel={(option) => option.idsolsum.toString()}
                                    renderInput={(params) => <TextField {...params} className=" border border-input bg-background" />}
                                    value={Array.isArray(lst_sscmabios) ? lst_sscmabios.find((option) => option.idsolsum === idsolsum) || null : null}
                                    onChange={(_, newValue) => {/* ... onChange logic ... */}}
                                />
                            </ConditionalWrapper>
                        )}
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">Fec. Sol.</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input type="date" {...register("cabsolsum.fecsol")} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <Label className="text-sm text-[#142F62]">Descripción</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input {...register('cabsolsum.descsolsum')} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
    
                    {/* Second Row */}
                    <div className="col-span-4 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">Dependencia</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input {...register('cabsolsum.coddependencia')} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">C. costo</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input {...register('cabsolsum.ccosto')} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
                    <div className="col-span-4 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">Acc. int.</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input {...register('cabsolsum.codaccint')} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
    
                    <div className="col-span-6 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">Moneda</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input {...register('cabsolsum.codmoneda')} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <Label className="text-sm text-[#142F62]">Id. reserva:</Label>
                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                            <Input {...register('cabsolsum.iddocres')} readOnly className="bg-muted" />
                        </ConditionalWrapper>
                    </div>
    
                    {/* ... Resto de la primera Card ... */}
                </div>
            </CardContent>
        </Card>
    
        {/* Change Data Section */}
        <Card className="mb-4">
            <CardHeader className="bg-muted py-2 text-lg text-[#142F62]" title="Datos del cambio" />
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-1">
                            <Label className="text-sm text-[#142F62]">#</Label>
                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                <Input {...register('cabcambio.nrocambio')} readOnly className="bg-muted" />
                            </ConditionalWrapper>
                        </div>
                        <div className="col-span-7">
                            <Label className="text-sm text-[#142F62]">Descripción del cambio</Label>
                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                <Input {...register('cabcambio.desccambio')} />
                            </ConditionalWrapper>
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm text-[#142F62]">Fecha</Label>
                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                <Input type="date" {...register('cabcambio.feccambio')} className="bg-muted" />
                            </ConditionalWrapper>
                        </div>
                        {/* ... */}
                    </div>
    
                    {/* Amounts Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="py-2 text-sm text-[#142F62]" title="Montos de este cambio" />
                            <CardContent className="p-4">
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Label className="text-xs">Neto</Label>
                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                            <Input {...register('TotCambio.netocambio')} readOnly className="bg-muted text-right" />
                                        </ConditionalWrapper>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Impuesto</Label>
                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                            <Input {...register('TotCambio.imptocambio')} readOnly className="bg-muted text-right" />
                                        </ConditionalWrapper>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Total</Label>
                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                            <Input value={watch('TotCambio.netocambio') + watch('TotCambio.imptocambio')} readOnly className="bg-muted text-right" />
                                        </ConditionalWrapper>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="py-2 text-sm text-[#142F62]" title="Montos proyectados que tendrá la solicitud" />
                            <CardContent className="p-4">
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Label className="text-xs">Neto</Label>
                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                            <Input {...register('TotCambio.netoproy')} readOnly className="bg-muted text-right" />
                                        </ConditionalWrapper>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Impuesto</Label>
                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                            <Input {...register('TotCambio.imptoproy')} readOnly className="bg-muted text-right" />
                                        </ConditionalWrapper>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Total</Label>
                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                            <Input value={watch('TotCambio.netoproy') + watch('TotCambio.imptoproy')} readOnly className="bg-muted text-right" />
                                        </ConditionalWrapper>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    

            {/* Supply Request Details Section */}
            <Card className="mb-4">
                <CardHeader className="bg-muted py-2 text-[#142F62]" title="Renglones de la solicitud de suministro">
                </CardHeader>
                <CardContent className="p-4">
                    <div
                        style={{
                            height: "25vh",
                            width: "100%",
                        }}
                    >
                        <BaseTable
                            loading={false}
                            rows={rows?.rengcambio || []}
                            headers={columnsHeadersSheet}
                            collapsible={{
                                visible: (row: Rengcambio) => [
                                    { content: row.nroreng, align: "center" },
                                    { content: row.tiporeng, align: "center" },
                                    { content: row.coditem || row.codserv, align: "left" },
                                    { content: row.descadiitem, align: "center" },
                                    { content: row.unidbasica, align: "center" },
                                    { content: row.cantsolcamb, align: "center" },
                                    { content: row.cantsolcamb, align: "center" },
                                    { content: row.cantsolcamb, align: "center" },
                                    { content: row.porcimptoorig, align: "center" },
                                    { content: row.precioorig, align: "center" },
                                    {
                                        content: <AccionesSheet row={row} onEdit={console.log} />,
                                        
                                        align: "center",
                                    
                                    }

                                ],

                                collapsed: () => [],
                            }}
                        />
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

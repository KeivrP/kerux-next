'use client'
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useQueryData } from "@/server/fetch-data";
import { AccionesSheet, columnsHeadersSheet } from "../../components/header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import { ConditionalWrapper, formatCurrency, formatDate } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { BadgeTipodoc } from "@/components/badge/badge-estatus";
import BadgeModule from "@/components/badge/badge-mod";
import { ITcambiosRoot, Rengcambio } from "../../tcambioss-types";
import EditSheet from "./edit-sheet";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import { ActualizarSolicitud, CrearSolicitud, useDeleteRenglon, useProcesarCambio } from "../../hook/useTcambios";
import ButtonForms from "@/components/button/buttonForms";
import { CircleSlash, SaveIcon } from "lucide-react";


interface DataSheetProps {
    id: number;
    cambio: number;

}

export default function DataSheet({
    id,
    cambio
}: DataSheetProps): JSX.Element {
    const [rows, setRows] = useState<ITcambiosRoot>()
    const [isOpen, setIsOpen] = useState(false)
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
                stssol: 'PEN',
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
                feccambio: dayjs().format('YYYY-MM-DD'),
                desccambio: '',
                iddocaum: null,
                stscamb: 'PEN',
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


    const { data, isLoading, refetch, isFetching } = useQueryData({
        entity: "tcmabios_show",
        dependency: [id, cambio],  // Remove watch('cabsolsum.idsolsum') from here
        params: {
            idsolsum: id === 0 ? watch('cabsolsum.idsolsum') : id,
            nrocambio: cambio === 0 ? 1 : cambio
        },
        enabled: id !== 0,

    });

    const { data: lst_sscmabios, isLoading: lst_sscambios } = useQueryData({
        entity: "lst_sscambios",
        dependency: [],

    });

    useEffect(() => {
        if (data) {
            setRows(data);
            setValue('cabsolsum', data.cabsolsum);
            setValue('cabcambio', data.cabcambio);
            if (data.TotCambio && data.TotCambio.length > 0) {
                setValue('TotCambio', data.TotCambio[0]);
            }
        }
    }, [data]);
    

    const idsolsum = watch("cabsolsum.idsolsum");
    const nrocambio = watch("cabcambio.nrocambio");


    const [dataRow, setDataRow] = useState<Rengcambio | null>(null);
    const { mutate, isPending, isSuccess } = useDeleteRenglon()


    const [openDialog, setOpenDialog] = useState(false);

    const [deleteRowId, setDeleteRowId] = useState(0);

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess, refetch]);


    const handleOpen = (data: Rengcambio) => {
        setDataRow(data)
        setIsOpen(true)
    }

    const handleDelete = (id: number) => {
        setOpenDialog(true)
        setDeleteRowId(id)
    }

    const handleCancelDelete = () => {
        setDeleteRowId(0)
        setOpenDialog(false)
    }


    const handleConfirmDelete = () => {
        const daterow = rows?.rengcambio.find((row) => row.idsolsum == deleteRowId)
        mutate({ idsolsum: String(daterow?.idsolsum), nrocambio: String(daterow?.nrocambio), nroreng: String(daterow?.nroreng) })
        setOpenDialog(false)
    }
    const hasChanges = watch('cabcambio.nrocambio') === 0 || JSON.stringify(watch('cabcambio')) !== JSON.stringify(rows?.cabcambio);

    const [open, setOpen] = useState(false)

    const { mutate: generateMutate, isPending: procesarLoading } = useProcesarCambio();
    const { mutate: crearSS, isPending: IspendCre, isSuccess: isSuccessCreate } = CrearSolicitud()
    const { mutate: ActualisarSs, isPending: isPendingAct } = ActualizarSolicitud()

    const totalcamb = (rows?.TotCambio && rows.TotCambio[0]) ? Number(rows.TotCambio[0].netocambio) + Number(rows.TotCambio[0].imptocambio) : 0;
    const totalProy = (rows?.TotCambio && rows.TotCambio[0]) ? Number(rows.TotCambio[0].netoproy) + Number(rows.TotCambio[0].imptoproy) : 0;

    useEffect(() => {
        if (id === 0) {
            const today = dayjs().format('YYYY-MM-DD');
            console.log(today)
            setValue('cabcambio.stscamb', "PEN");
            setValue('cabcambio.feccambio', today);
        }
    }, [id])

    const handleSave = () => {
        const nrocambio = watch('cabcambio.nrocambio');
        const data = {
            idsolsum: watch("cabcambio.idsolsum"),
            nrocambio: watch("cabcambio.nrocambio"),
            feccambio: watch("cabcambio.feccambio") || dayjs().format('YYYY-MM-DD'),
            desccambio: watch("cabcambio.desccambio") || "",
            iddocaum: watch("cabcambio.iddocaum") || null,
            stscamb: watch("cabcambio.stscamb") || "PEN",
            mtonetocambio: watch("cabcambio.mtonetocambio") || 0,
            mtoimptocambio: watch("cabcambio.mtoimptocambio") || 0,
            mtototalcambio: watch('cabcambio.mtototalcambio') || 0,
            usuing: watch("cabcambio.usuing") || ""
        };
        if (nrocambio === 0) {
            crearSS({ data });
        } else {
            ActualisarSs({
                idsolsum: watch('cabcambio.idsolsum').toString(),
                nrocambio: watch('cabcambio.nrocambio').toString(),
                data
            });
        }
    };

    const origen = watch('cabsolsum.origensol')

    return (

        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>

                <ButtonForms
                    onClick={() => hasChanges ? '' :  generateMutate({ idsolsum: String(watch('cabsolsum.idsolsum')), nrocambio: String(watch('cabcambio.nrocambio')) })}
                    sx={{ color: "alert" }}
                    style={{ backgroundColor: "transparent", color: hasChanges ? "gray" : "inherit" }}
                 
                >
                    <CircleSlash size={18} color={hasChanges ? "gray" : "#142f62"} />
                    <Typography variant="h3" marginLeft={1} color={hasChanges ? "gray" : "inherit"}>
                        Procesar
                    </Typography>
                </ButtonForms>

                {hasChanges && (
                    <ButtonForms
                        onClick={handleSave}
                        disabled={!hasChanges}
                        color="primary"
                    >
                        <SaveIcon size={18} />
                        <Typography variant="h3" marginLeft={1}>
                            Guardar
                        </Typography>
                    </ButtonForms>
                )}
            </div>
            {/* Supply Request Section */}
            <Card className="mb-4">
                <CardHeader className="bg-muted py-2 text-[#142F62]" title="Solicitud de suministro" />
                <CardContent className="p-4">
                    <div className="grid grid-cols-12 gap-4">
                        {/* First Row */}
                        <div className="col-span-6 md:col-span-2">
                            <Label className="text-sm text-[#142F62]">ID Solicitud</Label>
                            {id > 0 ? (
                                <Input value={id} readOnly className="bg-muted" />
                            ) : (
                                <ConditionalWrapper condition={lst_sscambios} wrapper={SkeletonInput}>

                                    <Autocomplete
                                        fullWidth
                                        loading={lst_sscambios}

                                        size="small"
                                        {...register("cabsolsum.idsolsum", { required: "Tipo requerido" })}
                                        options={
                                            Array.isArray(lst_sscmabios) ? lst_sscmabios : []
                                        }
                                        getOptionLabel={(option) => option.idsolsum.toString()}
                                        renderInput={(params) => <TextField {...params} className=" border border-input bg-background" />}
                                        value={
                                            Array.isArray(lst_sscmabios)
                                                ? lst_sscmabios.find((option) => option.idsolsum === idsolsum) || null
                                                : null
                                        }
                                        onChange={(_, newValue) => {
                                            setValue('cabsolsum.idsolsum', newValue ? newValue.idsolsum : 0);
                                            setValue('cabsolsum.nomubic', newValue ? newValue.nomubic : '');
                                            setValue('cabsolsum.desccorta', newValue ? newValue.desccorta : '');
                                            setValue('cabsolsum.ccosto', newValue ? newValue.ccosto : '');
                                            setValue('cabsolsum.descsolsum', newValue ? newValue.descsolsum : '');
                                            setValue('cabsolsum.fecsol', newValue ? newValue.fecsol : '');
                                            setValue('cabsolsum.fecrecsol', newValue ? newValue.fecrecsol : '');
                                            setValue('cabsolsum.stssol', newValue ? newValue.stssol : 'PEN');
                                            setValue('cabsolsum.fecreqsol', newValue ? newValue.fecreqsol : '');
                                            setValue('cabsolsum.usuing', newValue ? newValue.usuing : '');
                                            setValue('cabsolsum.fecing', newValue ? newValue.fecing : '');
                                            setValue('cabsolsum.origensol', newValue ? newValue.origensol : '');
                                            setValue('cabsolsum.codaccint', newValue ? newValue.codaccint : '');
                                            setValue('cabsolsum.ano', newValue ? newValue.ano : 0);
                                            setValue('cabsolsum.fecstssol', newValue ? newValue.fecstssol : dayjs().format('YYYY-MM-DD'));
                                            setValue('cabsolsum.indcomdir', newValue ? newValue.indcomdir : '');
                                            setValue('cabsolsum.fecapresol', newValue ? newValue.fecapresol : null);
                                            setValue('cabsolsum.mensajes', newValue ? newValue.mensajes : null);
                                            setValue('cabsolsum.iddocres', newValue ? newValue.iddocres : 0);
                                            setValue('cabsolsum.coddependencia', newValue ? newValue.coddependencia : '');
                                            setValue('cabsolsum.reserva', newValue ? newValue.reserva : '');
                                            setValue('cabsolsum.telefubic', newValue ? newValue.telefubic : '');
                                            setValue('cabsolsum.codmoneda', newValue ? newValue.codmoneda : '');
                                            setValue('cabsolsum.codundcmp', newValue ? newValue.codundcmp : '');
                                            setValue('cabsolsum.codundorig', newValue ? newValue.codundorig : '');
                                            setValue('cabsolsum.codundadmorig', newValue ? newValue.codundadmorig : '');
                                            setValue('cabsolsum.codundadmpro', newValue ? newValue.codundadmpro : '');
                                            setValue('cabsolsum.codalmacendestino', newValue ? newValue.codalmacendestino : null);
                                            setValue('cabsolsum.mtoneto', newValue ? newValue.mtoneto : '');
                                            setValue('cabsolsum.mtoimpto', newValue ? newValue.mtoimpto : '');
                                            setValue('cabsolsum.iddocexterno', newValue ? newValue.iddocexterno : null);
                                            setValue('cabsolsum.indcompctto', newValue ? newValue.indcompctto : '');

                                            setValue('cabcambio.idsolsum', newValue ? newValue.idsolsum : 0);
                                            setValue('cabcambio.nrocambio', newValue ? newValue.nrocambio : 0);
                                            setValue('cabcambio.feccambio', newValue ? newValue.feccambio : '');
                                            setValue('cabcambio.desccambio', newValue ? newValue.desccambio : '');
                                            setValue('cabcambio.iddocaum', newValue ? newValue.iddocaum : null);
                                            setValue('cabcambio.stscamb', newValue ? newValue.stscamb : 'PEN');
                                            setValue('cabcambio.codmoneda', newValue ? newValue.codmoneda : null);
                                            setValue('cabcambio.mtonetocambio', newValue ? newValue.mtonetocambio : '');
                                            setValue('cabcambio.mtoimptocambio', newValue ? newValue.mtoimptocambio : '');
                                            setValue('cabcambio.mtototalcambio', newValue ? newValue.mtototalcambio : '');
                                            setValue('cabcambio.usuing', newValue ? newValue.usuing : '');
                                            setValue('cabcambio.descstscamb', newValue ? newValue.descstscamb : '');
                                        }}
                                    />
                                    {!!errors.cabsolsum?.idsolsum && (
                                        <Typography color="error" sx={{ fontSize: 9, fontWeight: "bold" }}>
                                            {errors.cabsolsum?.idsolsum?.message}
                                        </Typography>
                                    )}
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
                                <Input {...register('cabsolsum.desccorta')} readOnly className="bg-muted" />
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
                            <Label className="text-sm text-[#142F62]">Acción interna</Label>
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

                        <div className="col-span-12 md:col-span-4">
                            <Label className="text-sm text-[#142F62]">Descripción Ampliada</Label>
                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                <Input {...register('cabsolsum.descsolsum')} readOnly className="bg-muted" />
                            </ConditionalWrapper>
                        </div>

                        <div className="col-span-12 xl:col-span-4 flex items-center space-x-1">
                            <RadioGroup row value={watch('cabsolsum.reserva')}>
                                <FormControlLabel value="N" control={<Radio disabled />} label="Ninguna" />
                                <FormControlLabel value="E" control={<Radio disabled />} label="Establece" />
                                <FormControlLabel value="P" control={<Radio disabled />} label="Previo" />
                            </RadioGroup>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <Label className="text-sm text-[#142F62]"> ID Reserva:</Label>
                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                <Input {...register('cabsolsum.iddocres')} readOnly className="bg-muted" />
                            </ConditionalWrapper>
                        </div>


                        <div className="col-span-12 md:col-span-2 flex align-center justify-center flex-col">
                            <Label className="text-sm text-[#142F62]" htmlFor="compra-directa">Compra Directa</Label>
                            <Checkbox
                                {...register('cabsolsum.indcomdir')}
                                id="compra-directa"
                                checked={watch('cabsolsum.indcomdir') === 'S'}
                                readOnly
                            />
                        </div>
                        <div className="col-span-12 md:col-span-1 flex align-center justify-center flex-col">
                            <Label className="text-sm text-[#142F62]">Origen</Label>
                            <ConditionalWrapper condition={origen === "" || origen === undefined} wrapper={SkeletonInput}>
                                <BadgeModule codmenu={origen} />
                            </ConditionalWrapper>
                        </div>
                        <div className="col-span-6 md:col-span-1 flex align-center justify-center flex-col">
                            <Label className="text-sm text-[#142F62]">Estatus</Label>
                            <BadgeTipodoc tipo={watch('cabsolsum.stssol')} />
                        </div>


                        {/* Third Row */}


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
                            <div className="col-span-2 flex flex-col">
                                <Label className="text-sm text-[#142F62] mb-1">Estatus del Cambio</Label>
                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                    <div className="flex items-center">
                                        <BadgeTipodoc tipo={watch('cabcambio.stscamb') ?? "PEN"} />
                                    </div>
                                </ConditionalWrapper>
                            </div>
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
                                                <Input value={formatCurrency(rows?.TotCambio?.[0]?.netocambio ?? 0)} readOnly className="bg-muted text-right" />
                                            </ConditionalWrapper>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Impuesto</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                                <Input value={formatCurrency(rows?.TotCambio?.[0]?.imptocambio ?? 0)} readOnly className="bg-muted text-right" />
                                            </ConditionalWrapper>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Total</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                                <Input value={formatCurrency(totalcamb)} readOnly className="bg-muted text-right" />
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
                                                <Input value={formatCurrency(rows?.TotCambio?.[0]?.netoproy ?? 0)} readOnly className="bg-muted text-right" />
                                            </ConditionalWrapper>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Impuesto</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                                <Input value={formatCurrency(rows?.TotCambio?.[0]?.imptoproy ?? 0)} readOnly className="bg-muted text-right" />
                                            </ConditionalWrapper>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Total</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                                <Input value={formatCurrency(totalProy)} readOnly className="bg-muted text-right" />
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
                <CardHeader className="bg-muted py-2 text-[#142F62] flex justify-between items-center"
                    title="Renglones de la solicitud de suministro"
                    action={
                        <Button
                            disabled={hasChanges}

                            onClick={() => {
                                setOpen(true);
                                handleOpen(rows?.rengcambio?.[0] ?? { idsolsum, nrocambio } as Rengcambio);
                            }}
                            variant="contained"
                            color={"primary"}
                            sx={{ textTransform: "none" }}
                        >
                            <Typography variant="h3">{"+ AÑADIR"}</Typography>
                        </Button>
                    }
                />
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
                                    { content: row.nroreng, align: "center", handleCollapse: true },
                                    { content: row.tiporeng, align: "center" },
                                    { content: row.coditem || row.codserv, align: "center" },
                                    { content: row.descreng, align: "left" },
                                    { content: row.unidbasica, align: "center" },
                                    { content: formatCurrency(row.cantsolorig), align: "center" },
                                    { content: formatCurrency(row.precioorig), align: "center" },
                                    { content: formatCurrency(row.preciocambio), align: "center" },
                                    { content: row.porcimptocamb, align: "center" },
                                    { content: formatCurrency(Number(row.preciocambio) * Number(row.cantsolorig)), align: "center" },
                                    {
                                        content: <AccionesSheet row={row} onEdit={handleOpen} onDelete={handleDelete} />,
                                        align: "center",

                                    }

                                ],


                                collapsed: (row) => [
                                    {
                                        name: "Descripción del servicio, mantenimiento u obra",
                                        content: row.descadiitem,
                                    },
                                    {
                                        name: "Cuenta Presupuestaria",
                                        content: `${row.codcta} - ${row.desccta}`,
                                    },
                                    {
                                        name: "Fecha de última compra",
                                        content: formatDate(row.fecultcom),
                                    },
                                    {
                                        name: "Moneda",
                                        content: row.codmoneda,
                                    },
                                    {
                                        name: "Clasif. SNC",
                                        content: row.codclasifsnc,
                                    },
                                ],
                            }}
                        />
                    </div>
                </CardContent>

            </Card>

            <ConfirmDialog
                mode={"delete"}
                open={openDialog}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={`¿Estas seguro que deseas eliminar el cambio ${rows?.rengcambio?.find((row) => row.idsolsum == deleteRowId)?.idsolsum ?? ''}?`}
            />

            <EditSheet isNew={open} refetch={() => refetch()} isOpen={isOpen} onClose={() => { setIsOpen(false); setDataRow(null), setOpen(false); refetch() }} data={dataRow as Rengcambio} />
            <SimpleBackdrop show={isPending || procesarLoading || isPendingAct || IspendCre} />
        </div>
    );
}

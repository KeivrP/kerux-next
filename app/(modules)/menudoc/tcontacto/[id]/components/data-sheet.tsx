'use client'

import ButtonForms from "@/components/button/buttonForms";
import { SkeletonInput } from "@/components/skeleton/detail";
import { Label } from "@/components/ui/label";
import { useQueryData } from "@/server/fetch-data";
import { ConditionalWrapper } from "@/utils/main";
import { Card, CardContent, CardHeader, Typography, Grid2 as Grid, Box, TextField, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, Select, MenuItem, Autocomplete } from "@mui/material";
import { CircleUser } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { set } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useCreateBenef, useUpdateBenef } from "../../../tbenef/hook/useBenef";

interface BeneficiaryData {
    nombre: string
    appabrev: string
    numbenef: number
    numbenefaut: any
    tipobenef: string
    observ: any
    letraid: string
    numid: number
    clase: string
    nroctadante: any
    nroctabancaria: string
    codbanco: string
    condicionbenef: any
    numocei: any
    fecocei: any
    telef1: any
    telef2: any
    fax: any
    direcfisica: any
    direcpostal: any
    nomcontacto: any
    email: any
    nomautor: any
    abonese: any
    regestcont: any
    codauxiliar: any
    codubicg: any
    orgadscritos: any
    fecvigenciareg: any
    nit: any
    nil: any
    tipoprov: string
    tipoctabancaria: any
    codsucursal: any
    indactivo: string
    rnc: any
    rncFecha: any
    relacionOtros: any
    vigenciaRegistro: any
    auxiliarContable: any
}

interface DataSheetProps {
    id: string;
}

export default function DataSheet({
    id,

}: DataSheetProps): JSX.Element {
    const { control, handleSubmit, reset, watch, setValue, register } = useForm<BeneficiaryData>()
    const router = useRouter()


    const tipobenef = watch("tipobenef")

    const { data, isLoading } = useQueryData({
        entity: "beneficiarios_crud",
        api: 'doc',
        enabled: id !== "-" && id !== "",
        type: id,
        dependency: [id],
    });

    const { data: lst_prov, isLoading: lst_prov_loading } = useQueryData({
        entity: "lst_prov",
        api: 'doc',
        params: {
            tipobenef
        },

        dependency: [tipobenef],
    })

    const { data: lst_ubic_geog, isLoading: lst_ubic_geog_loading } = useQueryData({
        entity: "lst_ubgeo",
        api: 'doc',
        dependency: [],
    })


    const { mutate: create, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateBenef()
    const { mutate: update, isPending: isPendingUpdate } = useUpdateBenef()

    useEffect(() => {
        if (data && data.beneficiario) {
            const initialData = Object.fromEntries(
                Object.entries(data.beneficiario).map(([key, value]) => [key, value === null ? "" : value]),
            ) as unknown as BeneficiaryData
            reset(initialData)
        }


    }, [data])

    const onSubmit = (beneficiario: BeneficiaryData) => {
        if (id !== "-" && id !== "") {
            update({ id: parseInt(id), beneficiario })
        } else {
            create({ beneficiario })
            reset()
        }

        console.log(beneficiario)
    }

    useEffect(() => {
        if (isSuccessCreate) {
            router.push(`/menudoc/tbenef/`)
        }
    }, [isSuccessCreate])


    const codubicac = useMemo(() => {
        const selectedOption = lst_ubic_geog?.find((option: { codubicg: string }) => option.codubicg === watch("codubicg"));
        return selectedOption ? selectedOption.descubica : null;
    }, [watch("codubicg"), lst_ubic_geog]);


    const [condicionA, setCondicionA] = useState(true);


    const [numOceiDisabled, setNumOceiDisabled] = useState(true);
    const [fecOceiDisabled, setFecOceiDisabled] = useState(true);
    const [codSucursalDisabled, setCodSucursalDisabled] = useState(true);
    const [orgadscritosRequired, setOrgadscritosRequired] = useState(true);

    const [claseFuncionarioDisabled, setClaseFuncionarioDisabled] = useState(true);
    const [claseObreroDisabled, setClaseObreroDisabled] = useState(true);
    const [claseProveedorDisabled, setClaseProveedorDisabled] = useState(true);
    const [claseCuentadanteDisabled, setClaseCuentadanteDisabled] = useState(true);
    const [claseOrgadscritoDisabled, setClaseOrgadscritoDisabled] = useState(true);
    const [claseOtroDisabled, setClaseOtroDisabled] = useState(true);
    const [claseSociobeneficiarioDisabled, setClaseSociobeneficiarioDisabled] = useState(true);
    const [claseJuntaDirectivaDisabled, setClaseJuntaDirectivaDisabled] = useState(true);
    const [claseBancoDisabled, setClaseBancoDisabled] = useState(true);
    const [claseContratistaDisabled, setClaseContratistaDisabled] = useState(true);
    const [claseProyectistaDisabled, setClaseProyectistaDisabled] = useState(true);
    const [claseInspectorDisabled, setClaseInspectorDisabled] = useState(true);



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>

                    {/* Supply Request Section */}
                    <Card className="mb-4">
                        <CardHeader className="bg-muted py-2 text-[#142F62]" title="Información" />
                        <CardContent className="p-4">
                            <Grid container spacing={2}>
                                {/* Left Column */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Grid container spacing={1}>
                                        <Grid size={6}>
                                            <Label className="text-sm text-[#142F62]">Número</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                                <Controller
                                                    name="numbenef"
                                                    disabled
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled
                                                            size="small"
                                                            value={field.value || ""}
                                                            sx={{ backgroundColor: "white" }}
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error ? fieldState.error.message : null}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>

                                        <Grid size={6}>
                                            <Box display="flex" gap={2}>
                                                <Box flex={1}>
                                                    <Label className="text-sm text-[#142F62]">Identificación</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                                                        <Grid container spacing={1}>
                                                            <Grid size={3}>
                                                                <Controller
                                                                    name="letraid"
                                                                    control={control}
                                                                    rules={{ required: "Letra id" }}

                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            disabled
                                                                            size="small"
                                                                            value={field.value || ""}
                                                                            sx={{ backgroundColor: "white" }}
                                                                        >
                                                                            <MenuItem value={"V"}>V</MenuItem>
                                                                            <MenuItem value={"J"}>J</MenuItem>
                                                                            <MenuItem value={"G"}>G</MenuItem>
                                                                            <MenuItem value={"P"}>P</MenuItem>
                                                                            <MenuItem value={"C"}>C</MenuItem>
                                                                            <MenuItem value={"N"}>N</MenuItem>
                                                                            <MenuItem value={"E"}>E</MenuItem>
                                                                        </Select>
                                                                    )}
                                                                />
                                                            </Grid>
                                                            <Grid size={9}>
                                                                <Controller
                                                                    name="numid"
                                                                    rules={{ required: "Numero de identificación" }}

                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <TextField
                                                                            disabled
                                                                            {...field}
                                                                            inputProps={{ maxLength: 12 }}
                                                                            type="number"
                                                                            size="small"
                                                                            value={field.value || ""}
                                                                            sx={{ backgroundColor: "white" }}
                                                                        />
                                                                    )}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </ConditionalWrapper>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid size={6}>
                                            <Label className="text-sm text-[#142F62]">Cód sucursal</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="codsucursal"
                                                    control={control}
                                                    disabled={codSucursalDisabled}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled
                                                            size="small"
                                                            inputProps={{ maxLength: 2 }}
                                                            value={field.value || ""}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={3}>
                                            <Label className="text-sm text-[#142F62]">N.I.T</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="nit"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled
                                                            size="small"
                                                            type="number"
                                                            value={field.value || ""}
                                                            inputProps={{ maxLength: 12 }}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={3}>
                                            <Label className="text-sm text-[#142F62]">N.I.L</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="nil"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled
                                                            size="small"
                                                            inputProps={{ maxLength: 15 }}
                                                            value={field.value || ""}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Right Column - Company Information */}
                                <Grid size={{ xs: 12, md: 8 }}>

                                    <Grid container spacing={1}>
                                        <Grid size={12}>
                                            <Box display="flex" gap={2}>
                                                <Box flex={1}>
                                                    <Label className="text-sm text-[#142F62]">Nombres Completo</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <Controller
                                                            name="nombre"
                                                            control={control}
                                                            rules={{ required: "Ingrese Nombre" }}

                                                            render={({ field }) => (
                                                                <TextField
                                                                    {...field}
                                                                    size="small"
                                                                    disabled
                                                                    fullWidth
                                                                    inputProps={{ maxLength: 60 }}
                                                                    value={field.value || ""}
                                                                    sx={{ backgroundColor: "white" }}
                                                                />
                                                            )}
                                                        />
                                                    </ConditionalWrapper>
                                                </Box>
                                                <Box width="40%">
                                                    <Label className="text-sm text-[#142F62]">Abreviado</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <Box display="flex" gap={1} alignItems="center">
                                                            <Controller
                                                                rules={{ required: "Ingrese Abreviado" }}

                                                                name="appabrev"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <TextField
                                                                        disabled
                                                                        {...field}
                                                                        size="small"
                                                                        fullWidth
                                                                        inputProps={{ maxLength: 25 }}
                                                                        value={field.value || ""}
                                                                        sx={{ backgroundColor: "white" }}
                                                                    />
                                                                )}
                                                            />
                                                            <Controller
                                                                name="indactivo"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                disabled
                                                                                checked={field.value === "S"}
                                                                                onChange={(e) => field.onChange(e.target.checked ? "S" : "N")}
                                                                                size="medium"
                                                                            />
                                                                        }
                                                                        label="Activo?"
                                                                    />
                                                                )}
                                                            />
                                                        </Box>
                                                    </ConditionalWrapper>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Extendido</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="abonese"
                                                    control={control}
                                                    rules={{ required: "Ingrese Extendido" }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled
                                                            size="small"
                                                            inputProps={{ maxLength: 150 }}
                                                            fullWidth
                                                            value={field.value || ""}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 8 }}>

                            <Card className="mb-4">
                                <CardHeader className="bg-muted py-2 text-[#142F62]" title="Selección" />
                                <CardContent className="p-4">
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Grid container spacing={1}>
                                                <Grid size={12}>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <FormControl component="fieldset">
                                                            <Label className="text-sm text-[#142F62]">Tipo</Label>
                                                            <Controller
                                                                rules={{ required: "Tipo benef" }}

                                                                name="tipobenef"
                                                                control={control}
                                                                defaultValue="J"
                                                                render={({ field }) => (
                                                                    <RadioGroup disabled {...field}>
                                                                        <FormControlLabel disabled value="P" control={<Radio size="small" checked={field.value === "P"} />} label="Público" />
                                                                        <FormControlLabel disabled value="N" control={<Radio size="small" checked={field.value === "N"} />} label="Natural" />
                                                                        <FormControlLabel disabled value="J" control={<Radio size="small" checked={field.value === "J"} />} label="Jurídico" />
                                                                        <FormControlLabel disabled value="E" control={<Radio size="small" checked={field.value === "E"} />} label="Extranjero" />
                                                                    </RadioGroup>
                                                                )}
                                                            />
                                                        </FormControl>
                                                    </ConditionalWrapper>
                                                </Grid>
                                                <Grid size={12}>

                                                    <Label className="text-sm text-[#142F62]">Tipo de proveedor</Label>
                                                    <ConditionalWrapper condition={lst_prov_loading} wrapper={SkeletonInput}>
                                                        <Autocomplete
                                                            fullWidth
                                                            disabled
                                                            loading={lst_prov_loading}
                                                            size="small"
                                                            {...register("tipoprov")}
                                                            options={Array.isArray(lst_prov) ? lst_prov : []}
                                                            getOptionLabel={(option) => option.descvalor.toString()}
                                                            renderInput={(params) => <TextField {...params} className="border border-input bg-background" />}
                                                            value={
                                                                Array.isArray(lst_prov)
                                                                    ? lst_prov.find((option) => option.valor === watch("tipoprov")) || null
                                                                    : null
                                                            }
                                                            onChange={(_, newValue) => {
                                                                setValue("tipoprov", newValue?.valor || "");
                                                            }}
                                                        />
                                                        {/* Tipo Proveedor */}
                                                    </ConditionalWrapper>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 9 }}>
                                            <FormControl component="fieldset">
                                                <Label className="text-sm text-[#142F62]">Clase</Label>
                                                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                    <Controller
                                                        name="clase"
                                                        rules={{ required: "Ingrese Clase" }}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <RadioGroup {...field} row>
                                                                <Grid container>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseFuncionarioDisabled} value="F" control={<Radio size="small" checked={field.value === "F"} />} label="Funcionario" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseProveedorDisabled} value="P" control={<Radio size="small" checked={field.value === "P"} />} label="Proveedor" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseSociobeneficiarioDisabled} value="S" control={<Radio size="small" checked={field.value === "S"} />} label="Socio Beneficiario" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseObreroDisabled} value="O" control={<Radio size="small" checked={field.value === "O"} />} label="Obrero" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseOrgadscritoDisabled} value="A" control={<Radio size="small" checked={field.value === "A"} />} label="Organismo Adscrito" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseCuentadanteDisabled} value="C" control={<Radio size="small" checked={field.value === "C"} />} label="Cuentadante" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseJuntaDirectivaDisabled} value="C" control={<Radio size="small" checked={field.value === "J"} />} label="Junta Directiva" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseBancoDisabled} value="C" control={<Radio size="small" checked={field.value === "B"} />} label="Banco" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseInspectorDisabled} value="C" control={<Radio size="small" checked={field.value === "I"} />} label="Inspector" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseProyectistaDisabled} value="C" control={<Radio size="small" checked={field.value === "Y"} />} label="Proyectista" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseContratistaDisabled} value="C" control={<Radio size="small" checked={field.value === "T"} />} label="Contratista" />
                                                                    </Grid>
                                                                    <Grid size={4}>
                                                                        <FormControlLabel disabled={claseOtroDisabled} value="C" control={<Radio size="small" checked={field.value === "X"} />} label="Otro" />
                                                                    </Grid>
                                                                    {watch("clase") === "C" && (
                                                                        <Grid size={12} mt={1}>
                                                                            <Label className="text-sm text-[#142F62]">Número de cuentadante</Label>

                                                                            <Controller
                                                                                name="nroctadante"
                                                                                control={control}
                                                                                render={({ field }) => (
                                                                                    <TextField
                                                                                        {...field}
                                                                                        size="small"
                                                                                        fullWidth
                                                                                        inputProps={{ maxLength: 20 }}
                                                                                        value={field.value || ""}
                                                                                        sx={{ backgroundColor: "white" }}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Grid>
                                                                    )}
                                                                </Grid>
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </ConditionalWrapper>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>

                            <Card className="mb-4">
                                <CardHeader className="bg-muted py-2 text-[#142F62]" title="Selección" />
                                <CardContent className="p-4">
                                    <Grid container spacing={2}>
                                        <Grid size={12}>
                                            <Grid container spacing={1}>
                                                {/* RCN Section */}
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Label className="text-sm text-[#162F62]">RNC</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <Box sx={{ mb: 1 }}>
                                                            <Controller

                                                                name="numocei"
                                                                disabled={numOceiDisabled}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <TextField disabled inputProps={{ maxLength: 20 }} {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                                )}
                                                            />
                                                        </Box>
                                                    </ConditionalWrapper>
                                                </Grid>

                                                {/* Vigencia de registro */}
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Label className="text-sm text-[#162F62]">Fecha RNC</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <Controller
                                                                disabled={fecOceiDisabled}
                                                                name="fecocei"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <TextField disabled {...field} type="date" size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                                )}
                                                            />
                                                        </Box>
                                                    </ConditionalWrapper>
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Label className="text-sm text-[#142F62]">Vigencia de registro</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <Controller
                                                                name="vigenciaRegistro"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <TextField disabled {...field} type="date" size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                                )}
                                                            />
                                                        </Box>
                                                    </ConditionalWrapper>
                                                </Grid>

                                                {/* Auxiliar contable */}
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Label className="text-sm text-[#142F62]">Auxiliar contable</Label>
                                                    <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                        <Controller
                                                            name="auxiliarContable"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <TextField disabled {...field} size="small" inputProps={{ maxLength: 14 }} fullWidth sx={{ backgroundColor: "white" }} />
                                                            )}
                                                        />
                                                    </ConditionalWrapper>
                                                </Grid>


                                                {/* Relación otros */}
                                                <Grid size={{ xs: 12, sm: 12 }} mt={1}>

                                                    <FormControl component="fieldset">
                                                        <Label className="text-sm text-[#142F62]">Relación otros</Label>
                                                        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                            <Controller
                                                                name="condicionbenef"
                                                                control={control}
                                                                defaultValue="N"
                                                                render={({ field }) => (
                                                                    <RadioGroup {...field} row>
                                                                        <FormControlLabel
                                                                            value="J"
                                                                            disabled={condicionA}
                                                                            control={<Radio size="small" />}
                                                                            checked={field.value === "J"}
                                                                            label={<Typography variant="body2">Jubilado</Typography>}
                                                                        />
                                                                        <FormControlLabel
                                                                            value="P"
                                                                            disabled={condicionA}
                                                                            checked={field.value === "P"}
                                                                            control={<Radio size="small" />}
                                                                            label={<Typography variant="body2">Pensionado</Typography>}
                                                                        />
                                                                        <FormControlLabel
                                                                            value="N"
                                                                            disabled={condicionA}
                                                                            checked={field.value === "N"}
                                                                            control={<Radio size="small" />}
                                                                            label={<Typography variant="body2">Ninguno</Typography>}
                                                                        />
                                                                    </RadioGroup>
                                                                )}
                                                            />
                                                        </ConditionalWrapper>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>

                    <Card className="mb-4">
                        <CardHeader className="bg-muted py-2 text-[#142F62]" title="Detalles" />
                        <CardContent className="p-4">
                            <Grid container spacing={2}>
                                {/* Left side */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Grid container spacing={1}>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Ubicación</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="direcfisica"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled
                                                            multiline
                                                            rows={2}
                                                            size="small"
                                                            inputProps={{ maxLength: 180 }}
                                                            fullWidth
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Dir Postal</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="direcpostal"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField disabled inputProps={{ maxLength: 180 }} {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Ubicación Física</Label>

                                            <Grid container spacing={1}>
                                                <Grid size={4}>
                                                    <ConditionalWrapper condition={lst_ubic_geog_loading} wrapper={SkeletonInput}>

                                                        <Autocomplete
                                                            fullWidth
                                                            loading={lst_ubic_geog_loading}
disabled
                                                            size="small"
                                                            {...register("codubicg", { required: "Tipo requerido" })}
                                                            options={
                                                                Array.isArray(lst_ubic_geog) ? lst_ubic_geog : []
                                                            }
                                                            getOptionLabel={(option) => option.codubicg.toString()}
                                                            renderInput={(params) => <TextField {...params} className=" border border-input bg-background" />}
                                                            value={
                                                                Array.isArray(lst_ubic_geog)
                                                                    ? lst_ubic_geog.find((option) => option.codubicg === watch("codubicg")) || null
                                                                    : null
                                                            }
                                                            onChange={(_, newValue) => {
                                                                setValue("codubicg", newValue?.codubicg || "");

                                                            }}
                                                        />

                                                    </ConditionalWrapper>
                                                </Grid>
                                                <Grid size={8}>

                                                    <TextField inputProps={{ maxLength: 15 }} disabled fullWidth value={codubicac} size="small" sx={{ backgroundColor: "white" }} />


                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* Right side */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Grid container spacing={1}>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Registro N°</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="regestcont"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField disabled inputProps={{ maxLength: 14 }} {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={8}>
                                            <Label className="text-sm text-[#142F62]">Teléfonos</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <Controller
                                                        name="telef1"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField inputProps={{ maxLength: 20 }} disabled {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name="telef2"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField inputProps={{ maxLength: 20 }} disabled {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                        )}
                                                    />
                                                </Box>
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Nro fax</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="fax"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField inputProps={{ maxLength: 20 }} disabled {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Email</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField inputProps={{ maxLength: 60 }} disabled
                                                            {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Organismos adscrito</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="orgadscritos"
                                                    disabled={watch("clase") !== "A" || orgadscritosRequired} control={control}
                                                    render={({ field }) => (
                                                        <TextField disabled {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} inputProps={{ maxLength: 10 }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Observación</Label>
                                            <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>

                                                <Controller
                                                    name="observ"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            multiline
                                                            disabled
                                                            rows={2}
                                                            size="small"
                                                            fullWidth
                                                            inputProps={{ maxLength: 60 }}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>


                </div>
            </form>
            <SimpleBackdrop show={isPendingCreate || isPendingUpdate} />
        </>
    );
}

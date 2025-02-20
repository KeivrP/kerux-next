'use client'

import ButtonForms from "@/components/button/buttonForms";
import { SkeletonInput } from "@/components/skeleton/detail";
import { Label } from "@/components/ui/label";
import { useQueryData } from "@/server/fetch-data";
import { ConditionalWrapper } from "@/utils/main";
import { Card, CardContent, CardHeader, Typography, Grid2 as Grid, Box, TextField, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, Select, MenuItem, Autocomplete } from "@mui/material";
import { CircleUser } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateBenef, useUpdateBenef } from "../../hook/useBenef";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { set } from "zod";

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

    const tipobenef = watch("tipobenef")

    const { data, isLoading } = useQueryData({
        entity: "beneficiarios_crud",
        api: 'doc',
        enabled: id !== "-" && id !== "",
        type: id,
        dependency: [id],
    });

    const {data: lst_prov, isLoading: lst_prov_loading} = useQueryData({
        entity: "lst_prov",
        api: 'doc',
        params: {
            tipobenef
        },

        dependency: [tipobenef],
    })

    const {data: lst_ubic_geog, isLoading: lst_ubic_geog_loading} = useQueryData({
        entity: "lst_ubgeo",
        api: 'doc',
        dependency: [],
    })


    const { mutate: create, isPending: isPendingCreate } = useCreateBenef()
    const { mutate: update, isPending: isPendingUpdate } = useUpdateBenef()

    useEffect(() => {
        if (data) {
            const initialData = Object.fromEntries(
                Object.entries(data.beneficiario).map(([key, value]) => [key, value === null ? "" : value]),
            ) as unknown as BeneficiaryData
            reset(initialData)
        }


    }, [data])

    const onSubmit = (data: BeneficiaryData) => {
        if (id !== "-" && id !== "") {
            update({ id: parseInt(id), data })
        } else {
            create({ data })
            reset()
        }

        console.log(data)
    }

const codubicac = useMemo(() => {
    const selectedOption = lst_ubic_geog?.find((option: { codubicg: string }) => option.codubicg === watch("codubicg"));
    return selectedOption ? selectedOption.descubica : null;
}, [watch("codubicg"), lst_ubic_geog]);


console.log(data)


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>

                        <ButtonForms
                            onClick={() => console.log("Aprobar")}
                            sx={{ color: "alert", alignItems: "center" }}        >
                            <CircleUser size={18} />
                            <Typography variant="h3" marginLeft={1}>
                                Contacto
                            </Typography>
                        </ButtonForms>
                    </div>
                    {/* Supply Request Section */}
                    <Card className="mb-4">
                        <CardHeader className="bg-muted py-2 text-[#142F62]" title="Información" />
                        <CardContent className="p-4">
                            <Grid container spacing={2}>
                                {/* Left Column */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Grid container spacing={1}>
                                        <Grid size={6}>
                                            <Label className="text-sm text-[#142F62]">Numero</Label>
                                            <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
                                                <Controller
                                                    name="numbenef"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            size="small"
                                                            value={field.value || ""}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    )}
                                                />
                                            </ConditionalWrapper>
                                        </Grid>

                                        <Grid size={6}>
                                            <Box display="flex" gap={2}>
                                                <Box flex={1}>
                                                    <Label className="text-sm text-[#142F62]">Identificación</Label>
                                                    <ConditionalWrapper condition={false} wrapper={SkeletonInput}>
                                                        <Grid container spacing={1}>
                                                            <Grid size={3}>
                                                                <Controller
                                                                    name="letraid"
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <TextField
                                                                            {...field}
                                                                            size="small"
                                                                            value={field.value || ""}
                                                                            sx={{ backgroundColor: "white" }}
                                                                        />
                                                                    )}
                                                                />
                                                            </Grid>
                                                            <Grid size={9}>
                                                                <Controller
                                                                    name="numid"
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <TextField
                                                                            {...field}
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

                                            <Controller
                                                name="codsucursal"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        size="small"
                                                        value={field.value || ""}
                                                        sx={{ backgroundColor: "white" }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <Label className="text-sm text-[#142F62]">N.I.T</Label>

                                            <Controller
                                                name="nit"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        size="small"
                                                        value={field.value || ""}
                                                        sx={{ backgroundColor: "white" }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <Label className="text-sm text-[#142F62]">N.I.L</Label>

                                            <Controller
                                                name="nil"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        size="small"
                                                        value={field.value || ""}
                                                        sx={{ backgroundColor: "white" }}
                                                    />
                                                )}
                                            />
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

                                                    <Controller
                                                        name="nombre"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                size="small"
                                                                fullWidth
                                                                value={field.value || ""}
                                                                sx={{ backgroundColor: "white" }}
                                                            />
                                                        )}
                                                    />
                                                </Box>
                                                <Box width="40%">
                                                    <Label className="text-sm text-[#142F62]">Abreviado</Label>

                                                    <Box display="flex" gap={1} alignItems="center">
                                                        <Controller
                                                            name="appabrev"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <TextField
                                                                    {...field}
                                                                    size="small"
                                                                    fullWidth
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
                                                                            checked={field.value === "S"}
                                                                            onChange={(e) => field.onChange(e.target.checked ? "S" : "N")}
                                                                            size="small"
                                                                        />
                                                                    }
                                                                    label="Activo?"
                                                                />
                                                            )}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Extendido</Label>

                                            <Controller
                                                name="nombre"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        size="small"
                                                        fullWidth
                                                        value={field.value || ""}
                                                        sx={{ backgroundColor: "white" }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>

                            <Card className="mb-4">
                                <CardHeader className="bg-muted py-2 text-[#142F62]" title="Selección" />
                                <CardContent className="p-4">
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <FormControl component="fieldset">
                                                <Label className="text-sm text-[#142F62]">Tipo</Label>
                                                <Controller
                                                    name="tipobenef"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <RadioGroup {...field}>
                                                            <FormControlLabel value="P" control={<Radio size="small" checked={field.value === "P"} />} label="Público" />
                                                            <FormControlLabel value="N" control={<Radio size="small" checked={field.value === "N"} />} label="Natural" />
                                                            <FormControlLabel value="J" control={<Radio size="small" checked={field.value === "J"} />} label="Jurídico" />
                                                            <FormControlLabel value="E" control={<Radio size="small" checked={field.value === "E"} />} label="Extranjero" />
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <FormControl component="fieldset">
                                                <Label className="text-sm text-[#142F62]">Clase</Label>
                                                <Controller
                                                    name="clase"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <RadioGroup {...field} row>
                                                            <Grid container>
                                                                <Grid size={6}>
                                                                    <FormControlLabel value="F" control={<Radio size="small" checked={field.value === "F"} />} label="Funcionario" />
                                                                </Grid>
                                                                <Grid size={6}>
                                                                    <FormControlLabel value="P" control={<Radio size="small" checked={field.value === "P"} />} label="Proveedor" />
                                                                </Grid>
                                                                <Grid size={6}>
                                                                    <FormControlLabel value="S" control={<Radio size="small" checked={field.value === "S"} />} label="Socio Beneficiario" />
                                                                </Grid>
                                                                <Grid size={6}>
                                                                    <FormControlLabel value="O" control={<Radio size="small" checked={field.value === "O"} />} label="Obrero" />
                                                                </Grid>
                                                                <Grid size={6}>
                                                                    <FormControlLabel value="A" control={<Radio size="small" checked={field.value === "A"} />} label="Organismo adscrito" />
                                                                </Grid>
                                                                <Grid size={6}>
                                                                    <FormControlLabel value="C" control={<Radio size="small" checked={field.value === "C"} />} label="Cuentadante" />
                                                                </Grid>
                                                            </Grid>
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>

                            <Card className="mb-4">
                                <CardHeader className="bg-muted py-2 text-[#142F62]" title="Selección" />
                                <CardContent className="p-4">
                                    <Grid container spacing={2}>
                                        <Grid size={12}>
                                            <Grid container spacing={1}>
                                                {/* RCN Section */}
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                    <Label className="text-sm text-[#142F62]">RCN</Label>

                                                    <Box sx={{ mb: 1 }}>
                                                        <Controller
                                                            name="rnc"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                            )}
                                                        />
                                                    </Box>

                                                </Grid>

                                                {/* Vigencia de registro */}
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                    <Label className="text-sm text-[#142F62]">Vigencia de registro</Label>

                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <Controller
                                                            name="vigenciaRegistro"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <TextField {...field} type="date" size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                            )}
                                                        />
                                                    </Box>
                                                </Grid>

                                                {/* Auxiliar contable */}
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                    <Label className="text-sm text-[#142F62]">Auxiliar contable</Label>

                                                    <Controller
                                                        name="auxiliarContable"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                        )}
                                                    />
                                                </Grid>

                                                {/* Tipo Proveedor */}
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                    <Label className="text-sm text-[#142F62]">Tipo de proveedor</Label>
                                                    <ConditionalWrapper condition={lst_prov_loading} wrapper={SkeletonInput}>
                                                   
                                                   <Autocomplete
                                                       fullWidth
                                                       loading={lst_prov_loading}
               
                                                       size="small"
                                                       {...register("tipoprov", { required: "Tipo requerido" })}
                                                       options={
                                                           Array.isArray(lst_prov) ? lst_prov : []
                                                       }
                                                       getOptionLabel={(option) => option.descvalor.toString()}
                                                       renderInput={(params) => <TextField {...params} className=" border border-input bg-background" />}
                                                       value={
                                                           Array.isArray(lst_prov)
                                                               ? lst_prov.find((option) => option.valor === watch("tipoprov")) || null
                                                               : null
                                                       }
                                                       onChange={(_, newValue) => {
                                                        setValue("tipoprov", newValue?.valor || "");
                                                                                                                                                     
                                                       }}
                                                   />
                                               
                                               </ConditionalWrapper>
                                                </Grid>
                                                {/* Relación otros */}
                                                <Grid size={{ xs: 12, sm: 8 }}>

                                                    <FormControl component="fieldset">
                                                        <Label className="text-sm text-[#142F62]">Relacion otros</Label>

                                                        <Controller
                                                            name="condicionbenef"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <RadioGroup {...field} row>
                                                                    <FormControlLabel
                                                                        value="J"
                                                                        control={<Radio size="small" />}
                                                                        checked={field.value === "J"}
                                                                        label={<Typography variant="body2">Jubilado</Typography>}
                                                                    />
                                                                    <FormControlLabel
                                                                        value="P"
                                                                        checked={field.value === "P"}
                                                                        control={<Radio size="small" />}
                                                                        label={<Typography variant="body2">Pensionado</Typography>}
                                                                    />
                                                                    <FormControlLabel
                                                                        value="N"
                                                                        checked={field.value === "N"}
                                                                        control={<Radio size="small" />}
                                                                        label={<Typography variant="body2">Ninguno</Typography>}
                                                                    />
                                                                </RadioGroup>
                                                            )}
                                                        />
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

                                            <Controller
                                                name="direcfisica"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        multiline
                                                        rows={2}
                                                        size="small"
                                                        fullWidth
                                                        sx={{ backgroundColor: "white" }}
                                                    />
                                                )}
                                            />

                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Dir Postal</Label>

                                            <Controller
                                                name="direcpostal"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={8}>
                                            <Label className="text-sm text-[#142F62]">Ubicación Física</Label>

                                            <Grid container spacing={1}>
                                                <Grid size={4}>
                                                    <ConditionalWrapper condition={lst_ubic_geog_loading} wrapper={SkeletonInput}>
                                                   
                                                                                       <Autocomplete
                                                                                           fullWidth
                                                                                           loading={lst_ubic_geog_loading}
                                                   
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
                                              
                                                            <TextField disabled fullWidth value={codubicac} size="small" sx={{ backgroundColor: "white" }} />
                                                      
                                                    
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid size={12}>
                                            <Label className="text-sm text-[#142F62]">Observación</Label>

                                            <Controller
                                                name="observ"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        multiline
                                                        rows={2}
                                                        size="small"
                                                        fullWidth
                                                        sx={{ backgroundColor: "white" }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Right side */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Grid container spacing={1}>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Registró N°</Label>

                                            <Controller
                                                name="regestcont"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={8}>
                                            <Label className="text-sm text-[#142F62]">Teléfonos</Label>

                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Controller
                                                    name="telef1"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                    )}
                                                />
                                                <Controller
                                                    name="telef2"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Nro fax</Label>

                                            <Controller
                                                name="fax"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Email</Label>

                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={4}>
                                            <Label className="text-sm text-[#142F62]">Organismos adscrito</Label>

                                            <Controller
                                                name="orgadscritos"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth sx={{ backgroundColor: "white" }} />
                                                )}
                                            />
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

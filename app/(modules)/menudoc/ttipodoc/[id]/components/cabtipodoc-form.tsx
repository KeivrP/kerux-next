import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid2 as Grid, TextField } from "@mui/material";
import { ITipoSheet } from "../../ttipodc-types";
import { useQueryData } from "@/server/fetch-data";
import { Label } from "@/components/ui/label";
import { ConditionalWrapper } from "@/utils/main";
import { SkeletonInput } from "@/components/skeleton/detail";
import { useMemo } from "react";

interface ICabtipodocFormProps {
    isLoading: boolean;
    IsNew: boolean
}

export const CabtipodocForm = ({ isLoading, IsNew }: ICabtipodocFormProps) => {
    const { register, watch, setValue, control } = useFormContext<ITipoSheet>();


    const { data: lst_documentos, isLoading: isLoading_doc } = useQueryData({
        entity: "lst_tiposdoc",
        api: "doc",
        dependency: [isLoading],
    });

    const { data: lst_rutas, isLoading: isLoading_rutas } = useQueryData({
        entity: "lst_rutas",
        api: "doc",
        dependency: [isLoading],
    });

    const descruta = useMemo(() => {
        if (lst_rutas) {
            return lst_rutas.find((item: { codruta: string; descruta: string }) => item.codruta === watch("cabtipodoc.codruta"))?.descruta;
        }
        return "";
    }, [lst_rutas, watch("cabtipodoc.codruta")]);

    const desctipodocref = useMemo(() => {
        if (lst_documentos) {
            return lst_documentos.find((item: { tipodoc: string; desctipodoc: string }) => item.tipodoc === watch("cabtipodoc.tipodocref"))?.desctipodoc;
        }
        return "";
    }
        , [lst_documentos, watch("cabtipodoc.tipodocref")]);

    return (
        <Card className="mb-4">
            <CardHeader className="bg-muted py-2 text-[#142F62]" title="Tipos de Documentos" />
            <CardContent className="p-4">
                <Grid container spacing={2}>
                    <Grid size={10}>
                        <Label className="text-sm text-[#142F62]">Tipo de Documento</Label>
                        <Grid container spacing={1}>
                            <Grid size={4}>
                                <Controller
                                    name="cabtipodoc.tipodoc"
                                    control={control}
                                    rules={{ required: "Tipo requerido", maxLength: { value: 5, message: "Máximo 5 caracteres" } }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            disabled={!IsNew}
                                            {...field}
                                            fullWidth
                                            size="small"
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            className="border border-input bg-background"
                                            inputProps={{ style: { textTransform: "uppercase" } }}

                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={8}>
                                <ConditionalWrapper condition={isLoading_doc} wrapper={SkeletonInput}>
                                    <TextField {...register("cabtipodoc.desctipodoc")}
                                        fullWidth size="small" sx={{ backgroundColor: "white" }} />
                                </ConditionalWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={2} mt={3}>
                        <Controller
                            name="cabtipodoc.indactivo"
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
                    </Grid>
                    <Grid size={10}>
                        <Label className="text-sm text-[#142F62]">Código de la ruta</Label>
                        <Grid container spacing={1}>
                            <Grid size={4}>
                                <ConditionalWrapper condition={isLoading_rutas} wrapper={SkeletonInput}>
                                    <Autocomplete
                                        fullWidth
                                        loading={isLoading_rutas}
                                        size="small"
                                        {...register("cabtipodoc.codruta", { required: "Tipo requerido" })}
                                        options={
                                            Array.isArray(lst_rutas) ? lst_rutas : []
                                        }
                                        getOptionLabel={(option) => option.codruta.toString()}
                                        renderInput={(params) => <TextField {...params} className=" border border-input bg-background" />}
                                        value={
                                            Array.isArray(lst_rutas)
                                                ? lst_rutas.find((option) => option.codruta === watch("cabtipodoc.codruta")) || null
                                                : null
                                        }
                                        onChange={(_, newValue) => {
                                            setValue("cabtipodoc.codruta", newValue?.codruta || "");

                                        }}
                                    />
                                </ConditionalWrapper>
                            </Grid>
                            <Grid size={8}>
                                <ConditionalWrapper condition={isLoading_doc} wrapper={SkeletonInput}>
                                    <TextField value={descruta}
                                        disabled fullWidth size="small" sx={{ backgroundColor: "white" }} />
                                </ConditionalWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={2} mt={3}>
                        <Controller
                            name="cabtipodoc.indrefdoc"
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
                                    label="Ind. ref documento:"
                                />
                            )}
                        />
                    </Grid>
                    {watch("cabtipodoc.indrefdoc") === "S" && (
                        <>

                            <Grid size={12}>
                                <Label className="text-sm text-[#142F62]">Tipo doc referencia</Label>
                                <Grid container spacing={1}>
                                    <Grid size={3.35}>
                                        <ConditionalWrapper condition={isLoading_doc} wrapper={SkeletonInput}>
                                            <Autocomplete
                                                fullWidth
                                                loading={isLoading_doc}
                                                size="small"
                                                {...register("cabtipodoc.tipodocref")}
                                                options={
                                                    Array.isArray(lst_documentos) ? lst_documentos : []
                                                }
                                                getOptionLabel={(option) => option.tipodoc.toString()}
                                                renderInput={(params) => <TextField {...params} className=" border border-input bg-background" />}
                                                value={
                                                    Array.isArray(lst_documentos)
                                                        ? lst_documentos.find((option) => option.tipodoc === watch("cabtipodoc.tipodocref")) || null
                                                        : null
                                                }
                                                onChange={(_, newValue) => {
                                                    setValue("cabtipodoc.tipodocref", newValue?.tipodoc || "");

                                                }}
                                            />
                                        </ConditionalWrapper>
                                    </Grid>
                                    <Grid size={8.6}>
                                        <ConditionalWrapper condition={isLoading_doc} wrapper={SkeletonInput}>
                                            <TextField value={desctipodocref}
                                                disabled fullWidth size="small" sx={{ backgroundColor: "white" }} />
                                        </ConditionalWrapper>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </>
                    )}
                    <Grid size={12}>
                        <Label className="text-sm text-[#142F62]">Descripción interna</Label>
                        <TextField {...register("cabtipodoc.descprocint")} fullWidth size="small" />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
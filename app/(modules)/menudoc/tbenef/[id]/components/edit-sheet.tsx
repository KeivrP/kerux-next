import React, { useEffect, useState } from 'react';
import ModalDialog from '@/components/modal/modalDialog';
import ButtonForms from '@/components/button/buttonForms';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { ConditionalWrapper } from '@/utils/main';
import { useQueryData } from '@/server/fetch-data';
import { SkeletonInput } from '@/components/skeleton/detail';
import { useCreateRenglon, useUpdateRenglon } from '../../hook/useTcambios';
import { Rengcambio } from '../../tcambioss-types';
import SimpleBackdrop from '@/components/backdrop/backdrop';

interface HistoriaDocumentoProps {
    isOpen: boolean;
    onClose: () => void;
    data: Rengcambio;
    refetch: () => void;
    isNew?: boolean

}

const EditSheet = ({ isOpen, onClose, data, refetch, isNew = false }: HistoriaDocumentoProps) => {
    const { data: lst_porcmptos, isLoading: lst_porcimptos } = useQueryData({
        entity: "lst_porcimptos",
        dependency: [],
    });

    const [arrayLst, setarrayLst] = useState<any[]>([])

    const { data: lst_renglones, isLoading: lst_renglonesLoading } = useQueryData({
        entity: "list_renglones",
        enabled: isNew ? false : data?.idsolsum != 0 && data?.nrocambio != 0,
        params: { idsolsum: data?.idsolsum, nrocambio: data?.nrocambio },
        dependency: [data?.idsolsum, data?.nrocambio],
    });

    useEffect(() => {
        if (!Array.isArray(lst_renglones)) {
            console.log('lst_renglones is not an array:', lst_renglones);
            setarrayLst([]);

        } else {
            setarrayLst(lst_renglones);
        }
    }, [lst_renglones]);

    const { mutate, isSuccess, isPending } = useUpdateRenglon();
    const { mutate: create, isSuccess: iscreate, isPending: isprencreate } = useCreateRenglon();
    

    const { setValue, handleSubmit, register, control, watch } = useForm({
        defaultValues: {
            porcimptocamb: '',
            preciocambio: 0,
            coditem: '',
            descadiitem: '',
            unidbasica: '',
            cantsolcamb: '',
            porcimptoorig: '',
            precioorig: '',
            codserv: '',
            cantsolorig: '',
            nroreng: "",
            tiporeng: '',
            codigo: '',
            desccatg: '',
            descreng: '',
            stsrngsol: '',
            destino: '',
            cantsol: ''


        }
    });

    useEffect(() => {
        if (data) {
            setValue('porcimptocamb', data.porcimptocamb);
            setValue('preciocambio', Number(data.preciocambio));
            setValue('coditem', data.coditem);
            setValue('descadiitem', data.descadiitem);
            setValue('unidbasica', data.unidbasica);
            setValue('cantsolcamb', data.cantsolcamb);
            setValue('porcimptoorig', data.porcimptoorig);
            setValue('precioorig', data.precioorig);
            setValue('codserv', data.codserv);
            setValue('cantsolorig', data.cantsolorig);
            setValue('nroreng', data.nroreng.toString());

        }
    }, [data, setValue]);

    const onSubmit = (formData: any, event?: React.BaseSyntheticEvent) => {
        if (event) event.preventDefault(); // Evita comportamiento inesperado

        if(isNew){
            const rengcambioss = {
                idsolum: data?.idsolsum,
                nrocambio: data?.nrocambio,
                nroreng: formData.nroreng,
                tiporeng: formData.tiporeng,
                codigo: formData.codigo,
                coditem: formData.coditem,
                codserv: formData.codserv,
                descreng: formData.descreng,
                unidbasica: formData.unidbasica,
                cantsol: formData.cantsol,
                destino: formData.destino,
                stsrngsol: formData.stsrngsol,
                preciocambio: formData.preciocambio,
                porcimptocamb: formData.porcimptocamb,
                desccatg: formData.desccatg
            };
    
            create({ data: rengcambioss }); // Envía los datos al backend
        } else {

        const rengcambioss = {
            rengcambioss: {
                coditem: formData.coditem,
                codserv: formData.codserv,
                descadiitem: formData.descadiitem,
                unidbasica: formData.unidbasica,
                cantsolorig: Number(formData.cantsolorig),
                cantsolcamb: formData.cantsolcamb,
                precioorig: formData.precioorig,
                preciocambio: formData.preciocambio,
                porcimptoorig: formData.porcimptoorig,
                porcimptocamb: formData.porcimptocamb
            },
        };

        mutate({ idsolsum: data.idsolsum.toString(), nrocambio: data.nrocambio.toString(), nroreng: data.nroreng.toString(), data: rengcambioss }); // Envía los datos al backend
    }
    };

    useEffect(() => {
        if (isSuccess || iscreate) {
            onClose();
            refetch()
        }
    }, [isSuccess, iscreate])

    return (
        <>

            <ModalDialog
                width="md"
                title={`Renglon - ${data?.nroreng}`}
                dialogOpen={isOpen}
                handleClose={onClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-end mr-5'>
                        <ButtonForms variant="contained" color="primary" type="submit">
                            Guardar
                        </ButtonForms>
                    </div>

                    <Grid container spacing={2} padding={2}>
                        {isNew && (
                            <Grid size={12}>
                                <Typography variant="h3" color="primary" mb={2}>
                                    Cambio Agregar
                                </Typography>
                                <ConditionalWrapper condition={lst_porcimptos} wrapper={SkeletonInput}>
                                    <Controller
                                        name="nroreng"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                fullWidth
                                                size="small"
                                                options={Array.isArray(arrayLst) ? arrayLst : []}
                                                getOptionLabel={(option: any) => `${option.nroreng} - ${option.descreng}`}
                                                value={arrayLst?.find((option: { nroreng: string }) => option.nroreng === watch('nroreng')) || null}
                                                onChange={(_, newValue) => {
                                                    setValue('nroreng', newValue.nroreng);
                                                    setValue('tiporeng', newValue.tiporeng);
                                                    setValue('codigo', newValue.codigo);
                                                    setValue('desccatg', newValue.desccatg);
                                                    setValue('coditem', newValue.coditem);
                                                    setValue('codserv', newValue.codserv);
                                                    setValue('descreng', newValue.descreng);
                                                    setValue('unidbasica', newValue.unidbasica);
                                                    setValue('cantsol', newValue.cantsol);
                                                    setValue('destino', newValue.destino);
                                                    setValue('stsrngsol', newValue.stsrngsol);
                                                    setValue('preciocambio', newValue.preciocambio);
                                                    setValue('porcimptocamb', newValue.porcimptocamb);

                                                }
                                                }
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        )}
                                    />
                                </ConditionalWrapper>
                            </Grid>
                        )}
                        <Grid size={6}>
                            <Typography variant="h3" color="primary" mb={2}>
                                Nuevo %
                            </Typography>
                            <ConditionalWrapper condition={lst_porcimptos} wrapper={SkeletonInput}>
                                <Controller
                                    name="porcimptocamb"
                                    control={control}
                                    rules={{ required: "Item requerido" }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            fullWidth
                                            size="small"
                                            options={Array.isArray(lst_porcmptos) ? lst_porcmptos : []}
                                            getOptionLabel={(option: any) => option.desccatg}
                                            value={lst_porcmptos?.find((option: { porccat: string }) => option.porccat === watch('porcimptocamb')) || null}
                                            onChange={(_, newValue) => setValue("porcimptocamb", newValue ? newValue.porccat : "")}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    )}
                                />
                            </ConditionalWrapper>
                        </Grid>

                        <Grid size={6}>
                            <Typography variant="h3" color="primary">
                                Nuevo Costo Unitario
                            </Typography>
                            <ConditionalWrapper condition={lst_porcimptos} wrapper={SkeletonInput}>
                                <TextField
                                    id="preciocambio"
                                    {...register("preciocambio", {
                                        required: "Cantidad requerida",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Solo se permiten números",
                                        },
                                    })}
                                    size="small"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                />
                            </ConditionalWrapper>
                        </Grid>
                    </Grid>
                </form>
            </ModalDialog>
            <SimpleBackdrop show={isPending || isprencreate} />
        </>
    );
};

export default EditSheet;

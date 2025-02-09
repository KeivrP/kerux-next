import React, { useEffect } from 'react';
import ModalDialog from '@/components/modal/modalDialog';
import ButtonForms from '@/components/button/buttonForms';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { ConditionalWrapper } from '@/utils/main';
import { useQueryData } from '@/server/fetch-data';
import { SkeletonInput } from '@/components/skeleton/detail';
import { useUpdateRenglon } from '../../hook/useTcambios';
import { Rengcambio } from '../../tcambioss-types';
import SimpleBackdrop from '@/components/backdrop/backdrop';

interface HistoriaDocumentoProps {
    isOpen: boolean;
    onClose: () => void;
    data: Rengcambio;
    refetch: () => void;
}

const EditSheet = ({ isOpen, onClose, data, refetch }: HistoriaDocumentoProps) => {
    const { data: lst_porcmptos, isLoading: lst_porcimptos } = useQueryData({
        entity: "lst_porcimptos",
        dependency: [],
    });

    const { mutate, isSuccess, isPending } = useUpdateRenglon();

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
            nroreng: 0
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
            setValue('nroreng', data.nroreng);

        }
    }, [data, setValue]);

    const onSubmit = (formData: any, event?: React.BaseSyntheticEvent) => {
        if (event) event.preventDefault(); // Evita comportamiento inesperado

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

    };

    useEffect(() => {
        if (isSuccess) {
            onClose();
            refetch()
        }
    }, [isSuccess])

    return (
        <>

            <ModalDialog
                width="md"
                title={`Renglon - ${data?.idsolsum}`}
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
            <SimpleBackdrop show={isPending} />
        </>
    );
};

export default EditSheet;

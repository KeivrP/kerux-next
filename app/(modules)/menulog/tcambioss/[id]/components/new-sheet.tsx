import React, { useEffect } from 'react';
import ModalDialog from '@/components/modal/modalDialog';
import ButtonForms from '@/components/button/buttonForms';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { ConditionalWrapper } from '@/utils/main';
import { useQueryData } from '@/server/fetch-data';
import { SkeletonInput } from '@/components/skeleton/detail';
import { useCreateRenglon } from '../../hook/useTcambios';
import SimpleBackdrop from '@/components/backdrop/backdrop';

interface HistoriaDocumentoProps {
    isOpen: boolean;
    onClose: () => void;
    idsolsum: number
    nrocambio: number
    refetch: () => void;
}

const NewSheet = ({ isOpen, onClose, refetch, idsolsum, nrocambio }: HistoriaDocumentoProps) => {

    const { data: lst_renglones, isLoading: lst_porcimptos } = useQueryData({
        entity: "list_renglones",
        enabled: idsolsum != 0 && nrocambio != 0,
        params: { idsolsum, nrocambio },
        dependency: [idsolsum, nrocambio],
    });

    const { mutate, isSuccess, isPending } = useCreateRenglon();

    const { setValue, handleSubmit, control, watch } = useForm({
        defaultValues: {
            nroreng: "",
            tiporeng: "",
            codigo: "",
            coditem: "",
            codserv: "",
            descreng: "",
            unidbasica: "",
            cantsol: "",
            destino: "",
            stsrngsol: "",
            preciocambio: "",
            porcimptocamb: "",
            desccatg: ""
        }
    });

    const onSubmit = (formData: any, event?: React.BaseSyntheticEvent) => {
        if (event) event.preventDefault(); // Evita comportamiento inesperado

        const rengcambioss = {
            idsolsum,
            nrocambio,
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

        mutate({ data: rengcambioss }); // Envía los datos al backend

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
                title={`Renglon - ${nrocambio}`}
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
                                            options={Array.isArray(lst_renglones) ? lst_renglones : []}
                                            getOptionLabel={(option: any) => `${option.nroreng} - ${option.descreng}` }
                                            value={lst_renglones?.find((option: { nroreng: string }) => option.nroreng === watch('nroreng')) || null}
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


                    </Grid>
                </form>
            </ModalDialog>
            <SimpleBackdrop show={isPending} />
        </>
    );
};

export default NewSheet;

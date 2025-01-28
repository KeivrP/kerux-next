import React, { } from 'react';
import ModalDialog from '@/components/modal/modalDialog';
import ButtonForms from '@/components/button/buttonForms';
import { Controller, useForm } from 'react-hook-form';

interface HistoriaDocumentoProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const EditSheet = ({ isOpen, onClose, id }: HistoriaDocumentoProps) => {

    const { control, handleSubmit } = useForm({
        defaultValues: {
            porcimptocambios: '',
            preciocambio: '',
            coditem: '',
            descadiitem: '',
            unidbasica: '',
            cantsolcamb: '',
            porcimptoorig: '',
            precioorig: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };


    return (
        <ModalDialog
            width="md"
            title='Historia del Documento'
            dialogOpen={isOpen}
            handleClose={() => onClose()}
        >
            <div className='flex justify-end mr-5'>

                <ButtonForms color="secondary">
                    Guardar



                </ButtonForms>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col space-y-4'>
        
                    <Controller
                        name="porcimptocambios"
                        control={control}
                        render={({ field }) => <input {...field} placeholder="% Cambio" />}
                    />
                    <Controller
                        name="preciocambio"
                        control={control}
                        render={({ field }) => <input {...field} placeholder="Nuevo costo unitario" />}
                    />
                </div>
                <div className='flex justify-end mr-5 mt-4'>
                    <ButtonForms color="secondary" type="submit">
                        Guardar
                    </ButtonForms>
                </div>
            </form>
        </ModalDialog>
    );
};

export default EditSheet;

import { useForm } from 'react-hook-form';
import { initialState } from './hcdocorg-utils';
import { useEffect } from 'react';

export const useHcdocorgForm = () => {
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: initialState,
    });

    const formValues = watch();

    useEffect(() => {
        console.log('Valores del formulario:', formValues);
    }, [formValues]);

    return {
        control,
        handleSubmit,
        setValue,
    };
};


import { useForm } from 'react-hook-form';
import { initialState } from './hcdocorg-utils';

export const useHcdocorgForm = () => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: initialState,
    });

    return {
        control,
        handleSubmit,
        setValue,
    };
};
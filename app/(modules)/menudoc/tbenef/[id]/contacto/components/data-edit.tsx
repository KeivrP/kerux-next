import ModalDialog from '@/components/modal/modalDialog';
import React, { useEffect } from 'react';
import { Tcontactos } from './table'; // Ensure Tcontactos is correctly defined in './table'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Grid2 as Grid, TextField } from '@mui/material';
import { Label } from '@/components/ui/label';
import ButtonForms from '@/components/button/buttonForms';
import SimpleBackdrop from '@/components/backdrop/backdrop';
import { useCreateContacto, useUpdateContacto } from '../hook/useContacto';

interface DataEditProps {
  dialogOpen: boolean;
  handleClose: () => void;
  row: Tcontactos | null;
}

const DataEdit = ({ dialogOpen, handleClose, row }: DataEditProps) => {
  const initialData: Tcontactos = {
    apellido: '',
    cargo: '',
    cedula: '',
    email: '',
    idcontacto: 0,
    nombre: '',
    numbenef: 0,
    telefono: '',
    tipocontacto: '',
  };

  const methods = useForm<Tcontactos>({
    defaultValues: initialData, // Use initialData for default values
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (row) {
      reset(row); // Use reset for setting form values
    } else {
      reset(initialData); // Clear the form for new contact
    }
  }, [row, reset]);

const { mutate: create, isPending: isCreating, isSuccess: isSc } = useCreateContacto();
const { mutate: update, isPending: isUpdating, isSuccess: isUp } = useUpdateContacto();

  const onSubmit = (data: Tcontactos) => {
    if (row) {
      update({id: row.idcontacto, data}); // Update the contact
    }else{
    create(data); // Create a new contact
    }
  };

  useEffect(() => {
    if (isSc || isUp) {
      handleClose(); // Close the dialog on success
    }
  }
  , [isSc, isUp]);

  return (
    <ModalDialog
      width="sm"
      title={row ? `Editar contacto ${row.nombre} ${row.apellido}` : 'Nuevo contacto'}
      dialogOpen={dialogOpen}
      handleClose={handleClose}
      >
     <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingRight: '1rem' }}>
            <ButtonForms type="submit" variant="contained" color="primary" size="large" sx={{ width: 100 }}>
              Guardar
            </ButtonForms>
          </div>
          <Grid container spacing={2} sx={{ paddingX: '1rem' }}>
            <Grid size={6}> 
              <Label className="text-sm text-[#142F62]">Nombre</Label>
              <TextField
                {...methods.register('nombre')}
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.nombre}
                helperText={methods.formState.errors.nombre?.message}
              />
            </Grid>
            <Grid size={6}> 
              <Label className="text-sm text-[#142F62]">Apellido</Label>
              <TextField
                {...methods.register('apellido')}
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.apellido}
                helperText={methods.formState.errors.apellido?.message}
              />
            </Grid>
            <Grid size={6}> 
              <Label className="text-sm text-[#142F62]">Cédula</Label>
              <TextField
                {...methods.register('cedula')}
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.cedula}
                helperText={methods.formState.errors.cedula?.message}
              />
            </Grid>
            <Grid size={6}> 
              <Label className="text-sm text-[#142F62]">Tipo de contacto</Label>
              <TextField 
                select
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.tipocontacto}
                helperText={methods.formState.errors.tipocontacto?.message}
                SelectProps={{
                  native: true,
                }}
                {...methods.register('tipocontacto')}
              >
                <option value="EMP">Empleado</option>
                <option value="ACC">Accionista</option>
                <option value="OTR">Otro</option>
              </TextField>
            </Grid>
            <Grid size={6}> 
              <Label className="text-sm text-[#142F62]">Email</Label>
              <TextField
                {...methods.register('email')}
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.email}
                helperText={methods.formState.errors.email?.message}
              />
            </Grid>
            <Grid size={6}> 
              <Label className="text-sm text-[#142F62]">Teléfono</Label>
              <TextField
                {...methods.register('telefono')}
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.telefono}
                helperText={methods.formState.errors.telefono?.message}
              />
            </Grid>
            <Grid size={12}> 
              <Label className="text-sm text-[#142F62]">Cargo</Label>
              <TextField
                {...methods.register('cargo')}
                fullWidth
                variant="outlined"
                size="small"
                error={!!methods.formState.errors.cargo}
                helperText={methods.formState.errors.cargo?.message}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <SimpleBackdrop show={isCreating || isUpdating} />
    </ModalDialog>
  );
};

export default DataEdit;
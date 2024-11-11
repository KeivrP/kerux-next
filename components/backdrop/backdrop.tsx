import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Loader from './loader';

interface SimpleBackdropProps {
  show: boolean;
}

export default function SimpleBackdrop({ show }: SimpleBackdropProps) {


  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={show}
      >
      <Loader/>
      </Backdrop>
    </div>
  );
}

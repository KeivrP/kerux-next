import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
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

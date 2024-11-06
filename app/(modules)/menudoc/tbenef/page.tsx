import React, { Suspense } from 'react';
import { TbenefTable } from './components/table';
import { Container } from '@mui/material';
import Breadcrumbs from '@/components/ui/breadcumbs';

const TbenefPage = () => {

    return (
        <Container maxWidth="2xl">
            <Suspense fallback={<div>Loading...</div>}>
            <Breadcrumbs/>
                <TbenefTable/>
            </Suspense>
        </Container>
    );
};

export default TbenefPage;
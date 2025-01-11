'use client'

import { Suspense } from 'react'

import Loader from '@/components/backdrop/loader'

export default function ConfiguracionPerfil() {


  return (
    <Suspense fallback={<Loader />}>

    </Suspense>
  );
}


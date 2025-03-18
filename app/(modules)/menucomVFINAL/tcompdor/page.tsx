import React, { Suspense } from 'react'
import { Tcompdor } from './components/table'
import { Breadcrumbs, Container } from '@mui/material'
import Loader from '@/components/backdrop/loader'

const page = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <Container maxWidth="xl">
      <Breadcrumbs />
    <Tcompdor/>
    </Container>
  </Suspense>
  )
}

export default page
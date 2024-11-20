import Loader from '@/components/backdrop/loader'
import Breadcrumbs from '@/components/breadcrumbs/breadcumbs'
import { Container } from '@mui/material'
import React, { Suspense } from 'react'
import { TundsTable } from './components/table'

const page = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <Container maxWidth="xl">
      <Breadcrumbs />
      <TundsTable/>
    </Container>
  </Suspense>
  )
}

export default page
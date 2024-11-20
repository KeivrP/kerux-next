import Breadcrumbs from '@/components/breadcrumbs/breadcumbs'
import { Container } from '@mui/material'
import React, { Suspense } from 'react'
import { Tcoleti } from './components/table'
import Loader from '@/components/backdrop/loader'

const page = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <Container maxWidth="xl">
      <Breadcrumbs />
      <Tcoleti/>
    </Container>
  </Suspense>
  )
}

export default page
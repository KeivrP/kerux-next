'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { PasoRutas } from '../trutas-types';
import { useQueryData } from '@/server/fetch-data';
import { Container } from '@mui/material';
import Breadcrumbs from '@/components/breadcrumbs/breadcumbs';
import TextDivider from '@/components/ui/textDivider';
import { Input } from '@/components/ui/input';
import { FrutasTable } from './components/table';


export default function TrutasPage() {
  const params = useParams()
  const { id } = params
  const [rows, setRows] = useState<PasoRutas[]>([]);
  const [ruta, setRuta] = useState<{ codruta: string; descruta: string }>({
    codruta: "",
    descruta: "",
  });

  console.log(params.id);

  const { data, isLoading, refetch } = useQueryData({
    entity: "pasos_rutas",
    api: "doc",
    type: id as string,
    dependency: [id],
  });

  useEffect(() => {
    setRows(data?.pasosruta || []);
    setRuta(data?.ruta || { codruta: "", descruta: "" });
  }, [data]);

  return (
    <>

      <Container maxWidth="xl">
        <Breadcrumbs />
        <div className="p-6 flex flex-col gap-4">
          <div>
            <TextDivider>Codigo de la Ruta</TextDivider>
          </div>
          <div className="flex-1">
            <Input defaultValue={`${ruta.codruta}`} disabled />
          </div>
          <div className="flex-5">
            <Input defaultValue={`${ruta.descruta}`} disabled />
          </div>
          <div>
            <TextDivider>Pasos de la Ruta</TextDivider>
          </div>
          <div>
            <FrutasTable
              id={ruta.codruta}
              rows={rows}
              refetch={refetch}
              setRows={setRows}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Container>
    </>
  )

}
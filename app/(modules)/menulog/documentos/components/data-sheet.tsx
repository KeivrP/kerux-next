import React, { useEffect, useState } from 'react';
import {
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  useTheme,
} from '@mui/material';
import ModalDialog from '@/components/modal/modalDialog';
import BadgeModule from '@/components/badge/badge-mod';
import { ConditionalWrapper, formatDate } from '@/utils/main';
import ButtonForms from '@/components/button/buttonForms';
import { BaseTable } from '@/components/table-material/genericTable';
import { columnsHeadersSheet } from './header-table';
import { useQueryData } from '@/server/fetch-data';
import { Cabiddoc, Detstsdoc, DocuemtosRoot } from '../doc-types';
import { SkeletonInput } from '@/components/skeleton/detail';
import { Input, Textarea } from '@/components/ui/input';
import { BadgeTipoComp } from '@/components/badge/badge-estatus';

interface HistoriaDocumentoProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const HistoriaDocumento = ({ isOpen, onClose, id }: HistoriaDocumentoProps) => {
  const [rows, setRoiws] = useState<DocuemtosRoot>()
  const [cabecera, setCabecera] = useState<Cabiddoc>()

  const { data, isLoading } = useQueryData({
    entity: "hdoc",
    dependency: [id],
    type: `${id}`
  });

  useEffect(() => {
    if (data) {
      setRoiws(data)
      setCabecera(data.cabiddoc[0])
    }
  }, [data])
  const theme = useTheme();
  return (
    <ModalDialog
      width="md"
      title='Historia del Documento'
      dialogOpen={isOpen}
      handleClose={() => onClose()}
    >
      <div className='flex justify-end mr-5'>

        <ButtonForms variant="contained" color="primary" sx={{ mr: 2 }}>
          Solicitud
        </ButtonForms>
        <ButtonForms color="secondary">
          Mensaje
        </ButtonForms>
      </div>
      <Grid container spacing={4} padding={2}>

        {/* Información principal del documento */}
        <Card className="">
          <CardHeader className="bg-muted py-2 text-[#142F62]" title="Información del Documento" />
          <CardContent className="p-4">
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  ID Doc
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'
                    
                    disabled
                    defaultValue={cabecera?.iddoc}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Tipo
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'
                    
                    disabled
                    defaultValue={cabecera?.tipodoc}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={8} mt={2.5}>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'
                    
                    disabled
                    defaultValue={cabecera?.descdoc}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={6}>
                <Typography variant="h3" color="primary" >
                  Descripción Extendida
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Textarea
                    className='bg-muted'
                    
                    disabled
                    defaultValue={cabecera?.descdocext}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Referencia
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'
                    
                    disabled
                    defaultValue={cabecera?.refdoc}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Fecha de Emisión
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'
                    
                    disabled
                    defaultValue={formatDate(cabecera?.fecdoc ?? '')}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Origen
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <BadgeModule codmenu={cabecera?.origen!} />
                </ConditionalWrapper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* Situación actual */}
        <Grid size={12} >
          <Card style={{ backgroundColor: '#f1f5f9' }} className="bg-muted">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Typography variant="h3" color="primary" >
                    Situación actual
                  </Typography>
                  <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                    <div className="text-sm">Recibido por {cabecera?.maximo_evento?.CodSisDest?.descripcion ?? ""} desde {formatDate(cabecera?.maximo_evento?.fecevento!)} </div>
                  </ConditionalWrapper>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Historial del documento */}
        <Grid size={12}>
          <Card className="">
            <CardHeader className="bg-muted py-2 text-[#142F62]" title="Historial del Documento" />
            <CardContent className="">
              <div
                style={{
                  height: "25vh",
                  width: "100%",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <BaseTable
                  loading={false}
                  rows={rows?.detstsdoc || []}
                  headers={columnsHeadersSheet}
                  collapsible={{
                    visible: (row: Detstsdoc) => [
                      { content: row.idsts, align: "center" },
                      { content: <BadgeTipoComp tipo={row.stsant!}/>, align: "center" },
                      { content: <BadgeTipoComp tipo={row.stsdoc} />, align: "center" },
                      { content: formatDate(row.fecsts), align: "center" },
                      { content: row.ususts, align: "left" },

                    ],

                    collapsed: () => [],
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ModalDialog>
  );
};

export default HistoriaDocumento;

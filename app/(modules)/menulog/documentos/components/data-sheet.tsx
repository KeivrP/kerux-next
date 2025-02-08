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
import { ConditionalWrapper, formatCurrency, formatDate } from '@/utils/main';
import ButtonForms from '@/components/button/buttonForms';
import { BaseTable } from '@/components/table-material/genericTable';
import { columnsHeadersSheet } from './header-table';
import { useQueryData } from '@/server/fetch-data';
import { Cabiddoc, Detstsdoc, DocuemtosRoot } from '../doc-types';
import { SkeletonInput } from '@/components/skeleton/detail';
import { Input, Textarea } from '@/components/ui/input';
import { BadgeTipoComp } from '@/components/badge/badge-estatus';
import { BadgeAct } from '@/components/badge/badge-act';
import { BadgeTipoEven } from '@/components/badge/badge-log';
import { Box } from '@mui/material';
import { EraserIcon, RouteIcon } from 'lucide-react';

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

      <div className='flex justify-between items-center px-5'>
        <span className='flex items-center'>
          <RouteIcon />
          <Typography variant="body2" style={{ marginLeft: "8px", marginRight: '8px', color: theme.palette.primary.main }}>
            Id Doc. {cabecera?.iddoc}
          </Typography>
        </span>

        <ButtonForms variant="contained" color="primary" sx={{ mr: 2 }}>
          Solicitud
        </ButtonForms>

      </div>
      <Grid container spacing={2} padding={2}>

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
              <Grid size={5} mt={2.5}>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'

                    disabled
                    defaultValue={cabecera?.TipoDocumento.desctipodoc}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={1}>
                <Typography variant="h3" color="primary" >
                  Reverso?
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <BadgeAct status={cabecera?.indreverso as "S" | "N"} />

                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Estatus
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <BadgeTipoEven tipo={cabecera?.stsdoc} />

                </ConditionalWrapper>
              </Grid>
              <Grid size={12}>
                <Typography variant="h3" color="primary" >
                  Descripción
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'

                    disabled
                    defaultValue={cabecera?.descdoc}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={12}>
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
                    defaultValue={formatDate(cabecera?.fecdoc!)}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Doc Referecia
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'

                    disabled
                    defaultValue={cabecera?.iddocres}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={2}>
                <Typography variant="h3" color="primary" >
                  Monto
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <Input
                    className='bg-muted'
                    disabled
                    defaultValue={formatCurrency(cabecera?.mtodoc ?? "0")}
                  />
                </ConditionalWrapper>
              </Grid>
              <Grid size={1}>
                <Typography variant="h3" color="primary" >
                  Origen
                </Typography>
                <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
                  <BadgeModule codmenu={cabecera?.origen!} />
                </ConditionalWrapper>
              </Grid>
              <Grid size={12}>
                {cabecera?.mensaje &&
                  <Box sx={{ bgcolor: theme.palette.pending.light, padding: 1, borderRadius: 1 }}>
                    <Typography>
                      <b>Mensaje:</b> {cabecera?.mensaje}
                    </Typography>
                  </Box>}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* Historial del documento */}
        <Grid size={12}>
          <Card className="">
            <CardHeader className="bg-muted py-2 text-[#142F62]" title="Historial del Documento" />
            <CardContent className="">
            <Typography
            color={theme.palette.primary.dark}
            style={{ textTransform: "capitalize", fontWeight: 600 }}
          >
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              <EraserIcon />
            </div>
            <div style={{ display: "inline-block", marginLeft: 5 }}>
              El Documento esta {cabecera?.maximo_evento.descstsevento ?? ""} por {cabecera?.maximo_evento?.CodSisDest?.descripcion ?? ""} desde {formatDate(cabecera?.maximo_evento?.fecevento!)}
            </div>
          </Typography>

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
                      { content: <BadgeTipoComp tipo={row.stsant!} />, align: "center" },
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

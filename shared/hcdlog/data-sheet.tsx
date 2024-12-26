import React from 'react';
import {
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Chip,
  Stack,
  Button,
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import ModalDialog from '@/components/modal/modalDialog';
import TextDivider from '@/components/ui/textDivider';
import { BadgeDest } from '@/components/badge/badge-dest';
import BadgeModule from '@/components/badge/badge-mod';
import { formatDate } from '@/utils/main';
import { motion } from 'framer-motion';
import ButtonForms from '@/components/button/buttonForms';
import { ArrowDownIcon, ArrowDownLeftSquare, ArrowDownLeftSquareIcon, ExpandIcon } from 'lucide-react';

interface HistoriaDocumentoProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const MotionPaper = motion(Paper);


const HistoriaDocumento = ({ isOpen, onClose }: HistoriaDocumentoProps) => {
  // Datos de ejemplo
  const datosDocumento = {
    id: 7,
    tipo: 'SM002',
    descripcion: 'SOLICITUD DE COMPRA DIRECTA',
    descripcionExtendida: 'SOLICITUD DE COMPRA DE ARCHIVADOR',
    referencia: 'SS2',
    fechaEmision: '05/03/2004',
    docReferencia: '',
    origen: 'LOGI',
    areaOrigen: 'LOGÍSTICA',
    monto: 0.0,
    situacionActual: {
      estado: 'COMP',
      desde: '02/02/2007',
    },
    historial: [
      {
        id: 2,
        estadoAnterior: 'GEN',
        estadoActual: 'GEN',
        descripcionEstado: 'Generado',
        fecha: '05/03/2004',
        usuario: 'LOG',
      },
      {
        id: 4905,
        estadoAnterior: 'GEN',
        estadoActual: 'GEN',
        descripcionEstado: 'Generado',
        fecha: '02/02/2007',
        usuario: 'LOG',
      },
    ],
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 120 },
    }),
  };

  return (
    <ModalDialog
      width="md"
      title='Historia del Documento'
      dialogOpen={isOpen}
      handleClose={() => onClose(false)}
    >
      <Grid container spacing={4} padding={2}>

        {/* Información principal del documento */}
        <Grid size={12}>
          <Card>
            <Grid size={12} sx={{ textAlign: 'right', mb: -2 }}>
              <ButtonForms variant="contained" color="primary" sx={{ mr: 2 }}>
                Solicitud
              </ButtonForms>
              <ButtonForms color="secondary">
                Mensaje
              </ButtonForms>
            </Grid>
            <CardContent>
              <TextDivider >
                Información del Documento
              </TextDivider>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={2}>
                  <Typography variant="h3" color="primary" >
                    ID Doc
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    disabled
                    defaultValue={datosDocumento.id}
                  />
                </Grid>
                <Grid size={2}>
                  <Typography variant="h3" color="primary" >
                    Tipo
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    disabled
                    defaultValue={datosDocumento.tipo}
                  />
                </Grid>
                <Grid size={8} mt={2.5}>
                  <TextField
                    size="small"
                    fullWidth
                    disabled
                    defaultValue={datosDocumento.descripcion}
                  />

                </Grid>
                <Grid size={12}>
                  <Typography variant="h3" color="primary" >
                    Descripción Extendida
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    disabled
                    defaultValue={datosDocumento.descripcionExtendida}
                  />
                </Grid>
                <Grid size={4}>
                  <Typography variant="h3" color="primary" >
                    Referencia                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    disabled
                    defaultValue={datosDocumento.referencia}
                  />
                </Grid>
                <Grid size={4}>
                  <Typography variant="h3" color="primary" >
                    Fecha de Emisión                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    disabled
                    defaultValue={datosDocumento.fechaEmision}
                  />
                </Grid>
                <Grid size={4}>
                  <Typography variant="h3" color="primary" >
                    Origen
                  </Typography>
                  <BadgeModule codmenu={datosDocumento.origen} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Situación actual */}
        <Grid size={12} >
          <Card>
            <CardContent>
              <TextDivider>
                Situación Actual
              </TextDivider>
              <Stack direction="row" spacing={2} mt={2} alignItems="center">
                <Typography variant="body1">
                  Recibido por
                </Typography>
                <BadgeModule codmenu={datosDocumento.situacionActual.estado} />
                <Chip
                  label={`Desde: ${formatDate(datosDocumento.situacionActual.desde)}`}
                  color="secondary"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Historial del documento */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <TextDivider
              >
                Historial del Documento
              </TextDivider>

              {datosDocumento.historial.map((item) => (
      <Accordion key={item.id} sx={{ mb: 2, borderRadius: 2 }}>
        <AccordionSummary
                  expandIcon={<ArrowDownLeftSquareIcon />}

          sx={{ backgroundColor: '#f5f5f5', borderLeft: '4px solid #1976d2' }}
        >
          <Typography variant="body1" sx={{ flexBasis: '15%', flexShrink: 0 }}>
            <strong>ID de sts.:</strong> {item.id}
          </Typography>
          <Typography variant="body1">
            <strong>Estado:</strong> {item.descripcionEstado}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f9f9f9', p: 2 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>Fecha:</strong> {item.fecha}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Usuario:</strong> {item.usuario}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Chip
              label={`Estado Anterior: ${item.estadoAnterior}`}
              variant="outlined"
              color="primary"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ModalDialog>
  );
};

export default HistoriaDocumento;

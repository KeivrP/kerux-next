'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, Chip, Divider, Grid2 as Grid, Paper, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import ModalDialog from "@/components/modal/modalDialog";
import { useQueryData } from "@/server/fetch-data";
import { formatCurrency, formatDate } from "@/utils/main";
import { Search, Table } from "lucide-react";
import { Box } from "@mui/material";
import { columnsHeadersSheet } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";

interface DataSheetProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    row: number,
}

export default function DataSheet({
    isOpen,
    onClose,
    row,
}: DataSheetProps): JSX.Element {
    const { data, isLoading } = useQueryData({
        entity: "show_rng",
        dependency: [row],
        params: {
            idsolsum: row,
            nrocambio : 1
        },
    });


    const [selectedMovement, setSelectedMovement] = useState(null);

    // Ejemplos de datos con la estructura real
    const movementsData = {
        cambiolist: [
            {
                idsolsum: 9507,
                nrocambio: 1,
                feccambio: "2024-10-20",
                desccambio: "CAMBIO A LA SOLICITUD DE SUMINISTRO",
                iddocaum: null,
                stscamb: "PEN",
                codmoneda: null,
                mtonetocambio: "0.0",
                mtoimptocambio: "0.0",
                mtototalcambio: "0.0",
                usuing: "YLOPEZ"
            },
            {
                idsolsum: 95047,
                nrocambio: 1,
                feccambio: "2024-10-20",
                desccambio: "CAMBIO A LA SOLICITUD DE SUMINISTRO",
                iddocaum: null,
                stscamb: "PEN",
                codmoneda: null,
                mtonetocambio: "0.0",
                mtoimptocambio: "0.0",
                mtototalcambio: "0.0",
                usuing: "YLOPEZ"
            },
           
        ],
        total: 1,
        maxPage: 1
    };

    const detailsData = {
        rnglist: [
            {
                idsolsum: 9507,
                nrocambio: 1,
                nroreng: 1,
                tiporeng: "MT",
                codigo: "000010-3",
                coditem: "000010-3",
                descreng: "TELEFONO , MODELO INALAMBRICO",
                unidbasica: "UND",
                cantsolorig: "10.0",
                precioorig: "150.0",
                preciocambio: "200.0",
                porcimptoorig: "0.0",
                porcimptocamb: "16.0",
                mtototreng: 2000,
                destino: "COMP",
                stsrngsol: "GEN",
                codcta: 402050100,
                desccta: "Pulpa de madera, papel y cartón",
                codmoneda: "VEF",
                fecultcom: "2013-05-20T16:33:27.000Z"
            }
        ]
    };



    return (
        <>
            <ModalDialog
                width="xl"
                title={row ? `Editar Tipo de Documento ${row}` : "Crear nuevo Tipo de Documento"}
                dialogOpen={isOpen}
                handleClose={() => onClose(false)}
            >
                <Grid container spacing={3} padding={2}>

                    <Grid size={12}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Buscar movimientos..."
                                        variant="outlined"
                                        size="small"
                                        slotProps={{
                                            input: {
                                                startAdornment: <Search style={{ color: 'text.secondary', marginRight: 1 }} />
                                            }
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Total: {movementsData.total} registros
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>


                    {/* Main Content */}
                    <Grid size={12}>

                        <Grid container spacing={3}>
                            {/* Movements List */}
                            <Grid size={{ xs: 12, }}>
                                <Card>
                                    <CardHeader
                                        title="Movimientos de Cambio"
                                        titleTypographyProps={{ variant: 'h5' }}
                                    />
                                    <Divider />
                                    <CardContent sx={{ p: 0, maxHeight: '20vh', overflowY: 'auto' }}>
                                    {movementsData.cambiolist.map((movement) => (
                                            <Box
                                                key={`${movement.idsolsum}-${movement.nrocambio}`}
                                                sx={{
                                                    p: 2,
                                                    cursor: 'pointer',
                                                    '&:hover': { bgcolor: 'action.hover' },
                                                    bgcolor: selectedMovement?.idsolsum === movement.idsolsum ? 'action.selected' : 'inherit',
                                                    borderBottom: '1px solid',
                                                    borderColor: 'divider'
                                                }}
                                                onClick={() => setSelectedMovement(selectedMovement?.idsolsum === movement.idsolsum ? null : movement)}
                                            >
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Box>
                                                        <Typography fontSize={12} fontWeight='bold'>
                                                            #{movement.idsolsum}-{movement.nrocambio}
                                                        </Typography>
                                                        <Typography fontSize={12} color="text.secondary">
                                                            {movement.desccambio}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={movement.stscamb}
                                                        color={movement.stscamb === 'PEN' ? 'warning' : 'success'}
                                                        size="small"
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography fontSize={12} color="text.secondary">
                                                        {formatDate(movement.feccambio)}
                                                    </Typography>
                                                    <Typography fontSize={12} color="text.secondary">
                                                        Usuario: {movement.usuing}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Details Panel */}
                            <Grid size={{ xs: 12, }}>
                                <Card>
                                    <CardHeader
                                        title={selectedMovement ? 'Detalles del Movimiento' : 'Seleccione un movimiento'}
                                        titleTypographyProps={{ variant: 'h5' }}
                                    />
                                    <Divider />
                                    <CardContent>
                                        {selectedMovement ? (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                                {/* Movement Header Info */}
                                                <Grid container spacing={3}>
                                                    <Grid size={{ xs: 12, md: 4 }}>
                                                        <Typography fontSize={12} color="text.secondary">
                                                            Fecha de Cambio
                                                        </Typography>
                                                        <Typography fontSize={12}>
                                                            {formatDate(selectedMovement.feccambio)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 4 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Estado
                                                        </Typography>
                                                        <Typography fontSize={12}>
                                                            {selectedMovement.stscamb}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 4 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Usuario
                                                        </Typography>
                                                        <Typography fontSize={12}>
                                                            {selectedMovement.usuing}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                {/* Details Table */}
                                                <Paper sx={{ overflow: 'auto' }}>
                                                    <BaseTable
                                                        loading={isLoading}
                                                        rows={detailsData.rnglist}
                                                        headers={columnsHeadersSheet}
                                                        rowAction={(row) => console.log(row)}
                                                        collapsible={{
                                                            visible: (row) => [
                                                                { content: row.codigo, align: "center" },
                                                                { content: row.descreng, align: "center" },
                                                                { content: row.cantsolorig, align: "left" },
                                                                { content: formatCurrency(row.precioorig), align: "left" },
                                                                { content: formatCurrency(row.preciocambio), align: "left" },
                                                                { content: formatCurrency(row.mtototreng), align: "left" },




                                                            ],

                                                            collapsed: () => [],
                                                        }}
                                                    />
                                                </Paper>

                                                {/* Account Information */}
                                                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                                    <Grid container spacing={2}>
                                                        <Grid size={{ xs: 12, md: 6 }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Cuenta
                                                            </Typography>
                                                            <Typography fontSize={12}>
                                                                {detailsData.rnglist[0].codcta}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {detailsData.rnglist[0].desccta}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 12, md: 6 }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Última Compra
                                                            </Typography>
                                                            <Typography fontSize={12}>
                                                                {formatDate(detailsData.rnglist[0].fecultcom)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Box>
                                        ) : (
                                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography color="text.secondary">
                                                    Seleccione un movimiento para ver sus detalles
                                                </Typography>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                {/* Search Section */}
            </ModalDialog>
        </>
    );
}

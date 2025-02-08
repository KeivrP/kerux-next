'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Chip, Divider, Grid2 as Grid, Paper, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import ModalDialog from "@/components/modal/modalDialog";
import { useQueryData } from "@/server/fetch-data";
import { formatCurrency, formatDate } from "@/utils/main";
import { Search, Table } from "lucide-react";
import { Box } from "@mui/material";
import { BaseTable } from "@/components/table-material/genericTable";
import { BadgeTipodoc } from "@/components/badge/badge-estatus";
import { columnsHeaders, columnsHeadersSheet } from "./header-table";
import BadgeModule from "@/components/badge/badge-mod";


export default function TtcambiossQuery(): JSX.Element {
    const [rows, setRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter((row: any): boolean => {
        const searchTermLower = searchQuery.toLowerCase();
        return (
            row.idsolsum.toString().toLowerCase().includes(searchTermLower) ||
            row.nrocambio.toString().toLowerCase().includes(searchTermLower) ||
            row.desccambio.toLowerCase().includes(searchTermLower) ||
            row.stscamb.toLowerCase().includes(searchTermLower)
        );
    });
    const [selectedMovement, setSelectedMovement] = useState<any>({ idsolsum: 0 });

    const { data: data2, isLoading: is } = useQueryData({
        entity: "tcambioss",
        dependency: [],
    });

    useEffect(() => {
        setRows(data2?.cambiolist || []);
    }, [data2]);

    const { data, isLoading } = useQueryData({
        entity: "show_rng",
        dependency: [selectedMovement],
        params: {
            idsolsum: selectedMovement,
            nrocambio: 1
        },
    });

    return (
        <>

            <Grid container spacing={3} padding={2}>

                {/* Main Content */}
                <Grid size={12}>

                    <Grid container spacing={3}>
                        {/* Movements List */}
                        <Grid size={{ xs: 12, }}>
                            <Card>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Buscar movimientos..."
                                        variant="outlined"
                                        size="small"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        slotProps={{
                                            input: {
                                                startAdornment: <Search style={{ color: 'text.secondary', marginRight: 1 }} />
                                            }
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Total: {data2?.total} registros
                                    </Typography>
                                </Box>
                                <CardHeader
                                    title="Movimientos de Cambio"
                                    titleTypographyProps={{ variant: 'h3', color: '#0f065a' }}
                                />
                                <Divider />
                                <CardContent>
                                    <div
                                        style={{
                                            height: "25vh",
                                            width: "100%",
                                        }}
                                    >
                                        <BaseTable
                                            loading={is}
                                            rows={filteredRows}
                                            headers={columnsHeaders}
                                            collapsible={{
                                                visible: (row) => [
                                                    { content: row.idsolsum, align: "center", action: () => { setSelectedMovement(row.idsolsum) } },
                                                    { content: row.nrocambio, align: "center", action: () => { setSelectedMovement(row.idsolsum) } },
                                                    { content: row.desccambio, align: "left", action: () => { setSelectedMovement(row.idsolsum) } },
                                                    { content: formatDate(row.feccambio), align: "center", action: () => { setSelectedMovement(row.idsolsum) } },
                                                    {
                                                        content: <BadgeTipodoc tipo={row.stscamb} />,
                                                        align: "center",
                                                        action: () => { setSelectedMovement(row.idsolsum) }
                                                    },
                                                ],

                                                collapsed: () => [],
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Details Panel */}
                        <Grid size={{ xs: 12, }}>
                            <Card>
                                <CardHeader
                                    title={selectedMovement > 1 ? 'Detalles del Movimiento' : 'Seleccione un movimiento'}
                                    titleTypographyProps={{ variant: 'h3', color: '#0f065a' }}
                                />
                                <Divider />
                                <CardContent>
                                    {selectedMovement > 1 ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            {/* Details Table */}
                                            <Paper sx={{ overflow: 'auto' }}>
                                                <BaseTable
                                                    loading={isLoading}
                                                    rows={data?.rnglist || []}
                                                    headers={columnsHeadersSheet}
                                                    collapsible={{
                                                        visible: (row) => [
                                                            { content: row.nroreng, handleCollapse: true ,align: "center" },
                                                            { content: row.tiporeng, align: "center" },
                                                            { content: row.codigo, align: "center" },
                                                            { content: row.descreng, align: "left" },
                                                            { content: row.unidbasica, align: "center" },
                                                            { content: row.cantsolorig, align: "center" },
                                                            { content: formatCurrency(row.precioorig), align: "center" },
                                                            { content: formatCurrency(row.preciocambio), align: "center" },
                                                            { content: formatCurrency(row.porcimptocamb), align: "center" },
                                                            { content: <BadgeModule codmenu={row.destino} />, align: "center" },
                                                            { content: formatCurrency(row.mtototreng), align: "center" },




                                                        ],

                                                        collapsed: (row) => [
                                                            { name: "Cuenta Presupuestaria", content: row.codcta },
                                                        {
                                                            name: "Descripción de cuenta presupuestaria",
                                                            content: row.desccta,
                                                        },
                                                        {
                                                            name: "Fecha de ultima compra",
                                                            content: row.fecultcom,
                                                        },
                                                        {
                                                            name: "Moneda",
                                                            content: row.codmoneda,
                                                        },
                                                        {
                                                            name: "Descripción Adicional",
                                                            content: row.descadiitem,
                                                        },
                                                                                                            
                                                
                                                    ],
                                                    }}
                                                />
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
        </>
    );
}

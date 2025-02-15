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
import { columnsFilter, columnsHeaders, columnsHeadersSheet, columnsOrder } from "./header-table";
import BadgeModule from "@/components/badge/badge-mod";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";


export default function TtcambiossQuery(): JSX.Element {
    const [rows, setRows] = useState([]);
      const [order, setOrder] = useState<Order[]>([
        { column: "N°", id: "idsolsum", operator: "DESC" },
      ]);
      const [filter, setFilter] = useState<Filter[]>([]);



    const [selectedMovement, setSelectedMovement] = useState<any>({ idsolsum: 0 });

    const { data: data2, isLoading: is } = useQueryData({
        entity: "tcambioss",
        params: { page: 1, per: 25, filter, order },
        dependency: [filter, order],
    });

    useEffect(() => {
        setRows(data2?.cambiolist || []);
    }, [data2]);

    const { data, isLoading } = useQueryData({
        entity: "show_rng",
        dependency: [selectedMovement],
        enabled: selectedMovement > 1,
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
                                <ActionCardHeader
                                    isAddButtonVisible={false}
                                    onApplyFilter={(filters) => setFilter(filters)}
                                    columnsFilter={columnsFilter}
                                    onApplyOrder={(orders) => setOrder(orders)}
                                    columnsOrder={columnsOrder}
                                    setFilter={setFilter}
                                    setOrder={setOrder}
                             
                                />
                                {/*          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2 }}>
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
                                </Box> */}
                                <CardHeader
                                    title="Movimientos de Cambio"
                                    titleTypographyProps={{ variant: 'h3', color: '#0f065a' }}
                                />
                                <Divider />
                                    <div
                                        style={{
                                            height: "25vh",
                                            width: "100%",
                                        }}
                                    >
                                        <BaseTable
                                            loading={is}
                                            rows={rows}
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
                     
                        </Grid>

                        {/* Details Panel */}
                        <Grid size={{ xs: 12, }}>
                                <CardHeader
                                    title={selectedMovement > 1 ? 'Detalles del Movimiento' : 'Seleccione un movimiento'}
                                    titleTypographyProps={{ variant: 'h3', color: '#0f065a' }}
                                />
                                <Divider />
                                
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
                                                            { content: row.nroreng, handleCollapse: true, align: "center" },
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
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            {/* Search Section */}
        </>
    );
}

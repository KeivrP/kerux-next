import { BadgeTipoComp } from '@/components/badge/badge-estatus';
import { BaseTable } from '@/components/table-material/genericTable';
import { Card, CardContent, CardHeader, Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Acciones, columnsHeadersFrengsc } from './hearder-table';
import { Detsolcompra, IFrengsc } from '../../tsolpencomp-types';
import { useFormContext, useWatch } from 'react-hook-form';
import Tvarproc from './tvarproc';
import { ConfirmDialog } from '@/components/modal/confirmDialog';
import SimpleBackdrop from '@/components/backdrop/backdrop';
import { useAnulaRngSC } from '../../hook/useTipoCompUnd';

interface FieldsTableProps {
    isLoading: boolean
    refetch: () => void
}

const FieldsTable = ({ isLoading, refetch }: FieldsTableProps) => {
    const { register, watch, setValue, control } = useFormContext<IFrengsc>();

    const data = useWatch();


    const [selectedRows, setSelectedRows] = useState<Detsolcompra[]>([]);

    function validarCheckCotizar(row: Detsolcompra) {
        if (row?.stsrengsc === "ANU" || row?.stsrengsc === "OCC") {
            return true;
        } else {
            return false;
        }
    }

    const handleRowSelect = (row: Detsolcompra) => {
        setSelectedRows((prevRows) => {
            // Si el row ya está seleccionado, lo removemos del array
            if (prevRows.includes(row)) {
                return prevRows.filter((item) => item !== row);
            }
            // Si el row no está seleccionado, lo agregamos al array
            else {
                return [...prevRows, row];
            }
        });
    };

    const LabelMS = ((a: string) => {
        if (a === "S") {
            return "Servicio"
        } else {
            return "Material"
        }
    })

    const [openDialog, setOpenDialog] = useState(false)
    const [RowDelete, setRowDelete] = useState(0)
    const { mutate, isPending, isSuccess } = useAnulaRngSC()

    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])

    //si queremos cerrar sin hacer ningun cambio
    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    // esta se coloca donde queremos que abra nuestro mensaje
    const handleDeleteClick = (id: number) => {
        setOpenDialog(true);
        setRowDelete(id)
    };
    //Funcion al confirmar
    const handleConfirmDelete = async () => {
        mutate({ id: watch('cabsolcompra.nrosc').toString(), nrorengsc: RowDelete.toString() });
        setOpenDialog(false)
    };


    return (
        <Card className="mb-4">
            <CardHeader className="bg-muted py-2 text-[#142F62] flex justify-between items-center"
                title="Renglones"
                action={
                    <Tvarproc selectedRows={selectedRows} refetch={refetch} />
                }
            />
            <CardContent className="p-4">
                <BaseTable
                    loading={isLoading}
                    rows={data.detsolcompra ?? []}
                    addCheckboxColumn={true}
                    headers={columnsHeadersFrengsc}
                    onSelectionChange={(selectedRowIndices) => {
                        if (data.detsolcompra) {
                            const updateSelect = selectedRowIndices
                                .map((index) => data.detsolcompra[index]) // Correct access to the rows
                                .filter((row) => !validarCheckCotizar(row)); // Filter out rows that meet the condition in validarCheckCotizar
                            setSelectedRows(updateSelect);
                        } else {
                            setSelectedRows([]);
                        }
                    }}
                    collapsible={{
                        visible: (row) => [
                            {
                                content: (
                                    <Checkbox //selecionar uno a uno
                                        disabled={validarCheckCotizar(row)}
                                        sx={{ padding: 0 }}
                                        checked={selectedRows.includes(row)}
                                        onChange={() => handleRowSelect(row)}
                                    />
                                ),
                            },
                            { content: row.nrorengsc, handleCollapse: true, align: "left" },
                            { content: <BadgeTipoComp tipo={row.stsrengsc} />, align: "center" },
                            { content: LabelMS(row.tiporeng), align: "center" },
                            { content: row.dsp_codigo, align: "center" },
                            { content: row.descreng, align: "left" },
                            { content: row.undsol, align: "center" },
                            { content: Number(row.cantsol), align: "center" },

                            {
                                content: <Acciones onFile={handleDeleteClick} row={row} />,
                                action: () => null,
                                disableTooltip: true,
                            },
                        ],

                        collapsed: (row: Detsolcompra) => [{
                            name: "Descripción Adicional", content: row.descadiitem
                        },
                        ],
                    }}
                />
            </CardContent>
            <ConfirmDialog
                mode={'delete'}
                title={"Anular Renglón"}
                open={openDialog}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={`Desea anular el renglón ${RowDelete}`}

            />

            <SimpleBackdrop show={isPending} />
        </Card>
    )
}

export default FieldsTable
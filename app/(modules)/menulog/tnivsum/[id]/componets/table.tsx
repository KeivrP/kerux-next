import { BaseTable } from '@/components/table-material/genericTable';
import React, { useState } from 'react'
import { Detccostoniv } from '../../tnivsum-types';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { DeleteIcon, EditIcon } from '@/components/icons/table-icon';
import ActionCardHeader from '@/components/card/actionCardHeader';
import { useQueryData } from '@/server/fetch-data';
import DataSheet from './data-sheet';
interface FnivsumTable {
    rows: Detccostoniv[]
    isLoadind: boolean
    refetch: () => void
    nivelsum: string
}


export const Acciones = ({
    row,
    onEdit,
    onDelete,
}: {
    row: Detccostoniv;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void
}) => {
    const theme = useTheme();

    return (
        <span
            style={{
                color: theme.palette.primary.main,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                paddingLeft: "16px",
                paddingRight: "16px",
            }}
        >
            <Tooltip
                sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "50%",
                }}
                title="Editar"
            >
                <IconButton
                    onClick={() => onEdit(row.nivelsum)}
                    color="primary"
                    size="small"
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "50%",
                }}
                title="Eliminar"
            >
                <IconButton
                    onClick={() => onDelete(row.nivelsum)}
                    color="primary"
                    size="small"
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </span>
    );
};

export default function Table({ rows, isLoadind, refetch, nivelsum }: FnivsumTable) {
    const [isEditRow, setIsEditRow] = useState<Detccostoniv | null>(null)
    const [isOpenFile, setFile] = useState(false)

    const { data, isLoading } = useQueryData({
        entity: "ccostoNiv",
        dependency: [],
    });

    const handleDelete = (id: string) => {
        console.log(id)
    }
    const handleEdit = (id: string) => {
        console.log(id, 'nievlesum')
        const row = rows.find((item) => item.nivelsum === id)

        setIsEditRow(row ?? null)
        setFile(true)

        console.log(row, isOpenFile)
    }


    return (
        <>

            <ActionCardHeader
                add={() => {
                    handleEdit('a');
                }}
                isAddOrderVisible={false}
                isAddFilterVisible={false}
            />

            <div
                style={{
                    height: "40vh",
                    width: "100%",
                }}
            >
                <BaseTable
                    rows={rows}
                    loading={isLoadind}
                    headers={[
                        { label: "Centro de Costo", icon: null, align: "center", width: 180 },
                        { label: "Descripción", icon: null, align: "left", minWidth: 200 },
                        { label: 'Acciones', width: 80, align: 'center' }
                    ]}

                    collapsible={{
                        visible: (row: Detccostoniv) => [
                            { content: row.ccosto, align: "center" },
                            { content: row.dsp_desccosto, align: "left" },
                            {
                                content: (
                                    <Acciones
                                        row={row}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                    />
                                ),
                                action: () => null,
                                disableTooltip: true,
                            },
                        ],

                        collapsed: () => [],
                    }
                    }
                >

                </BaseTable >

            </div>
            <DataSheet data={data} nivelsum={nivelsum} row={isEditRow} isOpen={isOpenFile} onClose={() => setFile(false)} refetch={refetch} isLoadingS={isLoading} />
   
        </>
    )
}

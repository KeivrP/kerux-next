/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BaseTable } from "@/components/table-material/genericTable";
import ActionCardHeader from "@/components/card/actionCardHeader";
import BadgeModule from "@/components/badge/badge-mod";
import { formatCurrency, formatDate } from "@/utils/main";
import { Detssmod, FormContextProps, initialRenglon } from "../../tsolmod-types";
import { Acciones, columnsHeaders } from "./header-table";
import DataSheet from "./edit-table";
import { useDeleteRenglonTsolmod } from "../../hook/useTsolmod";
import { ConfirmDialog } from "@/components/modal/confirmDialog";

interface DataInputProps extends FormContextProps {
    isLoading: boolean;
    refetch: () => void;
}

export const FsolmodTable: React.FC<DataInputProps> = ({
    formData,
    isLoading,
    refetch
}) => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { mutate: deleteRng, isPending: isDeleting, isSuccess: isDelete } = useDeleteRenglonTsolmod();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [deleteRowId, setDeleteRowId] = useState<number>(0);

    const handleDelete = (id: number) => {
        setDeleteRowId(id);
        setOpenDialog(true);
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        const rowToDelete = formData.detssmod.find((row) => row.nroreng === deleteRowId)?.nroreng;
        if (rowToDelete) {
            deleteRng({ id: formData.cabssmod.numsolsum, rng: rowToDelete });
        } else {
            console.log(`Row with id ${deleteRowId} not found`);
        }
        setOpenDialog(false);
    };

    useEffect(() => {
        if (isDelete) {
            refetch();
        }
    }, [isDelete])


    const [rowSelected, setRowSelected] =
        useState<Detssmod>(initialRenglon);

    const handleCreate = () => {
        const data = { ...initialRenglon, nroreng: formData.detssmod.length + 1 }
        setRowSelected(data);
        setDrawerOpen(true);
    };

    const handleEdit = (row: Detssmod) => {
        setRowSelected(row);
        setDrawerOpen(true);
    };


    return (
        <>
            <ActionCardHeader
                isAddFilterVisible={false}
                isAddOrderVisible={false}
                add={() => {
                    handleCreate();
                }}
            />

            <div
                style={{
                    height: "65vh",
                    width: "100%",
                }}
            >
                <BaseTable
                    loading={isLoading}
                    rows={formData.detssmod}
                    headers={columnsHeaders}
                    rowAction={(row) => console.log(row)}
                    collapsible={{
                        visible: (row: Detssmod) => [
                            { content: row.nroreng, handleCollapse: true, align: "center" },
                            { content: row.dsp_DescTipoReng, align: "left" },
                            { content: row.dsp_DescNombNorm, align: "left" },
                            { content: row.tiporeng !== "MT" ? row.codserv : row.coditem, align: "center" },
                            { content: row.descreng, align: "left" },

                            { content: row.unidbasica, align: "center" },
                            { content: row.cantsol, align: "center" },
                            { content: formatCurrency(row?.precio), align: "center" },
                            {
                                content: <BadgeModule codmenu={row.destino} />,
                                align: "center",
                            }, { content: formatCurrency(row.dsp_MtoTotReng), align: "center" },
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

                        collapsed: (row: Detssmod) => [
                            {
                                name: "Descripción adicional del item",
                                content: row.descreng,
                            },
                            {
                                name: "Cuenta Presupuestaria",
                                content: `${row.codcta} - ${row.dsp_DescCodCta}`,
                            },
                            {
                                name: "Fecha de última compra",
                                content: formatDate("02/12/2024"),
                            },
                            /*  {
                                 name: "Moneda",
                                 content: row.,
                             }, */
                            {
                                name: "Clasif. SNC",
                                content: row.codclasifsnc,
                            },
                        ],
                    }}
                >

                </BaseTable>
            </div>
            <ConfirmDialog
                mode={"delete"}
                open={openDialog}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={`¿Estas seguro que deseas eliminar el numero de renglon ${formData.detssmod.find((row) => row.nroreng === rowSelected.nroreng)?.nroreng
                    }?`}
            />
            <DataSheet
                formData={formData}
                /*       isPending={handleLoading}
                 */
                row={rowSelected}
                isOpen={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                refetch={() => {
                    refetch();
                }}
            />
            <SimpleBackdrop show={isDeleting} />
        </>
    );
};

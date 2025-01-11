/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState } from "react";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { BaseTable } from "@/components/table-material/genericTable";
import ActionCardHeader from "@/components/card/actionCardHeader";
import BadgeModule from "@/components/badge/badge-mod";
import { formatCurrency, formatDate } from "@/utils/main";
import { Detssmod, FormContextProps, initialRenglon } from "../../tsolmod-types";
import { Acciones, columnsHeaders } from "./header-table";
import DataSheet from "./edit-table";

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

    const [rowSelected, setRowSelected] =
        useState<Detssmod>(initialRenglon);

    const handleCreate = () => {
        const data = { ...initialRenglon, nroreng: formData.detssmod.length + 1 }
        setRowSelected(data);
        setDrawerOpen(true);
    };

    const handleDelete = () => { };

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
            {/*  <ConfirmDialog
      mode={"delete"}
      open={openDialog}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      text={`¿Estas seguro que deseas eliminar la ruta ${
        rows.find((row) => row.codruta)?.codruta
      }?`}
      /> */}
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
            <SimpleBackdrop show={false} />
        </>
    );
};

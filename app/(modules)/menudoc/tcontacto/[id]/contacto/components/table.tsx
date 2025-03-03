'use client'
import React, {  useEffect, useState } from "react";
import { useQueryData } from "@/server/fetch-data";
import { BaseTable } from "@/components/table-material/genericTable";
import { Acciones, columnsHeaders } from "./header-table";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { usePathname } from "next/navigation";
import { ConfirmDialog } from "@/components/modal/confirmDialog";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import { useDeleteContacto } from "../hook/useContacto";
import DataEdit from "./data-edit";

export interface Tcontactos {
    apellido: string;
    cargo: string | null;
    cedula: string;
    email: string | null;
    idcontacto: number;
    nombre: string;
    numbenef: number;
    telefono: string | null;
    tipocontacto: string;
}


export function TipoContacto(tipo: string) {
    switch (tipo) {
        case "EMP":
            return "Empleado";
        case "ACC":
            return "Accionista";
        case "OTR":
            return "Otro";
        default:
            return "No definido";
    }
}

export const TcontactoTable = () => {

    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);
    const [rows, setRows] = useState<Tcontactos[]>([]);

    /* ------------------ USEEFFECT PARA TRAER LA DATA DE LA BD ----------------- */


    const { data, isLoading, refetch } = useQueryData({
        entity: "contactos_crud",
        api: 'doc',
        type: pathnames[2],
    });

    useEffect(() => {
        setRows(data?.detcontacto || []);
    }, [data]);


    const { mutate: deleteContacto, isPending, isSuccess } = useDeleteContacto();

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess]);

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [deleteRowId, setDeleteRowId] = useState<number>(0);
    const [editRow, setEditRow] = useState<Tcontactos | null>(null);

    const handleConfirmDelete = () => {
        deleteContacto({ id: deleteRowId });
        setOpenDialog(false);
    }

    const handleCancelDelete = () => {
        setOpenDialog(false);
    }

    const handleDelete = (id: number) => {
        setDeleteRowId(id);
        setOpenDialog(true);
    }



    const handleEdit = (row: Tcontactos) => {
        setEditRow(row);
        setOpen(true);
    }

    const handleClose = () => {
        if (open){
            setOpen(false);
            refetch()
        }
    }

    const handleCreate = () => {
        setEditRow(null);
        setOpen(true);}

    return (
        <>
            <ActionCardHeader
                add={handleCreate}
                isAddFilterVisible={false}
                isAddOrderVisible={false}
      
            />

            <div
                style={{
                    height: "71vh",
                    width: "100%",
                }}
            >
                <BaseTable
                    loading={isLoading}
                    rows={rows}
                    headers={columnsHeaders}
                    collapsible={{
                        visible: (row: Tcontactos) => [
                            { content: row.nombre, align: "center" },
                            { content: row.apellido, align: "center" },
                            { content: row.cedula, align: "center" },
                            { content: row.telefono, align: "center" },
                            { content: row.email, align: "center" },
                            { content: TipoContacto(row.tipocontacto), align: "center" },

                            {
                                content: (
                                    <Acciones
                                        row={row}
                                        onOpen={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ),
                                action: () => null,
                                disableTooltip: true,
                            },


                        ],

                        collapsed: () => [],
                    }}
                ></BaseTable>

            </div>
            <ConfirmDialog
                mode={"delete"}
                open={openDialog}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={`¿Estas seguro que deseas eliminar a ${rows.find((row) => row.idcontacto == deleteRowId)
                        ?.nombre
                    } de tus contactos?`}
            />
            <DataEdit dialogOpen={open} handleClose={handleClose} row={editRow} />
            <SimpleBackdrop show={isPending} />

        </>
    );
};

import { useEffect, useState } from "react";
import { IFnivsum } from "../../tnivsum-types";
import ModalDialog from "@/components/modal/modalDialog";
import { Grid2 } from "@mui/material";
import AutocompleteAsync from "@/components/ui/autocompleteAsync";
import { OptionType } from "@/types/main";
import _ from "lodash";
import { useUpdateCcostoNivsum } from "../../hook/useNivsum";
import SimpleBackdrop from "@/components/backdrop/backdrop";



interface dataSheetProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    row: IFnivsum | null;
    data: { ccosto: string, nombre: string }[]
    refetch: () => void
    isLoadingS: boolean
    nivelsum: string
}

export default function DataSheet({
    isOpen,
    onClose,
    row,
    data,
    refetch,
    isLoadingS,
    nivelsum
}: dataSheetProps): JSX.Element {
    const [ccosto, setCcosto] = useState('')
    const { mutate, isPending, isSuccess } = useUpdateCcostoNivsum();

    const options: OptionType[] = _.map(data, (item) => {
        let label = String(item ? item.nombre : "");
        let value = String(item ? item.ccosto : "");

        return { label, value };
    });

    useEffect(() => {
        if (row) {
            setCcosto(row.ccosto)
        }
    }, [row])


    const onSubmit = () => {
        mutate({ id: nivelsum, ccosto: row?.ccosto ?? '', dataCcostoNiv: { ccosto } });
    };

    useEffect(() => {
        if (isSuccess) {
            setCcosto('')
            onClose(false);
            refetch()
        }
    }, [isSuccess]);

    return (
        <>
            <ModalDialog
                width="xs"
                title={
                    row
                        ? "Editar Nivel de Autorizacion"
                        : "Crear nuevo Nivel de Autorizacion"
                }
                dialogOpen={isOpen}
                confirm={onSubmit}
                handleClose={() => onClose(false)}
            >
                <Grid2 container padding={2} spacing={2}>
                    <Grid2 size={12}>
                        <AutocompleteAsync
                            text="label"
                            loading={isLoadingS}
                            options={options}
                            defaultValue={ccosto}

                            onSelectionChange={(e) => {
                                setCcosto(e?.value ?? '');
                            }}
                        />
                    </Grid2>
                </Grid2>

            </ModalDialog>
            <SimpleBackdrop show={isPending} />
        </>
    )
}
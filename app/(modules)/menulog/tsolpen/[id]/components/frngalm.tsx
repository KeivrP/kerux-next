'use client'
import ModalDialog from "@/components/modal/modalDialog";
import { useQueryData } from "@/server/fetch-data";
import {
    Grid2 as Grid, Card,
    CardContent,
    CardHeader,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SectOne } from "./frngalm/sectOne";
import { SectTwo } from "./frngalm/sectTwo";
import { SectThree } from "./frngalm/sectThree";
import type { Frngalm } from "../../tsolpen-types";
import { initialFrngalm } from "../../tsolpen-types";

interface FrngAlmProps {
    open: boolean;
    handleClose: () => void;
    nrorng: number;
    idsolsum: number;
}

const Frngalm = ({
    open,
    handleClose,
    nrorng,
    idsolsum,
}: FrngAlmProps) => {

    const [row, setRow] = useState<Frngalm>(initialFrngalm)

    const { data, isLoading } = useQueryData({
        entity: "sit_reng_sol_compra_alm",
        api: "log",
        enabled: nrorng !== 0,
        params: {
            idsolsum,
            nroreng: nrorng,
        },
        dependency: [nrorng, idsolsum],
    });

    useEffect(() => {
        if (data) {
            setRow(data)
        }
    }, [data]);


    return (
        <ModalDialog
            width="md"
            dialogOpen={open}
            handleClose={handleClose}
            title="Movimiento de Almacén"

            disableCancelButton={true} // Pass the prop to disable the cancel button
        >
            <Grid
                container
                direction="row"
                alignItems="center"
                paddingX={5}
                spacing={2}
            >

                <Grid size={12}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                    >
                        <Grid size={12} mb={2}>

                            <SectOne loading={isLoading} row={row} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid size={5}>
                                <SectTwo loading={isLoading} row={row} />
                            </Grid>
                            <Grid size={7}>
                                <SectThree loading={isLoading} row={row} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



            </Grid>
        </ModalDialog>
    );
};

export default Frngalm;
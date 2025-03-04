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
            dialogOpen={open}
            handleClose={handleClose}
            title="Movimiento de Almacén"
            disableCancelButton={true} // Pass the prop to disable the cancel button
        >
            <Grid
                container
                direction="row"
                alignItems="center"
                px={5}
                mb={3}
                spacing={2}
            >
                <Card className="">
                    <CardHeader className="bg-muted py-2 text-[#142F62]" title="" />
                    <CardContent className="p-4">
                        <Grid size={12}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <SectOne loading={isLoading} row={row}/>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                >
                                    <Grid size={4}>
                                        <SectTwo loading={isLoading} row={row} />
                                    </Grid>
                                    <Grid size={6.5}>
                                        <SectThree loading={isLoading}  row={row}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>


            </Grid>
        </ModalDialog>
    );
};

export default Frngalm;
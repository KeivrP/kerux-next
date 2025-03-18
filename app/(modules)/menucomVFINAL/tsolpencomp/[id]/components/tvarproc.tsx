import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {
    Box,
    Card,
    CardContent,
    Grid2 as Grid,
    Typography,
    useTheme,
    Stack,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import _ from "lodash";
import dayjs from "dayjs";
import { useQueryData } from "@/server/fetch-data";
import { OptionType } from "@/types/main";
import { CircleSlash, GemIcon } from "lucide-react";
import { ConditionalWrapperTable } from "@/utils/main";
import CheckboxesTags from "@/components/ui/checkBox";
import { SkeletonInput } from "@/components/skeleton/detail";
import { styled } from '@mui/material/styles';
import { useGenerarCot } from "../../hook/useTipoCompUnd";
import SimpleBackdrop from "@/components/backdrop/backdrop";

interface TverprocProps {
    selectedRows: any[];
    refetch: () => void;
}

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    boxShadow: theme.shadows[2],
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
    '&:active': {
        boxShadow: theme.shadows[1],
    },
}));

export default function Tvarproc({ selectedRows, refetch }: TverprocProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [ispending, setisPendig] = useState(false)
    const theme = useTheme();

    const [feccot, setFeccot] = useState<dayjs.Dayjs | null>(dayjs());
    const [numprov, setNumprov] = useState<number[]>([]);

    let nrorengArray = selectedRows.map((row) => row.nroreng);

    let body = {
        numprov: numprov,
        feccot: feccot ? feccot.format('YYYY-MM-DD') : '',
        nrorengsc: nrorengArray,
    };
    const nroscValues = new Set(selectedRows.map((item) => item.nrosc));
    const uniqueNrosc = [...nroscValues][0];

    const { data, isLoading } = useQueryData({
        entity: "provedores",
        api: "comp",
    });




    let options: OptionType[] = _.map(data, (item) => {
        const values = _.values(item);
        const firstValue = values.shift();
        const restValues = values.join(" | ");

        let label = `${firstValue} | ${restValues}`; // Construimos la etiqueta como texto sin <b>

        let value = String(item.numprov);

        return { label, value, firstValue, restValues }; // Retornamos los valores separados
    });

    const {mutate, isPending, isSuccess} = useGenerarCot()

    useEffect(() => {
        if(isPending){
            setisPendig(true)
        }
    }, [isPending])

    useEffect(() => {
        if (isSuccess) {
            refetch();
            setAnchorEl(null);
            setisPendig(false)
        }
    }, [isSuccess]);

    const handleSelectionChange = (selected: OptionType[]) => {
        setNumprov(selected.map((option) => Number(option.value)));
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkboxesRef = useRef<{ clearSelection: () => void }>();

    const handleClear = () => {
        checkboxesRef.current?.clearSelection();
    };


    return (
        <div>
            <CustomButton
                variant="contained"
                color="primary"
                disabled={selectedRows.length === 0}
                sx={{ textTransform: "none" }}
                onClick={handleClick}
            >
                <Typography variant="h3">Seleccionar Proveedor</Typography>
            </CustomButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                sx={{ padding: 0 }}
            >
                <Card style={{ backgroundColor: theme.palette.paper.light, width: "30.375rem", padding: 0 }}>
                    <CardContent>
                        <Stack spacing={2} padding={2}>
                            <Typography variant="h1" align="center">
                                Lista de proveedores a solicitar cotización
                            </Typography>
                            <CustomButton
                                onClick={() => mutate({ id: uniqueNrosc, ...body })}
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ display: 'flex', gap: 2 }}
                            >
                                <Typography variant="h3"> Generar Cotización </Typography>
                            </CustomButton>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <Typography variant="body2">
                                        <b> Fecha de Cotización: </b>
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={feccot}
                                            onChange={(newValue) => setFeccot(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <ConditionalWrapperTable condition={isLoading} wrapper={SkeletonInput}>
                                <CheckboxesTags
                                    ref={checkboxesRef}
                                    options={options}
                                    onSelectionChange={handleSelectionChange}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            <b>{option.firstValue}</b> | {option.restValues}
                                        </li>
                                    )}
                                />
                            </ConditionalWrapperTable>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <CustomButton
                                        variant="contained"
                                        fullWidth
                                        onClick={handleClear}
                                        sx={{ backgroundColor: theme.palette.secondary.main }}
                                    >
                                        Quitar Todo
                                    </CustomButton>
                                </Grid>
                                <Grid size={12}>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleClose}
                                    >
                                        Cerrar
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Stack>
                    </CardContent>
                </Card>
            </Menu>
            <SimpleBackdrop show={ispending}/>
        </div>
    );
}
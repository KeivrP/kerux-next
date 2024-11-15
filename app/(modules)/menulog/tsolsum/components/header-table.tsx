import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import LongMenu, { OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { ITsolsum } from "../tsolsum-types";

export const columnsFilter: Filter[] = [
    { id: "idsolsum", type: "number", column: "Id Solicitud", value: "" },
    { id: "fecsol", type: "date", column: "Fecha", value: "" },
    { id: "desccorta", type: "desc", column: "Descripcion", value: "" },
    { id: "CENTS_COSTO.ccosto", type: "number", column: "Centro de Costo", value: "" },
    { id: "stssol", type: "desc", column: "Estatus", value: "" },
  ];
  export const columnsOrder: Order[] = [
    { id: "idsolsum", column: "Id solicitud" },
    { id: "fecsol", column: "Fecha" },
    { id: "desccorta", column: "Descripcion" },
    { id: "ccosto",  column: "Centro de Costo" },
    { id: "stssol",  column: "Estatus" },
  ];
  
  export const columnsHeaders: HeadersName[] = [
    { label: "ID Solicitud",  align: "center",  minWidth:140 },
    { label: "Fecha",  align: "center", minWidth: 140 },
    { label: "Descripcion"},
    { label: "Centro de Costo", align: "center", minWidth: 175 },
    { label: "Estatus",  align: "center", minWidth: 145 },
    { label: "Acciones",  align: "center", width: 100  },
  ];

  export const Acciones = ({
    row,
    onReject,
    onGenerate,
    onOpen,
}: {
    row: ITsolsum;
    onOpen: (id: number) => void;
    onReject: (id: number) => void;
    onGenerate: (id: number) => void;
  }) => {
    const theme = useTheme();
    const options = ["Generar", "Anular"];
  
    const handleOptionSelect = (option: string): void => {
      if (option === "Generar") {
        onGenerate(row.idsolsum); // Llama a la función onEdit con el id de la fila
      } else if (option === "Anular") {
        onReject(row.idsolsum); // Llama a la función onReject con el id de la fila
      }
    };
    return (
        <span
        style={{
          color: theme.palette.primary.main,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "50%",
          }}
          title="Detalle"
        >
            <IconButton
              onClick={() => onOpen(row.idsolsum)} // Cambiado a onOpen aquí
              color="primary"
              size="small"
            >
              <OpenIcon />
            </IconButton>
        </Tooltip>
        <LongMenu options={options} onOptionSelect={handleOptionSelect} />

      </span>
    );
  }
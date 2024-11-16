import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { Solsummodlist } from "../tsolmod-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import LongMenu, { OpenIcon } from "@/components/icons/table-icon";


export const columnsFilter: Filter[] = [
  { id: "numsolsum", type: "number", column: "N°", value: "" },
  { id: "SOL_SUM_MODELO.ANO", type: "number", column: "Año", value: "" },
  { id: "SOL_SUM_MODELO.codaccint", type: "desc", column: "Acción Interna.", value: "" },
  { id: "SOL_SUM_MODELO.ccosto", type: "desc", column: "Centro de costo", value: "" },
  { id: "desccorta", type: "desc", column: "Descripción General", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "numsolsum", column: "N°" },
  { id: "ano", column: "Año" },
  { id: "codaccint", column: "Acción Interna" },
  { id: "ccosto",  column: "Centro de costo" },
  { id: "desccorta", column: "Descripción General" }, 
];

export const columnsHeaders: HeadersName[] = [
  { label: "N°", icon: null, align: "center",  minWidth:130, },
  { label: "Año", align: "center",  minWidth:60 },
  { label: "Acción Interna",  align: "center",  minWidth:140 },
  { label: "Centro de costo", align: 'center', minWidth: 140  },
  { label: "Descripción General", },
  { label: "Acciones", align: "center", width: 100 },
];


export const Acciones = ({
    row,
    onDelete,
    onGenerate,
    onOpen,
}: {
    row: Solsummodlist;
    onOpen: (id: number) => void;
    onDelete: (id: number) => void;
    onGenerate: (id: number) => void;
  }) => {
    const theme = useTheme();
    const options = ["Generar", "Borrar"];
  
    const handleOptionSelect = (option: string): void => {
      if (option === "Generar") {
        onGenerate(row.numsolsum); // Llama a la función onEdit con el id de la fila
      } else if (option === "Borrar") {
        onDelete(row.numsolsum); // Llama a la función onDelete con el id de la fila
      }
    };

  return (
    <span
      style={{
        color: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "10%",
        paddingRight: "10%",
        
      }}
    >
      <Tooltip
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "50%",
        }}
        title="Abrir"
      >
        <IconButton
          onClick={() => onOpen(row.numsolsum)}
          color="primary"
          size="small"
        >
          <OpenIcon />
        </IconButton>
      </Tooltip>
      <LongMenu options={options} onOptionSelect={handleOptionSelect} />

    </span>
  );
};

import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { ITnivsum } from "../tnivsum-types";
import LongMenu, { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";


export const columnsFilter: Filter[] = [
    { id: "nivelsum", type: "desc", column: "Nivel", value: "" },
    { id: "descnivel", type: "desc", column: "Descripcion", value: "" },
];
export const columnsOrder: Order[] = [
    { id: "nivelsum", column: "Nivel" },
    { id: "descnivel", column: "Descripcion" },
];

export const columnsHeaders: HeadersName[] = [
    { label: "Nivel", icon: null, align: "left", minWidth: 100 },
    {
        label: "Descripcion",
        icon: null,
        align: "left",
        minWidth: 175,
    },
    {
        label: 'Uso General',
        align: 'center',
        minWidth: 100
    },

    { label: "Acciones", icon: null, align: "center", width  : 80 },
];

export const Acciones = ({
    row,
    onDelete,
    onEdit,
    onOpen,
}: {
    row: ITnivsum;
    onOpen: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
  }) => {
    const theme = useTheme();
    const options = ["Editar", "Eliminar"];
  
    const handleOptionSelect = (option: string): void => {
      if (option === "Editar") {
        onEdit(row.nivelsum); // Llama a la función onEdit con el id de la fila
      } else if (option === "Eliminar") {
        onDelete(row.nivelsum); // Llama a la función onDelete con el id de la fila
      }
    };

    return (
        <span>
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
            title="Abrir"
          >
            <IconButton
              onClick={() => onOpen(row.nivelsum)} // Cambiado a onOpen aquí
              color="primary"
              size="small"
            >
              <OpenIcon />
            </IconButton>
          </Tooltip>
         
  
          <LongMenu options={options} onOptionSelect={handleOptionSelect} />
        </span>
      </span>
    );
};

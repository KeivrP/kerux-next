"use client";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { HeadersName } from "@/components/table-material/genericTable";

import { Filter } from "@/components/button/FilterButton";
import { Order } from "@/components/button/OrderButton";
import LongMenu, { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { Rutalist } from "../trutas-types";

export const columnsFilter: Filter[] = [
  { id: "codruta", type: "desc", column: "Cod Ruta", value: "" },
  { id: "descruta", type: "desc", column: "Desc. Rutas", value: "" },
];
export const columnsOrder: Order[] = [
  { id: "codruta", column: "Cod Ruta" },
  { id: "descruta", column: "Desc. Rutas" },
];

export const columnsHeaders: HeadersName[] = [
  { label: "Codigo", icon: null, align: "center", minWidth: 80 },
  {
    label: "Descripcion",
    icon: null,
    align: "center",
    minWidth: 140,
  },
  { label: "Acciones", icon: null, align: "center", width:100 ,},
];

export const Acciones = ({
  row,
  onOpen,
  onDelete,
  onEdit,
}: {
  row: Rutalist;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) => {
  const theme = useTheme();
  const options = ["Editar", "Eliminar"];

  const handleOptionSelect = (option: string): void => {
    if (option === "Editar") {
      onEdit(row.codruta); // Llama a la función onEdit con el id de la fila
    } else if (option === "Eliminar") {
      onDelete(row.codruta); // Llama a la función onDelete con el id de la fila
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
            onClick={() => onOpen(row.codruta)} // Cambiado a onOpen aquí
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

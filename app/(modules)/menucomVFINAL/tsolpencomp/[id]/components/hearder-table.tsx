import { OpenIcon } from "@/components/icons/table-icon";
import { HeadersName } from "@/components/table-material/genericTable";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { CircleX } from "lucide-react";
import { Detsolcompra } from "../../tsolpencomp-types";

export const columnsHeadersFrengsc: HeadersName[] = [
    { label: "Renglón", align: "left", minWidth: 90 },
    { label: "Estatus", minWidth: 140, align: 'center' },
    { label: "Tipo", minWidth: 100, align: 'center' },
    { label: "Item/Serv.", align: "center", minWidth: 130 },
    { label: "Descripción", align: "left", minWidth: 220 },
    { label: "Und.", minWidth: 90, align: 'center' },
    { label: "Cantidad Pendiente", minWidth: 200,  align: 'center' },
    { label: "Acciones", align: "center", minWidth: 85 },
];

export const Acciones = ({
    row,
    onFile,
  }: {
    row: Detsolcompra;
    onFile: (id: number) => void;
  }) => {
    const theme = useTheme();
    function validarBotonAnular(row: Detsolcompra) {
        if (["PEN", "ENV", "REC", "COT"].includes(row.stsrengsc)) {
          return false;
        } else {
          return true;
        }
      }
  
    return (
      <span>
        <span
          style={{
            color: theme.palette.primary.main,
            display: "flex",
           
            alignItems: "center",
        
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
        
        <Tooltip
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "50%",
          }}
          title="Anular Renglón"
        >
          <IconButton
            disabled={validarBotonAnular(row)}
            color="primary"
            size="small"
            onClick={() => onFile(row.nrorengsc)}
          >
            <CircleX fontSize="small" />
          </IconButton>
        </Tooltip>
        </span>
      </span>
    );
  };
  

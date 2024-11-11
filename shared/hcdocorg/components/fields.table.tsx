import { useEffect, useState } from "react";
import { columnsHeadersHcdocorg, Detevento } from "../hcdocorg-utils";
import { IconButton, Tooltip } from "@mui/material";
import { NetworkIcon } from "lucide-react";
import { BaseTable } from "@/components/table-material/genericTable";
import { formatDate } from "@/utils/main";

interface FielTablesProps {
  isLoading: boolean;
}

function FieldTables({ isLoading }: FielTablesProps) {
  const [rows, setRows] = useState<Detevento[]>([]);
  const theme = useTheme();
  useEffect(() => {
    if (data && data.deteventos) {
      setRows(data.deteventos);
    }
  }, [data]);

  const acciones = () => {
    return (
      <div
        style={{
          /*color: theme.palette.primary.main*/
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Tooltip
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "50%",
          }}
          title=""
        >
          <IconButton
          disabled={true}
            onClick={() => {
              {
              }
            }}
            color="primary"
            size="small"
          >
            <NetworkIcon  />
          </IconButton>
        </Tooltip>
        <Tooltip
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "50%",
          }}
          title=""
        >
          <IconButton
                    disabled={true}

            onClick={() => {
              {
              } // Actualiza el estado con el ID de la fila seleccionada
            }}
            color="primary"
            size="small"
          >
            <NetworkIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      <BaseTable
        loading={isLoading}
        rows={data ? rows : []}
        headers={columnsHeadersHcdocorg}
        collapsible={{
          visible: (row) => [
            { content: row.idevento, align: "center" },
            { content: ChipStatusDoc(row.tipoevento), align: "center" },
            { content: formatDate(row.fecevento), align: "center" },
            { content: destinyIconFunc(row.codsisgen), align: "center" },
            { content: ChipStatusDoc(row.stsevento), align: "center" },
            { content: formatDate(row.fecsts), align: "center" },
            { content: destinyIconFunc(row.codsisdest), align: "center" },
            {
              content: acciones(),
              action: () => null,
              disableTooltip: true,
            },
          ],

          collapsed: () => [],
        }}
      ></BaseTable>
    </>
  );
}

export default FieldTables;

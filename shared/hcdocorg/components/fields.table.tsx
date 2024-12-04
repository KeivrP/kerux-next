import { useEffect, useState } from "react";
import {
  columnsHeadersHcdocorg,
  Detevento,
  FormContextProps,
} from "../hcdocorg-utils";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { CircleSlash, RefreshCcw } from "lucide-react";
import { BaseTable } from "@/components/table-material/genericTable";
import { formatDate } from "@/utils/main";
import {BadgeTipodoc} from "@/components/badge/badge-estatus";
import BadgeModule from "@/components/badge/badge-mod";

interface FielTablesProps extends FormContextProps {
  isLoading: boolean;
}

function FieldTables({
  isLoading,
  formData: data,
}: FielTablesProps) {
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
            <CircleSlash size={18} />

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
              }
            }}
            color="primary"
            size="small"
          >
            <RefreshCcw size={18} />
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
            {
              content: <BadgeTipodoc tipo={row.tipoevento} />,
              align: "center",
            },
            { content: formatDate(row.fecevento), align: "center" },
            {
              content: <BadgeModule codmenu={row.codsisgen} />,
              align: "center",
            },
            { content: <BadgeTipodoc tipo={row.stsevento} />, align: "center" },
            { content: formatDate(row.fecsts), align: "center" },
            {
              content: <BadgeModule codmenu={row.codsisdest} />,
              align: "center",
            },
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

import {
  BaseTable,
  HeadersName,
} from "@/components/table-material/genericTable";
import React from "react";
import { IDetSolCompra } from "../../../tsolrec/tsolrec-types";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DeleteIcon, OpenIcon } from "@/components/icons/table-icon";
import { BadgeTipoComp } from "@/components/badge/badge-estatus";
import { formatCurrency } from "@/utils/main";

interface TableSheetProps {
  isLoading: boolean;
  rows: IDetSolCompra[];
}

const TableSheet = ({ rows, isLoading }: TableSheetProps) => {
  const theme = useTheme();
  const columnsHeaders: HeadersName[] = [
    { label: "Rng.", align: "center" },
    { label: "Estatus", align: "center" },
    { label: "Tipo", align: "center" },
    { label: "Item/Serv.", align: "center" },
    { label: "Descripción", align: "left" },
    { label: "Descripción Adicional", align: "left" },
    { label: "Ud.", align: "center" },
    { label: "Solicitado", align: "center" },
    { label: "Pendiente", align: "center" },
    { label: "Acciones", align: "center" },
  ];

  const Acciones = ({
    row,
    onFile,
    onDelete,
  }: {
    row: any;
    onFile: (id: any) => void;
    onDelete: (id: any) => void;
  }) => {
    return (
      <span>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Tooltip
            sx={{ backgroundColor: theme.palette.background.default }}
            title="Abrir"
          >
            <IconButton
              onClick={() => onFile(row)}
              color="primary"
              size="small"
            >
              <OpenIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            sx={{ backgroundColor: theme.palette.background.default }}
            title="Borrar"
          >
            <IconButton
              onClick={() => onDelete(row)}
              color="primary"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </span>
      </span>
    );
  };

  return (
    <BaseTable
      loading={isLoading}
      rows={rows}
      headers={columnsHeaders}
      collapsible={{
        visible: (row) => [
          { content: row.nrorengsc, align: "center" },
          { content: <BadgeTipoComp tipo={row.stsrengsc} />, align: "center" },
          { content: row.tiporeng, align: "center" },
          { content: row.coditem || row.codserv, align: "left" },
          { content: row.descreng, align: "center" },
          { content: row.descadiitem, align: "center" },
          { content: row.undsol, align: "center" },
          { content: formatCurrency(row.cantsol), align: "center" },
          { content: formatCurrency(row.cantpend), align: "center" },
          {
            content: <Acciones row={row} onFile={() => {}} onDelete={() => {}} />,
            action: () => null,
            disableTooltip: true,
          },
        ],

        collapsed: () => [],
      }}
    ></BaseTable>
  );
};

export default TableSheet;

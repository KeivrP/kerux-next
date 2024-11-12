"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { ITcevinv } from "../tcevinv-types";
import { useQueryData } from "@/server/fetch-data";
import { useReject } from "@/shared/hcdocorg/hooks/useHcdocorg";
import { BaseTable } from "@/components/table-material/genericTable";
import {
  Acciones,
  columnsFilterEventos,
  columnsHeadersEventos,
  columnsOrderEventos,
} from "./header-table";
import { formatDate } from "@/utils/main";
import { AsteriskIcon } from "lucide-react";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import BadgeModule from "@/components/badge/badge-mod";
import ActionCardHeader from "@/components/card/actionCardHeader";
import RadioButtonCodUad from "@/components/radio/radioButtonUnd";
import SimpleBackdrop from "@/components/backdrop/backdrop";
import Checkbox from "@/components/checkbox/checkbox";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import Hcdocorg from "@/shared/hcdocorg/Hcdocorg";

type Params = {
  iddoc: number[];
};

interface TcevinvTableProps {
  codsis?: string;
}

export const TcevinvTable = ({ codsis }: TcevinvTableProps) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState<Order[]>([
    { column: "Id.", id: "idevento", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);

  const [selectedRows, setSelectedRows] = useState<ITcevinv[]>([]);
  const [isOpenBackdrop, handleLoading] = useState(false);
  const [openFileTdorig, setOpenFileTdorig] = useState(false);
  const [row, setRow] = useState(0);

  const [rows, setRows] = useState<ITcevinv[]>([]);
  const [count, setCount] = useState(0);
  const [undGenerica, setUndGenerica] = useState("");
  const { data, isLoading } = useQueryData({
    entity: "eventos_admon",
    api: "doc",
    params: {
      ua: undGenerica,
      codsis: codsis,
      filter,
      order,
      page: page + 1,
      per: rowsPerPage,
    },
    dependency: [filter, order, page, rowsPerPage, undGenerica],
  });

  let iddocs = selectedRows.map((item) => item.iddoc);

  let params: Params = {
    iddoc: iddocs,
  };

  useEffect(() => {
    setRows(data?.eventoslist || []);
    setCount(data?.total);
  }, [data]);

  const handlePageChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const openFile = (row: ITcevinv) => {
    setOpenFileTdorig(true);
    setRow(row.iddoc);
  };

  const closeFile: () => void = () => {
    setOpenFileTdorig(false);
  };

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value));
    },
    []
  );

  const { mutate: createRechazar, isPending: loadingRechzar } = useReject();

  const { mutate: createReprocesar, isPending: loadingReprocesar } =
    useReject();

  useEffect(() => {
    if (loadingRechzar || loadingReprocesar) {
      handleLoading(true);
    } else {
      handleLoading(false);
    }
  }, [loadingRechzar, loadingReprocesar]);

  const handleRowSelect = (row: ITcevinv) => {
    setSelectedRows((prevRows) => {
      // Si el row ya está seleccionado, lo removemos del array
      if (prevRows.includes(row)) {
        return prevRows.filter((item) => item !== row);
      }
      // Si el row no está seleccionado, lo agregamos al array
      else {
        return [...prevRows, row];
      }
    });
  };

  return (
    <>
      <ActionCardHeader
        isAddButtonVisible={false}
        onApplyFilter={(filters) => setFilter(filters)}
        columnsFilter={columnsFilterEventos}
        onApplyOrder={(orders) => setOrder(orders)}
        columnsOrder={columnsOrderEventos}
        setFilter={setFilter}
        setOrder={setOrder}
      >
        <div className="flex items-center space-x-4">
          <RadioButtonCodUad
            onValueChange={(selectedValue) => {
              setUndGenerica(selectedValue);
            }}
          />
          <Button
            onClick={() => {
              createRechazar(params), setSelectedRows([]);
            }}
            variant="contained"
            color="error"
            disabled={selectedRows.length === 0} // Deshabilita el botón si selectedRows es igual a []
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h3">Rechazar Selección</Typography>
          </Button>

          <Button
            onClick={() => {
              createReprocesar(params), setSelectedRows([]);
            }}
            variant="contained"
            color="primary"
            disabled={selectedRows.length === 0} // Deshabilita el botón si selectedRows es igual a []
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h3">Reprocesar Selección</Typography>
          </Button>
        </div>
      </ActionCardHeader>

      <div
        style={{
          height: "71vh",
          backgroundColor: theme.palette.background.paper,
        }}
        className="max-w-screen-xl mx-auto max-h-full overflow-y-auto"
      >
        <BaseTable
          loading={isLoading}
          rows={rows}
          addCheckboxColumn={true}
          headers={columnsHeadersEventos}
          onSelectionChange={(selectedRowIndices) => {
            const updateSelect = selectedRowIndices.map((index) => rows[index]); // Seleccionar todo lo que aparezca
            setSelectedRows(updateSelect);
          }}
          collapsible={{
            visible: (row) => [
              {
                content: (
                  <Checkbox //selecionar uno a uno
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                  />
                ),
              },
              { content: row.idevento, handleCollapse: true, align: "left" },
              { content: row.descdoc, align: "left" },
              { content: <BadgeTipodoc tipo={row.tipoevento} /> },
              { content: formatDate(row.fecevento), align: "center" },
              { content: row.iddoc, align: "center" },
              { content: row.tipodoc, align: "center" },
              { content: formatDate(row.fecsts), align: "center" },
              {
                content: <BadgeModule codmenu={row.codsisgen} />,
                align: "center",
              },
              {
                content: <BadgeModule codmenu={row.codsisdest} />,
                align: "center",
              },
              {
                content: <Acciones row={row} onEdit={() => openFile(row)} />,
                align: "center",
              },
            ],

            collapsed: (row) => [
              { name: "Descripcion de Tipo", content: row.nomubic },
              {
                name: "Unidad de Proceso",
                content:
                  row.codundadmpro === "*" ? (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <AsteriskIcon
                        size={16}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Unidad Genérica{" "}
                    </span>
                  ) : (
                    row.codundadmpro
                  ),
              },
              { name: "Mensaje", content: row.mensaje },
            ],
          }}
        ></BaseTable>
        <BaseTablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={count}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></BaseTablePagination>
        <SimpleBackdrop show={isOpenBackdrop} />
        {row != 0 ? (
          <Hcdocorg
            actionDisabled={false}
            open={openFileTdorig}
            row={row}
            handleClose={closeFile}
          />
        ) : null}
      </div>
    </>
  );
};

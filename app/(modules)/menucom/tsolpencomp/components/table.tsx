'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Order } from "@/components/button/OrderButton";
import { Filter } from "@/components/button/FilterButton";
import { useQueryData } from "@/server/fetch-data";
import { ITSolRec } from "../../tsolrec/tsolrec-types";
import ActionCardHeader from "@/components/card/actionCardHeader";
import { Acciones, columnsFilter, columnsHeaders, columnsOrder } from "./header-table";
import { BaseTable } from "@/components/table-material/genericTable";
import { formatDate } from "@/utils/main";
import { BadgeTipoComp } from "@/components/badge/badge-estatus";
import { BaseTablePagination } from "@/components/table-material/baseTablePagination";
import { ConfirmDialog } from "@/components/modal/confirmDialog";

export const TsolpenCompTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState<Order[]>([
    { column: "iddoc", id: "nrosc", operator: "DESC" },
  ]);
  const [filter, setFilter] = useState<Filter[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(0);
  const [RowDelete, setRowDelete] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [mensajeText, setMensajeText] = useState(""); 

  const { data, isLoading, refetch } = useQueryData({
    entity: "compra",
    params: { page, per: rowsPerPage + 1, filter, order },
    api: "comp",
    dependency: [filter, order, page, rowsPerPage],
  });
  const count = useMemo(() => (data ? data.total : 0), [data?.total]);

  const rows = useMemo(
    () => (data ? data.solcomprslist : []),
    [data?.solcomprslist]
  );

  function evaluarEstado(id: number) {
    const row = rows.find((row: ITSolRec) => row.nrosc === id);
    if (!row) {
      return false;
    }
    return (row.stssc === "REC" || row.stssc === "COT") && row.ststes !== "ENV";
  }

  function generarMensaje(id: number) {
    let mensaje = "";
    const row = rows.find((row: ITSolRec) => row.nrosc === id);
    if (!row) {
      return mensaje;
    }
    if (row.stssc === "REC" && row.ststes !== "ENV") {
      mensaje = "Esta seguro de anular esta solicitud?";
    } else if (row.stssc === "COT" && row.ststes !== "ENV") {
      mensaje =
        "Esta solicitud ya tiene Cotizaciones. Está seguro de anular esta solicitud y todas las cotizaciones?";
    }
    return mensaje;
  }
/* 
  const { create: anularSolc, isLoading: loadingAnular } =
  useMutationData({
    entity: "anularCotizacion",
    api: "comp",

    onSuccess: (res) => {
      handleSnack(res, true, '');
    },
    onError: (error) => {
      console.log("No se hizo", error);
      handleSnack("Ha ocurrido un error", true, "error");
    },
    params: `id=${RowDelete}`,
  });
 */
/*   useEffect(() => {
    if (loadingAnular) {
      handleLoading("Anulando", true);
    } else {
      refetch()
      handleLoading("Anulando", false);
    }
  }, [loadingAnular]);
 */

  //funcion que abre
  const openFile = (row: number) => {
    setOpen(true);
    setRow(row);
  };
  //cierra
  const closeFile: () => void = () => {
    setOpen(false);
  };

  //si queremos cerrar sin hacer ningun cambio
  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  // esta se coloca donde queremos que abra nuestro mensaje
  const handleDeleteClick = (id: number) => {
    setOpenDialog(true);
    setRowDelete(id)
    let mensajeGenerado = generarMensaje(id);
    setMensaje(mensajeGenerado);
  };
  //Funcion al confirmar
const handleConfirmDelete = async () => {
/*   anularSolc({ sol_compra: { mensajes: mensajeText } });
 */  setOpenDialog(false)
};

  const handlePageChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value));
    },
    []
  );

 
  return (
    <>
     <ActionCardHeader
        isAddButtonVisible={false}
        onApplyFilter={(filters) => setFilter(filters)}
        columnsFilter={columnsFilter}
        onApplyOrder={(orders) => setOrder(orders)}
        columnsOrder={columnsOrder}
        setFilter={setFilter}
        setOrder={setOrder}
      />

      <div
        style={{
          height: "71vh",
          width: "100%",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <BaseTable
          loading={isLoading}
          rows={rows}
          headers={columnsHeaders}
          collapsible={{
            visible: (row) => [
              { content: row.nrosc, align: "center" },
              { content: row.descsc, align: "left" },
              { content: row.idsolsum, align: "center" },
              { content: formatDate(row.fecsts), align: "center" },
              { content:<BadgeTipoComp tipo={row.stssc} />, align: "center" },
              { content:<BadgeTipoComp tipo={row.stsres} />, align: "center" },
              {
                content: <Acciones
                row={row}
                onFile={(id) => console.log(id)}
              />,
                action: () => null,
                disableTooltip: true,
              },
            ],

            collapsed: () => [],
          }}
        ></BaseTable>
        <BaseTablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={count}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></BaseTablePagination>
      </div>
      <ConfirmDialog
        mode={"alert"}
        title={"Anular Solicitud"}
        text={mensaje}
        open={openDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        mensaje={true}
        onMensajeChange={(text) => setMensajeText(text)} // Manejar el cambio en el texto

      />

{/*       <Frengsc open={open} row={row} handleClose={closeFile} />
 */}    </>
  );
};

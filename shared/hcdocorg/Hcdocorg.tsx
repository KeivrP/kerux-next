import React, { useEffect, useMemo, useState } from "react";

import { Paper, Typography, useTheme } from "@mui/material";

import FieldTables from "./components/fields.table";

import FieldRight from "./components/field.right";
import FieldLeft from "./components/field.left";
import FieldMiddle from "./components/field.middle";

import { useQueryData } from "@/server/fetch-data";
import ModalDialog from "@/components/modal/modalDialog";
import TextDivider from "@/components/ui/textDivider";
import { EraserIcon, RectangleHorizontalIcon, RouteIcon, XIcon } from "lucide-react";
import { formatDate } from "@/utils/main";
import { useReject, useReprocess } from "./hooks/useHcdocorg";
import BreadcumbsGlobal from "@/components/breadcrumbs/breadcrumbs-file";
import ButtonForms from "@/components/button/buttonForms";

interface HcdocorgProps {
  open: boolean;
  handleClose: () => void;
  row: number;
  actionDisabled: boolean;
}

const Hcdocorg: React.FC<HcdocorgProps> = ({
  open,
  handleClose,
  row,
  actionDisabled,
}) => {
  const theme = useTheme();

/*   const maxEvento = useMemo(() => file?.detmaxevento, [file]);
 */  const [loading, handleLoading] = useState<boolean>(false);
  const [historyRows, setHistoryRows] = useState<number[]>([]); // Establece el valor inicial de historyRows como [row]
  const [selectedRow, setSelectedRow] = useState(0);
  const [docuRow, setDocuRow] = useState<number>(0);

  const rowHijo = (nuevoId: number) => {
    setDocuRow(nuevoId);
  };

  useEffect(() => {
    if (row > 0) {
      setSelectedRow(row);
      setHistoryRows([row]);
    }
  }, [row]);

  useEffect(() => {
    // Agrega el valor de row y docuRow al final del array
    if (docuRow > 0) {
      setSelectedRow(docuRow);
      setHistoryRows((prevHistoryRows) => {
        if (prevHistoryRows.includes(docuRow)) {
          return prevHistoryRows.slice(0, prevHistoryRows.indexOf(docuRow) + 1);
        } else {
          return [...prevHistoryRows, docuRow];
        }
      });
    }
  }, [docuRow]);

  const handleNumberClick = (number: number) => {
    setHistoryRows((prevHistoryRows) => {
      if (prevHistoryRows.includes(number)) {
        return prevHistoryRows.slice(0, prevHistoryRows.indexOf(number) + 1);
      } else {
        return [...prevHistoryRows];
      }
    });

    setSelectedRow(number);
  };

  const { data, isLoading } = useQueryData({
    entity: "documentos",
    type: selectedRow.toString(),
    api: "doc",
    dependency: [selectedRow],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const { mutate: createRechazar, isPending: loadingRechzar } = useReject();

  const { mutate: createReprocesar, isPending: loadingReprocesar } =
    useReprocess();

  useEffect(() => {
    if (loadingRechzar || loadingReprocesar) {
      handleLoading(true);
    } else {
      handleLoading(false);
    }
  }, [loadingRechzar, loadingReprocesar]);

  return (
    <ModalDialog
      dialogOpen={open}
      handleClose={handleClose}
      title="Historia del Documento"
      disableCancelButton={true} // Pass the prop to disable the cancel button
      width="xl"
      PaperProps={{
        sx: {
          minHeight: "95%",
        },
      }}
    >
      <>
      
      </>
    
    </ModalDialog>
  );
};

export default Hcdocorg;


{/* <>
<div className="flex flex-row justify-between items-center px-20 mb-12">
  <div>
    <div className="flex flex-row justify-start items-center space-x-8">
      <div>
        <RouteIcon />
      </div>
      <div>
        <Typography variant="body2">Ruta Id Doc.</Typography>
      </div>
      <div>
        <BreadcumbsGlobal
          numbers={historyRows}
          onNumberClick={handleNumberClick}
        />
      </div>
    </div>
  </div>
  <div>
    <div className="flex">
      {!actionDisabled && (
        <>
          <div>
            <ButtonForms
              onClick={() => {
                createReprocesar({ iddoc: [row] });
              }}
              sx={{ color: theme.palette.alert.main}}
            >
              <XIcon
                size={16}
              />
              <Typography variant="caption">Rechazar</Typography>
            </ButtonForms>
          </div>
          <div>
            <ButtonForms
              onClick={() => createRechazar({ iddoc: [row] })}
              sx={{ color: theme.palette.primary.main}}
            >
              <RectangleHorizontalIcon
               size={16}
              />
              <Typography variant="caption">Reprocesar</Typography>
            </ButtonForms>
          </div>
        </>
      )}
    </div>
  </div>
</div>
<div className="flex flex-row px-20 space-x-20">
  <div className="w-1/2">
    <FieldLeft isLoading={isLoading} />
  </div>
  <div className="w-1/2">
    <FieldRight
      onIdCambio={rowHijo}
      isLoading={isLoading}
      actionDisabled={actionDisabled}
    />
  </div>
  <div className="w-full mt-[-16px]">
    <TextDivider> Información Monetaria</TextDivider>
  </div>
  <div className="w-full mt-[-16px]">
    <FieldMiddle isLoading={isLoading} />
  </div>
  <div className="w-full mt-[-16px]">
    <TextDivider> Eventos </TextDivider>
  </div>
  <div className="w-full mt-[-16px]">
    <Typography
      color={theme.palette.primary.dark}
      style={{ textTransform: "capitalize", fontWeight: 600 }}
    >
      <div
        style={{
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        <EraserIcon />
      </div>
      <div style={{ display: "inline-block", marginLeft: 5 }}>
        El evento está {/* {maxEvento?.descstsevento} por{" "}
        {capitalize(maxEvento?.CodSisDest?.descripcion)} - desde el{" "}
        {maxEvento?.fecsts ? formatDate(maxEvento?.fecsts) : ""}
      </div>
    </Typography>
    <Paper elevation={3} style={{ borderRadius: 10, marginTop: 2 }}>
      <FieldTables isLoading={isLoading} />
    </Paper>
  </div>
</div>
</> */}
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";

import { Paper, Typography, useTheme } from "@mui/material";

import FieldTables from "./components/fields.table";

import FieldRight from "./components/field.right";
import FieldLeft from "./components/field.left";
import FieldMiddle from "./components/field.middle";

import { useQueryData } from "@/server/fetch-data";
import ModalDialog from "@/components/modal/modalDialog";
import TextDivider from "@/components/ui/textDivider";
import {
  CircleSlash,
  EraserIcon,
  RectangleHorizontalIcon,
  RefreshCcw,
  RouteIcon,
  XIcon,
} from "lucide-react";
import { formatDate } from "@/utils/main";
import { useReject, useReprocess } from "./hooks/useHcdocorg";
import BreadcumbsGlobal from "@/components/breadcrumbs/breadcrumbs-file";
import ButtonForms from "@/components/button/buttonForms";
import { useFormContextHcdocorg } from "@/provider/hcdocorg-provider";
import { capitalize } from "lodash";
import Grid from "@mui/material/Grid2";

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

  const [loading, handleLoading] = useState<boolean>(false);

  const { formData, setFormData, initialData } = useFormContextHcdocorg();
  const maxEvento = useMemo(() => formData?.detmaxevento, [formData]);
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
      setFormData(data);
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
      <div style={{ padding: "26px" }}>
        <Grid container spacing={3} marginBottom={2} justifyContent="space-between">
          <Grid size={{xl: 9.5, lg: 8 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RouteIcon />
              <Typography variant="body2" style={{ marginLeft: "8px", marginRight: '8px', color: theme.palette.primary.main }}>
                Ruta Id Doc.
              </Typography>
              <BreadcumbsGlobal
                numbers={historyRows}
                onNumberClick={handleNumberClick}
              />
            </div>
          </Grid>
          {!actionDisabled && (
            <>
              <Grid size={{xl: 2.5, lg: 3 }}>
                <ButtonForms
                  onClick={() => {
                    createReprocesar({ iddoc: row });
                  }}
                  sx={{ color: theme.palette.alert.main }}
                >
                  <CircleSlash size={18} />
                  <Typography variant="h3" marginLeft={1}>Rechazar</Typography>
                </ButtonForms>

                <ButtonForms
                  onClick={() => {
                    createReprocesar({ iddoc: row });
                  }}
                  sx={{ color: theme.palette.success.main }}
                >
                  <RefreshCcw size={18}  />
                  <Typography variant="h3" marginLeft={1}>Reprocesar</Typography>
                </ButtonForms>
              </Grid>
            </>
          )}
        </Grid>
        <Grid container spacing={3} marginBottom={2}>
          <Grid size={6}>
            <FieldLeft
              formData={formData}
              setFormData={setFormData}
              initialData={initialData}
              isLoading={isLoading}
            />
          </Grid>
          <Grid size={6}>
            <FieldRight
              onIdCambio={rowHijo}
              isLoading={isLoading}
              actionDisabled={actionDisabled}
              setFormData={setFormData}
              initialData={initialData}
              formData={formData}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextDivider> Información Monetaria</TextDivider>
            <FieldMiddle
              isLoading={isLoading}
              formData={formData}
              initialData={initialData}
              setFormData={setFormData}
            />
          </Grid>
          <Grid size={12}>
            <TextDivider> Eventos </TextDivider>
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
                El evento está {maxEvento?.descstsevento} por{" "}
                {capitalize(maxEvento?.CodSisDest?.descripcion)} - desde el{" "}
                {maxEvento?.fecsts ? formatDate(maxEvento?.fecsts) : ""}
              </div>
            </Typography>
            <Grid size={12}>
              <Paper elevation={3} style={{ borderRadius: 10, marginTop: 2 }}>
                <FieldTables
                  setFormData={setFormData}
                  initialData={initialData}
                  formData={formData}
                  isLoading={isLoading}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ModalDialog>
  );
};

export default Hcdocorg;

/* eslint-disable react-hooks/exhaustive-deps */

import { OpenIcon } from "@/components/icons/table-icon";
import { SkeletonInput } from "@/components/skeleton/detail";
import { BaseTable } from "@/components/table-material/genericTable";
import TextDivider from "@/components/ui/textDivider";
import { ConditionalWrapper, formatDate } from "@/utils/main";
import {
  Box,
  Chip,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { capitalize } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FormContextProps } from "../hcdocorg-utils";
import BadgeModule from "@/components/badge/badge-mod";
import Grid from "@mui/material/Grid2";
import BadgeTipodoc from "@/components/badge/badge-estatus";
import { Input } from "@/components/ui/input";

/* import { ChipStatusDoc } from "../../../../../../shared/components/dataDisplay/chipCustomDoc";
 */

interface FieldRightProps extends FormContextProps {
  onIdCambio: (nuevoId: number) => void; // Una función que recibe un nuevo ID como argumento y lo pasa al componente padre
  isLoading: boolean;
  actionDisabled: boolean;
}

function FieldRight({
  onIdCambio,
  isLoading,
  actionDisabled,
  formData: data,
  setFormData,
  initialData,
}: FieldRightProps) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState<number>(0);
  const RowDependientes = useMemo(() => {
    return data?.detdependientes;
  }, [data]);

  useEffect(() => {
    // Cuando el ID cambia, lo pasas al padre
    onIdCambio(selectedId);
  }, [selectedId]);

  const Detalle = useMemo(() => {
    return data?.cabiddoc;
  }, [data]);

  // Crear un array utilizando el valor de Detalle
  const RowReferencia = useMemo(() => {
    if (Detalle.iddocref) {
      // Aquí puedes definir cómo quieres crear tu array utilizando el valor de Detalle
      return Detalle.iddocref;
    }
    return 0;
  }, [Detalle]);

  return (
    <Grid container spacing={2}>
      <Grid size={1} mt={2}>
        <BadgeModule codmenu={Detalle.origen} />
      </Grid>
      <Grid size={5.5}>
        <Typography variant="h3">Origen</Typography>{" "}
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={
              Detalle.SistemaOrigen
                ? capitalize(Detalle.SistemaOrigen.descripcion)
                : ""
            }
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={5.5}>
        <Typography variant="h3" className="mb-1">
          Referencia
        </Typography>
        <ConditionalWrapper condition={isLoading} wrapper={SkeletonInput}>
          <Input
            value={Detalle.refdoc}
            id="outlined-size-small"
            defaultValue="Small"
            readOnly
          />
        </ConditionalWrapper>
      </Grid>
      <Grid size={12}>
        <Typography variant="h3" className="mb-1">
          Estatus
          <BadgeTipodoc tipo={Detalle.stsdoc} />
        </Typography>
        {Detalle.mensaje && !actionDisabled && (
          <Box className="bg-amber-300 rounded-md p-2">
            <Typography>
              <b>Mensaje:</b> {Detalle.mensaje}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid size={12}>
        <TextDivider>Documentos Relacionados</TextDivider>
      </Grid>
      {RowReferencia > 0 && (
        <Grid size={12}>
          <Typography variant="h3" className="mb-1">
            Referencia{" "}
            <Chip
              label={RowReferencia}
              className="bg-primary-main text-transparency-main px-1 mx-1"
            />
            <Tooltip
              className="bg-background-default rounded-full"
              title="Abrir"
            >
              <IconButton
                onClick={() => {
                  setSelectedId(RowReferencia ? RowReferencia : 0); // Actualiza el estado con el ID de la fila seleccionada
                }}
                color="primary"
                size="small"
              >
                <OpenIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
      )}
      <Grid size={12}>
        <Typography variant="h3" className="mb-1">
          Dependientes
        </Typography>
        <Grid
          style={{
            height: RowDependientes.length === 0 ? "0rem" : "9.5rem",
            width: "100%",
          }}
        >
          <BaseTable
            loading={isLoading}
            rows={RowDependientes}
            headers={[
              {
                label: "Id.Doc",
                align: "center",
                color: theme.palette.transparency.main,
                padding: "0.25rem",
              },
              {
                label: "Tipo",
                align: "center",
                color: theme.palette.transparency.main,
                padding: "0.25rem",
              },
              {
                label: "Reverso",
                align: "center",
                color: theme.palette.transparency.main,
                padding: "0.25rem",
              },
              {
                label: "Fecha",
                align: "center",
                color: theme.palette.transparency.main,
                padding: "0.25rem",
              },
              {
                label: "Abrir",
                align: "center",
                color: theme.palette.transparency.main,
                padding: "0.25rem",
              },
            ]}
            collapsible={{
              visible: (row) => [
                { content: row.iddoc, align: "center" },
                { content: row.tipodoc, align: "center" },
                {
                  content: row.indreverso,
                  align: "center",
                },
                {
                  content: formatDate(row.fecdoc),
                  align: "center",
                },
                {
                  content: (
                    <Tooltip
                      className="bg-background-default rounded-full"
                      title="Abrir"
                    >
                      <IconButton
                        onClick={() => {
                          setSelectedId(row.iddoc); // Actualiza el estado con el ID de la fila seleccionada
                        }}
                        color="primary"
                        size="small"
                      >
                        <OpenIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                  align: "center",
                },
              ],
              collapsed: () => [],
            }}
          >
            {RowDependientes.length === 0 && (
              <Box className="bg-gray-500rounded-md p-2 flex justify-center">
                <Typography variant="caption" align="center">
                  ESTE DOCUMENTO NO CUENTA CON DEPENDENCIAS
                </Typography>
              </Box>
            )}
          </BaseTable>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FieldRight;

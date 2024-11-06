'use client'
import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  TableRow,
  TableCell,
  Tooltip,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { ConditionalWrapperTable } from "@/utils/main";
import { KeyboardIcon } from "lucide-react";
import { StyledTableCell } from "./styledTableCell";
import { makeStyles } from "@mui/styles";

//import { AsteriskIcon } from "../../icons/adqIcons/AsteriskIcon";

// Define los estilos para la fila colapsable
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    cursor: "pointer",
  },
  collapsedContainer: {
    display: "flex",
    marginBottom: "2%",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  collapsedContent: {
    display: "inline-block",
    margin: "0.1%",
  },
});

// Define los tipos de datos esperados para las filas visibles y colapsadas
export type VisibleRow = {
  disableTooltip?: boolean;
  tooltip?: string;
  content: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "inherit" | "center" | "justify" | undefined;
  padding?: string;
  handleCollapse?: boolean;
  action?: () => void;
};

export type CollapsedRow = {
  name: string;
  content: React.ReactNode;
};

// Define los tipos de datos esperados para la fila colapsable
type CollapsibleRowProps = {
  visible: VisibleRow[];
  collapsed: CollapsedRow[] | React.ReactNode;
  rowAction?: (() => false | void) | undefined;
};

// Define el componente de la fila colapsable
export const CollapsibleRow: React.FC<CollapsibleRowProps> = ({
  visible,
  collapsed,
  rowAction,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const theme = useTheme();

  // Función para alternar el estado de la fila colapsable
  const toggle = () => setOpen(!open);

  return (
    <>
      {/* Fila visible */}

      <TableRow className={classes.root}>
        {visible.map((vRow, index) => (
          <ConditionalWrapperTable
            key={`vRow-${index}`}
            condition={!vRow.disableTooltip}
            wrapper={(children) => <Tooltip title={""}>{children}</Tooltip>}
          >
            <StyledTableCell
              className={vRow.className}
              align={vRow.align || "center"}
              onClick={vRow.handleCollapse ? toggle : vRow.action || rowAction}
            >
              {/* Icono para expandir o contraer la fila colapsable */}
              {vRow.handleCollapse && (
                <IconButton aria-label="expand row" size="small">
                  {open ? <KeyboardIcon /> : <KeyboardIcon />}
                </IconButton>
              )}
              <Typography
                component="span"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "0.75rem",
                }}
              >
                {vRow.content}
              </Typography>
            </StyledTableCell>
          </ConditionalWrapperTable>
        ))}
      </TableRow>
      {/* Fila colapsable */}
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: theme.palette.paper.light,
          }}
          colSpan={15}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div
              className={classes.collapsedContainer}
              style={{ flexDirection: "column" }}
              key={""}
            >
              {/* Si collapsed es un array, crea una sección para cada elemento */}
              {Array.isArray(collapsed)
                ? collapsed.map((cRow) => {
                    return (
                      !!cRow.content && (
                        <Grid container alignItems="center">
                          <Grid item mt={2}>
                            <Typography style={{fontSize: 12}} component="span">
                              <b>{cRow.name}</b>:
                            </Typography>
                          </Grid>
                          <Grid item mt={2} ml={0.5}>
                            <Typography style={{fontSize: 12}} component="span">
                              {cRow.content}
                            </Typography>
                          </Grid>
                        </Grid>
                      )
                    );
                  })
                : // Si collapsed no es un array, muestra el contenido tal cual
                  collapsed}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

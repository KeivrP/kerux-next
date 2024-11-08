/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { Table, Tooltip, Typography, useTheme } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@mui/styles";
import { coerce, ConditionalWrapper } from "@/utils/main";
import { SkeletonTable } from "../skeleton/table";
import { CollapsedRow, CollapsibleRow, VisibleRow } from "./collapsibleRow";


export interface HeadersName {
  label: string;
  icon?: JSX.Element | null;
  align?: "left" | "right" | "inherit" | "center" | "justify";
  minWidth?: number;
  color?: string;
  padding?: string;
  font?: string;
  tooltip?: string;
  border?: boolean;
}

interface BaseTableProps {
  rows: any[];
  headers?: HeadersName[]; // Update the type of the headers prop to an array of HeadersName objects
  onSelectionChange?: (selectedRowIndices: number[]) => void; // New prop
  loading: boolean;
  collapsible?: {
    visible: (row: any) => VisibleRow[];
    collapsed: (row: any) => CollapsedRow[];
  };
  children?: React.ReactNode;
  addCheckboxColumn?: boolean; // New prop to indicate whether to add checkbox column or not
  rowAction?: (row: any) => void;
}

const useStyles = makeStyles(() => ({

  container: {
    maxHeight: "90%",
    height: "90%",
    width: "100%",
  },
  actions: {
    // display:"flex",
    // justifyContent:"space-between"
  },
}));

const CustomTableHead = withStyles((theme) => ({
  root: {
    backgroundColor: '#d9e2ff',
    position: "sticky",
    top: 0,
    zIndex: 1,
    border: 1
  },
}))(TableHead);

export const BaseTable: React.FC<BaseTableProps> = React.memo(
  ({
    rows,
    headers: parentHeaders,
    onSelectionChange,
    loading,
    collapsible,
    children,
    addCheckboxColumn = false, // Default value for addCheckboxColumn is true
  }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [headers, setHeaders] = useState<HeadersName[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    useEffect(() => {
      if (Array.isArray(parentHeaders)) {
        setHeaders(parentHeaders); // Update the type to HeadersName[]
      } else {
        setHeaders(parentHeaders || [{ label: "", icon: null }]); // Update the type to HeadersName[]
      }
    }, [rows, parentHeaders]);

    useEffect(() => {
      if (onSelectionChange) {
        onSelectionChange(selectedRows);
      }
    }, [selectedRows, onSelectionChange]);

    return (
      <>
        <TableContainer
          elevation={0}
          component={Paper}
          className="table-auto min-w-full rounded-xl border"
          style={{ height: "80%" }} // Added height of 90%
        >
          <Table className="table-auto min-w-full rounded-xl">
            <CustomTableHead>
              <TableRow>
          {addCheckboxColumn && ( // Add this condition to check if checkbox column should be added
            <TableCell align="center">
              <div className="flex items-center py-5 px-5">
                <input
            type="checkbox"
            className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
            checked={selectedRows.length === rows.length}
            onChange={() =>
              setSelectedRows(
                selectedRows.length === rows.length
                  ? []
                  : rows.map((_, index) => index)
              )
            }
                />
              </div>
            </TableCell>
          )}
          {headers.map((header, index) => (
            <Tooltip title={header.tooltip} key={index}>
              <TableCell
                align={header.align}
                style={{
            minWidth: header.minWidth,
            backgroundColor: header.color,
            padding: header.padding,
            border: header.border
              ? `1px solid rgba(9, 10, 14, 0.50)`
              : "",
            zIndex: 1, // Asegúrate de que la celda se superponga a las demás
                }}
                className="p-4  whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                <Typography
            className="whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
            {header.icon ? (
              <>
                <div
                  style={{
              display: "inline-block",
              verticalAlign: "middle",
                  }}
                >
                  {header.icon}
                </div>
                <div style={{ display: "inline-block" }}>
                  {t(header.label)}
                </div>
              </>
            ) : (
              t(header.label)
            )}
                </Typography>
              </TableCell>
            </Tooltip>
          ))}
              </TableRow>
            </CustomTableHead>
            <TableBody>
              <ConditionalWrapper
          condition={loading}
          wrapper={() => (
            <SkeletonTable
              columns={coerce(
                headers.length + (addCheckboxColumn ? 1 : 0),
                1,
                100
              )}
              rows={10}
            />
          )}
              >
          {rows.map((row, index) => (
            <CollapsibleRow
              key={index}
              visible={collapsible?.visible(row) || []}
              collapsed={collapsible?.collapsed(row) || []}
            />
          ))}
              </ConditionalWrapper>
            </TableBody>
          </Table>
        </TableContainer>
        {children}
      </>
    );
  }
);

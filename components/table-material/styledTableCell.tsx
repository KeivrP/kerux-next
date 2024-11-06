
'use client'
import { withStyles } from '@mui/styles';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { Theme } from '@mui/material/styles';

// Define los tipos de datos esperados para el componente StyledTableCell
interface StyledTableCellProps extends TableCellProps {
  children: React.ReactNode;
  className?: string; 
  align: "left" | "right" | "inherit" | "center" | "justify" | undefined;
  onClick?: () => void;
}

// Componente que aplica estilos personalizados a una celda de tabla
export const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: '#D9E2FF',
    color: "#142F62",

  },
  body: {
    width: "auto",
    maxWidth: "26.5vw",
    maxHeight: "1vh",
    borderBottom: `1px solid rgba(9, 10, 14, 0.50)`,
    borderLeft: `1px solid rgba(9, 10, 14, 0.50)`,
    borderRight: `1px solid rgba(9, 10, 14, 0.50)`,

  },
}))(TableCell) as React.ComponentType<StyledTableCellProps>;

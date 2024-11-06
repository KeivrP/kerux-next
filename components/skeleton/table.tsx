import { TableRow } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { StyledTableCell } from '../table-material/styledTableCell';

// Define los tipos de datos esperados para el componente SkeletonTable
type SkeletonTableProps = {
  rows: number;
  columns: number;
};

// Componente que renderiza una tabla de esqueletos con la cantidad de filas y columnas especificadas
export const SkeletonTable = ({ rows, columns }: SkeletonTableProps): JSX.Element[] => {
  return [...Array(rows)].map((_, rIndex) => {
    return (
      <TableRow key={`skeleton-row-${rIndex}`}>
        {[...Array(columns)].map((_, cIndex) => (
          <StyledTableCell align='center' key={`skeleton-column-${cIndex}`}>
            <Skeleton />
          </StyledTableCell>
        ))}
      </TableRow>
    );
  });
};

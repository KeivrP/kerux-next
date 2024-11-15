'use client'
import { TablePagination } from "@mui/material";
import React from "react";

interface BaseTablePaginationProps {
  totalRows: number;
  rowsPerPage: number;
  page: number;
  // maxPage:number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BaseTablePagination: React.FC<BaseTablePaginationProps> = ({
  totalRows,
  rowsPerPage,
  page,
  handlePageChange,
  handleChangeRowsPerPage,
/*   maxPage,
 */  
}) => {
  return (
    <div className="table-pagination">
      <TablePagination
        component={"div"}
        rowsPerPageOptions={[25, 50, 100]}
        count={totalRows ?? 0}
        rowsPerPage={rowsPerPage}
        page={page ?? 0}
/*         maxPage={maxPage}
 */        SelectProps={{
          inputProps: { 'aria-label': 'Productos por página' },
          native: true,
        }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

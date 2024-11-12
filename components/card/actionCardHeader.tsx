import CardHead from "./cardHead";
import FilterButton, { Filter } from "../button/FilterButton";
import OrderButton, { Order } from "../button/OrderButton";
import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";
/* import { SearchInput } from "../searchInput"; */

interface ActionCardHeaderProps {
  children?: React.ReactNode;
  onApplyFilter?: (filters: Filter[]) => void;
  columnsFilter?: Filter[];
  onApplyOrder?: (order: Order[]) => void;
  columnsOrder?: Order[];
  add?: () => void;
  setOrder?: (a: any) => void;
  setFilter?: (a: any) => void;
  isAddButtonVisible?: boolean;
  isAddFilterVisible?: boolean;
  isAddOrderVisible?: boolean;
  actions?: ButtonProps;
  title?: string | React.ReactNode;
}[];


const ActionCardHeader = ({
  children = [],
  columnsFilter = [],
  columnsOrder = [],
  setOrder,
  setFilter,
  add,
  title,
  isAddButtonVisible = true,
  isAddFilterVisible = true, // Set the default value to true
  isAddOrderVisible = true, // Set the default value to true
  actions,
}: ActionCardHeaderProps) => {
  return (
    <>
      <CardHead>
        <div className="flex items-center justify-between">
          <div className="flex-grow">{children}</div>

          <div className="flex space-x-4">
            {isAddFilterVisible && (
              <FilterButton
                columns={columnsFilter}
                onApplyFilter={(a) => setFilter && setFilter(a)}
              />
            )}
            {isAddOrderVisible && (
              <OrderButton
                columns={columnsOrder}
                onApplyOrder={(a) => setOrder && setOrder(a)}
              />
            )}
            {isAddButtonVisible && (
              <Button
                onClick={() => add && add()}
                variant="contained"
                color={actions?.color || "primary"}
                disabled={actions?.disabled}
                sx={{ textTransform: "none" }}
              >
                <Typography variant="h3">{title || "+ AÑADIR"}</Typography>
              </Button>
            )}
          </div>
        </div>
      </CardHead>
    </>
  );
};

export default ActionCardHeader;

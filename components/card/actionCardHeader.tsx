import { Grid } from "@mui/material";
import CardHead from "./cardHead";
import { Filter } from "../button/FilterButton";
import { Order } from "../button/OrderButton";
/* import { SearchInput } from "../searchInput"; */

interface ActionCardHeaderProps {
  renderSection?: () => JSX.Element;
  children?: [
    React.ReactElement<{
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    }>?,
    React.ReactElement<{
      onApplyFilter: (filters: Filter[]) => void;
      columns: string[];
    }>?,
    React.ReactElement<{
      onApplyOrder: (order: Order[]) => void;
      columns: string[];
    }>?,
    React.ReactElement<{ onClick: () => void }>?,
    React.ReactElement<{ onClick: () => void }>?
  ];
  isAddButtonVisible?: boolean;
  isAddButtonVisible2?: boolean;
  isAddSelectVisible?: boolean;
  isAddFilterVisible?: boolean;
  isAddOrderVisible?: boolean;
}

const ActionCardHeader = ({
  renderSection,
  children = [],
  isAddButtonVisible = false,
  isAddButtonVisible2 = false,
  isAddSelectVisible = false,
  isAddFilterVisible = true, // Set the default value to true
  isAddOrderVisible = true, // Set the default value to true
}: ActionCardHeaderProps) => {
  const buttons = [
    { isVisible: isAddButtonVisible, child: children[2] },
    { isVisible: isAddButtonVisible2, child: children[3] },
  ];
  return (
    <>
      <CardHead>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          {renderSection && (
            <Grid item xs={8}>
              <Grid container direction="row">
                <Grid item xs={12}>
                  {renderSection()}
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item>
            <Grid container direction="row">
              {isAddSelectVisible && <Grid item>{children[4]}</Grid>}
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="row" spacing={4}>
              {isAddFilterVisible && <Grid item>{children[0]}</Grid>}

              {isAddOrderVisible && <Grid item>{children[1]}</Grid>}
              {buttons.map(
                (button, index) =>
                  button.isVisible && (
                    <Grid item key={index}>
                      {button.child}
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardHead>
    </>
  );
};

export default ActionCardHeader;

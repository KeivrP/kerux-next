import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";

export interface OptionType {
  value: string;
  label: string;
  firstValue: string;
  restValues: string;
}

interface CheckboxesTagsProps {
  options: OptionType[];
  label?: string;
  onSelectionChange: (selected: OptionType[]) => void;
  renderOption?: (props: any, option: OptionType) => React.JSX.Element;
}

const CheckboxesTags = React.forwardRef((props: CheckboxesTagsProps, ref) => {
  const [selectedOptions, setSelectedOptions] = React.useState<OptionType[]>([]);

  React.useImperativeHandle(ref, () => ({
    clearSelection: () => {
      setSelectedOptions([]);
    },
  }));

  const handleChange = (_: any, newValue: OptionType[]) => {
    if (newValue.length === 0) {
      setSelectedOptions([]);
      props.onSelectionChange([]);
    } else {
      const lastSelectedOption = newValue[newValue.length - 1];
      const isPreviouslySelected = selectedOptions.some(
        (option) => option.value === lastSelectedOption.value
      );

      let newSelectedOptions;
      if (isPreviouslySelected) {
        newSelectedOptions = selectedOptions.filter(
          (option) => option.value !== lastSelectedOption.value
        );
      } else {
        newSelectedOptions = [...selectedOptions, lastSelectedOption];
      }

      setSelectedOptions(newSelectedOptions);
      props.onSelectionChange(newSelectedOptions);
    }
  };

  return (
    <Autocomplete
      multiple
      options={props.options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      value={selectedOptions}
      renderOption={(props, option) => (
        <Box
          bgcolor={
            selectedOptions.some((o) => o.value === option.value)
              ? "primary.light"
              : ""
          }
        >
          <li {...props}>
            <b>{option.firstValue}</b> | {option.restValues}
          </li>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder={props.label} sx={{ background: "white" }} />
      )}
      ListboxProps={{
        style: { maxHeight: '200px', overflowY: 'auto' }, // Ajusta la altura del menú desplegable
      }}
    />
  );
});

export default CheckboxesTags;
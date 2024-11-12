import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Paper } from "@mui/material";

export interface AutocompleteOption {
  value: string;
  label: string;
}

interface AsynchronousProps {
  options: AutocompleteOption[];
  loading: boolean;
  onSelectionChange: (selected: AutocompleteOption | null) => void;
  defaultValue?: string;
  text?: "value" | "label";
  value?: "value" | "label";
  reset?: boolean; // Agrega esta prop
  disabled?: boolean;
  size?: "small" | "medium";
  sx?: {};
  label?: string;
  ListboxProps?: {};
}

export default function AutocompleteAsync({
  options,
  loading,
  onSelectionChange,
  defaultValue,
  text,
  reset, // Agrega esta prop
  disabled = false,
  value,
  size = 'small',
  sx,
  label,
  ListboxProps,
}: AsynchronousProps) {
  const defaultOption =
    options.find((option) => option.value === defaultValue) || null;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AutocompleteOption | null>(
    defaultOption
  );

  useEffect(() => {
    if (selected?.value == defaultValue || selected?.label == defaultValue) return
    onSelectionChange(selected);
  }, [selected]);

  // Agrega este useEffect para manejar el reset
  useEffect(() => {
    if (reset) {
      setSelected(null);
    }
  }, [reset]);

  useEffect(() => {
    setSelected({
      value: defaultValue ? defaultValue : "",
      label: defaultValue ? defaultValue : "",
    });
  }, [defaultValue]);

  const getOptionLabel = (option: AutocompleteOption) => {
    if (text === "value") {
      return option.value;
    } else if (text === "label") {
      return option.label;
    } else {
      return `${option.value} - ${option.label}`;
    }
  };
  const getOptionValue = (option: AutocompleteOption) => {
    if (value === "value") {
      return option.value;
    } else if (value === "label") {
      return option.label;
    } else {
      return `${option.value} - ${option.label}`;
    }
  };

  return (
    <Autocomplete
      PaperComponent={({ children }) => (
        <Paper style={{ minWidth: 400 }}>{children}</Paper>
      )}
      open={open}
      fullWidth
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      ListboxProps={ListboxProps}
      value={selected}
      onChange={(_, newValue) => setSelected(newValue)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={getOptionLabel}
      loading={loading}
      disabled={disabled}
      sx={sx}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {getOptionValue(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          size={size}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}

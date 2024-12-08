/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import { FormContextProps, initialRootData } from "../../tsolsum-types";
import LeftInput from "./left-input";
import RightInput from "./rigth-input";

interface DataInputProps extends FormContextProps {
  isLoading: boolean;
}

const DataInput: React.FC<DataInputProps> = ({
  setFormData,
  formData,
  isLoading,
}) => {
  return (
    <Grid container spacing={4} padding={4}>
      <Grid size={6}>
        <LeftInput
          isLoading={isLoading}
          setFormData={setFormData}
          formData={formData}
          initialData={initialRootData}
        />
      </Grid>
      <Grid size={6}>
        <RightInput
          isLoading={isLoading}
          setFormData={setFormData}
          formData={formData}
          initialData={initialRootData}
        />
      </Grid>
    </Grid>
  );
};

export default DataInput;

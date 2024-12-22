"use client";

import {
  FormContextProps,
  Root,
  initialData as initialRootData,
} from "@/app/(modules)/menulog/tsolmod/tsolmod-types";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

const FormContext = createContext<FormContextProps | null>(null);

interface FormProviderTsolmodProps {
  children: ReactNode;
}

export const FormProviderTsolmod = ({ children }: FormProviderTsolmodProps) => {
  const [formData, setFormData] = useState<Root>(initialRootData);
  const initialData = initialRootData;
  return (
    <FormContext.Provider value={{ formData, setFormData, initialData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContextTsolmod = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      "Form context is not available. Please ensure you are using the FormProviderTsolmod component."
    );
  }

  return context;
};

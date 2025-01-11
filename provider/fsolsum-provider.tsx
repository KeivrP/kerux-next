"use client";

import {
  FormContextProps,
  Root,
  initialRootData,
} from "@/app/(modules)/menulog/tsolsum/tsolsum-types";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

const FormContext = createContext<FormContextProps | null>(null);

interface FormProviderFsolsumProps {
  children: ReactNode;
}

export const FormProviderFsolsum = ({ children }: FormProviderFsolsumProps) => {
  const [formData, setFormData] = useState<Root>(initialRootData);
  const initialData = initialRootData;
  return (
    <FormContext.Provider value={{ formData, setFormData, initialData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContextFsolsum = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      "Form context is not available. Please ensure you are using the FormProviderFsolsum component."
    );
  }

  return context;
};

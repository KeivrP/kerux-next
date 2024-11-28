'use client';
import { FormContextProps, IFasigcom, initialDataFasigcom } from '@/app/(modules)/menucom/tsolrec/tsolrec-types';
import React, { createContext, useContext, useState, type ReactNode } from 'react';


const FormContext = createContext<FormContextProps | null>(null);

interface FormProviderFasigcomProps {
  children: ReactNode
}

export const FormProviderFasigcom = ({ children }: FormProviderFasigcomProps) => {
  const [formData, setFormData] = useState<IFasigcom>(initialDataFasigcom);
  const initialData = initialDataFasigcom;
  return <FormContext.Provider value={{ formData, setFormData, initialData }}>{children}</FormContext.Provider>;
};

export const useFormContextFasigcom = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContextFasigcom must be used within a FormProviderFasigcom');
  }
  return context;
};

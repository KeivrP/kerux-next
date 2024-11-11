'use client';
import { FormContextProps, IHcdorcorg, initialStateHcdorcorg } from '@/shared/hcdocorg/hcdocorg-utils';
import React, { createContext, useContext, useState, type ReactNode } from 'react';


const FormContext = createContext<FormContextProps | null>(null);

interface FormProviderHcdocorgProps {
  children: ReactNode
}

export const FormProviderHcdocorg = ({ children }: FormProviderHcdocorgProps) => {
  const [formData, setFormData] = useState<IHcdorcorg>(initialStateHcdorcorg);
  const initialData = initialStateHcdorcorg;
  return <FormContext.Provider value={{ formData, setFormData, initialData }}>{children}</FormContext.Provider>;
};

export const useFormContextHcdocorg = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContextHcdocorg must be used within a FormProviderHcdocorg');
  }
  return context;
};

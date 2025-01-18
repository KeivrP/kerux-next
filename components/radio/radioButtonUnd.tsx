/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { UserLogin } from 'next-auth';
import { Session } from '@/types/next-auth';

interface RadioButtonGroupProps {
  onValueChange?: (value: string) => void;
}

const RadioButtonCodUad: React.FC<RadioButtonGroupProps> = ({
  onValueChange,
}) => {
  const { data, status } = useSession();
  const [user, setUser] = useState<UserLogin | null>(null);
  const coduadmproband = user?.coduadmproband;
  const IndTodasUjec = user?.indtodasujec;

  const [value, setValue] = useState("");
  const [disabledUA, setDisabledUA] = useState(true);
  const [disabledTodos, setDisabledTodos] = useState(true);


  useEffect(() => {
    if (status === 'authenticated' && data) {
      const request = data as unknown as Session;
      setUser(request.request.auth.user.user as UserLogin);
    }
  }, [data, status]);

  useEffect(() => {
    let defaultValue = "";
    if (coduadmproband !== "*") {
      defaultValue = "UA";
    } else {
      defaultValue = "Todas";
    }
    setValue(defaultValue);
    if (onValueChange) {
      onValueChange(defaultValue);
    }
  }, [coduadmproband]);

  // Este efecto se ejecuta después de que el componente se haya renderizado
  useEffect(() => {
    // Verifica si coduadmproband es diferente de '*'
    if (coduadmproband !== "*") {
      // Si coduadmproband no es '*', entonces entra en este bloque
      // Luego verifica si IndTodasUjec es igual a 'S'
      if (IndTodasUjec === "S") {
        // Si IndTodasUjec es 'S', entonces habilita ambos botones de radio
        setDisabledUA(false);
        setDisabledTodos(false);
      } else {
        // Si IndTodasUjec no es 'S', entonces solo habilita el botón de radio 'UA'
        setDisabledUA(false);
      }
    } else {
      // Si coduadmproband es '*', entonces habilita el botón de radio 'Todas'
      setDisabledTodos(false);
    }
    // Este efecto se ejecuta cada vez que cambian coduadmproband o IndTodasUjec
  }, [coduadmproband, IndTodasUjec]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if (onValueChange) {
      onValueChange((event.target as HTMLInputElement).value);
    }
  };

  return (
    <RadioGroup aria-label="opciones" row value={value} onChange={handleChange}>
      <FormControlLabel
        value="UA"
        control={<Radio className="checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" />}
        label="Unidad de Proceso"
        disabled={disabledUA}
        classes={{ label: "flex items-center cursor-pointer text-gray-600 text-sm font-normal" }}
      />
      <FormControlLabel
        value="Todas"
        control={<Radio className="checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" />}
        label="Todas"
        disabled={disabledTodos}
        classes={{ label: "flex items-center cursor-pointer text-gray-600 text-sm font-normal" }}
      />
    </RadioGroup>
  );
};

export default RadioButtonCodUad;

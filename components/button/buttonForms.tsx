import React from "react";
import { Button } from "@mui/material";

interface GlobalButtonProps {
  onClick: () => void;
  color: string;
  children?: React.ReactNode;
  disabled?: boolean; // Nueva propiedad
}

const ButtonForms: React.FC<GlobalButtonProps> = ({ onClick, color, children, disabled }) => {
  return (
    <Button
      onClick={onClick}
      color="primary"
      disabled={disabled} // Usar la propiedad aquí
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.625rem",
        padding: "0.5rem 1rem",
        textTransform: "none",
        height: "2.1875rem",
        color: color
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonForms;

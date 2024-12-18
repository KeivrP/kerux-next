import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface GlobalButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const ButtonForms: React.FC<GlobalButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      style={{
        justifyContent: "center",
        alignItems: "center",
        textTransform: "none",
        height: "2.1875rem",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonForms;

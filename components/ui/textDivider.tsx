import { Typography, Box } from "@mui/material";
import React, { ReactNode } from "react";

interface TextDividerProps {
  children: ReactNode;
}

const TextDivider: React.FC<TextDividerProps> = ({ children }) => (
  <Box display="flex" alignItems="center">
    <Box flexGrow={0.1} borderBottom={2} borderColor="divider" />
    <Box px={2}>
      <Typography style={{ fontSize: "0.8rem", fontWeight: 'bold' }} align="center">
        {children}
      </Typography>
    </Box>
    <Box flexGrow={2} borderBottom={2} borderColor="divider" />
  </Box>
);

export default TextDivider;

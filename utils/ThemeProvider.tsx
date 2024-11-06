/* eslint-disable react/no-unescaped-entities */
'use client'
import { FC, ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { esES } from "@mui/material/locale";
import { TypographyOptions } from "@mui/material/styles/createTypography";
// Importar la fuente Inter
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
</style>;

interface ThemeProviderProps {
  children: ReactNode;
}

declare module "@mui/material/styles" {
  interface Palette {
    done: Palette["primary"];
    alert: Palette["primary"];
    pending: Palette["primary"];
    paper: Palette["primary"];
    transparency: Palette["primary"];
  }
  interface PaletteOptions {
    done: PaletteOptions["primary"];
    alert: PaletteOptions["primary"];
    pending: PaletteOptions["primary"];
    paper: PaletteOptions["primary"];
    transparency: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    helper: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  helper: React.CSSProperties;
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const lightTheme = createTheme(
  {
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      caption: {
        fontSize: "0.5rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "0.75rem", // 150%
      },
      helper: {
        fontSize: "0.625rem",
        fontStyle: "normal",
        fontWeight: 300,
        lineHeight: "0.75rem", // 120%
      },
      h5: {
        fontSize: "0.75rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.16725rem", // 155.633%
      },
      h2: {
        //fontFamily: 'Inter',
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1.5rem" /* 150% */,
        letterSpacing: "0.00938rem",
      },
      h3: {
        //fontFamily: 'Inter',
        fontSize: "0.9375rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.25rem" /* 150% */,
      },
      h4: {
        //fontFamily: 'Inter',
        fontSize: "0.625rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.5rem" /* 150% */,
        letterSpacing: "0.00938rem",
      },
      h1: {
        //fontFamily: 'Inter',
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.5rem" /* 150% */,
        letterSpacing: "0.00938rem",
        textTransform: "uppercase", // Agregar esta línea para que el texto sea en mayúsculas
      },
      body1: {
        //fontFamily: 'Inter',
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1.16725rem" /* 150% */,
        //textTransform: "capitalize" // Agregar esta línea para que el texto sea en mayúsculas
      },
    } as ExtendedTypographyOptions,

    palette: {
      mode: "light",
      background: {
        default: "#EEf2F6",
        paper: "#FFFFFF",
      },
      transparency: {
        main: "#fff",
        dark: "rgba(9, 10, 14, 0.50)",
        light: "rgba(217, 217, 217, 0.10)",
      },

      primary: {
        main: "#142F62", // tono principal
        light: "#d9e2ff", // tono claro
        dark: "#001944", // tono oscuro
      },
      secondary: {
        main: "#575E71", // tono principal
        light: "#D9E2FF", // tono claro
        dark: "#141b2c", // tono oscuro
      },
      done: {
        main: "#1b6c31", // tono principal
        light: "#8bff94", // tono claro
        dark: "#002108", // tono oscuro
      },
      alert: {
        main: "#ba1a1a", // tono principal
        light: "#ffc3bc", // tono claro
        dark: "#410002", // tono oscuro
      },
      pending: {
        main: "#ed8f02", // tono principal
        light: "#ffc978", // tono claro
        dark: "#bd7100", // tono oscuro
      },
      paper: {
        main: "#eef2f6",
        light: "#e7edf3",
        dark: "#44464f",
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: { // 'root' es el nombre de la regla
            padding: "8px",
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "dashed" },
            style: {
              color: "#142F62",
              borderColor: "#142F62",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            },
          },
        ],
      },
    },
  },
  esES
);

const darkTheme = createTheme(
  {
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      caption: {
        fontFamily: "Inter",
        fontSize: "0.5rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "0.75rem", // 150%
      },
      helper: {
        fontFamily: "Inter",
        fontSize: "0.625rem",
        fontStyle: "normal",
        fontWeight: 300,
        lineHeight: "0.75rem", // 120%
      },
      h5: {
        fontFamily: "Inter",
        fontSize: "0.75rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.16725rem", // 155.633%
      },
      h2: {
        //fontFamily: 'Inter',
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1.5rem" /* 150% */,
        letterSpacing: "0.00938rem",
      },
      h3: {
        //fontFamily: 'Inter',
        fontSize: "0.9375rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.25rem" /* 150% */,
      },
      h4: {
        //fontFamily: 'Inter',
        fontSize: "0.625rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.5rem" /* 150% */,
        letterSpacing: "0.00938rem",
      },
      h1: {
        //fontFamily: 'Inter',
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "1.5rem" /* 150% */,
        letterSpacing: "0.00938rem",
        textTransform: "uppercase", // Agregar esta línea para que el texto sea en mayúsculas
      },
      body1: {
        //fontFamily: 'Inter',
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1.16725rem" /* 150% */,
        //textTransform: "capitalize" // Agregar esta línea para que el texto sea en mayúsculas
      },
    } as ExtendedTypographyOptions,
    palette: {
      mode: "dark",
      background: {
        default: "#181f2c",
        paper: "#151a22",
      },
      transparency: {
        main: "#fff",
        light: "rgba(9, 10, 14, 0.50)",
        dark: "rgba(217, 217, 217, 0.10)",
      },
      primary: {
        main: "#b0c6ff", // tono principal
        dark: "#2e60c0", // tono claro
        light: "#001944", // tono oscuro
      },
      secondary: {
        main: "#c0c6dc", // tono principal
        dark: "#7b84a1", // tono claro
        light: "#293042", // tono oscuro
      },
      done: {
        main: "#a3f5aa", // tono principal
        dark: "#1b6c31", // tono claro
        light: "#00531f", // tono oscuro
      },
      alert: {
        main: "#ffb4ab", // tono principal
        dark: "#ba1a1a", // tono claro
        light: "#93000a", // tono oscuro
      },
      pending: {
        main: "#ffc978", // tono principal
        dark: "#ed8f02", // tono claro
        light: "#bd7100", // tono oscuro
      },
      paper: {
        main: "#151a22",
        light: "#43526d",
        dark: "#e3e2e6",
      },
    },
  },
  esES
);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
/*   const currentTheme = mode === "light" ? lightTheme : darkTheme;
 */  const currentTheme = lightTheme;

  return <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;

/**
 * @author Abhijit Baldawa
 *
 * Theme provider module
 */

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, blue } from "@mui/material/colors";

const appTheme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },
});

/**
 * @public
 *
 * Component which provides theme to the entire
 * react children tree
 */
const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;

export { AppThemeProvider };

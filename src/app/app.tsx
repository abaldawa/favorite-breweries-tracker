/**
 * @author Abhijit Baldawa
 */

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AppThemeProvider } from "./theme";
import { AppRouter } from "./config/app-router";
import { Popup } from "./shared/components/app-components/popup/popup";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppThemeProvider>
        <Popup />
        <AppRouter />
      </AppThemeProvider>
    </>
  );
};

export { App };

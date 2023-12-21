/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Backdrop
      sx={{
        color: (theme) => theme.palette.primary.contrastText,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export { Loading };

/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "0.3rem",
  gap: "0.5rem",
});

Container.defaultProps = {
  component: "div",
};

export { Container };

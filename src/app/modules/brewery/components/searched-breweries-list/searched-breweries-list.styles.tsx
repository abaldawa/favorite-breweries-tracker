/**
 * @author Abhijit Baldawa
 */

import { Box, Button, styled } from "@mui/material";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem",
  gap: "0.25rem",
});

const AddToListButton = styled(Button)({
  padding: "0.5rem 0.75rem",
  borderRadius: "0.5rem",
  display: "flex",
  marginLeft: "auto",
  flexShrink: "0",
  cursor: "inherit",
  backgroundColor: "#3f3c3c",
  color: "white",
});

AddToListButton.defaultProps = {
  variant: "contained",
  color: "secondary",
};

export { Container, AddToListButton };

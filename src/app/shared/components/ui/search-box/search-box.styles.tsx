/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  position: "relative",
  alignItems: "flex-start",
});

const InputSearchContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "searchResultDisplayed",
})<{ searchResultDisplayed?: boolean }>(({ searchResultDisplayed }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "0.75rem",
  gap: "0.75rem",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "1rem",
  borderRadius: searchResultDisplayed ? "0.5rem 0.5rem 0 0" : "0.5rem",
  boxShadow: searchResultDisplayed
    ? "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
    : undefined,
  border: "1px solid #D4D8E8",
}));

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  outline: "none",
  fontFamily: theme.typography.fontFamily,
  fontWeight: "inherit",
  fontStyle: "inherit",
  fontSize: "inherit",

  "&::placeholder": {
    color: theme.typography.subtitle1.color,
  },
}));

const SearchResultsWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "top",
})<{ top: `${number}px` }>(({ top }) => ({
  position: "absolute",
  maxHeight: "15rem",
  background: "#FFF",
  overflowY: "scroll",
  width: "100%",
  top,
  left: 0,
  zIndex: 1,
  borderRadius: "0 0 0.5rem 0.5rem",
  border: "1px solid #D4D8E8",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
}));

export { Container, InputSearchContainer, Input, SearchResultsWrapper };

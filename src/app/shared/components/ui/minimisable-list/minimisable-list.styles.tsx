/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  position: "relative",
  border: "1px solid black",
  borderRadius: "3px",
  cursor: "pointer",
});

Container.defaultProps = {
  component: "div",
};

const SelectionTextWrapper = styled(Box)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxHeight: "19px",
});

SelectionTextWrapper.defaultProps = {
  component: "div",
};

const List = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  borderRadius: "0 0 3px 3px",
  listStyle: "none",
  background: "white",
  border: "1px solid",
  width: "100%",
  position: "absolute",
  maxHeight: "8rem",
  overflow: "scroll",
  zIndex: 100,
  margin: 0,
  padding: 0,
});

List.defaultProps = {
  component: "ul",
};

export { Container, SelectionTextWrapper, List };

/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

Container.defaultProps = {
  component: "div",
};

const FilterInfoWrapper = styled(Box)({
  position: "relative",
  border: "1px solid black",
  margin: "0 10px",
});

FilterInfoWrapper.defaultProps = {
  component: "div",
};

const ClearFilter = styled(Box)({
  position: "absolute",
  top: "-11px",
  right: "-8px",
  borderRadius: "50%",
  width: "1rem",
  height: "1rem",
  display: "flex",
  justifyContent: "center",
  color: "white",
  background: "red",
  paddingBottom: "2px",
  alignItems: "center",
  cursor: "pointer",
});

ClearFilter.defaultProps = {
  component: "span",
};

const ColumnListWrapper = styled(Box)({
  width: "10rem",
});

ColumnListWrapper.defaultProps = {
  component: "div",
};

export { Container, FilterInfoWrapper, ClearFilter, ColumnListWrapper };

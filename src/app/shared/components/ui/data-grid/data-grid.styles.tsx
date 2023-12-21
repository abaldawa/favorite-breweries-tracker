/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  display: "inline-block",
  position: "relative",
});

Container.defaultProps = {
  component: "div",
};

interface DataGridWrapperProps {
  gridColumnsWidth: Array<string | number>;
}

const DataGridWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    !(
      ["gridColumnsWidth"] satisfies (keyof DataGridWrapperProps)[] as string[]
    ).includes(prop as string),
})<DataGridWrapperProps>((props) => ({
  display: "grid",
  gridTemplateColumns: props.gridColumnsWidth.join(" "),
  gridAutoRows: "max-content",
  border: "1px solid rgb(224, 224, 224)",
  borderRadius: "10px",
  overflow: "scroll",
  position: "relative",
}));

DataGridWrapper.defaultProps = {
  component: "div",
};

const LoadingWrapper = styled(Box)({
  pointerEvents: "none",
  letterSpacing: "0.8rem",
  position: "absolute",
  width: "100%",
  textAlign: "center",
  top: "50%",
  color: "rgba(130, 130, 130, 0.80)",
  fontSize: "1.2rem",
});

LoadingWrapper.defaultProps = {
  component: "div",
};

export type { DataGridWrapperProps };
export { Container, DataGridWrapper, LoadingWrapper };

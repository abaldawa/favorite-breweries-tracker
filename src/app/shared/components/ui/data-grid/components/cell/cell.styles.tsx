/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

interface ContainerProps {
  highlightEvenOddRows?: boolean;
  isEvenRow: boolean;
}

const Container = styled(Box, {
  shouldForwardProp: (prop) =>
    !(
      [
        "highlightEvenOddRows",
        "isEvenRow",
      ] satisfies (keyof ContainerProps)[] as string[]
    ).includes(prop as string),
})<ContainerProps>(({ highlightEvenOddRows, isEvenRow }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  borderBottom: "1px solid rgb(224, 224, 224)",
  backgroundColor:
    typeof highlightEvenOddRows === "boolean"
      ? isEvenRow
        ? "rgba(0, 0, 0, 0.04)"
        : undefined
      : undefined,
}));

Container.defaultProps = {
  component: "div",
};

const Content = styled(Box)({
  fontSize: "clamp(0.2rem, 2cqw + 0.5rem, 1.1rem)",
});

Content.defaultProps = {
  component: "span",
};

export { Container, Content };

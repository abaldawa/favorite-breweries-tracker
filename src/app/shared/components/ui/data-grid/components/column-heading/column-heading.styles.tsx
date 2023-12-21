/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

interface ContainerProps {
  fixedHeaderWhenScroll?: boolean;
}

const Container = styled(Box, {
  shouldForwardProp: (prop) =>
    !(
      ["fixedHeaderWhenScroll"] satisfies (keyof ContainerProps)[] as string[]
    ).includes(prop as string),
})<ContainerProps>(({ fixedHeaderWhenScroll }) => ({
  textAlign: "center",
  padding: "0.5rem",
  borderBottom: "1px solid rgb(224, 224, 224)",
  background: "lightyellow",
  ...(fixedHeaderWhenScroll
    ? {
        position: "sticky",
        top: "0px",
        zIndex: 1,
      }
    : undefined),
}));

Container.defaultProps = {
  component: "div",
};

const HeadingTextWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "clamp(0.2rem, 2cqw + 0.5rem, 1.1rem)",
});

HeadingTextWrapper.defaultProps = {
  component: "div",
};

export { Container, HeadingTextWrapper };

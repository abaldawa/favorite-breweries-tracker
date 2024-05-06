/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const BodyItemWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "0.5rem",
}));

const BodyItemKey = styled(Box)(() => ({
  fontWeight: "bold",
}));

BodyItemKey.defaultProps = {
  component: "span",
};

const BodyItemValue = styled(Box)(() => ({}));

BodyItemValue.defaultProps = {
  component: "span",
};

export { BodyItemWrapper, BodyItemKey, BodyItemValue };

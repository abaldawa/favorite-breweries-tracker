/**
 * @author Abhijit Baldawa
 */

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DetailsWrapper = styled(Box)(() => ({
  maxHeight: 400,
  minWidth: 500,
  overflow: "scroll",
}));

DetailsWrapper.defaultProps = {
  component: "div",
};

export { DetailsWrapper };

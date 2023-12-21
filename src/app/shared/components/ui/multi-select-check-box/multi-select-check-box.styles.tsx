/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const ListItem = styled(Box)(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
}));

ListItem.defaultProps = {
  component: "li",
};

export { ListItem };

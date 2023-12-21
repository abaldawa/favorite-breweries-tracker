/**
 * @author Abhijit Baldawa
 */

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ListContainer = styled(Box)(() => ({
  padding: "20px",
  marginBottom: "20px",
  background: "#fff",
}));

ListContainer.defaultProps = {
  component: "div",
};

const SearchIconWrapper = styled(Box)({
  color: "#999",
});

const ListHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

ListHeader.defaultProps = {
  component: "div",
};

const List = styled(Box)(() => ({
  listStyle: "none",
}));

ListHeader.defaultProps = {
  component: "ul",
};

export { ListContainer, ListHeader, List, SearchIconWrapper };

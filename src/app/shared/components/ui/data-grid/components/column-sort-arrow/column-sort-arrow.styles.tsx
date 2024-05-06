/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";
import { ColumnSortOrder } from "../../data-grid";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "0 5px",
  cursor: "pointer",
});

Container.defaultProps = {
  component: "div",
};

interface ArrowProps {
  sortOrder: ColumnSortOrder;
  type: "UP" | "DOWN";
}

const Arrow = styled(Box, {
  shouldForwardProp: (prop) =>
    !(
      ["sortOrder", "type"] satisfies (keyof ArrowProps)[] as string[]
    ).includes(prop as string),
})<ArrowProps>(({ sortOrder, type: arrowType }) => ({
  width: 0,
  height: 0,
  border: "5px solid transparent",
  background: "transparent",
  ...(arrowType === "UP"
    ? {
        borderBottom: `solid 7px ${
          sortOrder === "ASC" ? "black" : "#00000040"
        }`,
        borderTopWidth: 0,
      }
    : {
        borderTop: `solid 7px ${sortOrder === "DES" ? "black" : "#00000040"}`,
        borderBottomWidth: 0,
        marginTop: "1px",
      }),
}));

Arrow.defaultProps = {
  component: "span",
};

export { Container, Arrow };

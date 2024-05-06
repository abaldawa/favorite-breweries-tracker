/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { ColumnSortOrder } from "../../data-grid";
import * as S from "./column-sort-arrow.styles";

interface ColumnSortArrowProps {
  sortOrder: ColumnSortOrder;
  onSortClick: () => void;
  children?: never;
}

const ColumnSortArrow: React.FC<ColumnSortArrowProps> = ({
  sortOrder,
  onSortClick,
}) => {
  return (
    <S.Container onClick={onSortClick}>
      <S.Arrow type="UP" sortOrder={sortOrder} />
      <S.Arrow type="DOWN" sortOrder={sortOrder} />
    </S.Container>
  );
};

export { ColumnSortArrow };

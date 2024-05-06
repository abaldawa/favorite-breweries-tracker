/**
 * @author Abhijit Baldawa
 */

import React, { memo } from "react";
import { MultiSelectCheckbox } from "../../../../ui/multi-select-check-box/multi-select-check-box";
import * as S from "./grid-toolbar.styles";

interface GridToolbarProps {
  totalActiveFilters: number;
  columns: string[];
  selectedColumns: { [key: string]: string };
  onColumnShowOrHideHandler: (selectedColumns?: string[]) => void;
  clearActiveFilters: () => void;
  children?: never;
}

const GridToolbarComponent: React.FC<GridToolbarProps> = ({
  columns,
  selectedColumns,
  onColumnShowOrHideHandler,
  totalActiveFilters,
  clearActiveFilters,
}) => {
  return (
    <S.Container>
      {!!totalActiveFilters && (
        <S.FilterInfoWrapper>
          <span>{totalActiveFilters} Filters</span>
          <S.ClearFilter onClick={clearActiveFilters}>x</S.ClearFilter>
        </S.FilterInfoWrapper>
      )}
      <S.ColumnListWrapper>
        <MultiSelectCheckbox
          values={columns}
          selectedValues={selectedColumns}
          alwaysShowSelectionText
          selectionText="Select columns:"
          onSelectionChange={onColumnShowOrHideHandler}
        />
      </S.ColumnListWrapper>
    </S.Container>
  );
};

export const GridToolbar = memo(
  GridToolbarComponent
) as typeof GridToolbarComponent;

/**
 * @author Abhijit Baldawa
 */

import React, { memo } from "react";
import {
  ColumnSortOrder,
  DataGridColumn,
  DataGridProps,
  VisibleColumns,
} from "../../data-grid";
import { ColumnHeading } from "../column-heading/column-heading";
import { FilterChangeFun } from "../../hooks/use-column-filter";
import { ActiveColumnSorter } from "../../hooks/use-column-sorter";

export interface ColumnHeadingsProps<RowData>
  extends Pick<DataGridProps<RowData>, "columns" | "fixedHeaderWhenScroll"> {
  onFilterChange?: FilterChangeFun<RowData>;
  onSortChange: (
    fieldId: DataGridColumn<RowData>["fieldId"],
    columnSortOrder: ColumnSortOrder
  ) => void;
  activeColumnSorter: ActiveColumnSorter<RowData> | undefined;
  visibleColumns: VisibleColumns;
}

const ColumnHeadingsComponent = <RowData,>(
  props: ColumnHeadingsProps<RowData>
) => {
  const {
    columns,
    onFilterChange,
    onSortChange,
    activeColumnSorter,
    fixedHeaderWhenScroll,
    visibleColumns,
  } = props;

  return (
    <>
      {columns.map((column) => {
        if (!visibleColumns[column.headerName]) {
          return null;
        }
        return (
          <ColumnHeading
            key={column.fieldId as string}
            fixedHeaderWhenScroll={fixedHeaderWhenScroll}
            enableSorting={!!column.sort}
            activeColumnSorter={activeColumnSorter}
            onSortChange={onSortChange}
            fieldId={column.fieldId}
            headerName={column.headerName}
            type={column.type}
            filter={column.filter}
            onFilterChange={onFilterChange}
          />
        );
      })}
    </>
  );
};

export const ColumnHeadings = memo(
  ColumnHeadingsComponent
) as typeof ColumnHeadingsComponent;

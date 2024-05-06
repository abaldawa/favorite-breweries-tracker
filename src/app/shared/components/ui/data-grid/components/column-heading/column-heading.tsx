/**
 * @author Abhijit Baldawa
 */

import React from "react";
import type { DataGridColumn, DataGridProps } from "../../data-grid";
import type { ColumnSortOrder } from "../../data-grid";
import { Input } from "../../../../ui/input/input";
import { ColumnSortArrow } from "../column-sort-arrow/column-sort-arrow";
import { ColumnHeadingsProps } from "../column-headings/column-headings";
import * as S from "./column-heading.styles";

interface ColumnHeadingProps<RowData>
  extends Pick<
      DataGridColumn<RowData>,
      "headerName" | "type" | "filter" | "fieldId"
    >,
    Pick<DataGridProps<RowData>, "fixedHeaderWhenScroll">,
    Pick<
      ColumnHeadingsProps<RowData>,
      "onFilterChange" | "onSortChange" | "activeColumnSorter"
    > {
  enableSorting?: boolean;
}

export const ColumnHeading = <RowData,>(props: ColumnHeadingProps<RowData>) => {
  const {
    headerName,
    type: columnType,
    filter,
    fieldId,
    onFilterChange,
    onSortChange,
    activeColumnSorter,
    enableSorting,
    fixedHeaderWhenScroll,
  } = props;

  const getFilter = () => {
    if (filter) {
      if (filter.renderColumnFilter) {
        /**
         *  If the user has provided a custom component to show as a filter on this
         *  column then show that instead and notify any filter changes.
         */
        return filter.renderColumnFilter((arg: any, clearFilter) => {
          onFilterChange?.(fieldId, arg, clearFilter);
        });
      } else {
        /**
         * If the user has NOT provided any filter component to render then render an
         * appropriate filter component based on the columnType
         */
        switch (columnType) {
          case "number":
            return (
              <Input<number>
                type="number"
                onInputChange={({ inputValue, clearInput }) =>
                  onFilterChange?.(fieldId, inputValue, clearInput)
                }
                style={{ width: "100%" }}
              />
            );
          case "boolean":
            return (
              <Input<boolean>
                type="checkbox"
                onInputChange={({ inputValue, clearInput }) =>
                  onFilterChange?.(fieldId, inputValue, clearInput)
                }
                style={{ width: "100%" }}
              />
            );
          case "string":
          default:
            return (
              <Input<string>
                type="text"
                onInputChange={({ inputValue, clearInput }) =>
                  onFilterChange?.(fieldId, inputValue, clearInput)
                }
                style={{ width: "100%" }}
              />
            );
        }
      }
    }
  };

  const onSortClick = () => {
    if (onSortChange) {
      let columnSortOrder: ColumnSortOrder;

      if (activeColumnSorter?.[fieldId]?.sortOrder === "ASC") {
        columnSortOrder = "DES";
      } else if (activeColumnSorter?.[fieldId]?.sortOrder === "DES") {
        columnSortOrder = undefined;
      } else {
        columnSortOrder = "ASC";
      }

      onSortChange(fieldId, columnSortOrder);
    }
  };

  return (
    <S.Container fixedHeaderWhenScroll={fixedHeaderWhenScroll}>
      <S.HeadingTextWrapper>
        <b>{headerName}</b>
        {enableSorting && (
          <ColumnSortArrow
            sortOrder={activeColumnSorter?.[fieldId]?.sortOrder}
            onSortClick={onSortClick}
          />
        )}
      </S.HeadingTextWrapper>
      {getFilter()}
    </S.Container>
  );
};

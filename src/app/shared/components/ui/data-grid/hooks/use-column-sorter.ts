/**
 * @author Abhijit Baldawa
 */

import { useMemo, useState } from "react";
import { ColumnSorter, ColumnSortOrder, DataGridColumn } from "../data-grid";
import { useEventCallback } from "../../../../hooks/use-event-callback";
import { useDidUpdate } from "../../../../hooks/use-did-update";

export type GridSortObj = Record<string, any>;

export type ActiveColumnSorter<RowData> = Record<
  DataGridColumn<RowData>["fieldId"],
  {
    fieldSortObj: GridSortObj;
    sortOrder: NonNullable<ColumnSortOrder>;
  }
>;

export const useColumnSorter = <RowData>(
  columns: DataGridColumn<RowData>[],
  onGridSortChange: (fieldSortObj?: GridSortObj) => void
) => {
  const [activeColumnSorter, setActiveColumnSorter] =
    useState<ActiveColumnSorter<RowData>>();

  /**
   * 1. Creates a map of filterId to column sorter handler function for
   *    all those columns where column.sort field is set by the user.
   */
  const fieldIdToSortChangHandlerFun = useMemo(() => {
    return columns.reduce((res, column) => {
      if (column.sort) {
        res[column.fieldId] = column.sort.onSortChange;
      }
      return res;
    }, {} as Record<DataGridColumn<RowData>["fieldId"], ColumnSorter["onSortChange"]>);
  }, [columns]);

  /**
   * 2. Notify the grid sort handler if there are any changes to the
   *    active sort column
   */
  useDidUpdate(() => {
    if (activeColumnSorter) {
      const [{ fieldSortObj }] = Object.values(activeColumnSorter) as [
        ActiveColumnSorter<RowData>[keyof RowData]
      ];

      onGridSortChange(fieldSortObj);
    } else {
      onGridSortChange();
    }
  }, [activeColumnSorter]);

  /**
   * Update the active sorter if the user clicks sort on any column.
   * NOTE: ONLY one column sorter is active at any given time
   */
  const onSortChange = useEventCallback(
    (
      fieldId: DataGridColumn<RowData>["fieldId"],
      columnSortOrder: ColumnSortOrder
    ) => {
      const onFieldSortChangeHandler = fieldIdToSortChangHandlerFun[fieldId];
      if (columnSortOrder) {
        setActiveColumnSorter({
          [fieldId]: {
            fieldSortObj: onFieldSortChangeHandler(columnSortOrder),
            sortOrder: columnSortOrder,
          },
        } as ActiveColumnSorter<RowData>);
      } else {
        setActiveColumnSorter(undefined);
      }
    }
  );

  return { activeColumnSorter, onSortChange };
};

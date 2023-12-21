/**
 * @author Abhijit Baldawa
 */

import { useMemo, useState } from "react";
import {
  ColumFilter,
  DataGridColumn,
  GridFilterObj,
  VisibleColumns,
} from "../data-grid";
import { useEventCallback } from "../../../../hooks/use-event-callback";
import { useDidUpdate } from "../../../../hooks/use-did-update";

export type FilterChangeFun<RowData> = (
  fieldId: DataGridColumn<RowData>["fieldId"],
  searchTerm: any,
  clearFilter: () => void
) => void;

interface UseColumnFilterArgs<RowData> {
  columns: DataGridColumn<RowData>[];
  visibleColumns: VisibleColumns;
  columnNameToFieldId: VisibleColumns;
  onGridFilterChange: (gridFilterObj?: GridFilterObj) => void;
}

export const useColumnFilter = <RowData>({
  columns,
  visibleColumns,
  columnNameToFieldId,
  onGridFilterChange,
}: UseColumnFilterArgs<RowData>) => {
  const [activeFieldIdToFilter, setActiveFieldIdToFilter] = useState<
    Record<
      string,
      {
        fieldFilterObj: Record<string, any>;
        clearFilter: () => void;
      }
    >
  >({});

  /**
   * 1. Creates a map of filterId to filter change handler function
   *    for all those columns where column.filter field is set by the user.
   */
  const fieldIdToOnFilterChangeFun = useMemo(() => {
    return columns.reduce((res, column) => {
      if (column.filter) {
        res[column.fieldId] = column.filter.onFilterChange;
      }

      return res;
    }, {} as Record<DataGridColumn<RowData>["fieldId"], ColumFilter["onFilterChange"]>);
  }, [columns]);

  /**
   * 2. If any active filter changes then creates an entire filter object
   *    representing the filter state of entire grid and calls grid level
   *    filter change handler for processing
   */
  useDidUpdate(() => {
    const totalActiveFilters = Object.keys(activeFieldIdToFilter).length;

    if (totalActiveFilters) {
      const gridFilterObj = Object.values(activeFieldIdToFilter).reduce(
        (result, { fieldFilterObj }) => {
          Object.assign(result, fieldFilterObj);

          return result;
        },
        {} as Record<string, any>
      );

      onGridFilterChange(gridFilterObj);
    } else {
      onGridFilterChange();
    }
  }, [activeFieldIdToFilter]);

  /**
   * 3. If visible columns change then update the active filters to only those
   *    visible columns and REMOVE the filters from columns which are not visible
   *    so we have a predictable output.
   */
  useDidUpdate(() => {
    const visibleFieldIds = Object.values(visibleColumns).map(
      (columnHeaderName) => columnNameToFieldId[columnHeaderName]
    );

    setActiveFieldIdToFilter((prevActiveFilter) => {
      return Object.entries(prevActiveFilter).reduce(
        (newActiveFilter, [fieldId, filterObj]) => {
          if (visibleFieldIds.includes(fieldId)) {
            newActiveFilter[fieldId] = filterObj;
          }

          return newActiveFilter;
        },
        {} as typeof prevActiveFilter
      );
    });
  }, [visibleColumns, columnNameToFieldId]);

  /**
   * Update the active filters if the user types/changes any filter for any column
   */
  const onFilterChange: FilterChangeFun<RowData> = useEventCallback(
    (fieldId, searchTerm, clearFilter) => {
      const filterFun = fieldIdToOnFilterChangeFun[fieldId];

      if (searchTerm) {
        setActiveFieldIdToFilter((prevActiveFieldIdToFilter) => ({
          ...prevActiveFieldIdToFilter,
          [fieldId]: {
            fieldFilterObj: filterFun(searchTerm),
            clearFilter,
          },
        }));
      } else {
        setActiveFieldIdToFilter((prevActiveFieldIdToFilter) => {
          const activeFieldIdToFilterFunClone = {
            ...prevActiveFieldIdToFilter,
          };
          delete activeFieldIdToFilterFunClone[fieldId as string];
          return activeFieldIdToFilterFunClone;
        });
      }
    }
  );

  /**
   * If the user clicks clear all filter in the UI then execute clearFilter
   * function of all active filters and all the hooks will react accordingly
   * to reset the UI and show all rows without any visible filters
   */
  const clearFilters = useEventCallback(() => {
    Object.values(activeFieldIdToFilter).forEach(({ clearFilter }) =>
      clearFilter()
    );
  });

  return {
    onFilterChange,
    clearFilters,
    totalFilters: Object.keys(activeFieldIdToFilter).length,
  };
};

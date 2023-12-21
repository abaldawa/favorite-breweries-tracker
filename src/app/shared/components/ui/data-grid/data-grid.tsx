/**
 * @author Abhijit Baldawa
 */

import React, { CSSProperties, useMemo, useState } from "react";
import { Rows } from "./components/rows/rows";
import { ColumnHeadings } from "./components/column-headings/column-headings";
import { useColumnFilter } from "./hooks/use-column-filter";
import { GridSortObj, useColumnSorter } from "./hooks/use-column-sorter";
import { GridToolbar } from "./components/grid-toolbar/grid-toolbar";
import { useEventCallback } from "../../../hooks/use-event-callback";
import {
  GridPaginationProps,
  GridPagination,
} from "./components/grid-pagination/grid-pagination";
import { useDidUpdate } from "../../../hooks/use-did-update";
import * as S from "./data-grid.styles";

export type VisibleColumns = Record<string, string>;

export interface ColumFilter {
  renderColumnFilter?: (
    onColumnFilter: (arg: any, clearFilter: () => void) => void
  ) => JSX.Element;
  onFilterChange: (searchTerm: any) => Record<string, any>;
}

export type ColumnSortOrder = "ASC" | "DES" | undefined;
export interface ColumnSorter {
  onSortChange: (
    sortOrder: NonNullable<ColumnSortOrder>
  ) => Record<string, any>;
}

export interface DataGridColumn<RowData> {
  fieldId: keyof RowData;
  headerName: string;
  width: string | number;
  type?: "number" | "string" | "boolean";
  cell?: {
    renderCell?: (row: RowData) => JSX.Element;
    valueGetter?: (row: RowData) => React.ReactNode;
    getStyle?: (row: RowData) => CSSProperties | undefined;
    onCellClick?: (row: RowData) => void;
  };
  filter?: ColumFilter;
  sort?: ColumnSorter;
}

export interface DataGridPagination {
  settings: {
    startPage: number;
    totalRecordsPerPageOptions: number[];
  };
  totalRecords: number;
}

export type GridFilterObj = Record<string, any>;

export interface DataGridProps<RowData> {
  columns: DataGridColumn<RowData>[];
  rows: RowData[];
  getRowId: (row: RowData) => string | number;
  onGridSearchSettingsChange?: (args: {
    gridFilterObj?: GridFilterObj;
    gridSortObj?: GridSortObj;
    pagination?: { page: number; totalRecordsPerPage: number };
  }) => void;
  loading?: boolean;
  fixedHeaderWhenScroll?: boolean;
  highlightEvenOddRows?: boolean;
  ariaGridLabel?: string;

  // TODO: style
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string;

  // pagination
  pagination?: DataGridPagination;
}

export const DataGrid = <RowData,>(props: DataGridProps<RowData>) => {
  const {
    columns,
    rows,
    loading,
    fixedHeaderWhenScroll,
    height,
    width,
    getRowId,
    onGridSearchSettingsChange,
    ariaGridLabel,
    highlightEvenOddRows,
    maxWidth,
    pagination,
  } = props;

  const [gridFilterObj, setGridFilterObj] = useState<GridFilterObj>();
  const [gridSortObj, setGridSortObj] = useState<GridSortObj>();
  const [paginationSetting, setPaginationSettings] = useState<
    { currentPage: number; totalRecordsPerPage: number } | undefined
  >(() =>
    pagination
      ? {
          currentPage: pagination.settings.startPage ?? 1,
          totalRecordsPerPage:
            pagination.settings.totalRecordsPerPageOptions[0],
        }
      : undefined
  );

  useDidUpdate(() => {
    onGridSearchSettingsChange?.({
      gridFilterObj,
      gridSortObj,
      pagination: paginationSetting
        ? {
            page: paginationSetting.currentPage,
            totalRecordsPerPage: paginationSetting.totalRecordsPerPage,
          }
        : undefined,
    });
  }, [gridFilterObj, paginationSetting, gridSortObj]);

  const onPaginationChange: GridPaginationProps["onPaginationChange"] =
    useEventCallback((page, totalRecordsPerPage) => {
      setPaginationSettings({ currentPage: page, totalRecordsPerPage });
    });

  const onGridFilterChange = useEventCallback(
    (updatedGridFilterObj?: GridFilterObj) => {
      setPaginationSettings((prevPagination) =>
        prevPagination
          ? {
              ...prevPagination,
              currentPage: 1,
            }
          : undefined
      );
      setGridFilterObj(updatedGridFilterObj);
    }
  );

  const onGridSortChange = useEventCallback((fieldSortObj?: GridSortObj) => {
    setGridSortObj(fieldSortObj);
  });

  /**
   * Setup all the data structure to find the columnName and columnId in the
   * most efficient way
   */
  const { columnNames, columnNameToColumn, columnNameToFieldId } =
    useMemo(() => {
      const columnNames: string[] = [];
      const columnNameToColumn: VisibleColumns = {};
      const columnNameToFieldId: VisibleColumns = {};

      for (const column of columns) {
        columnNames.push(column.headerName);
        columnNameToColumn[column.headerName] = column.headerName;
        columnNameToFieldId[column.headerName] = column.fieldId as string;
      }

      return { columnNames, columnNameToColumn, columnNameToFieldId };
    }, [columns]);

  /**
   * In the first render all columns are visible, and so we feed columnNameToColumn
   * to visibleColumns state
   */
  const [visibleColumns, setVisibleColumns] =
    useState<VisibleColumns>(columnNameToColumn);

  /**
   * We need the column width of visible columns and react when visibleColumns changes
   */
  const gridColumnsWidth = useMemo(() => {
    return columns
      .map((c) => {
        return visibleColumns[c.headerName] ? c.width : null;
      })
      .filter(Boolean) as DataGridColumn<RowData>["width"][];
  }, [visibleColumns, columns]);

  /**
   * With the knowledge of 'columns' and 'visibleColumns' the filter custom hook
   * provides filter change and clear filter handlers to react to changes in
   * any active filters and notify the grid with a grid level filter object
   */
  const { onFilterChange, totalFilters, clearFilters } = useColumnFilter({
    columns,
    visibleColumns,
    columnNameToFieldId,
    onGridFilterChange,
  });

  /**
   * This hook provides the column sort configuration to the
   * grid
   */
  const { activeColumnSorter, onSortChange } = useColumnSorter(
    columns,
    onGridSortChange
  );

  /**
   * If the user tries to show/hide any column then this handler handles
   * the event and updates the visible columns in the state and all the
   * hooks will react accordingly to update data grid
   *
   * @param selectedColumns - Array of only visible columns based on user selection
   */
  const onColumnShowOrHideHandler = useEventCallback(
    (selectedColumns?: string[]) => {
      setVisibleColumns(
        selectedColumns
          ? selectedColumns.reduce((result, columnHeading) => {
              result[columnHeading] = columnHeading;
              return result;
            }, {} as VisibleColumns)
          : {}
      );
    }
  );

  return (
    <S.Container
      role="grid"
      aria-live="polite"
      aria-label={ariaGridLabel}
      aria-busy={loading}
    >
      <GridToolbar
        columns={columnNames}
        totalActiveFilters={totalFilters}
        clearActiveFilters={clearFilters}
        selectedColumns={visibleColumns}
        onColumnShowOrHideHandler={onColumnShowOrHideHandler}
      />
      <S.DataGridWrapper
        gridColumnsWidth={gridColumnsWidth}
        height={height || "420px"}
        width={width}
        maxWidth={maxWidth}
      >
        <ColumnHeadings
          columns={columns}
          visibleColumns={visibleColumns}
          fixedHeaderWhenScroll={fixedHeaderWhenScroll}
          activeColumnSorter={activeColumnSorter}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
        />
        <Rows
          rows={rows}
          visibleColumns={visibleColumns}
          getRowId={getRowId}
          columns={columns}
          highlightEvenOddRows={highlightEvenOddRows}
        />
      </S.DataGridWrapper>
      {pagination && paginationSetting && (
        <GridPagination
          totalRecordsPerPageOptions={
            pagination.settings.totalRecordsPerPageOptions
          }
          onPaginationChange={onPaginationChange}
          loading={loading}
          currentPage={paginationSetting.currentPage}
          totalRecords={pagination.totalRecords}
          totalRecordsPerPage={paginationSetting.totalRecordsPerPage}
        />
      )}
      {loading && <S.LoadingWrapper role="alert">Loading...</S.LoadingWrapper>}
    </S.Container>
  );
};

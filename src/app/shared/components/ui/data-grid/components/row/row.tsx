/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { Cell } from "../cell/cell";
import type { DataGridProps } from "../../data-grid";
import { RowsProps } from "../rows/rows";

export interface RowProps<RowData>
  extends Pick<DataGridProps<RowData>, "columns">,
    Pick<RowsProps<RowData>, "visibleColumns" | "highlightEvenOddRows"> {
  row: RowData;
  isEvenRow: boolean;
}

export const Row = <RowData,>(props: RowProps<RowData>) => {
  const { row, columns, visibleColumns, isEvenRow, highlightEvenOddRows } =
    props;

  return (
    <>
      {columns.map((column) => {
        if (!visibleColumns[column.headerName]) {
          return null;
        }
        return (
          <Cell
            key={column.fieldId as string}
            cell={column.cell}
            row={row}
            fieldId={column.fieldId}
            onCellClick={column.cell?.onCellClick}
            isEvenRow={isEvenRow}
            highlightEvenOddRows={highlightEvenOddRows}
          />
        );
      })}
    </>
  );
};

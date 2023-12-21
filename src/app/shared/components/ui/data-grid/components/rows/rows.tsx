/**
 * @author Abhijit Baldawa
 */

import React, { memo } from "react";
import { DataGridProps, VisibleColumns } from "../../data-grid";
import { Row } from "../row/row";

export interface RowsProps<RowData>
  extends Pick<
    DataGridProps<RowData>,
    "rows" | "columns" | "getRowId" | "highlightEvenOddRows"
  > {
  visibleColumns: VisibleColumns;
}

const RowsComponent = <RowData,>(props: RowsProps<RowData>) => {
  const { rows, columns, visibleColumns, getRowId, highlightEvenOddRows } =
    props;

  return (
    <>
      {rows.map((row, index) => {
        return (
          <Row
            key={getRowId(row)}
            row={row}
            columns={columns}
            visibleColumns={visibleColumns}
            isEvenRow={index % 2 === 0}
            highlightEvenOddRows={highlightEvenOddRows}
          />
        );
      })}
    </>
  );
};

export const Rows = memo(RowsComponent) as typeof RowsComponent;

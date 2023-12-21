/**
 * @author Abhijit Baldawa
 */

import React, { ReactNode } from "react";
import type { DataGridColumn } from "../../data-grid";
import { RowProps } from "../row/row";
import * as S from "./cell.styles";

interface CellProps<RowData>
  extends Pick<DataGridColumn<RowData>, "cell" | "fieldId">,
    Pick<RowProps<RowData>, "row" | "isEvenRow" | "highlightEvenOddRows"> {
  onCellClick?: (row: RowData) => void;
}

/**
 * A flexible/configurable cell with below functionality:
 * 1. User can provide a custom 'renderCell' function and the
 *    grid will display the cell exactly as the user wants else
 *    the cell will show the value on a default style.
 * 2. The user can provide 'valueGetter' function to cell which
 *    basically formats the value to show on the cell.
 *    ex. Formatting a date string to a readable format instead
 *        of showing the ISO string values o cell.
 * 3. If 'getStyle' method is provided then user can set the style
 *    of the cell in a specific custom format.
 *
 * @param props
 *
 * @constructor
 */
export const Cell = <RowData,>(props: CellProps<RowData>) => {
  const { row, fieldId, cell, onCellClick, isEvenRow, highlightEvenOddRows } =
    props;

  let cellValue: ReactNode;

  if (cell?.renderCell) {
    // User has provided a custom method to render a cell so use that
    cellValue = cell.renderCell(row);
  } else {
    /**
     * If the user has provided a getter method to format what the
     * grid should display on the cell then use that else directly
     * show the original field from the row object
     */
    cellValue = cell?.valueGetter?.(row) ?? <>{row[fieldId]}</>;
  }

  return (
    <S.Container
      isEvenRow={isEvenRow}
      highlightEvenOddRows={highlightEvenOddRows}
      style={cell?.getStyle?.(row)}
      onClick={onCellClick ? () => onCellClick(row) : undefined}
    >
      {cellValue}
    </S.Container>
  );
};

/**
 * @author Abhijit Baldawa
 */

import React, { memo } from "react";
import * as S from "./grid-pagination.styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

type IGridPagination = {
  currentPage: number;
  totalRecordsPerPage: number;
  totalRecords: number;
  totalRecordsPerPageOptions: number[];
};

export interface GridPaginationProps extends IGridPagination {
  onPaginationChange: (page: number, totalRecordsPerPage: number) => void;
  loading?: boolean;
  children?: never;
}

const GridPaginationComponent: React.FC<GridPaginationProps> = (props) => {
  const {
    currentPage,
    totalRecords,
    totalRecordsPerPage,
    totalRecordsPerPageOptions,
    loading,
    onPaginationChange,
  } = props;

  const start =
    totalRecords === 0
      ? 0
      : totalRecordsPerPage * currentPage - totalRecordsPerPage + 1;

  let end = totalRecords === 0 ? 0 : totalRecordsPerPage * currentPage;

  if (end > totalRecords) {
    end = totalRecords;
  }

  return (
    <S.Container>
      <Button
        variant="contained"
        size="small"
        disabled={loading || currentPage <= 1}
        sx={{ padding: 0, minWidth: "4rem" }}
        onClick={() => onPaginationChange(1, totalRecordsPerPage)}
      >
        {"<First"}
      </Button>
      <Button
        variant="contained"
        size="small"
        disabled={loading || currentPage <= 1}
        sx={{ padding: 0, minWidth: "2.5rem" }}
        onClick={() => onPaginationChange(currentPage - 1, totalRecordsPerPage)}
      >
        {"<"}
      </Button>

      <FormControl size="small">
        <InputLabel id="grid-total-rows">Rows</InputLabel>
        <Select
          labelId="grid-total-rows"
          value={totalRecordsPerPage}
          label="Rows"
          disabled={loading}
          onChange={(e) => {
            const { value } = e.target;

            if (typeof value === "number") {
              onPaginationChange(1, value);
            }
          }}
        >
          {totalRecordsPerPageOptions.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <span>
        Showing <b>{start}</b> - <b>{end}</b> of{" "}
        <u>
          <em>{totalRecords}</em>
        </u>
      </span>
      <Button
        size="small"
        variant="contained"
        disabled={loading || !end || end === totalRecords}
        sx={{ padding: 0, minWidth: "2.5rem" }}
        onClick={() => onPaginationChange(currentPage + 1, totalRecordsPerPage)}
      >
        {">"}
      </Button>
      <Button
        variant="contained"
        size="small"
        disabled={loading || !end || end === totalRecords}
        sx={{ padding: 0, minWidth: "4rem" }}
        onClick={() =>
          onPaginationChange(
            Math.ceil(totalRecords / totalRecordsPerPage),
            totalRecordsPerPage
          )
        }
      >
        {"Last>"}
      </Button>
    </S.Container>
  );
};

export const GridPagination = memo(
  GridPaginationComponent
) as typeof GridPaginationComponent;

import { useEffect, useMemo, useRef } from "react";
import { Avatar, Box } from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import { useCallApi } from "../../../../shared/hooks/use-call-api";
import { getBeerListWithPaginationDetails } from "../../../../shared/services/brewery/api";
import {
  DataGrid,
  DataGridColumn,
  DataGridPagination,
  DataGridProps,
} from "../../../../shared/components/ui/data-grid/data-grid";
import { Beer } from "../../../../shared/services/brewery/types";
import { BreweryTypeSelection } from "../../components/brewery-type-selection/brewery-type-selection";

const dataGridPaginationSettings: DataGridPagination["settings"] = {
  startPage: 1,
  totalRecordsPerPageOptions: [50, 100, 150, 200],
};

const BeerList = () => {
  const navigate = useNavigate();
  const beerListWithPagination = useCallApi(getBeerListWithPaginationDetails);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const fetchBreweryListAbortControllerRef = useRef<AbortController>();

  const fetchBreweryList = ({
    gridFilterObj,
    gridSortObj,
    pagination,
  }: Parameters<
    NonNullable<DataGridProps<Beer>["onGridSearchSettingsChange"]>
  >[0] = {}) => {
    fetchBreweryListAbortControllerRef.current?.abort();

    fetchBreweryListAbortControllerRef.current = new AbortController();

    beerListWithPagination.callApi(
      {
        apiErrorMessage: "Error fetching beer list",
        errorPopupDismissible: true,
      },
      {
        ...gridFilterObj,
        ...gridSortObj,
        per_page:
          pagination?.totalRecordsPerPage ??
          dataGridPaginationSettings.totalRecordsPerPageOptions[0],
        page: pagination?.page ?? dataGridPaginationSettings.startPage,
      },
      fetchBreweryListAbortControllerRef.current.signal
    );
  };

  useEffect(() => {
    fetchBreweryList();
  }, []);

  const gridColumns = useMemo<DataGridColumn<Beer>[]>(() => {
    return [
      {
        fieldId: "name",
        headerName: "Name",
        width: "2fr",
        type: "string",
        sort: {
          onSortChange: (sortOrder) => ({
            sort: `name:${sortOrder === "ASC" ? "asc" : "desc"}`,
          }),
        },
        filter: {
          onFilterChange: (searchTerm: string) => ({
            by_name: searchTerm,
          }),
        },
        cell: {
          onCellClick: (row) => {
            onBeerClick(row.id);
          },
          renderCell: (row) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "flex-start",
                  width: "100%",
                  gap: "0.5rem",
                }}
              >
                <Avatar>
                  <SportsBar />
                </Avatar>
                <span>{row.name}</span>
              </Box>
            );
          },
        },
      },
      {
        fieldId: "brewery_type",
        headerName: "Brewery type",
        width: "1fr",
        type: "string",
        sort: {
          onSortChange: (sortOrder) => ({
            sort: `type:${sortOrder === "ASC" ? "asc" : "desc"}`,
          }),
        },
        filter: {
          onFilterChange: (searchTerm: string) => ({
            by_type: searchTerm,
          }),
          renderColumnFilter: (onColumnFilter) => {
            return <BreweryTypeSelection onSelectionChange={onColumnFilter} />;
          },
        },
      },
      {
        fieldId: "city",
        headerName: "City",
        width: "1fr",
        type: "string",
        sort: {
          onSortChange: (sortOrder) => ({
            sort: `city:${sortOrder === "ASC" ? "asc" : "desc"}`,
          }),
        },
        filter: {
          onFilterChange: (searchTerm: string) => ({
            by_city: searchTerm,
          }),
        },
      },
      {
        fieldId: "country",
        headerName: "Country",
        type: "string",
        width: "1fr",
        sort: {
          onSortChange: (sortOrder) => ({
            sort: `country:${sortOrder === "ASC" ? "asc" : "desc"}`,
          }),
        },
        filter: {
          onFilterChange: (searchTerm: string) => ({
            by_country: searchTerm,
          }),
        },
      },
    ];
  }, []);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <DataGrid
            fixedHeaderWhenScroll
            highlightEvenOddRows
            height={420}
            width={800}
            columns={gridColumns}
            onGridSearchSettingsChange={fetchBreweryList}
            rows={beerListWithPagination.data?.beerList ?? []}
            getRowId={(row) => row.id}
            pagination={{
              settings: dataGridPaginationSettings,
              totalRecords: beerListWithPagination.data?.pagination.total ?? 0,
            }}
            loading={beerListWithPagination.loading}
          />
        </main>
      </section>
    </article>
  );
};

export { BeerList };

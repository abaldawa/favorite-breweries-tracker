/**
 * @author Abhijit Baldawa
 */

import React, { useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Link,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import * as S from "./beer-selection.styles";
import type { RandomBeer } from "../../containers";
import { SearchBox } from "../../../../shared/components/ui/search-box/search-box";
import { SearchedBreweriesList } from "../searched-breweries-list/searched-breweries-list";
import { Beer } from "../../../../shared/services/brewery/types";

export type BeerSearchSetting = {
  beerTitleToSearch: string;
  page: number;
};

interface BeerSelectionProps {
  randomBeerListLoading: boolean;
  randomBeers: RandomBeer[] | undefined;
  favoriteBeerIds: Set<string>;
  isNextBeerSearchAvailable?: boolean;
  beerSearchLoading?: boolean;
  beerSearchResults?: Beer[];
  beerSearchSetting?: BeerSearchSetting;
  onBeerSearchSettingHandler: (
    updatedBeerSearchSettings?: BeerSearchSetting
  ) => void;
  addSearchedBeerToFavorite: (beerToAddToFavorite: Beer) => void;
  searchNextPageBeers: () => void;
  onRandomBeerSelectionHandler: (randomBeer: RandomBeer) => void;
  addRandomBeersToFavorite: () => void;
  fetchRandomBeerList: () => void;
  children?: never;
}

const BeerSelection: React.FC<BeerSelectionProps> = (props) => {
  const {
    randomBeerListLoading,
    randomBeers,
    favoriteBeerIds,
    beerSearchSetting,
    beerSearchLoading,
    beerSearchResults,
    isNextBeerSearchAvailable,
    addSearchedBeerToFavorite,
    onBeerSearchSettingHandler,
    searchNextPageBeers,
    fetchRandomBeerList,
    addRandomBeersToFavorite,
    onRandomBeerSelectionHandler,
  } = props;

  const anyRandomBeerSelected = useMemo(
    () => !!randomBeers?.find((randomBeer) => randomBeer.checked),
    [randomBeers]
  );

  return (
    <Paper>
      <S.ListContainer>
        <S.ListHeader>
          <SearchBox
            sx={{ maxWidth: "25rem" }}
            startAdornment={<S.SearchIconWrapper>🔎</S.SearchIconWrapper>}
            value={beerSearchSetting?.beerTitleToSearch ?? ""}
            placeholder="Add your favorite brewery"
            onChange={(event) => {
              const { value } = event.target;

              onBeerSearchSettingHandler(
                value
                  ? {
                      beerTitleToSearch: value,
                      page: 1,
                    }
                  : undefined
              );
            }}
            renderSearchResults={() =>
              Boolean(beerSearchSetting?.beerTitleToSearch.length) && (
                <SearchedBreweriesList
                  loading={beerSearchLoading}
                  favoriteBeerIds={favoriteBeerIds}
                  searchedBeers={beerSearchResults}
                  hasNextPage={isNextBeerSearchAvailable}
                  onBreweryClicked={addSearchedBeerToFavorite}
                  fetchNextPageSearchResults={searchNextPageBeers}
                />
              )
            }
          />
          <Button
            variant="contained"
            disabled={randomBeerListLoading}
            onClick={fetchRandomBeerList}
          >
            Reload list
          </Button>
        </S.ListHeader>
        {randomBeerListLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <S.List>
            {randomBeers?.map((randomBeer) => (
              <li key={randomBeer.id}>
                <Checkbox
                  checked={
                    favoriteBeerIds.has(randomBeer.id) || randomBeer.checked
                  }
                  disabled={favoriteBeerIds.has(randomBeer.id)}
                  onChange={() => onRandomBeerSelectionHandler(randomBeer)}
                />
                <Link component={RouterLink} to={`/beer/${randomBeer.id}`}>
                  {randomBeer.name}
                </Link>
              </li>
            ))}
          </S.List>
        )}
        <Button
          variant="contained"
          disabled={randomBeerListLoading || !anyRandomBeerSelected}
          onClick={addRandomBeersToFavorite}
        >
          Add Favorite Beers
        </Button>
      </S.ListContainer>
    </Paper>
  );
};

export { BeerSelection };

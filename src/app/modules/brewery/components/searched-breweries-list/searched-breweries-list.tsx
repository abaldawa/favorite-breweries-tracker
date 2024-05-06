/**
 * @author Abhijit Baldawa
 */

import React, { useEffect, useRef, useState } from "react";
import { BreweryItem } from "../brewery-item/brewery-item";
import { CircularProgress, Typography } from "@mui/material";
import { Beer } from "../../../../shared/services/brewery/types";
import { useIsElementVisible } from "../../../../shared/hooks/use-is-element-visible";
import * as S from "./searched-breweries-list.styles";

interface SearchedBreweriesListProps {
  loading?: boolean;
  searchedBeers?: Beer[];
  hasNextPage?: boolean;
  favoriteBeerIds: Set<string>;
  onBreweryClicked: (beer: Beer) => void;
  fetchNextPageSearchResults: () => void;
}

const SearchedBreweriesList: React.FC<SearchedBreweriesListProps> = (props) => {
  const {
    loading,
    searchedBeers,
    hasNextPage,
    favoriteBeerIds,
    onBreweryClicked,
    fetchNextPageSearchResults,
  } = props;
  const [hoveredBeerId, setHoveredBeerId] = useState<string>();

  const scrollToEndObserveTarget = useRef<HTMLDivElement>(null);
  const userScrolledToEnd = useIsElementVisible(
    scrollToEndObserveTarget,
    Boolean(hasNextPage)
  );

  useEffect(() => {
    if (userScrolledToEnd) {
      fetchNextPageSearchResults();
    }
  }, [userScrolledToEnd]);

  return (
    <S.Container>
      {searchedBeers?.map((searchedBeer) => (
        <BreweryItem
          key={searchedBeer.id}
          name={searchedBeer.name}
          disabled={favoriteBeerIds.has(searchedBeer.id)}
          brewery_type={searchedBeer.brewery_type}
          country={searchedBeer.country}
          showHoverEffect
          sx={{ padding: "0.75rem" }}
          isHovered={(hovered) =>
            setHoveredBeerId(hovered ? searchedBeer.id : undefined)
          }
          onClick={() => onBreweryClicked(searchedBeer)}
          renderBreweryActionItem={() =>
            searchedBeer.id === hoveredBeerId && (
              <S.AddToListButton disableElevation>
                <Typography variant="h6" fontSize="1rem">
                  Add to list
                </Typography>
              </S.AddToListButton>
            )
          }
        />
      ))}

      <div ref={scrollToEndObserveTarget} />

      {loading && (
        <CircularProgress
          size={20}
          color="inherit"
          style={{ alignSelf: "center" }}
        />
      )}
    </S.Container>
  );
};

export { SearchedBreweriesList };

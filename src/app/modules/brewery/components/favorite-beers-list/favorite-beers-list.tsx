/**
 * @author Abhijit Baldawa
 */

import React, { useMemo } from "react";
import { Button, Checkbox, Link, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SelectableFavoriteBeer } from "../../containers";
import * as S from "./favorite-beers-list.styles";

interface FavoriteBeersListProps {
  favoriteBeers?: SelectableFavoriteBeer[] | null;
  onRemoveAllFavoriteBeersHandler: () => void;
  onFavoriteBeerSelectionHandler: (
    selectableFavoriteBeer: SelectableFavoriteBeer
  ) => void;
  onRemoveSelectedFavoriteBeers: () => void;
  children?: never;
}

const FavoriteBeersList: React.FC<FavoriteBeersListProps> = (props) => {
  const {
    favoriteBeers,
    onRemoveAllFavoriteBeersHandler,
    onFavoriteBeerSelectionHandler,
    onRemoveSelectedFavoriteBeers,
  } = props;

  const anyFavoriteBeerSelected = useMemo(
    () => !!favoriteBeers?.find((favoriteBeer) => favoriteBeer.checked),
    [favoriteBeers]
  );

  return (
    <Paper>
      <S.ListContainer>
        <S.ListHeader>
          <h3>Saved items</h3>
          <Button
            variant="contained"
            size="small"
            disabled={!favoriteBeers?.length}
            onClick={onRemoveAllFavoriteBeersHandler}
          >
            Remove all items
          </Button>
        </S.ListHeader>
        <S.List>
          {favoriteBeers?.map((favoriteBeer) => (
            <li key={favoriteBeer.id}>
              <Checkbox
                checked={favoriteBeer.checked}
                onChange={() => onFavoriteBeerSelectionHandler(favoriteBeer)}
              />
              <Link component={RouterLink} to={`/beer/${favoriteBeer.id}`}>
                {favoriteBeer.name}
              </Link>
            </li>
          ))}
          {!favoriteBeers?.length && <p>No saved items</p>}
        </S.List>
        <Button
          variant="contained"
          size="small"
          disabled={!favoriteBeers?.length || !anyFavoriteBeerSelected}
          onClick={onRemoveSelectedFavoriteBeers}
        >
          Remove selected
        </Button>
      </S.ListContainer>
    </Paper>
  );
};

export { FavoriteBeersList };

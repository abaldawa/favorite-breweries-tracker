/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { Button, Checkbox, Link, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FavoriteBeer } from "../../utils/local-storage/types";
import * as S from "./favorite-beers-list.styles";

interface FavoriteBeersListProps {
  favoriteBeers?: FavoriteBeer[] | null;
  onRemoveAllFavoriteBeersHandler: () => void;
  children?: never;
}

const FavoriteBeersList: React.FC<FavoriteBeersListProps> = (props) => {
  const { favoriteBeers, onRemoveAllFavoriteBeersHandler } = props;

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
              <Checkbox />
              <Link component={RouterLink} to={`/beer/${favoriteBeer.id}`}>
                {favoriteBeer.name}
              </Link>
            </li>
          ))}
          {!favoriteBeers?.length && <p>No saved items</p>}
        </S.List>
      </S.ListContainer>
    </Paper>
  );
};

export { FavoriteBeersList };

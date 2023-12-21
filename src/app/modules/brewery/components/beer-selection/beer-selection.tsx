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
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import * as S from "./beer-selection.styles";
import type { RandomBeer } from "../../containers";

interface BeerSelectionProps {
  loading: boolean;
  randomBeers: RandomBeer[] | undefined;
  favoriteBeerIds: Set<string>;
  onRandomBeerSelectionHandler: (randomBeer: RandomBeer) => void;
  addRandomBeersToFavorite: () => void;
  fetchRandomBeerList: () => void;
  children?: never;
}

const BeerSelection: React.FC<BeerSelectionProps> = (props) => {
  const {
    loading,
    randomBeers,
    favoriteBeerIds,
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
          <TextField label="Filter..." variant="outlined" />
          <Button
            variant="contained"
            disabled={loading}
            onClick={fetchRandomBeerList}
          >
            Reload list
          </Button>
        </S.ListHeader>
        {loading ? (
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
          disabled={loading || !anyRandomBeerSelected}
          onClick={addRandomBeersToFavorite}
        >
          Add Favorite Beers
        </Button>
      </S.ListContainer>
    </Paper>
  );
};

export { BeerSelection };

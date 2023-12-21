import { useEffect, useMemo, useState } from "react";
import { getRandomBeerList } from "../../../../shared/services/brewery/api";
import { useCallApi } from "../../../../shared/hooks/use-call-api";
import { useBreweryStore } from "../../../../store/brewery/store";
import { FavoriteBeer } from "../../utils/local-storage/types";
import { usePopupStore } from "../../../../store/popup/store";
import { FavoriteBeersList } from "../../components/favorite-beers-list/favorite-beers-list";
import { BeerSelection } from "../../components/beer-selection/beer-selection";

export interface RandomBeer extends FavoriteBeer {
  checked: boolean;
}

const Home = () => {
  const [randomBeers, setRandomBeers] = useState<RandomBeer[]>();

  const randomBeerList = useCallApi(getRandomBeerList);

  const { favoriteBreweries } = useBreweryStore((state) => ({
    favoriteBreweries: state.favoriteBreweries,
  }));
  const { showPopup } = usePopupStore((state) => ({
    showPopup: state.showPopup,
  }));

  const uniqueIdsOfFavoriteBeers = useMemo(() => {
    const uniqueIdsSet = new Set<string>();

    if (favoriteBreweries.values?.length) {
      favoriteBreweries.values.forEach((favoriteBeer) =>
        uniqueIdsSet.add(favoriteBeer.id)
      );
    }

    return uniqueIdsSet;
  }, [favoriteBreweries.values]);

  const fetchRandomBeerList = () => {
    randomBeerList.callApi(
      {
        apiErrorMessage: "Error fetching random beer list",
        errorPopupDismissible: true,
      },
      10
    );
  };

  const onRandomBeerSelectionHandler = (randomBeer: RandomBeer) => {
    setRandomBeers((prevRandomBeers) =>
      prevRandomBeers?.map((prevRandomBeer) => ({
        ...prevRandomBeer,
        checked:
          randomBeer.id === prevRandomBeer.id
            ? !prevRandomBeer.checked
            : prevRandomBeer.checked,
      }))
    );
  };

  const addRandomBeersToFavorite = () => {
    const selectedRandomBeers = randomBeers?.filter(
      (randomBeer) => randomBeer.checked
    );

    if (selectedRandomBeers?.length) {
      favoriteBreweries.addValues(
        selectedRandomBeers.map(({ id, name }) => ({ id, name }))
      );

      setRandomBeers(
        randomBeers?.map((randomBeer) => ({
          ...randomBeer,
          checked: false,
        }))
      );
    }
  };

  /**
   * Effects to create random beers
   */
  useEffect(() => {
    if (randomBeerList.data) {
      const beers = randomBeerList.data.map<RandomBeer>(({ id, name }) => ({
        id,
        name,
        checked: false,
      }));

      setRandomBeers(beers);
    } else {
      setRandomBeers(undefined);
    }
  }, [randomBeerList.data]);

  /**
   * Effects to handle any error
   */
  useEffect(() => {
    if (favoriteBreweries.error) {
      showPopup({
        type: "api-error",
        title: "Error in operation",
        dismissible: true,
        error: favoriteBreweries.error,
        buttons: {
          confirm: {
            label: "OK",
          },
        },
      });
    }
  }, [favoriteBreweries.error]);

  /**
   * Effects to run on mount
   */
  useEffect(() => {
    favoriteBreweries.fetchValues();
    fetchRandomBeerList();
  }, []);

  return (
    <article>
      <section>
        <main>
          <BeerSelection
            loading={randomBeerList.loading}
            randomBeers={randomBeers}
            favoriteBeerIds={uniqueIdsOfFavoriteBeers}
            fetchRandomBeerList={fetchRandomBeerList}
            addRandomBeersToFavorite={addRandomBeersToFavorite}
            onRandomBeerSelectionHandler={onRandomBeerSelectionHandler}
          />
          <FavoriteBeersList
            favoriteBeers={favoriteBreweries.values}
            onRemoveAllFavoriteBeersHandler={() =>
              favoriteBreweries.deleteAllValues()
            }
          />
        </main>
      </section>
    </article>
  );
};

export { Home };

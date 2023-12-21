import { useEffect, useMemo, useState } from "react";
import {
  getRandomBeerList,
  searchBeerList,
} from "../../../../shared/services/brewery/api";
import { useCallApi } from "../../../../shared/hooks/use-call-api";
import { useBreweryStore } from "../../../../store/brewery/store";
import { FavoriteBeer } from "../../utils/local-storage/types";
import { usePopupStore } from "../../../../store/popup/store";
import { FavoriteBeersList } from "../../components/favorite-beers-list/favorite-beers-list";
import {
  BeerSearchSetting,
  BeerSelection,
} from "../../components/beer-selection/beer-selection";
import { Beer } from "../../../../shared/services/brewery/types";

export interface RandomBeer extends FavoriteBeer {
  checked: boolean;
}

export interface SelectableFavoriteBeer extends FavoriteBeer {
  checked: boolean;
}

const MAX_BEER_SEARCH_RESULTS_PER_PAGE = 10;

const Home = () => {
  const [beerSearchSetting, setBeerSearchSetting] =
    useState<BeerSearchSetting>();
  const [randomBeers, setRandomBeers] = useState<RandomBeer[]>();
  const [selectableFavoriteBeers, setSelectableFavoriteBeers] =
    useState<SelectableFavoriteBeer[]>();

  const randomBeerList = useCallApi(getRandomBeerList);
  const searchBreweries = useCallApi(searchBeerList);

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

  const onFavoriteBeerSelectionHandler = (
    selectableFavoriteBeer: SelectableFavoriteBeer
  ) => {
    setSelectableFavoriteBeers((prevSelectableFavBeers) =>
      prevSelectableFavBeers?.map((prevSelectableFavBeer) => ({
        ...prevSelectableFavBeer,
        checked:
          selectableFavoriteBeer.id === prevSelectableFavBeer.id
            ? !prevSelectableFavBeer.checked
            : prevSelectableFavBeer.checked,
      }))
    );
  };

  const onRemoveSelectedFavoriteBeers = () => {
    const favoriteBeersToDelete = selectableFavoriteBeers?.filter(
      (selectableFavoriteBeer) => selectableFavoriteBeer.checked
    );

    if (favoriteBeersToDelete?.length) {
      favoriteBreweries.deleteValues(
        favoriteBeersToDelete.map(
          (favoriteBeerToDelete) => favoriteBeerToDelete.id
        )
      );
    }
  };

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

  const addSearchedBeerToFavorite = (beerToAddToFavorite: Beer) => {
    if (uniqueIdsOfFavoriteBeers.has(beerToAddToFavorite.id)) {
      showPopup({
        type: "info",
        title: "Note",
        description: `Brewery '${beerToAddToFavorite.name}' is already added to favorite`,
        dismissible: true,
        variant: "warning",
        buttons: {
          confirm: {
            label: "OK",
          },
        },
      });
      return;
    }
    favoriteBreweries.addValues([
      { id: beerToAddToFavorite.id, name: beerToAddToFavorite.name },
    ]);
  };

  /**
   * Endlessly search beers as user scrolls down
   */
  useEffect(() => {
    const controller = new AbortController();

    if (beerSearchSetting) {
      searchBreweries.callApi(
        {
          apiErrorMessage: "Error searching breweries",
          errorPopupDismissible: true,
        },
        beerSearchSetting.beerTitleToSearch,
        {
          page: beerSearchSetting.page,
          per_page: MAX_BEER_SEARCH_RESULTS_PER_PAGE,
        },
        controller.signal
      );
    }

    return () => controller.abort();
  }, [beerSearchSetting]);

  /**
   * Effect to create selectable favorite beers
   */
  useEffect(() => {
    if (!favoriteBreweries.values?.length) {
      setSelectableFavoriteBeers(undefined);
      return;
    }

    const beerIdToCheckedStatus = selectableFavoriteBeers?.reduce(
      (beerIdToCheckedStatus, selectableFavoriteBeer) => {
        beerIdToCheckedStatus[selectableFavoriteBeer.id] =
          selectableFavoriteBeer.checked;

        return beerIdToCheckedStatus;
      },
      {} as { [beerId: string]: boolean }
    );

    setSelectableFavoriteBeers(
      favoriteBreweries.values.map(({ id, name }) => ({
        id,
        name,
        checked: beerIdToCheckedStatus
          ? Boolean(beerIdToCheckedStatus[id])
          : false,
      }))
    );
  }, [favoriteBreweries.values]);

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

    return () => {
      favoriteBreweries.reset();
    };
  }, []);

  return (
    <article>
      <section>
        <main>
          <BeerSelection
            // random breweries props
            randomBeerListLoading={randomBeerList.loading}
            randomBeers={randomBeers}
            favoriteBeerIds={uniqueIdsOfFavoriteBeers}
            fetchRandomBeerList={fetchRandomBeerList}
            addRandomBeersToFavorite={addRandomBeersToFavorite}
            onRandomBeerSelectionHandler={onRandomBeerSelectionHandler}
            // breweries search props
            beerSearchSetting={beerSearchSetting}
            beerSearchResults={searchBreweries.data}
            searchNextPageBeers={() => {
              if (!searchBreweries.loading && beerSearchSetting) {
                setBeerSearchSetting({
                  ...beerSearchSetting,
                  page: beerSearchSetting.page + 1,
                });
              }
            }}
            isNextBeerSearchAvailable={
              !!searchBreweries.data &&
              searchBreweries.data.length === MAX_BEER_SEARCH_RESULTS_PER_PAGE
            }
            beerSearchLoading={searchBreweries.loading}
            onBeerSearchSettingHandler={setBeerSearchSetting}
            addSearchedBeerToFavorite={addSearchedBeerToFavorite}
          />
          <FavoriteBeersList
            onFavoriteBeerSelectionHandler={onFavoriteBeerSelectionHandler}
            favoriteBeers={selectableFavoriteBeers}
            onRemoveSelectedFavoriteBeers={onRemoveSelectedFavoriteBeers}
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

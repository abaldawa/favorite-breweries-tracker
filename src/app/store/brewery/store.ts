/**
 * @author Abhijit Baldawa
 *
 * Central store to manage brewery data
 */

import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { immer } from "zustand/middleware/immer";
import {
  BreweryLocalStorageKeyToType,
  FavoriteBeer,
} from "../../modules/brewery/utils/local-storage/types";
import {
  deleteLocalStorageData,
  getLocalStorageData,
  setLocalStorageData,
} from "../../shared/utilities/browser-storage/local-storage";

const getFavoriteBeers = () =>
  getLocalStorageData("brewery:favoriteBeers", (localStorageStr) =>
    localStorageStr ? JSON.parse(localStorageStr) : null
  );

interface BreweryStore {
  favoriteBreweries: {
    error?: unknown;
    values?: BreweryLocalStorageKeyToType["brewery:favoriteBeers"];
    reset: () => void;
    deleteValues: (beerIds: FavoriteBeer["id"][]) => void;
    deleteAllValues: () => void;
    fetchValues: () => void;
    addValues: (
      favoriteBeers: NonNullable<
        BreweryLocalStorageKeyToType["brewery:favoriteBeers"]
      >
    ) => void;
  };
}

const useBreweryStore = createWithEqualityFn<BreweryStore>()(
  immer((set) => ({
    favoriteBreweries: {
      fetchValues: () => {
        try {
          const favoriteBeers = getFavoriteBeers();

          set((state) => void (state.favoriteBreweries.values = favoriteBeers));
        } catch (error: unknown) {
          set((state) => void (state.favoriteBreweries.error = error));
        }
      },

      addValues: (favoriteBeers) => {
        try {
          const favoriteBeersToUpdate = getFavoriteBeers() ?? [];
          const uniqueBeerIds = new Set<string>();

          favoriteBeersToUpdate.forEach((existingFavoriteBeer) =>
            uniqueBeerIds.add(existingFavoriteBeer.id)
          );

          favoriteBeers.forEach((favoriteBeer) => {
            if (!uniqueBeerIds.has(favoriteBeer.id)) {
              favoriteBeersToUpdate?.push(favoriteBeer);
              uniqueBeerIds.add(favoriteBeer.id);
            }
          });

          if (favoriteBeersToUpdate.length) {
            setLocalStorageData(
              "brewery:favoriteBeers",
              JSON.stringify(favoriteBeersToUpdate)
            );

            set(
              (state) =>
                void (state.favoriteBreweries.values = favoriteBeersToUpdate)
            );
          }
        } catch (error: unknown) {
          set((state) => void (state.favoriteBreweries.error = error));
        }
      },

      deleteAllValues: () => {
        deleteLocalStorageData("brewery:favoriteBeers");
        set((state) => void (state.favoriteBreweries.values = undefined));
      },

      deleteValues: (beerIds) => {
        try {
          const existingFavoriteBeers = getFavoriteBeers();

          if (!existingFavoriteBeers?.length) {
            set((state) => void (state.favoriteBreweries.values = undefined));
            return;
          }

          const updatedFavoriteBeers = existingFavoriteBeers.filter(
            (existingFavoriteBeer) => !beerIds.includes(existingFavoriteBeer.id)
          );

          if (!updatedFavoriteBeers.length) {
            deleteLocalStorageData("brewery:favoriteBeers");
            set((state) => void (state.favoriteBreweries.values = undefined));
            return;
          }

          setLocalStorageData(
            "brewery:favoriteBeers",
            JSON.stringify(updatedFavoriteBeers)
          );

          set(
            (state) =>
              void (state.favoriteBreweries.values = updatedFavoriteBeers)
          );
        } catch (error: unknown) {
          set((state) => void (state.favoriteBreweries.error = error));
        }
      },

      reset: () => {
        set((state) => {
          state.favoriteBreweries.values = undefined;
          state.favoriteBreweries.error = undefined;
        });
      },
    },
  })),
  shallow
);

export { useBreweryStore };

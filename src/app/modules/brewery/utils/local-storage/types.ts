import { z } from "zod";
import { BeerSchema } from "../../../../shared/services/brewery/types";

const FavoriteBeerSchema = BeerSchema.pick({ id: true, name: true }).strict();
const FavoriteBeersSchema = FavoriteBeerSchema.array();

interface FavoriteBeer extends z.infer<typeof FavoriteBeerSchema> {}

/**
 * Shape of all local storage keys and their value
 * for `brewery` module
 */
interface BreweryLocalStorageKeyToType {
  "brewery:favoriteBeers"?: FavoriteBeer[] | null;
}

const breweryLocalStorageKeyToSchema = Object.freeze({
  "brewery:favoriteBeers": FavoriteBeersSchema.nullish(),
} satisfies Record<keyof BreweryLocalStorageKeyToType, unknown>);

export type { FavoriteBeer, BreweryLocalStorageKeyToType };
export { breweryLocalStorageKeyToSchema };

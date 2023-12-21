/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";
import { BreweryType } from "./brewery-types";

type SORT = "asc" | "desc";

interface ApiParams {
  per_page?: number; // Int between 1 and 200. Default is 50.
  page?: number;
  sort?: SORT; // Not working with by_dist.
  by_city?: string;
  by_dist?: string; // `${latitude as Number}, ${longitude as Number}`
  by_name?: string;
  by_state?: string;
  by_postal?: number | string; // 5-digit, or 9-digit with underscore
  by_country?: string;
  by_type?: BreweryType;
}

const NonNegativeIntegerSchema = z.number().int().nonnegative();

const getZodStringToNonNegativeIntegerSchema = () =>
  z
    .string()
    .min(1)
    .refine(
      (integerStr) => NonNegativeIntegerSchema.safeParse(+integerStr).success,
      { message: "Must be a valid non negative integer" }
    );

const BreweriesApiPaginationSchema = z
  .object({
    total: getZodStringToNonNegativeIntegerSchema(),
    page: getZodStringToNonNegativeIntegerSchema(),
    per_page: getZodStringToNonNegativeIntegerSchema(),
  })
  .strict()
  .readonly();

type BreweriesApiPagination = z.infer<typeof BreweriesApiPaginationSchema>;

export type { ApiParams, BreweriesApiPagination };
export { BreweriesApiPaginationSchema };

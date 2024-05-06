/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";
import { BreweryTypesSchema } from "./brewery-types";

// breweries/meta
// https://www.openbrewerydb.org/documentation

const BeerSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    brewery_type: BreweryTypesSchema,
    city: z.string().min(1),
    state_province: z.string().min(1),
    postal_code: z.string().min(1),
    country: z.string().min(1),
    state: z.string().min(1),

    address_1: z.string().min(1).nullish(),
    address_2: z.string().min(1).nullish(),
    address_3: z.string().min(1).nullish(),

    longitude: z
      .string()
      .min(1)
      .refine(
        (longitudeStr) => longitudeStr.trim() && !Number.isNaN(+longitudeStr),
        {
          message: "Must be a valid number",
        }
      )
      .nullish(),

    latitude: z
      .string()
      .min(1)
      .refine(
        (latitudeStr) => latitudeStr.trim() && !Number.isNaN(+latitudeStr),
        {
          message: "Must be a valid number",
        }
      )
      .nullish(),

    phone: z
      .string()
      .min(1)
      .refine(
        (phoneStr) => {
          // sanitize the phone number
          phoneStr = phoneStr.replaceAll(/[ \-+]/g, "").trim();

          // validate the number
          return phoneStr && !Number.isNaN(+phoneStr);
        },
        {
          message: "Must be a valid number",
        }
      )
      .nullish(),

    website_url: z.string().url().nullish(),

    street: z.string().min(1).nullish(),
  })
  .strict();

interface Beer extends z.infer<typeof BeerSchema> {}

const BeerArraySchema = BeerSchema.array();

export type { Beer };
export { BeerSchema, BeerArraySchema };

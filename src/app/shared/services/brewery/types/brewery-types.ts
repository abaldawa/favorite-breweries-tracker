/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";

const breweryTypes = [
  "micro",
  "nano",
  "regional",
  "brewpub",
  "large",
  "planning",
  "bar",
  "contract",
  "proprietor",
  "closed",
  "taproom",
] as const;

const BreweryTypesSchema = z.enum(breweryTypes);

type BreweryType = z.infer<typeof BreweryTypesSchema>;

export type { BreweryType };
export { BreweryTypesSchema, breweryTypes };

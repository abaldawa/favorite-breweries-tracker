/**
 * @author Abhijit Baldawa
 */

import {
  BreweryLocalStorageKeyToType,
  breweryLocalStorageKeyToSchema,
} from "../../../../modules/brewery/utils/local-storage/types";

interface AppLocalStorageKeyToValue extends BreweryLocalStorageKeyToType {}

const appLocalStorageKeyToSchema = {
  ...breweryLocalStorageKeyToSchema,
};

export type { AppLocalStorageKeyToValue };
export { appLocalStorageKeyToSchema };

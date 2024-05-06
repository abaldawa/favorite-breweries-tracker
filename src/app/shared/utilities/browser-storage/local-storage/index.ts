/**
 * @author Abhijit Baldawa
 */

import { isKnownError } from "../../errors/error-handler";
import { ValidationError } from "../../errors/error-types";
import { AppLocalStorageKeyToValue, appLocalStorageKeyToSchema } from "./types";

const getLocalStorageData = <Key extends keyof AppLocalStorageKeyToValue>(
  key: Key,
  getParsedData: (localStorageStr: ReturnType<Storage["getItem"]>) => unknown
): AppLocalStorageKeyToValue[Key] => {
  try {
    const data = localStorage.getItem(key);
    const parsedData = getParsedData(data);

    const validationResponse =
      appLocalStorageKeyToSchema[key].safeParse(parsedData);

    if (!validationResponse.success) {
      throw new ValidationError(
        `Local storage key = '${key}' has invalid data`,
        validationResponse.error.format()
      );
    }

    return parsedData as AppLocalStorageKeyToValue[Key];
  } catch (error: unknown) {
    if (isKnownError(error)) {
      throw error;
    }

    throw new ValidationError(
      `Error parsing key = '${key}' data from local storage. ${error}`
    );
  }
};

const setLocalStorageData = <Key extends keyof AppLocalStorageKeyToValue>(
  key: Key,
  data: string
) => localStorage.setItem(key, data);

const deleteLocalStorageData = <Key extends keyof AppLocalStorageKeyToValue>(
  key: Key
) => localStorage.removeItem(key);

export { getLocalStorageData, setLocalStorageData, deleteLocalStorageData };

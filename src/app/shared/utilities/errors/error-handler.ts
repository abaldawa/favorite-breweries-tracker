/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";
import axios, { AxiosError } from "axios";
import { ValidationError } from "./error-types";

type KnownErrors = z.ZodError | AxiosError | ValidationError;

/**
 * Extracted error details from an error
 */
interface ErrorDetails {
  /**
   * Error information details
   */
  errorMessage: string;

  /**
   * If its an error from the server then the HTTP
   * response status code
   */
  httpResponseStatusCode?: number;

  /**
   * Use this field to know more details about the error
   * details if it is present
   */
  details?: unknown;
}

/**
 * @public
 *
 * A convenience method to check whether the provided error
 * is known error or not
 *
 * @param error
 * @returns
 */
const isKnownError = (error: unknown): error is KnownErrors =>
  error instanceof z.ZodError ||
  error instanceof AxiosError ||
  error instanceof ValidationError;

/**
 * @private
 *
 * Extracts error details from an axios error
 *
 * @param error
 * @returns
 */
const extractAxiosError = (error: AxiosError) => {
  const errorMessage = error.message;

  let statusCode: number;
  let details: unknown;

  // If there is a response then inspect and extract the response
  if (error.response) {
    statusCode = error.response.status;

    if (error.response.data) {
      // The server sent error details as well
      details = error.response.data;
    }
  } else {
    /**
     * There is no response from the server.
     * In this case we return gateway timeout error
     */
    statusCode = 504;
  }

  return { statusCode, errorMessage, details };
};

/**
 * @public
 *
 * Central error handler which inspects
 * error and returns appropriate status code and error message
 *
 * @param error
 * @param errMsgIfNoMatch
 */
const getErrorDetails = (
  error: unknown,
  errMsgIfNoMatch: string
): ErrorDetails => {
  let httpResponseStatusCode: number | undefined;
  let errorMessage: string;
  let details: unknown;

  if (error instanceof z.ZodError) {
    [errorMessage, details] = ["Invalid server response", error.format()];
  } else if (axios.isAxiosError(error)) {
    ({
      statusCode: httpResponseStatusCode,
      errorMessage,
      details,
    } = extractAxiosError(error));
  } else if (error instanceof ValidationError) {
    [errorMessage, details] = [error.message, error.details];
  } else if (error instanceof Error) {
    errorMessage = `${errMsgIfNoMatch}. Reason -> ${error.message}`;
  } else {
    errorMessage = `${errMsgIfNoMatch}. Reason (unknown error) ->  ${error}`;
  }

  return { httpResponseStatusCode, errorMessage, details };
};

export { getErrorDetails, isKnownError };

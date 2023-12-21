/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";
import { ValidationError } from "../shared/utilities/errors/error-types";

const ConfigSchema = z
  .object({
    REACT_APP_BREWERY_API: z.string().url(),
    REACT_APP_MAPBOX_ACCESS_TOKEN: z.string().min(1),
  })
  .readonly();

interface EnvVariables extends z.infer<typeof ConfigSchema> {}

let envVariables: EnvVariables | undefined;

const getEnvironmentVariables = (): EnvVariables => {
  if (envVariables) {
    return envVariables;
  }

  const validationResult = ConfigSchema.safeParse(process.env);

  if (!validationResult.success) {
    throw new ValidationError(
      `Environment Variables validation failed`,
      validationResult.error.format()
    );
  }

  envVariables = validationResult.data;

  return envVariables;
};

export { getEnvironmentVariables };

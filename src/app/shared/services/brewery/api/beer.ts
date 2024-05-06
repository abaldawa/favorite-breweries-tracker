/**
 * @author Abhijit Baldawa
 */

import axios from "axios";
import {
  ApiParams,
  Beer,
  BeerArraySchema,
  BeerSchema,
  BreweriesApiPagination,
  BreweriesApiPaginationSchema,
} from "../types";
import { getEnvironmentVariables } from "../../../../config/env";

const getBeer = async (id: string) => {
  const { REACT_APP_BREWERY_API } = getEnvironmentVariables();
  const response = await axios.get<Beer>(
    `${REACT_APP_BREWERY_API}/breweries/${id}`
  );
  await BeerSchema.parseAsync(response.data);

  return response.data;
};

const getBeerList = async (params?: ApiParams, abortSignal?: AbortSignal) => {
  const { REACT_APP_BREWERY_API } = getEnvironmentVariables();
  const response = await axios.get<Beer[]>(
    `${REACT_APP_BREWERY_API}/breweries/`,
    { params, signal: abortSignal }
  );

  await BeerArraySchema.parseAsync(response.data);

  return response.data;
};

/**
 * @param size Int between 1 and 50. Default is 3.
 * @returns New promise with api call for random beer list.
 */
const getRandomBeerList = async (size = 3) => {
  const { REACT_APP_BREWERY_API } = getEnvironmentVariables();

  const response = await axios.get<Beer[]>(
    `${REACT_APP_BREWERY_API}/breweries/random?${+new Date()}`,
    {
      params: { size },
    }
  );
  await BeerArraySchema.parseAsync(response.data);

  return response.data;
};

const searchBeerList = async (
  query: string,
  params: Required<Pick<ApiParams, "page" | "per_page">>,
  abortSignal?: AbortSignal
) => {
  const { REACT_APP_BREWERY_API } = getEnvironmentVariables();

  const response = await axios.get<Beer[]>(
    `${REACT_APP_BREWERY_API}/breweries/search`,
    {
      params: { query, ...params },
      signal: abortSignal,
    }
  );
  await BeerArraySchema.parseAsync(response.data);

  return response.data;
};

type BreweriesPaginationDetails = {
  [key in keyof BreweriesApiPagination]: number;
};

const getBreweriesMetaData = async (
  params?: ApiParams,
  abortSignal?: AbortSignal
) => {
  const { REACT_APP_BREWERY_API } = getEnvironmentVariables();

  const response = await axios.get<BreweriesApiPagination>(
    `${REACT_APP_BREWERY_API}/breweries/meta`,
    { params, signal: abortSignal }
  );

  await BreweriesApiPaginationSchema.parseAsync(response.data);

  return Object.freeze(
    Object.fromEntries(Object.entries(response.data).map(([k, v]) => [k, +v]))
  ) as BreweriesPaginationDetails;
};

const getBeerListWithPaginationDetails = async (
  params?: ApiParams,
  abortSignal?: AbortSignal
) => {
  const [beerList, pagination] = await Promise.all([
    getBeerList(params, abortSignal),
    getBreweriesMetaData(params, abortSignal),
  ]);

  return { beerList, pagination };
};

export type { BreweriesPaginationDetails };

export {
  getBeer,
  getBeerList,
  getRandomBeerList,
  getBeerListWithPaginationDetails,
  searchBeerList,
};

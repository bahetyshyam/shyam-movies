import { useQuery } from "react-query";
import { useFilter } from "../contexts/FilterContext";
import { useLocation } from "react-router";
import { MovieTVType, RoutePaths } from "../enums";
import {
  fetchNewestItems,
  fetchPopularItems,
  fetchSearchItems,
  fetchTopRatedItems,
  fetchTrendingItems,
} from "../api/service";

function fetchItems(
  pathName: RoutePaths,
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string,
  searchString: string
) {
  switch (pathName) {
    case RoutePaths.POPULAR:
      return fetchPopularItems(type, genreId, yearFrom, yearTo);
    case RoutePaths.TRENDING:
      return fetchTrendingItems(type);
    case RoutePaths.NEWEST:
      return fetchNewestItems(type, genreId);
    case RoutePaths.TOP_RATED:
      return fetchTopRatedItems(type, genreId, yearFrom, yearTo);
    case RoutePaths.SEARCH:
      return fetchSearchItems(type, searchString);
    default:
      return fetchPopularItems(type, genreId, yearFrom, yearTo);
  }
}

function generateQueryKey(
  pathName: RoutePaths,
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string,
  searchString: string
) {
  switch (pathName) {
    case RoutePaths.POPULAR:
      return ["popular", type, genreId, yearFrom, yearTo];
    case RoutePaths.TRENDING:
      return ["trending", type];
    case RoutePaths.NEWEST:
      return ["newest", type, genreId];
    case RoutePaths.TOP_RATED:
      return ["topRated", type, genreId, yearFrom, yearTo];
    case RoutePaths.SEARCH:
      return ["search", type, searchString];
    default:
      return ["popular", type, genreId, yearFrom, yearTo];
  }
}

export default function useCustomQuery(searchString: string) {
  const { type, genreId, yearFrom, yearTo } = useFilter();
  const { pathname } = useLocation();
  const queryKey = generateQueryKey(
    pathname as RoutePaths,
    type,
    genreId,
    yearFrom,
    yearTo,
    searchString
  );
  return useQuery<Movie[] | TV[]>(queryKey, () =>
    fetchItems(
      pathname as RoutePaths,
      type,
      genreId,
      yearFrom,
      yearTo,
      searchString
    )
  );
}

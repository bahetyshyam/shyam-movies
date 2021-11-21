import { useCallback, useEffect, useState } from "react";
import { useFilter } from "../../contexts/FilterContext";
import MovieTvItems from "../MovieTvItems";
import useSearch from "./hooks";
import { debounce } from "lodash";

interface SearchProps {
  searchString: string;
}

const Search: React.FunctionComponent<SearchProps> = ({ searchString }) => {
  const [debouncedSearchItem, setDebouncedSearchItem] =
    useState<string>(searchString);
  const { type } = useFilter();

  const { isLoading, data, isError, error } = useSearch(
    type,
    debouncedSearchItem
  );

  // eslint-disable-next-line
  const debouncedUpdate = useCallback(
    debounce((searchString: string) => {
      setDebouncedSearchItem(searchString);
    }, 1000),
    [setDebouncedSearchItem]
  );
  useEffect(() => {
    debouncedUpdate(searchString);
  }, [searchString, debouncedUpdate]);

  return isError ? (
    <div style={{ textAlign: "center", fontSize: 16, color: "red" }}>
      {error as string}
    </div>
  ) : (
    <MovieTvItems isLoading={isLoading} items={data} />
  );
};

export default Search;

import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import useCustomQuery from "../../hooks/useCustomQuery";
import MovieTvItems from "../MovieTvItems";

interface CommonComponentProps {
  searchString: string;
}

const CommonComponent: React.FunctionComponent<CommonComponentProps> = ({
  searchString,
}) => {
  const [debouncedSearchItem, setDebouncedSearchItem] =
    useState<string>(searchString);

  const { isLoading, data, isError, error } =
    useCustomQuery(debouncedSearchItem);

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

export default CommonComponent;

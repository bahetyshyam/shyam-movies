import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useFilter } from "../contexts/FilterContext";
import { RoutePaths } from "../enums";

const useUrlQueryParams = (searchString: string) => {
  const [currentQueryString, setCurrentQueryString] = useState("");
  const { type, genreId, yearFrom, yearTo, rating } = useFilter();
  const history = useHistory();
  const { pathname } = useLocation();
  const previousPathName = usePrevious(pathname);
  function updateUrlQueryParams() {
    const params = new URLSearchParams();
    params.append("type", type);
    params.append("genreId", genreId.toString());
    params.append("yearFrom", yearFrom);
    params.append("yearTo", yearTo);
    params.append("rating", rating.toString());
    params.append("search", searchString.toString());
    setCurrentQueryString(params.toString());
    history.push({ search: params.toString() });
  }
  useEffect(() => {
    updateUrlQueryParams();
    // eslint-disable-next-line
  }, [type, genreId, yearFrom, yearTo, rating, searchString]);
  useEffect(() => {
    if (previousPathName === pathname) return;
    if (pathname === RoutePaths.SEARCH) {
      updateUrlQueryParams();
    }
    // eslint-disable-next-line
  }, [pathname]);
  return currentQueryString;
};

// Hook
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default useUrlQueryParams;

import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useFilter } from "../contexts/FilterContext";

const useUrlQueryParams = (searchString: string) => {
  console.log("query hook called");
  const { type, genreId, yearFrom, yearTo, rating } = useFilter();
  const history = useHistory();
  const { pathname } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("type", type);
    params.append("genreId", genreId.toString());
    params.append("yearFrom", yearFrom);
    params.append("yearTo", yearTo);
    params.append("rating", rating.toString());
    params.append("search", searchString.toString());
    history.push({ search: params.toString() });
    // eslint-disable-next-line
  }, [type, genreId, yearFrom, yearTo, rating, searchString, pathname]);
};

export default useUrlQueryParams;

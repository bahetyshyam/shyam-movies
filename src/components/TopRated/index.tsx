import { useFilter } from "../../contexts/FilterContext";
import MovieTvItems from "../MovieTvItems";
import useTopRated from "./hooks";

interface TopRatedProps {}

const TopRated: React.FunctionComponent<TopRatedProps> = () => {
  const { type, genreId, yearFrom, yearTo } = useFilter();
  const { isLoading, data } = useTopRated(type, genreId, yearFrom, yearTo);
  return <MovieTvItems isLoading={isLoading} items={data} />;
};

export default TopRated;

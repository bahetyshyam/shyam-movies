import { useFilter } from "../../contexts/FilterContext";
import MovieTvItems from "../MovieTvItems";
import useTrending from "./hooks";

interface TrendingProps {}

const Trending: React.FunctionComponent<TrendingProps> = () => {
  const { type } = useFilter();
  const { isLoading, data } = useTrending(type);
  return <MovieTvItems isLoading={isLoading} items={data} />;
};

export default Trending;

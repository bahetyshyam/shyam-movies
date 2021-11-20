import { useFilter } from "../../contexts/FilterContext";
import MovieTvItems from "../MovieTvItems";
import usePopular from "./hooks";

interface PopularProps {}

const Popular: React.FunctionComponent<PopularProps> = () => {
  const { type, genreId, yearFrom, yearTo } = useFilter();
  const { isLoading, data } = usePopular(type, genreId, yearFrom, yearTo);
  return <MovieTvItems isLoading={isLoading} items={data} />;
};

export default Popular;

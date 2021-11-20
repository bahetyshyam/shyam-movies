import { useFilter } from "../../contexts/FilterContext";
import MovieTvItems from "../MovieTvItems";
import useNewest from "./hooks";

interface NewestProps {}

const Newest: React.FunctionComponent<NewestProps> = () => {
  const { type, genreId } = useFilter();
  const { isLoading, data } = useNewest(type, genreId);
  return <MovieTvItems isLoading={isLoading} items={data} />;
};

export default Newest;

import { useQuery } from "react-query";
import { MovieTVType } from "../../enums";
import axios from "../../api";

async function fetchTrendingItems(type: MovieTVType): Promise<Movie[] | TV[]> {
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("trending/movie/week", {});
      return response.data.results;
    } else {
      const response = await axios.get("trending/tv/week", {});
      return response.data.results;
    }
  } catch (err) {
    throw err;
  }
}

export default function useTrending(type: MovieTVType) {
  return useQuery<Movie[] | TV[]>(["trending", type], () =>
    fetchTrendingItems(type)
  );
}

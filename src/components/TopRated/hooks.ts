import { useQuery } from "react-query";
import { MovieTVType } from "../../enums";
import axios from "../../api";

async function fetchTopRatedItems(
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string
): Promise<Movie[] | TV[]> {
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("movie/top_rated", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          "primary_release_date.gte": yearFrom,
          "primary_release_date.lte": yearTo,
        },
      });
      return response.data.results;
    } else {
      const response = await axios.get("tv/top_rated", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          "first_air_date.gte": yearFrom,
          "first_air_date.lte": yearTo,
        },
      });
      return response.data.results;
    }
  } catch (err) {
    throw err;
  }
}

export default function useTopRated(
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string
) {
  return useQuery<Movie[] | TV[]>(
    ["topRated", type, genreId, yearFrom, yearTo],
    () => fetchTopRatedItems(type, genreId, yearFrom, yearTo)
  );
}

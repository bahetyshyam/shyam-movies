import { useQuery } from "react-query";
import { MovieTVType } from "../../enums";
import axios from "../../api";

async function fetchNewestItems(
  type: MovieTVType,
  genreId: string | number
): Promise<Movie[] | TV[]> {
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("discover/movie", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          sort_by: "primary_release_date.desc",
          "primary_release_date.lte": new Date().toISOString().split("T")[0],
        },
      });
      return response.data.results;
    } else {
      const response = await axios.get("discover/tv", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          sort_by: "first_air_date.desc",
          "first_air_date.lte": new Date().toISOString().split("T")[0],
        },
      });
      return response.data.results;
    }
  } catch (err) {
    throw err;
  }
}

export default function useNewest(type: MovieTVType, genreId: string | number) {
  return useQuery<Movie[] | TV[]>(["newest", type, genreId], () =>
    fetchNewestItems(type, genreId)
  );
}

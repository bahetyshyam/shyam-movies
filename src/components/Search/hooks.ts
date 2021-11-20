import { useQuery } from "react-query";
import { MovieTVType } from "../../enums";
import axios from "../../api";

async function fetchSearchItems(
  type: MovieTVType,
  searchString: string
): Promise<Movie[] | TV[]> {
  if (searchString === "") {
    // eslint-disable-next-line
    throw "A search string must be provided";
  }
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("search/movie", {
        params: {
          query: searchString,
        },
      });
      return response.data.results;
    } else {
      const response = await axios.get("search/tv", {
        params: {
          query: searchString,
        },
      });
      return response.data.results;
    }
  } catch (err) {
    throw (err as any).response.data.errors[0];
  }
}

export default function useSearch(type: MovieTVType, searchString: string) {
  return useQuery<Movie[] | TV[]>(["search", type, searchString], () =>
    fetchSearchItems(type, searchString)
  );
}

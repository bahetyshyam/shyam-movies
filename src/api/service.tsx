import { RatingType } from "../contexts/FilterContext";
import { MovieTVType } from "../enums";
import axios from "./index";

export async function fetchPopularItems(
  type: MovieTVType,
  genreId: string | number,
  yearFrom: string,
  yearTo: string,
  rating: RatingType
): Promise<Movie[] | TV[]> {
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("movie/popular", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          "primary_release_date.gte": yearFrom,
          "primary_release_date.lte": yearTo,
          ...getRatingParams(rating),
        },
      });
      return response.data.results;
    } else {
      const response = await axios.get("/tv/popular", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          "first_air_date.gte": yearFrom,
          "first_air_date.lte": yearTo,
          ...getRatingParams(rating),
        },
      });
      return response.data.results;
    }
  } catch (err) {
    throw err;
  }
}

export async function fetchTrendingItems(
  type: MovieTVType
): Promise<Movie[] | TV[]> {
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

export async function fetchNewestItems(
  type: MovieTVType,
  genreId: string | number,
  rating: RatingType
): Promise<Movie[] | TV[]> {
  try {
    if (type === MovieTVType.Movie) {
      const response = await axios.get("discover/movie", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          sort_by: "primary_release_date.desc",
          "primary_release_date.lte": new Date().toISOString().split("T")[0],
          ...getRatingParams(rating),
        },
      });
      return response.data.results;
    } else {
      const response = await axios.get("discover/tv", {
        params: {
          with_genres: genreId === "all" ? "" : genreId,
          sort_by: "first_air_date.desc",
          "first_air_date.lte": new Date().toISOString().split("T")[0],
          ...getRatingParams(rating),
        },
      });
      return response.data.results;
    }
  } catch (err) {
    throw err;
  }
}

export async function fetchTopRatedItems(
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

export async function fetchSearchItems(
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

function getRatingParams(rating: RatingType) {
  switch (rating) {
    case 1:
      return {
        "vote_average.gte": 0,
        "vote_average.lte": 2,
      };
    case 2:
      return {
        "vote_average.gte": 3,
        "vote_average.lte": 4,
      };
    case 3:
      return {
        "vote_average.gte": 5,
        "vote_average.lte": 6,
      };
    case 4:
      return {
        "vote_average.gte": 7,
        "vote_average.lte": 8,
      };
    case 5:
      return {
        "vote_average.gte": 9,
        "vote_average.lte": 10,
      };
    default:
      return {
        "vote_average.gte": 9,
        "vote_average.lte": 10,
      };
  }
}

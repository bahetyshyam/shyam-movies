import React, { useContext, useEffect, useState } from "react";
import axios from "../api";
import { MovieTVType } from "../enums";
import { getYearFromDateString } from "../utils";

type FilterContextType = {
  type: MovieTVType;
  genreId: string | number;
  yearFrom: string;
  yearTo: string;
  tvGenres: Genre[];
  movieGenres: Genre[];
  updateType: (type: MovieTVType) => void;
  updateGenreId: (genreId: string | number) => void;
  updateYearFrom: (yearFrom: string) => void;
  updateYearTo: (yearTo: string) => void;
};

const contextDefaultValues: FilterContextType = {
  type: MovieTVType.Movie,
  genreId: "all",
  yearFrom: "2020-01-01",
  yearTo: "2021-12-31",
  tvGenres: [{ id: "all", name: "All" }],
  movieGenres: [{ id: "all", name: "All" }],
  updateType: () => {},
  updateGenreId: () => {},
  updateYearFrom: () => {},
  updateYearTo: () => {},
};
const FilterContext =
  React.createContext<FilterContextType>(contextDefaultValues);

export function useFilter() {
  return useContext(FilterContext);
}

export const FilterProvider: React.FC = ({ children }) => {
  const [type, setType] = useState<MovieTVType>(contextDefaultValues.type);
  const [genreId, setGenreId] = useState<string | number>(
    contextDefaultValues.genreId
  );
  const [yearFrom, setYearFrom] = useState<string>(
    contextDefaultValues.yearFrom
  );
  const [yearTo, setYearTo] = useState<string>(contextDefaultValues.yearTo);
  const [movieGenres, setMovieGenres] = useState<Genre[]>(
    contextDefaultValues.movieGenres
  );
  const [tvGenres, setTvGenres] = useState<Genre[]>(
    contextDefaultValues.tvGenres
  );

  useEffect(() => {
    async function getMoviesGenres() {
      try {
        const response = await axios.get("genre/movie/list");
        setMovieGenres((movieGenres) => [
          ...movieGenres,
          ...response.data.genres,
        ]);
      } catch (error) {
        console.error(error);
      }
    }

    async function getTVGenres() {
      try {
        const response = await axios.get("genre/tv/list");
        setTvGenres((tvGenres) => [...tvGenres, ...response.data.genres]);
      } catch (error) {
        console.error(error);
      }
    }
    getMoviesGenres();
    getTVGenres();
  }, [setMovieGenres, setTvGenres]);

  const updateType = (type: MovieTVType) => {
    setType(type);
    setGenreId(contextDefaultValues.genreId);
  };
  const updateGenreId = (genreId: string | number) => {
    setGenreId(genreId);
  };
  const updateYearFrom = (yearFrom: string) => {
    if (getYearFromDateString(yearFrom) > getYearFromDateString(yearTo)) {
      setYearTo(`${getYearFromDateString(yearFrom)}-12-31`);
    }
    setYearFrom(yearFrom);
  };
  const updateYearTo = (yearTo: string) => {
    if (getYearFromDateString(yearFrom) > getYearFromDateString(yearTo)) {
      setYearFrom(`${getYearFromDateString(yearTo)}-01-01`);
    }
    setYearTo(yearTo);
  };

  const value = {
    type,
    genreId,
    yearFrom,
    yearTo,
    movieGenres,
    tvGenres,
    updateType,
    updateGenreId,
    updateYearFrom,
    updateYearTo,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

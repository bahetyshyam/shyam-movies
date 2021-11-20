import React, { useContext, useEffect, useState } from "react";
import axios from "../api";
import { MovieTVType } from "../enums";

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

  async function getMoviesGenres() {
    try {
      const response = await axios.get("genre/movie/list");
      setMovieGenres([...movieGenres, ...response.data.genres]);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTVGenres() {
    try {
      const response = await axios.get("genre/tv/list");
      setTvGenres([...tvGenres, ...response.data.genres]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMoviesGenres();
    getTVGenres();
  }, []);

  const updateType = (type: MovieTVType) => {
    setType(type);
    setGenreId(contextDefaultValues.genreId);
  };
  const updateGenreId = (genreId: string | number) => {
    setGenreId(genreId);
  };
  const updateYearFrom = (yearFrom: string) => {
    if (new Date(yearFrom).getFullYear() > new Date(yearTo).getFullYear()) {
      setYearTo(`${new Date(yearFrom).getFullYear()}-12-31`);
    }
    setYearFrom(yearFrom);
  };
  const updateYearTo = (yearTo: string) => {
    if (new Date(yearFrom).getFullYear() > new Date(yearTo).getFullYear()) {
      setYearFrom(`${new Date(yearTo).getFullYear()}-01-01`);
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

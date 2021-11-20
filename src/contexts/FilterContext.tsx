import React, { useContext, useEffect, useState } from "react";
import { MovieTVType } from "../enums";
type FilterContextType = {
  type: MovieTVType;
  genreId: string | number;
  yearFrom: string;
  yearTo: string;
  updateType: (type: MovieTVType) => void;
  updateGenreId: (genreId: string) => void;
  updateYearFrom: (yearFrom: string) => void;
  updateYearTo: (yearTo: string) => void;
};

const contextDefaultValues: FilterContextType = {
  type: MovieTVType.Movie,
  genreId: "all",
  yearFrom: "2020-01-01",
  yearTo: "2021-12-31",
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
  const [tvGenres, setTvGenres] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {}, []);

  const updateType = (type: MovieTVType) => {
    setType(type);
  };
  const updateGenreId = (genreId: string) => {
    setGenreId(genreId);
  };
  const updateYearFrom = (yearFrom: string) => {
    setYearFrom(yearFrom);
  };
  const updateYearTo = (yearTo: string) => {
    setYearTo(yearTo);
  };

  const value = {
    type,
    genreId,
    yearFrom,
    yearTo,
    updateType,
    updateGenreId,
    updateYearFrom,
    updateYearTo,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

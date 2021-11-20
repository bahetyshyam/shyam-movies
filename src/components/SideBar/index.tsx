import { Dropdown, IDropdownOption } from "@fluentui/react";
import { useCallback } from "react";
import { useFilter } from "../../contexts/FilterContext";
import { MovieTVType } from "../../enums";
import SC from "./styles";

interface SideBarProps {}
const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const {
    type,
    updateType,
    genreId,
    updateGenreId,
    movieGenres,
    tvGenres,
    yearFrom,
    yearTo,
    updateYearFrom,
    updateYearTo,
  } = useFilter();
  console.log(type, genreId, yearFrom, yearTo);
  const typeDropdownOptions = [
    { key: MovieTVType.Movie, text: "Movie" },
    { key: MovieTVType.TV, text: "TV" },
  ];

  const generateGenresDropdownOptions = useCallback(() => {
    const listToMap = type === MovieTVType.Movie ? movieGenres : tvGenres;
    const dropdownOptions: IDropdownOption[] = listToMap.map((genre) => ({
      key: genre.id,
      text: genre.name,
    }));
    return dropdownOptions;
  }, [movieGenres, tvGenres, type]);

  const generateYearOptions = useCallback(() => {
    let yearFromDropdownOptions: IDropdownOption[] = [];
    let yearToDropdownOptions: IDropdownOption[] = [];
    for (let year = 1900; year <= new Date().getFullYear(); year++) {
      yearFromDropdownOptions.push({
        key: `${year}-01-01`,
        text: year.toString(),
      });
      yearToDropdownOptions.push({
        key: `${year}-12-31`,
        text: year.toString(),
      });
    }
    return [yearFromDropdownOptions, yearToDropdownOptions];
  }, []);

  const onChangeType = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    updateType(item?.key as MovieTVType);
  };

  const onChangeGenre = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    if (item?.key) {
      updateGenreId(item?.key);
    }
  };

  const onChangeYearFrom = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    if (item?.key) {
      updateYearFrom(item?.key as string);
    }
  };

  const onChangeYearTo = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    if (item?.key) {
      updateYearTo(item?.key as string);
    }
  };
  return (
    <SC.MainSectionContainer>
      <Dropdown
        label="Type"
        selectedKey={type}
        onChange={onChangeType}
        placeholder="Select an option"
        options={typeDropdownOptions}
      />
      <Dropdown
        label="Genre"
        selectedKey={genreId}
        onChange={onChangeGenre}
        placeholder="Select an option"
        options={generateGenresDropdownOptions()}
      />
      <Dropdown
        label="Year From"
        selectedKey={yearFrom}
        onChange={onChangeYearFrom}
        placeholder="Select an option"
        options={generateYearOptions()[0]}
      />
      <Dropdown
        label="Year To"
        selectedKey={yearTo}
        onChange={onChangeYearTo}
        placeholder="Select an option"
        options={generateYearOptions()[1]}
      />
    </SC.MainSectionContainer>
  );
};

export default SideBar;

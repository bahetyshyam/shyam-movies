import { Dropdown, IDropdownOption } from "@fluentui/react";
import { useCallback } from "react";
import { useLocation } from "react-router";
import { useFilter } from "../../contexts/FilterContext";
import { MovieTVType } from "../../enums";
import { getYearFromDateString } from "../../utils";
import SC from "./styles";
import ThemeToggle from "./ThemeToggle";

interface SideBarProps {}
const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const { pathname } = useLocation();
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
    for (let year = 1900; year <= getYearFromDateString(); year++) {
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

  const isGenreDisabled = () => {
    if (pathname === "/trending" || pathname === "/search") return true;
    else return false;
  };

  const isYearDisabled = () => {
    if (
      pathname === "/trending" ||
      pathname === "/newest" ||
      pathname === "/search"
    )
      return true;
    else return false;
  };

  return (
    <SC.SideBarContainer>
      <SC.OptionsHeading>DISCOVER OPTIONS</SC.OptionsHeading>
      <SC.FilterItem>
        <label>Type</label>
        <Dropdown
          selectedKey={type}
          onChange={onChangeType}
          placeholder="Select an option"
          options={typeDropdownOptions}
        />
      </SC.FilterItem>
      <SC.FilterItem>
        <label>Genre</label>

        <Dropdown
          disabled={isGenreDisabled()}
          selectedKey={genreId}
          onChange={onChangeGenre}
          placeholder="Select an option"
          options={generateGenresDropdownOptions()}
        />
      </SC.FilterItem>
      <SC.FilterItem>
        <label>Year</label>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ marginRight: 10, width: "50%" }}>
            <Dropdown
              disabled={isYearDisabled()}
              selectedKey={yearFrom}
              onChange={onChangeYearFrom}
              placeholder="Select an option"
              options={generateYearOptions()[0]}
            />
          </div>

          <div style={{ marginRight: 10, width: "50%" }}>
            <Dropdown
              disabled={isYearDisabled()}
              selectedKey={yearTo}
              onChange={onChangeYearTo}
              placeholder="Select an option"
              options={generateYearOptions()[1]}
            />
          </div>
        </div>
      </SC.FilterItem>

      <SC.FilterItem>
        <ThemeToggle />
      </SC.FilterItem>
    </SC.SideBarContainer>
  );
};

export default SideBar;

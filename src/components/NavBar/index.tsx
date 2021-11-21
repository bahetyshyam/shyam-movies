import { Pivot, PivotItem, SearchBox } from "@fluentui/react";
import { useHistory, useLocation } from "react-router";
import SC from "./styles";
import { RoutePaths } from "../../enums";
import useUrlQueryParams from "../../hooks/useUrlQueryParams";

interface NavBarProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ searchString, setSearchString }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const queryString = useUrlQueryParams(searchString);

  const handleSearchChange = (newValue: string) => {
    if (newValue === undefined) {
      return;
    }
    setSearchString(newValue);
  };
  const handleLinkClick = (item?: PivotItem | undefined) => {
    if (pathname === item?.props.itemKey!) return;
    history.push({ pathname: item?.props.itemKey!, search: queryString });
  };
  return (
    <SC.NavContainer>
      <SC.AppName>
        {pathname === RoutePaths.POPULAR ? (
          <span>Discover</span>
        ) : (
          <span
            onClick={() =>
              handleLinkClick({
                props: { itemKey: RoutePaths.POPULAR },
              } as PivotItem)
            }
          >
            Discover
          </span>
        )}
      </SC.AppName>
      <SC.NavItemsContainer>
        <Pivot
          selectedKey={pathname === RoutePaths.SEARCH ? null : pathname}
          // eslint-disable-next-line react/jsx-no-bind
          onLinkClick={handleLinkClick}
          headersOnly={true}
        >
          <PivotItem headerText="POPULAR" itemKey={RoutePaths.POPULAR} />
          <PivotItem headerText="TRENDING" itemKey={RoutePaths.TRENDING} />
          <PivotItem headerText="NEWEST" itemKey={RoutePaths.NEWEST} />
          <PivotItem headerText="TOP RATED" itemKey={RoutePaths.TOP_RATED} />
        </Pivot>
      </SC.NavItemsContainer>

      <SC.SearchBoxContainer>
        <SearchBox
          placeholder="Search"
          onClear={(ev) => handleSearchChange("")}
          onChange={(ev, newValue) => handleSearchChange(newValue as string)}
          value={searchString}
        />
      </SC.SearchBoxContainer>
    </SC.NavContainer>
  );
};

export default NavBar;

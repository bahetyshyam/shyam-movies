import { Link } from "react-router-dom";
import { Pivot, PivotItem, SearchBox } from "@fluentui/react";
import { useHistory, useLocation } from "react-router";
import SC from "./styles";
import { RoutePaths } from "../../enums";

interface NavBarProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ searchString, setSearchString }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const handleSearchChange = (newValue: string) => {
    if (newValue === undefined) {
      return;
    }
    setSearchString(newValue);
  };
  const handleLinkClick = (item?: PivotItem | undefined) => {
    history.push(item?.props.itemKey!);
  };
  return (
    <SC.NavContainer>
      <SC.AppName>
        <Link to={RoutePaths.POPULAR}>Discover</Link>
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

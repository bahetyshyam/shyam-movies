import { Link } from "react-router-dom";
import { Pivot, PivotItem, SearchBox } from "@fluentui/react";
import { useHistory, useLocation } from "react-router";
import SC from "./styles";

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
        <Link to="/popular">Discover</Link>
      </SC.AppName>
      <SC.NavItemsContainer>
        <Pivot
          aria-label="Separately Rendered Content Pivot Example"
          selectedKey={pathname === "/search" ? null : pathname}
          // eslint-disable-next-line react/jsx-no-bind
          onLinkClick={handleLinkClick}
          headersOnly={true}
        >
          <PivotItem headerText="POPULAR" itemKey="/popular" />
          <PivotItem headerText="TRENDING" itemKey="/trending" />
          <PivotItem headerText="NEWEST" itemKey="/newest" />
          <PivotItem headerText="TOP RATED" itemKey="/top-rated" />
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

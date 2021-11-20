import { Link } from "react-router-dom";
import { SearchBox } from "@fluentui/react";

interface NavBarProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ searchString, setSearchString }) => {
  const handleSearchChange = (newValue: string) => {
    if (newValue === undefined) {
      return;
    }
    setSearchString(newValue);
  };
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
        display: "flex",
      }}
    >
      <Link to="/popular">Popular</Link> | <Link to="/trending">Trending</Link>{" "}
      | <Link to="/newest">Newest</Link> |{" "}
      <Link to="/top-rated">Top-Rated</Link>
      <SearchBox
        placeholder="Search"
        onClear={(ev) => handleSearchChange("")}
        onChange={(ev, newValue) => handleSearchChange(newValue as string)}
        value={searchString}
        style={{ width: 200 }}
      />
    </nav>
  );
};

export default NavBar;

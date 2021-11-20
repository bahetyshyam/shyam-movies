import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  console.log("navbar");
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/popular">Popular</Link> | <Link to="/trending">Trending</Link>{" "}
      | <Link to="/newest">Newest</Link> |{" "}
      <Link to="/top-rated">Top-Rated</Link>
    </nav>
  );
};

export default NavBar;

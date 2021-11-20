import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import GlobalTheme from "./components/GlobalTheme";
import MainSection from "./components/MainSection";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { FilterProvider } from "./contexts/FilterContext";

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const { pathname } = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (searchString.length > 0 && pathname !== "/search") {
      history.push("/search");
    }
  }, [searchString]);
  useEffect(() => {
    if (pathname !== "/search") {
      setSearchString("");
    }
  }, [pathname]);
  return (
    <GlobalTheme>
      <div className="container">
        <FilterProvider>
          <NavBar
            searchString={searchString}
            setSearchString={setSearchString}
          />
          <div style={{ display: "flex", width: "100%" }}>
            <MainSection searchString={searchString} />
            <SideBar />
          </div>
        </FilterProvider>
      </div>
    </GlobalTheme>
  );
}

export default App;

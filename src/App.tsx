import { Spinner, SpinnerSize } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import GlobalTheme from "./components/GlobalTheme";
import MainSection from "./components/MainSection";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { FilterProvider } from "./contexts/FilterContext";
import { AppContainer } from "./globalStyles";

import { useIsFetching } from "react-query";

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (pathname !== "/search") {
      console.log("clearing search string");
      setSearchString("");
    }
  }, [pathname]);
  useEffect(() => {
    if (searchString.length > 0 && pathname !== "/search") {
      console.log("pushing to search");
      history.push("/search");
    }
    // eslint-disable-next-line
  }, [searchString]);
  return (
    <GlobalTheme>
      <FilterProvider>
        <AppContainer>
          <div
            style={{
              width: "80%",
              paddingRight: 30,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavBar
              searchString={searchString}
              setSearchString={setSearchString}
            />
            <MainSection searchString={searchString} />
          </div>
          <SideBar />
        </AppContainer>
        <TopRightSpinner />
      </FilterProvider>
    </GlobalTheme>
  );
}

function TopRightSpinner() {
  const isFetching = useIsFetching();
  if (isFetching) {
    return (
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <Spinner size={SpinnerSize.large} />
      </div>
    );
  } else return null;
}

export default App;

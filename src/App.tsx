import GlobalTheme from "./components/GlobalTheme";
import MainSection from "./components/MainSection";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { FilterProvider } from "./contexts/FilterContext";

function App() {
  return (
    <GlobalTheme>
      <div className="container">
        <FilterProvider>
          <NavBar />
          <div style={{ display: "flex", width: "100%" }}>
            <MainSection />
            <SideBar />
          </div>
        </FilterProvider>
      </div>
    </GlobalTheme>
  );
}

export default App;

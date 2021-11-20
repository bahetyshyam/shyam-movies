import { Redirect, Route, Switch } from "react-router-dom";
import Newest from "../Newest";
import Popular from "../Popular";
import Search from "../Search";
import TopRated from "../TopRated";
import Trending from "../Trending";
import SC from "./styles";

interface MainSectionProps {
  searchString: string;
}

const MainSection: React.FC<MainSectionProps> = ({ searchString }) => {
  return (
    <SC.MainSectionContainer>
      <Switch>
        <Route exact path="/">
          <Redirect to="/popular" />
        </Route>
        <Route path="/popular" component={Popular} />
        <Route path="/trending" component={Trending} />
        <Route path="/newest" component={Newest} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/search">
          <Search searchString={searchString} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </SC.MainSectionContainer>
  );
};

export default MainSection;

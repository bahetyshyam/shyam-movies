import { Redirect, Route, Switch } from "react-router-dom";
import Newest from "../Newest";
import Popular from "../Popular";
import TopRated from "../TopRated";
import Trending from "../Trending";
import SC from "./styles";

interface MainSectionProps {}

const MainSection: React.FC<MainSectionProps> = () => {
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
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </SC.MainSectionContainer>
  );
};

export default MainSection;

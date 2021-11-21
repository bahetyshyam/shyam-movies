import { Redirect, Route, Switch } from "react-router-dom";
import { RoutePaths } from "../../enums";
import CommonComponent from "../CommonComponent";
import SC from "./styles";

interface MainSectionProps {
  searchString: string;
}

const MainSection: React.FC<MainSectionProps> = ({ searchString }) => {
  return (
    <SC.MainSectionContainer>
      <Switch>
        <Route exact path={RoutePaths.HOME}>
          <Redirect to={RoutePaths.POPULAR} />
        </Route>
        <Route path={RoutePaths.POPULAR}>
          <CommonComponent searchString={searchString} />
        </Route>
        <Route path={RoutePaths.TRENDING}>
          <CommonComponent searchString={searchString} />
        </Route>
        <Route path={RoutePaths.NEWEST}>
          <CommonComponent searchString={searchString} />
        </Route>
        <Route path={RoutePaths.TOP_RATED}>
          <CommonComponent searchString={searchString} />
        </Route>
        <Route path={RoutePaths.SEARCH}>
          <CommonComponent searchString={searchString} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </SC.MainSectionContainer>
  );
};

export default MainSection;

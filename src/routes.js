import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";

export default (
  <Switch>
    <Route path="/landing" component={Landing} />
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Gallery} />
    <Route path="/profile" component={Profile} />
  </Switch>
);

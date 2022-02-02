import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from './templates';
import Auth from "./templates/Auth";

function Routering() {
  return (
      <Switch>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Auth>
          <Route exact path='(/)?' component={Home}></Route>
        </Auth>
      </Switch>
  );
}

export default Routering;
//connect()と喧嘩するので<BrowseRouter></BrowseRouter>は除外した
//storeから直接locationを受け取るからと思われる
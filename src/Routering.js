import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from './templates';

function Routering() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Route exact path='(/)?' component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routering;
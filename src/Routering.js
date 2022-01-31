import './App.css';
import { BrowserRouter, Switch, Router, Route } from "react-router-dom";
import { Login } from './templates';
import { Home } from './templates';

function Routering() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'><Login /></Route>
        <Route exact path='(/)?'><Home /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routering;
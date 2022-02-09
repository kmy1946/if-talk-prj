import { Switch, Route } from "react-router-dom";
import Page404 from "./components/Error/Page404";
import { Home, ProductDetail, ProductEdit, ProductList, BookMarkList, Reset, SignIn, SignUp } from './templates';
import Auth from "./templates/Auth";

function Routering() {
  return (
      <Switch>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Route exact path='/signin/reset' component={Reset}></Route>
        <Auth>
          <Route exact path={"(/)?"} component={ProductList}></Route>
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route path="/product/edit(/:id)?" component={ProductEdit} />
          <Route exact path='/bookmark' component={BookMarkList} />
        </Auth>
        <Route>
          <Page404 />
        </Route>
      </Switch>
  );
}

export default Routering;
//connect()と喧嘩するので<BrowseRouter></BrowseRouter>は除外した
//storeから直接locationを受け取るからと思われる
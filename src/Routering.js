import { Switch, Route } from "react-router-dom";
import Page404 from "./components/Error/Page404";
import { Home, ProductDetail, ProductEdit, ProdctEditRich, ProductList, ProductsList, BookMarkList, Reset, SignIn, SignUp, GuestSignIn, TopSwiper, SideBar, SideBarLeft, SideBarGuest } from './templates';
import Auth from "./templates/Auth";
import './App.css'

function Routering() {
  return (
      <Switch>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Route exact path='/signin_asguest' component={GuestSignIn}></Route>
        <Route exact path='/signin/reset' component={Reset}></Route>

        <Route exact path={"/"}>
          <>
         <TopSwiper />
         {
            (
              window.innerWidth > 760 ?
              <>
                <div className="parent">
                  <div className="child1">
                  <SideBarLeft/>
                  </div>
                  <div className="parent_child">
                    <ProductsList/>
                  </div>
                  {/*
                  <div className="parent_element">
                    <ProductsList/>
                  </div>
                  */}
                  <div className="child2">
                    <SideBarGuest/>
                  </div>
                </div>
              </>
              :
              <>
                <main className="c-main">
                  <ProductList />
                </main>
              </>
            )
          }
          </>
        </Route>

        <Route exact path="/product/:id" component={ProductDetail} />
        
        <Auth>
          <Route exact path={"(/users/)?"}>
          <TopSwiper />
          {
            (
              window.innerWidth > 760 ?
              <>
                <div className="parent">
                  <div className="child1">
                  <SideBarLeft/>
                  </div>
                  <div className="parent_child">
                    <ProductsList/>
                  </div>
                  {/*
                  <div className="parent_element">
                    <ProductsList/>
                  </div>
                  */}
                  <div className="child2">
                    <SideBar/>
                  </div>
                </div>
              </>
              :
              <>
                <main className="c-main">
                  <ProductList />
                </main>
              </>
            )
          }
          </Route>
          <Route exact path="/users/product/:id" component={ProductDetail} />
          <Route path="/users/product/edit(/:id)?" component={ProdctEditRich} />
          <Route exact path='/users/bookmark' component={BookMarkList} />
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
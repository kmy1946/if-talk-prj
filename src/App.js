import React from "react";
import "./App.css";
import "./assets/reset.css";
import "./assets/style.css";
import Routering from './Routering';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Loading } from "./components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "./reducks/users/selectors";

const App = () => {
  const selector = useSelector((state) => state);

  const if_user_name = localStorage.getItem('if-username')
  localStorage.setItem('if_user_name', if_user_name)
  //localStorage.setItem('if_signedin', isSignedIn)

  return (
    <Loading>
      <div>
        <Header/>
        {
          (
            window.innerWidth > 760 ?
            <>
              {(() => {
                      if (if_user_name) {
                        //console.log('exist'+if_user_name)
                        return (
                          <Routering />
                          )
                      } else {
                        //console.log('user_is_not_signedin')
                        return (
                        <>
                          <main className="c-main">
                            <Routering />
                          </main>
                        </>
                        )
                      }
                    }
                  )
                ()
              }
            </>
            :
            <>
              <main className="c-main">
                <Routering />
              </main>
            </>
          )
        }
        <Footer/>
      </div>
    </Loading>
  );
}

export default App;

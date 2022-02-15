import React from "react";
import "./App.css";
import "./assets/reset.css";
import "./assets/style.css";
import Routering from './Routering';
import { Header } from "./components/Header";
import { SideBar, TopSwiper } from "./templates";
import { makeStyles } from "@material-ui/core";
import { theme } from "./assets/theme";
import { Footer } from "./components/Footer";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles({})

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const if_user_name = localStorage.getItem('if-username')
  localStorage.setItem('if_user_name', if_user_name)

  return (
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
  );
}

export default App;

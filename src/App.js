import React from "react";
import "./App.css";
import "./assets/reset.css";
import "./assets/style.css";
import Routering from './Routering';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Loading } from "./components/UIkit";
import { TopMenu } from "./components/TopMenu";

const App = () => {
  const if_user_name = localStorage.getItem('if-username')
  localStorage.setItem('if_user_name', if_user_name)

  return (
    <Loading>
      <>
      {/*
        <Header/>
      */}
        <TopMenu/>
        {
          (
            window.innerWidth > 760 ?
            <>
              {(() => {
                      if (if_user_name) {
                        return (
                          <Routering />
                          )
                      } else {
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
      </>
    </Loading>
  );
}

export default App;

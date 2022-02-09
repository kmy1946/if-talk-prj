import React from "react";
import "./App.css";
import "./assets/reset.css";
import "./assets/style.css";
import Routering from './Routering';
import Header from "./components/Header/Header";
import { SideBar } from "./templates";

const App = () => {
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
                      //console.log(if_user_id)
                        return (
                          <>
                            <div className="c c-main clearfix">
                              <Routering />
                            </div>
                            
                            <div className="b clear_box">
                              <SideBar/>
                            </div>
                          </>
                        )
                    } else {
                      //console.log('no_if_user_id')
                      return (
                      <>
                        <main className="c-main">
                          <Routering />
                        </main>
                      </>
                      )
                    }
            })()}

          </>
          :
          <>
            <main className="c-main">
              <Routering />
            </main>
          </>
        )
      }
    </div>
  );
}

export default App;

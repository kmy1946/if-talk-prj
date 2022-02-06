import React from "react";
import "./assets/reset.css"
import "./assets/style.css"
import Routering from './Routering';
import Header from "./components/Header/Header";
const App = () => {
  return (
    <>
      <Header/>
      <main className="c-main">
        <Routering />
      </main>
    </>
  );
}

export default App;

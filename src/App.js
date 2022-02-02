import "./assets/reset.css"
import "./assets/style.css"
import { BrowserRouter, Switch, Router, Route } from "react-router-dom";
import Routering from './Routering';
import Header from './headers/Header';

function App() {
  return (
    <main>
      <Header />
      <Routering />
    </main>
  );
}

export default App;

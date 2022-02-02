import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Router, Route } from "react-router-dom";
import Routering from './Routering';
import Header from './components/base/Header';

function App() {
  return (
    <main>
      <Header />
      <Routering />
    </main>
  );
}

export default App;

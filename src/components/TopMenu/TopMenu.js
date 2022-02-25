import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import './TopMenu.css'
import { LogoText } from ".";

const TopMenu = () => {
  const dispatch = useDispatch();
  return (
    <>
      
        <ul>
          <div className="logotext_wrap">
            <LogoText/>
          </div>
          <div className="navigation">
            <li className="button">
              <p><a onClick={() => dispatch(push('/'))}>Home</a></p>
            </li>
            <li className="button">
              <p><a onClick={() => dispatch(push('/about'))}>About</a></p>
            </li>
            <li className="button">
              <p><a onClick={() => dispatch(push('/contact'))}>Contact</a></p>
            </li>
            </div>
          </ul>
        
    {/*
        <nav className="header-nav">
          <ul className="header-nav-list">
            <a onClick={() => dispatch(push('/'))}><li className="header-nav-item">List</li></a>
            <a onClick={() => dispatch(push('/contact'))}><li className="header-nav-item">Contact</li></a>
          </ul>
        </nav>
    */}
    </>
  )
}
export default TopMenu;
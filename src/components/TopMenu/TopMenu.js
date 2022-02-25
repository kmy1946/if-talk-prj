import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import './TopMenu.css'
import { LogoText } from ".";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { makeStyles } from "@material-ui/core";
import { HeaderMenu, handleDrawerToggle, HeaderMenuGuest } from "../Header";

const useStyles = makeStyles({
  if_logo: {
  },
  root: {
    flexGrow: 1,
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
}
);

const TopMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname//domein以降
  const id = path.split('/product/')[1];//２つ目=id
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setOpen(!open)
    //console.log(open)
  }, [setOpen, open]);

  return (
    <>
      
        <ul>
          {isSignedIn ?
            (//サインイン状態
                window.innerWidth > 760 ?
                  <></>
                  :
                  (
                  <>
                    <div className={classes.iconButtons}>
                      <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
                    </div>
                  </>
                )
              )
              :
              (//非サインイン状態
                (
                  window.innerWidth > 760 ?
                    <></>
                  :
                  (
                  <>
                    <div className={classes.iconButtons}>
                      <HeaderMenuGuest />
                    </div>
                  </>
                )
              )
            )
          }
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
import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles}     from '@material-ui/core/styles';
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import {useDispatch, useSelector}     from "react-redux";
import { ClosableDrawer, HeaderMenu } from "../index";
import { getIsSignedIn } from '../../../reducks/users/selectors';
import HeaderMenuRow from '../HeaderMenu/HeaderMenuRow';
import LogoText from './LogoText';
import HeaderMenuGuest from '../Guest/HeaderMenuGuest';
import '../Header.css'
import LogoTextGuest from './LogoTextGuest';

const useStyles = makeStyles({
    if_logo: {
      marginBottom:'10px'
    },
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: "#fff",
      color: '#444',
      height:'40px',
      backgroundColor:'#eeeeee'
    },
    toolbar: {
      margin: '0 auto',
      maxWidth: '100%',
      width: '100%',
    },
    iconButtons: {
      margin: '0 0 0 auto',
      marginBottom:'15px'
    },
    header__right_guest: {
      margin: '0 0 0 auto',
      marginBottom:'20px',
      color:'green'
    },
  }
);

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
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
      <div className={classes.root}>
        <AppBar className={classes.menuBar}>{/*position="fixed" */}
            <Toolbar className={classes.toolbar}>
                {isSignedIn ?
                  (//サインイン状態
                  window.innerWidth > 760 ?
                    <>
                    {/*
                      <img alt="If Logo" src={logo} width="128px" className={classes.if_logo}
                          onClick={() => dispatch(push('/'))}
                      />
                    */}
                      <LogoText/>
                      <div className={classes.iconButtons}>
                        <HeaderMenuRow />
                      </div>
                    </>
                    :
                    (
                    <>
                      <LogoText/>
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
                      <>
                      <LogoTextGuest/>
                        <div className={classes.header__right_guest}>
                          <small>
                            プログラミング情報サイト　
                          </small>
                          <a href='/whensignin' className='header__signin-link'>
                            <small>
                              ユーザー関連
                            </small>
                          </a>
                        </div>
                      </>
                      :
                      (
                      <>
                        <LogoTextGuest/>
                        <div className={classes.iconButtons}>
                          <HeaderMenuGuest />
                        </div>
                      </>
                    )
                  )
                )
              }
            </Toolbar>
        </AppBar>
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      </div>
      )
 }

 export default Header;
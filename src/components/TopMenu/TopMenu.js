import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import IconButton from "@material-ui/core/IconButton";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import './TopMenu.css'
import { LogoText } from ".";
import { getIsSignedIn, getProductsInBookMark } from "../../reducks/users/selectors";
import { makeStyles } from "@material-ui/core";
import { HeaderMenu, handleDrawerToggle, HeaderMenuGuest } from "../Header";
import {Badge} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from "../../reducks/users/operations";

const useStyles = makeStyles({
  if_logo: {
  },
  root: {
    flexGrow: 1,
  },
  iconButtons: {
    margin: '0 0 0 auto',
    position:"fixed",
    top:0,
    right:0,
    zIndex:99
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

  let productsInBookMark = getProductsInBookMark(selector);

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
                  <>
                  <div className='topmenu__icon-group'>
                    <IconButton onClick={() => dispatch(push('/users/product/edit'))}>
                      <BorderColorIcon className='header__bordercoloricon'/>
                    </IconButton>
                    <IconButton onClick={() => dispatch(push('/users/bookmark'))}>
                      <Badge badgeContent={productsInBookMark.length} color="secondary">
                        <FavoriteBorderIcon />
                      </Badge>
                    </IconButton>
                    <IconButton onClick={() => dispatch(signOut())}>
                      <Badge color="secondary">
                        <ExitToAppIcon/>
                      </Badge>
                    </IconButton><small>ログアウト</small>
                  </div>
                  </>
                  :
                  (
                  <>
                    <div className={classes.iconButtons} style={{textAlign:'right'}}>
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
    </>
  )
}
export default TopMenu;
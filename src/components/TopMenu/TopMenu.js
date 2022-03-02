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

  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
    //props.onClose(event, false);//menu選択時に閉じる
};

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "Home", id: "home", value: "/"},
    {func: selectMenu, label: "About", id: "about", value: "/about"},
    {func: selectMenu, label: "Contact", id: "contact", value: "/contact"},
  ])

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
                  <>
                  
                  </>
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

          {(
                  window.innerWidth > 760 ?
                  <>
                  <div className="navigation__pc">
                      {filters.map(filter => (
                        <li className="button__pc" key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                          <p>
                            <a
                              className="topmenu-label__pc" 
                              onClick={() => dispatch(push('/'))}>
                            {filter.label}
                            </a>
                          </p>
                        </li>
                      ))}
                    </div>
                  </>
                :
                (
                  <>
                    <div className="navigation__mobile">
                      {filters.map(filter => (
                        <li className="button__mobile" key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                          <p>
                            <a
                              className="topmenu-label__mobile" 
                              onClick={() => dispatch(push('/'))}>
                            {filter.label}
                            </a>
                          </p>
                        </li>
                      ))}
                    </div>
                  </>
                )
              )}
        </ul>
    </>
  )
}
export default TopMenu;
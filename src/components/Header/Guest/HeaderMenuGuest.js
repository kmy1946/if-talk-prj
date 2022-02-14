import React, { useCallback, useState } from 'react';
import {push} from "connected-react-router"
import { Button } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {useDispatch, useSelector}     from "react-redux";
import { ClosableDrawerGuest } from '..';

const HeaderMenuGuest = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
  
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
        <div className='header_button__mobile_group'>
          {/*
          <Button onClick={() => dispatch(push('/signin'))} className='guest_signin__button'>
            ログイン
          </Button>
          <Button onClick={() => dispatch(push('/signup'))} className='guest_signup__button'>
            ユーザー登録
          </Button>
          */}
          <IconButton onClick={(event) => handleDrawerToggle(event)}>
            <MenuIcon />
          </IconButton>
        <ClosableDrawerGuest open={open} onClose={handleDrawerToggle} />
        </div>
    );
};

export default HeaderMenuGuest;
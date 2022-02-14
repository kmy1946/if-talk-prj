import React, {useCallback, useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {signOut} from "../../../reducks/users/operations";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Badge, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                flexShrink: 0,
                width: 256
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }
));

const MapMenuListRow = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event, false);//menu選択時に閉じる
    };

    const [searchKeyword, setSearchKeyword] = useState("")

    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [setSearchKeyword])

    return (
      <>
                    　
                    <IconButton onClick={() => dispatch(signOut())}>
                      <Badge color="secondary">
                        <ExitToAppIcon/>
                      </Badge>
                    </IconButton><small>ログアウト</small>
      </>
    );
}

export default MapMenuListRow
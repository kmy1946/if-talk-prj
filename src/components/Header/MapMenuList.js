import React, {useCallback, useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {signOut} from "../../reducks/users/operations";
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                flexShrink: 0,
                width: 256
            }
        },
        // necessary for content to be below app bar
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

const MapMenuList = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectMenu = (event, path) => {
        dispatch(push(path));
        //props.onClose(event, false);//menu選択時に閉じる,TypeError
    };

    const [searchKeyword, setSearchKeyword] = useState("")

    const menus = [
        {func: selectMenu, label: "記事作成",    icon: <BorderColorIcon />, id: "register", value: "/product/edit"},
        //{func: selectMenu, label: "ブックマーク",    icon: <AddIcon/>,   id: "history",  value: "/order/history"},
        {func: selectMenu, label: "お気に入り",    icon: <FavoriteBorderIcon/>,   id: "history1",  value: "/bookmark"},
        //{func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
    ];
    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [setSearchKeyword])

    return (
                    <List>
                        {menus.map(menu => (
                            //((isAdministrator && menu.id === "register") || menu.id !== "register") && (
                                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                         //   )
                        ))
                        }
                        {/*
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                        */}
                    </List>
    );
}

export default MapMenuList
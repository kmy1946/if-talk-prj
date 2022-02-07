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
//    const { container } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
//    const selector = useSelector(state  => state);
  //  const userRole = getUserRole(selector);
    //const isAdministrator = (userRole === "administrator");

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event, false);//menu選択時に閉じる
    };

    const [searchKeyword, setSearchKeyword] = useState("")
      //    [filters, setFilters] = useState([
        //      {func: selectMenu, label: "すべて",    id: "all",    value: "/"              },
          //    {func: selectMenu, label: "メンズ",    id: "male",   value: "/?gender=male"  },
            //  {func: selectMenu, label: "レディース", id: "female", value: "/?gender=female"},
//          ]);

    const menus = [
        {func: selectMenu, label: "記事作成",    icon: <BorderColorIcon />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "ブックマーク",    icon: <AddIcon/>,   id: "history",  value: "/order/history"},
        {func: selectMenu, label: "お気に入り",    icon: <FavoriteBorderIcon/>,   id: "history1",  value: "/order/history"},
        {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
    ];
//
//    useEffect(() => {
  //      db.collection('categories').orderBy("order", "asc").get()
    //        .then(snapshots => {
      //          const list = []
        //        snapshots.forEach(snapshot => {
          //          const category = snapshot.data()
            //        list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
//                })
  //              setFilters(prevState => [...prevState, ...list])
    //        });
//    },[])

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
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
    );
}

export default MapMenuList
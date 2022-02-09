import React, {useCallback, useEffect, useState} from "react";
import { TextInput } from "../components/UIkit";
import { Divider, makeStyles } from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../Firebase";
import { MapMenuList } from "../components/Header";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

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

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()



  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
};

  const [searchKeyword, setSearchKeyword] = useState("")

  const [filters, setFilters] = useState([
      {func: selectMenu, label: "全て", id: "all", value: "/"},
      {func: selectMenu, label: "初心者", id: "beginner", value: "/?clients=初心者"},
      {func: selectMenu, label: "中級者", id: "intermediate", value: "/?clients=中級者"},
      {func: selectMenu, label: "上級者", id: "advanced", value: "/?clients=上級者"}
  ])

  const menus = [
      {func: selectMenu, label: "記事作成",    icon: <BorderColorIcon />, id: "register", value: "/product/edit"},
      {func: selectMenu, label: "ブックマーク",    icon: <AddIcon/>,   id: "history",  value: "/order/history"},
      {func: selectMenu, label: "お気に入り",    icon: <FavoriteBorderIcon/>,   id: "history1",  value: "/order/history"},
      {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
  ];

  useEffect(() => {
      db.collection('categories')
          .orderBy('order', 'asc')
          .get()
          .then((snapshot) => {
              const list = []
              snapshot.forEach(snapshot => {
                  const category = snapshot.data()
                  list.push({func: selectMenu, label:category.name, id:category.id, value:`/?category=${category.name}`})
              })
              setFilters(prevState => [...prevState, ...list])//prevState --> 更新前のStateを持てる
          })
  }, [])

  const inputSearchKeyword = useCallback((event) => {
      setSearchKeyword(event.target.value)
  }, [setSearchKeyword])


  return(
    <div>
                <div>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <MapMenuList/>
                    <Divider variant="middle" />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
    </div>
  )
}
export default SideBar;
//ClosableDrawerをと同じ
import React, {useCallback, useEffect, useState} from "react";
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
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../Firebase";
import { MapMenuList } from "../components/Header";
import { TextInput } from "../components/UIkit";

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
      marginLeft: 32,
      whiteSpace:'noWrap'
  }
}
));

const SideBarGuest = () => {
  const classes = useStyles();
  const dispatch = useDispatch()



  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
};

  const [searchKeyword, setSearchKeyword] = useState("")

  const [filters, setFilters] = useState([
      {func: selectMenu, label: "全て", id: "all", value: "/"},
      {func: selectMenu, label: "初心者", id: "beginner", value: "/guest/?clients=初心者"},
      {func: selectMenu, label: "中級者", id: "intermediate", value: "/guest/?clients=中級者"},
      {func: selectMenu, label: "上級者", id: "advanced", value: "/guest/?clients=上級者"}
  ])
  const [filters_cat, setFilters_cat] = useState([])
  useEffect(() => {
      db.collection('categories')
          .orderBy('order', 'asc')
          .get()
          .then((snapshot) => {
              const list = []
              snapshot.forEach(snapshot => {
                  const category = snapshot.data()
                  list.push({func: selectMenu, label:category.name, id:category.id, value:`/guest/?category=${category.name}`})
              })
              setFilters_cat(prevState => [...prevState, ...list])//prevState --> 更新前のStateを持てる
          })
  }, [])

  const inputSearchKeyword = useCallback((event) => {
      setSearchKeyword(event.target.value)
  }, [setSearchKeyword])


  return(
    <div>
                <div>
                    {/*
                    <p className='sidebar__p'>
                        サイドバー
                    </p>
                    */}
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"検索"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    {/*
                    <MapMenuList/>
                    <Divider variant="middle" />
                    <Divider variant="middle" />
                    */}
                    <List>
                        <p className="sidebar__title">言語</p>
                        {filters_cat.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText >
                                    <small>
                                        {filter.label}
                                    </small>
                                </ListItemText>
                            </ListItem>
                        ))}
                        <Divider variant="middle" />
                        <Divider variant="middle" />
                        <p className="sidebar__title">対象者</p>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText >
                                    <small>{filter.label}</small>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
    </div>
  )
}
export default SideBarGuest;
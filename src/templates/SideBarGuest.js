//ClosableDrawerをと同じ
import React, {useCallback, useEffect, useState} from "react";
import { Divider, makeStyles } from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../Firebase";

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
      marginLeft: 32,
      whiteSpace:'noWrap'
  },
  category__text: {
      fontSize:'1vw'
  },
  category__counted: {
      backgroundColor:'#e7e7e7',
  },
  clients__text: {
    fontSize:'1vw'
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
  const inputSearchKeyword = useCallback((event) => {
    setSearchKeyword(event.target.value)
  }, [setSearchKeyword])

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "全て", id: "all", value: "/?clients=全て"},
    {func: selectMenu, label: "初心者", id: "beginner", value: "/?clients=初心者"},
    {func: selectMenu, label: "中級者", id: "intermediate", value: "/?clients=中級者"},
    {func: selectMenu, label: "上級者", id: "advanced", value: "/?clients=上級者"}
  ])

  const [filters_cat, setFilters_cat] = useState([]);

  useEffect(() => {
      db.collection('categories')
          .orderBy('order', 'asc')
          .get()
          .then((snapshot) => {
                const list = [];
                

              snapshot.forEach(snap => {
                  const category = snap.data();
                  const category_sizes = [];

                  (async() => {
                      await db.collection('products').orderBy('updated_at', 'desc').where('category', '==', category.name).get()
                      .then(snap => {
                          const category_size = snap.size
                          category_sizes.push(category_size)
                      })
                      .catch((error) => {
                          console.log(error);
                    });
                  })()
                  
                  
                  list.push({func: selectMenu, label:category.name, id:category.id, value:`/?category=${category.name}`, size:category_sizes});
              })
              setFilters_cat(prevState => [...prevState, ...list])//prevState --> 更新前のStateを持てる
              //console.log(list)
          })
  }, []);

  return(
    <div>
                <div>
                    {/*
                    <p className='sidebar__p'>
                        サイドバー
                    </p>
                    
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
                    <List  className="sidebar_group">
                        <p className="sidebar__title">カテゴリー</p>
                        {filters_cat.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText>
                                    <small className={classes.category__text}>
                                        {filter.label}
                                    </small>
                                    <small className={classes.category__counted}>
                                        {filter.size}{/*{console.log(filters_cat)}*/}
                                    </small>
                                </ListItemText>
                            </ListItem>
                        ))}
                        <Divider variant="middle" />
                        <Divider variant="middle" />
                        <p className="sidebar__title">対象者</p>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText>
                                    <small className={classes.clients__text}>
                                        {filter.label}
                                    </small>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
    </div>
  )
}
export default SideBarGuest;
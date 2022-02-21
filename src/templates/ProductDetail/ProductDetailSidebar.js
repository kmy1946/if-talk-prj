import React, { useEffect, useState } from "react";
import { Divider, makeStyles } from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../../Firebase";

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

const ProductDetailSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
};

  const [filters, setFilters] = useState([
      {func: selectMenu, label: "全て", id: "all", value: "/?clients=全て"},
      {func: selectMenu, label: "初心者", id: "beginner", value: "/?clients=初心者"},
      {func: selectMenu, label: "中級者", id: "intermediate", value: "/?clients=中級者"},
      {func: selectMenu, label: "上級者", id: "advanced", value: "/?clients=上級者"}
  ])

  const [filters_cat, setFilters_cat] = useState([])

  var firstH1 = document.querySelectorAll('h1');
  

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
              setFilters_cat(prevState => [...prevState, ...list])//prevState --> 更新前のStateを持てる
          })
  }, [])

  return(
    <div>
      <div>
        <List>
          <p className="sidebar__title">目次</p>
          filter
          <Divider variant="middle" />
          <Divider variant="middle" />
          <p className="sidebar__title">このサイトについて</p>
          filter
        </List>
      </div>
    </div>
  )
}
export default ProductDetailSidebar;
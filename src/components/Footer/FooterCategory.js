import { Grid } from "@material-ui/core";
import { push } from "connected-react-router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../Firebase";

const FooterCategory = () => {
  const dispatch = useDispatch();
  const [filters_cat, setFilters_cat] = useState([]);
  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
  };
  useEffect(() => {
    db.collection('categories')
        .orderBy('order', 'asc')
        .get()
        .then((snapshot) => {
              const list = [];            
            snapshot.forEach(snap => {
                const category = snap.data();
                list.push({func: selectMenu, label:category.name, id:category.id, value:`/?category=${category.name}`});
            })
            setFilters_cat(prevState => [...prevState, ...list])//prevState --> 更新前のStateを持てる
        })
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="menu">
          <label htmlFor="Panel1">カテゴリー</label>
          <input type="checkbox" id="Panel1" className="on-off" />
          <ul>
            {filters_cat.map(filter => (
              <li key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                  {filter.label}
              </li>
             ))}
          </ul>
        </div>
      </Grid>
    </Grid>
  )
}
export default FooterCategory;
//ClosableDrawerをと同じ
import React, {useCallback, useEffect, useState} from "react";
import { Divider, makeStyles } from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../Firebase";
import { getIsSignedIn } from "../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  sidebarleft__text:{
    textAlign:'center',
  },
  sidebarleft__text__text: {
    whiteSpace:"nowrap"
  },
}
));

const SideBarLeft = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);

  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
};

  const [filters_updated_month, setFilters_updated_month] = useState([
      //{func: selectMenu, label: "2022.3", id: "all_date", value: "/"},
      {func: selectMenu, label: "2022.1", id: "2022_1_month", value: "/users/?updated_at_month=202201"},
      {func: selectMenu, label: "2022.2", id: "2022_2_month", value: "/users/?updated_at_month=202202"},
      {func: selectMenu, label: "2022.3", id: "2022_3_month", value: "/users/?updated_at_month=202203"},
      //{func: selectMenu, label: "2022.3", id: "2022_3_date", value: "/?created_at=2022年3月"},
      //{func: selectMenu, label: "2022.4", id: "2022_4_date", value: "/?created_at=2022年4月"}
  ])

  const [filters_updated_month_guest, setFilters_updated_month_guest] = useState([
    //{func: selectMenu, label: "2022.3", id: "all_date", value: "/"},
    {func: selectMenu, label: "2022.1", id: "2022_1_month", value: "/?updated_at_month=202201"},
    {func: selectMenu, label: "2022.2", id: "2022_2_month", value: "/?updated_at_month=202202"},
    {func: selectMenu, label: "2022.3", id: "2022_3_month", value: "/?updated_at_month=202203"},
    //{func: selectMenu, label: "2022.3", id: "2022_3_date", value: "/?created_at=2022年3月"},
    //{func: selectMenu, label: "2022.4", id: "2022_4_date", value: "/?created_at=2022年4月"}
])
  return(
    <div>
                <div>
                    <List>
                        <p className="sidebar__title">　投稿</p>
                        {isSignedIn ? (
                            <>
                            {filters_updated_month.map(filter => (
                                <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                    <ListItemText className={classes.sidebarleft__text}>
                                        <small className={classes.sidebarleft__text__text}>{filter.label}</small>
                                        
                                    </ListItemText>
                                </ListItem>
                                )
                                )    
                            }
                            </>
                        ):(
                            <>
                            {filters_updated_month_guest.map(filter => (
                                <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                    <ListItemText className={classes.sidebarleft__text}>
                                        <small className={classes.sidebarleft__text__text}>{filter.label}</small>
                                        
                                    </ListItemText>
                                </ListItem>
                            ))}
                            </>
                        )
                        }
                    </List>
                </div>
    </div>
  )
}
export default SideBarLeft;
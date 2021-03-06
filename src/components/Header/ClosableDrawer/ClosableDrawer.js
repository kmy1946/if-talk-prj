import React, {useCallback, useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import { db } from '../../../Firebase';
import { MapMenuList } from '..';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import NearMeIcon from '@material-ui/icons/NearMe';
import ArchiveIcon from '@material-ui/icons/Archive';
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

const ClosableDrawer = (props) => {
    const { container } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
//    const selector = useSelector(state  => state);
  //  const userRole = getUserRole(selector);
    //const isAdministrator = (userRole === "administrator");

    const selectMenu = (event, path) => {
        dispatch(push(path));//pathはvalueで指定
        //props.onClose(event, false);//menu選択時に閉じる
    };

    const [searchKeyword, setSearchKeyword] = useState("")

    const [filters, setFilters] = useState([
        {func: selectMenu, label: "全て", id: "all", value: "/"},
        {func: selectMenu, label: "初心者", id: "beginner", value: "/?clients=初心者"},
        {func: selectMenu, label: "中級者", id: "intermediate", value: "/?clients=中級者"},
        {func: selectMenu, label: "上級者", id: "advanced", value: "/?clients=上級者"}
    ])

    const [filters_created_month, setFilters_updated_month] = useState([
        {func: selectMenu, label: "2022.1", id: "2022_1_month", value: "/?created_at_month=202201"},
        {func: selectMenu, label: "2022.2", id: "2022_2_month", value: "/?created_at_month=202202"},
        {func: selectMenu, label: "2022.3", id: "2022_3_month", value: "/?created_at_month=202203"}
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
                    list.push({func: selectMenu, label:category.name, id:category.id, value:`/?category=${category.name}`})
                })
                setFilters_cat(prevState => [...prevState, ...list])//prevState --> 更新前のStateを持てる
            })
    }, [])
  
    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [setSearchKeyword])

    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor={"right"}
                open={props.open}
                onClose={(e) => props.onClose(e, false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                >
                <div
                    onClose={(e) => props.onClose(e, false)}
                    onKeyDown={(e) => props.onClose(e, false)}
                >
                    {/*
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    */}
                    <Divider />
                    <MapMenuList/>
                    <Divider variant="middle" /><p className="sidebar__title"><PersonPinIcon/>対象者</p>
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                        <Divider variant="middle" /><p className="sidebar__title"><NearMeIcon/>カテゴリー</p>
                        {filters_cat.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider variant="middle" />
                    <List>
                        <p className="sidebar__title"><ArchiveIcon/>アーカイブ</p>
                        {filters_created_month.map(pd_filter => (
                            <ListItem button key={pd_filter.id} onClick={(e) => pd_filter.func(e, pd_filter.value)}>
                                <ListItemText className={classes.sidebarleft__text}>
                                    <small>{pd_filter.label}</small>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
}

export default ClosableDrawer
import React, {useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {useDispatch, useSelector} from "react-redux";
//import {getProductsInCart, getUserId} from "../../reducks/users/selectors";
import {push} from "connected-react-router"
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from '../../Firebase';
import MenuIcon from "@material-ui/icons/Menu";
import { getProductsInBookMark, getUseId } from '../../reducks/users/selectors';
import { fetchProductsInBookMark } from '../../reducks/users/operations';

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUseId(selector);
//    const userId = getUserId(selector);
    let productsInBookMark = getProductsInBookMark(selector);

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('bookmark')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {//snapshot内のデータをforEachで回す
                    const product = change.doc.data();
                    const changeType = change.type;

                    switch (changeType) {
                        case 'added':
                            productsInBookMark.push(product);
                            break;
                        case 'modified'://変化時
                            const index = productsInBookMark.findIndex(product => product.bookmarkId === change.doc.id)
                            productsInBookMark[index] = product
                            break;
                        case 'removed':
                            productsInBookMark = productsInBookMark.filter(product => product.bookmarkId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                })

                dispatch(fetchProductsInBookMark(productsInBookMark))
            })
            return () => unsubscribe()
    }, [])

    return (
        <>
        <IconButton>
            <a href='/product/edit/' className='header__bordercoloricon'>
                <BorderColorIcon />
            </a>
        </IconButton>
       <IconButton>
            <Badge badgeContent={productsInBookMark.length} color="secondary">
                <FavoriteBorderIcon />
            </Badge>
            </IconButton>
        <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
            <MenuIcon />
        </IconButton>
        </>
    );
};

export default HeaderMenu;
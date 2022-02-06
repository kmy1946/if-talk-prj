import React, {useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {fetchProductsInCart} from "../../reducks/users/operations";
import {useDispatch, useSelector} from "react-redux";
//import {getProductsInCart, getUserId} from "../../reducks/users/selectors";
import {push} from "connected-react-router"
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from '../../Firebase';
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenu = (props) => {
//    const dispatch = useDispatch();
//    const selector = useSelector((state) => state);
//    const userId = getUserId(selector);
//    let productsInCart = getProductsInCart(selector);

    // Listen products in user's cart
//    useEffect(() => {
//        const unsubscribe = db.collection('users').doc(userId).collection('cart')
//            .onSnapshot(snapshots => {

//                snapshots.docChanges().forEach(change => {
//                    const product = change.doc.data();
//                    const changeType = change.type

////                    switch (changeType) {
//                        case 'added':
//                            productsInCart.push(product);
//                            break;
//                        case 'modified':
//                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
//                            productsInCart[index] = product;
////                            break;
//                        case 'removed':
//                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
//                            break;
//                        default:
//                            break;
//                    }
//                });

//                dispatch(fetchProductsInCart(productsInCart))
//            });

//        return () => unsubscribe()
 //   },[]);

    return (
        <>
        <IconButton>
            <a href='/product/edit/' className='header__bordercoloricon'>
                <BorderColorIcon />
            </a>
        </IconButton>
       <IconButton>{/* onClick={() => dispatch(push('/cart'))}>*/}
            <Badge badgeContent={3} color="secondary">
                <AddIcon />
            </Badge>
            </IconButton>
        <IconButton>
            <FavoriteBorderIcon />
        </IconButton>
        <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
            <MenuIcon />
        </IconButton>
        </>
    );
};

export default HeaderMenu;
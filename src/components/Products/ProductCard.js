import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import NoImage from "../../assets/img/src/no_image.png";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import { deleteProduct } from "../../reducks/products/operation";
import { getUserRole } from "../../reducks/users/selectors";

//import { theme } from "../../assets/theme";

const useStyles = makeStyles((theme) => ({
  root:{
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50%-16px)'//marginの分削る
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)'
    },
    
  },
    content: {
      display:'flex',
      padding: '16px 8px',
      textAlign: 'left',
      '&:last-child': {
        paddingBottom: 16
      }
  },
    list_iconbutton: {
      right:0
    },
    media: {
      height: 0,
      paddingTop: '100%'
  },
    clients: {
      color:theme.palette.info.main,
      fontSize:16
  }
}));
const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const userRole = getUserRole(selector)
  const isAdministrator = (userRole === "customer");//customerのみ編集可能

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//投稿者のみ編集削除可能にする
//1.localstrageからユーザーネーム＃後でユーザーネームのユニーク化をする
//2.dbのproductのユーザーネームを拾う
////db.collection('products').doc(id).get()
////
////
//3.ユーザーネーム＝ユーザーネームを確認（１＝２）
//4.合致すれば編集削除を表示
  const current_user = localStorage.getItem('if-username')//
  const if_product_username = (selector)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    <Card className={classes.root}>
      {images ? (
      <CardMedia
          className={classes.media}
          image={props.images[0].path}
          title=""
          onClick={() => dispatch(push('/product/'+props.id))}
      />) : (<><NoImage /></>)
      }
      <CardContent className={classes.content}>
        <div onClick={() => {dispatch(push('/product/'+props.id))}}>
          <Typography color="textSecondary">
            {props.name}
          </Typography>
          <Typography className='list-content__lang'>
            {props.category}
          </Typography>
          <Typography className='list-content__username'>
            {props.username} さん
          </Typography>
            <Typography className={classes.clients}>
              To : {props.clients}
            </Typography>
        </div>
        {isAdministrator && (
                    <>
        <div className='toplist__menu'>
          <IconButton onClick={handleClick}>
            <ListIcon />
          </IconButton>
        </div>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push('/product/edit/'+props.id))
              handleClose()
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose()
            }}
          >
            削除する
          </MenuItem>
        </Menu>

        </>
                )}


      </CardContent>
    </Card>
  )
}
export default ProductCard;
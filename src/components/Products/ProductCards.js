import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import NoImage from "../../assets/img/src/no_image.png";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useTheme } from "@material-ui/styles";
import { getUserRole } from "../../reducks/users/selectors";
import { db } from "../../Firebase";
import { showLoadingAction } from "../../reducks/loading/actions";

//import { theme } from "../../assets/theme";

const useStyles = makeStyles((theme) => ({
  root:{
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50%-16px)'//marginの分削る
    },
    [theme.breakpoints.up('sm')]: {
      margin: 6,
      width: 'calc(33.3333% - 32px)'
    },
  },
    content: {
      display:'flex',
      padding: '16px 8px',
      textAlign: 'left',
      '&:last-child': {
        paddingBottom: 16
      },
  },
    list_iconbutton: {
      right:0
    },
    media: {
      height: 0,
      //objectFit: 'cover',
      //overflow: 'hidden',
      //margin:0,
      paddingTop: '100%',
      width:'100%'
      //width:'400px'
  },
    clients: {
      color:theme.palette.info.main,
      fontSize:16
  }
}));
const ProductCards = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const userRole = getUserRole(selector)
  const isAdministrator = (userRole === "customer");//customerのみ編集可能

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//投稿者のみ編集削除可能にする
//1.localstrageからユーザーid
//2.dbのproductのユーザーidをリストで拾う
//3.1=2を検証（IF分岐）
//4.合致すれば編集・削除を表示
  const current_user_id = localStorage.getItem('if-uid')//

  let products_list = []
  useEffect(() => {
    db.collection('products').get()
      .then(snapshot => {
          snapshot.docs.forEach(doc => {
              const data = doc.data()//uidを取得
              //console.log(data.uid)
              //準備しておいた配列に取り出したデータをpushします
              products_list.push({
                  uid: data.uid
              })
          })
      })
}, [])

  //if_product_uid['uid'] = 
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
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
      {images ? (
      <CardMedia
          className={classes.media}
          image={props.images[0].path}
          title=""
          onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push('/users/product/'+props.id));}}
      />) : (<><NoImage /></>)
      }
    </Card>
  )
}
export default ProductCards;
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
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import { useTheme } from "@material-ui/styles";
import CreateIcon from '@material-ui/icons/Create';
import { deleteProduct } from "../../reducks/products/operation";
import { getIsSignedIn, getUserRole } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  root:{
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50%-16px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 6,
      width: 'calc(100% - 12px)'
    },
    borderRadius:2,
    position:'relative'
  },
    content: {
      height:'3vw',
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
      width:'9vh',
      height:'9vh',
      borderRadius:'2px'
  },
    product_image:{
      padding:'4px',
      position:'relative'
    },
    name: {
      width:'65vw',
      whiteSpace:'noWrap'
    },
    category: {
      color:theme.palette.info.main,
      fontSize:'12px',
      whiteSpace: 'noWrap',
      marginTop:'30px',
      marginLeft:'-82px',
    },
    clients: {
      color:theme.palette.info.main,
      fontSize:16,
  },
    username: {
      color:'grey',
      fontSize:16,
      marginTop: '6vw',
      marginLeft: '35vw',
      whiteSpace: 'noWrap'
  },
    admin_menu: {
  },
    list__vertical_divider: {
      marginLeft:'-10px',
      marginRight:'10px',
      backgroundColor:'#858585',
      height: '200px',
      width:'1px'
  },
    list__horizontal_divider: {
      width:'45vw',
      backgroundColor:'#858585',
      height:'1.5px',
      marginLeft:'-2vw'
  },
    guest_hreflink: {
      position: 'absolute',
      width: '100%',
      height: '100%',
  },
    user_hreflink: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    }
}));
const ProductCardMobile = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const userRole = getUserRole(selector)
  const isSignedIn = getIsSignedIn(selector);
  const isAdministrator = (userRole === "customer");//customerのみ編集可能

///////////////////////////////////////////////////////
//投稿者のみ編集削除可能にする
  const if_current_uid = localStorage.getItem('if-uid')
///////////////////////////////////////////////////////

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  const if_user_name = localStorage.getItem('if-username')

  const guest_href = `/guest/product/${props.id}`
  const user_href = `/product/${props.id}`

  return (
    <Card className={classes.root}>
      {isSignedIn ? (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box className={classes.product_image}>
          <CardMedia
            className={classes.media}
            image={images[0].path}
            onClick={() => dispatch(push('/product/'+props.id))}
            title=""
          />
          </Box>
          <CardContent className={classes.content}>
            
                <Typography color="textSecondary" className={classes.name}>
                  {props.name}
                </Typography>
                <Typography className={classes.category}>
                  {props.category}
                </Typography>

                {(() => {
                    if (if_current_uid === props.uid) {
                      //console.log(if_user_name)
                      
                        return (
                            <div className="toplist__menu__mobile">
                              <Typography>
                              <IconButton onClick={handleClick}>
                                <ListIcon />
                              </IconButton>
                            </Typography>
                            <Menu
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              className={classes.admin_menu}
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
                            </div>
                            )
                    } else {
                      return false
                    }
            })()}
                {/*
                <Typography className={classes.username}>
                  <CreateIcon />
                  {props.username} さん
                </Typography>
                */}

            <a href={user_href} className={classes.user_hreflink} />
          </CardContent>

      </Box>
      )
      :
      (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box className={classes.product_image}>
          
            <CardMedia
              className={classes.media}
              image={images[0].path}
              title=""
          >
            <a href={guest_href} className={classes.guest_hreflink} />
          </CardMedia>
          
          </Box>
          <CardContent className={classes.content}>
                <Typography color="textSecondary" className={classes.name}>
                  {props.name}
                </Typography>
                <Typography className={classes.category}>
                  {props.category}
                </Typography>
                {/*
                <Typography className={classes.username}>
                  <CreateIcon />
                  {props.username} さん
                </Typography>
                */}
                <a href={guest_href} className={classes.guest_hreflink} />
          </CardContent>
      </Box>
      )
    }
    </Card>
  )
}
export default ProductCardMobile;
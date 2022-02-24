import React, { useState } from "react";
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
import { deleteProduct } from "../../reducks/products/operation";
import { getIsSignedIn, getUserRole } from "../../reducks/users/selectors";
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
      width: 'calc(100% - 12px)'//'calc(100% - 32px)',
    },
    borderRadius:2,
    '&:hover': {
      transition: 'boxShadow 0.3s',
      boxShadow: '0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)'
    }
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
      width:'19vh',
      height:'19vh',
      borderRadius:'2px'
  },
    product_image:{
      padding:'4px',
      position:'relative'
    },
    name: {
      width:'65vw',
      fontSize:'19px',
      whiteSpace:'noWrap'
    },
    category: {
      color:theme.palette.info.main,
      fontSize:'16px',
      whiteSpace: 'noWrap',
      marginLeft:'auto'
    },
    updated_at: {
      position:'absolute',
      fontSize:'10px',
      right:'1vw',
      bottom:'1vw',
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
    height: '100%'
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const userRole = getUserRole(selector)
  const isSignedIn = getIsSignedIn(selector);
  //const isAdministrator = (userRole === "customer");//customerのみ編集可能

  const if_current_uid = localStorage.getItem('if-uid')//

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  //const if_user_name = localStorage.getItem('if-username')
  //const guest_href = `/guest/product/${props.id}`

  return (
    
    <Card className={classes.root}>
      {isSignedIn ? (
      <div className="product_card__box">

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box className={classes.product_image}>
          <CardMedia
            className={classes.media}
            image={images[0].path}
            onClick={() => dispatch(push('/product/'+props.id))}
            title=""
          />
          </Box>
          
                                    
            {(() => {
              if (if_current_uid === props.uid) {
                return (
                  <>
                    <div className='toplist__menu'>
                      <Typography>
                        <IconButton onClick={handleClick}>
                          <ListIcon />
                          </IconButton>
                      </Typography>
                    </div>
                    <Menu
                      anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} className={classes.admin_menu}
                    >
                      <MenuItem onClick={() => {
                        dispatch(showLoadingAction("Loading..."));
                        dispatch(push('/users/product/edit/'+props.id))
                        handleClose()}}
                      >
                        編集する
                      </MenuItem>
                      <MenuItem
                        onClick={() => { dispatch(deleteProduct(props.id))
                        handleClose() }}
                      >
                        削除する
                      </MenuItem>
                    </Menu>
                  </>
                )
                } else {
                  return false
              }
            })()}

          <CardContent className={classes.content}>
            <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push('/product/'+props.id))}}>
                <Typography color="textSecondary" className={classes.name}>
                  {props.name}
                </Typography>
                <Typography className={classes.category}>
                  {props.category}
                </Typography>
                <Typography className={classes.updated_at}>
                  {props.updated_at.substr(0,4)}/{props.updated_at.substr(4,2)}/
                  {props.updated_at.substr(6,2)}, {props.updated_at.substr(8,2)}:
                  {props.updated_at.substr(10,2)}:{props.updated_at.substr(12,2)}
                </Typography>
            </div>
          </CardContent>

      </Box>
      </div>
      )
      :
      (
      <div className="product_card__box">
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
              <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push('/product/'+props.id))}}>
                  <Typography color="textSecondary" className={classes.name}>
                    {props.name}
                  </Typography>
                  <Typography className={classes.category}>
                    {props.category}
                  </Typography>
                  <Typography className={classes.updated_at}>
                    {props.updated_at.substr(0,4)}/{props.updated_at.substr(4,2)}/
                    {props.updated_at.substr(6,2)}, {props.updated_at.substr(8,2)}:
                    {props.updated_at.substr(10,2)}:{props.updated_at.substr(12,2)}
                  </Typography>
              </div>
            </CardContent>
          </Box>
        </div>
      
    )
    }
    </Card>
  )
}
export default ProductCard;
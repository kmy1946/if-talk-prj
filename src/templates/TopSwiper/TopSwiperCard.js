import React from "react";
import { Container, Divider, makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import NoImage from "../../assets/img/src/no_image.png";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getIsSignedIn, getUserRole } from "../../reducks/users/selectors";
import { showLoadingAction } from "../../reducks/loading/actions";

const useStyles = makeStyles((theme) => ({
  root:{
    position:'relative',
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: '16.5vw',//'180px'
    },
    '&:hover': {
      cursor: 'pointer',
    }
  },
    content: {
      backgroundColor:'rgb(75, 75, 75)',
      width:'100%',
      opacity:0.7,
      position:"absolute",
      bottom:0,
      height:80,
      '&:hover': {
        backgroundColor:'rgb(55, 75, 75)',
        paddingBottom:'90px',
        transition: '0.25s',
      },
  },
    list_iconbutton: {
      right:0
    },
    media: {
      height: 0,
      paddingTop: '100%',
      width:'100%'
  },
    clients: {
      color:theme.palette.info.main,
      fontSize:16
  },
  topswiper__horizontal_divider: {
    height:'2px'
  }
}));
const TopSwiperCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const userRole = getUserRole(selector)

  const isSignedIn = getIsSignedIn(selector);
  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    
    <div>
      <Divider className={classes.topswiper__horizontal_divider}/>
      <Container>
        <Card className={classes.root} >
        {isSignedIn ? 
          (
            <>
            <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push('/product/'+props.id))}}>
          {images ?
            (
          <CardMedia
              className={classes.media}
              image={props.images[0].path}
              title=""
              onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push('/product/'+props.id))}}
          />)
          :
          (<><NoImage /></>)
          }
          <CardContent className={classes.content}>
                <Typography className='featured-content__lang'>
                  {props.category}
                </Typography>
                <Typography className='featured-content__name'>
                  {props.name}
                </Typography>
              
            </CardContent>
            </div>
            </>
            )
            :
            (
            <>
            <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push(`/product/${props.id}`))}} className='featured-content__href'>
            
            {images ?
            (
          <CardMedia
              className={classes.media}
              image={props.images[0].path}
              title=""
              onClick={() => {
                dispatch(showLoadingAction("Loading..."));
                dispatch(push('/product/'+props.id))}
              }
          />)
          :
          (<><NoImage /></>)
          }
              <CardContent className={classes.content}>
                <Typography className='featured-content__lang'>
                  {props.category}
                </Typography>
                <Typography className='featured-content__name'>
                  {props.name}
                </Typography>
          </CardContent>
          </div>
          </>
          )
        }
        </Card>
        <Divider className={classes.topswiper__horizontal_divider}/>
    </Container>
  
    </div>
  )
}
export default TopSwiperCard;
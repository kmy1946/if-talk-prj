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
import { hideLoadingAction, showLoadingAction } from "../../reducks/loading/actions";

const useStyles = makeStyles((theme) => ({
  root:{
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: '24.5vw',//'180px'
    },
    position:"relative"
  },
  detail__swiper__cardcontent:{
    backgroundColor:'rgb(75, 75, 75)',
    width:'100%',
    height: '130px',
    opacity:0.85,
    position:"absolute",
    bottom:0,
    '&:hover': {
      backgroundColor:'rgb(55, 75, 75)',
      paddingBottom:'150px',
      transition: '0.25s'
    }
  },
    content: {
      height: 'auto',
      listStyle: 'none',
      padding: '16px 8px',
      textAlign: 'left',
      '&:last-child': {paddingBottom: 16},
  },
    media: {
      height: 0,
      paddingTop: '100%',
      width:'100%'
  },
  topswiper__horizontal_divider: {
    height:'2px'
  }
}));
const TopSwiperCardDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);

  const isSignedIn = getIsSignedIn(selector);
  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    
    <div>
      {/*
      <Divider className={classes.topswiper__horizontal_divider}/>
      */}
      <Container>
        <Card className={classes.root} >
        {isSignedIn ? 
          (
            <>
            <a href={`/product/${props.id}`}>
          {images ?
            (
          <CardMedia
              className={classes.media}
              image={props.images[0].path}
              title=""
              onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push('/product/'+props.id))}}
          />
          )
          :
          (
            <NoImage />
          )
          }
          <CardContent className={classes.detail__swiper__cardcontent}>
                <Typography className='featured-content__lang__detail'>
                  {props.category}
                </Typography>
                <Typography className='featured-content__name__detail'>
                  {props.name}
                </Typography>
              
            </CardContent>
            </a>
            </>
            )
            :
            (
            <>
            <a href={`/product/${props.id}`} className='featured-content__href'>
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
              <CardContent className={classes.detail__swiper__cardcontent}>
                <Typography className='featured-content__lang__detail'>
                  {props.category}
                </Typography>
                <Typography className='featured-content__name__detail'>
                  {props.name}
                </Typography>
            </CardContent>
          </a>
          </>
          )
        }
        </Card>
        {/*
        <Divider className={classes.topswiper__horizontal_divider}/>
        */}
      </Container>
  
    </div>
  )
}
export default TopSwiperCardDetail;
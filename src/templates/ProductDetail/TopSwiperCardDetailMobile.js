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
  featured_mobile__container:{
  },
  root_mobile:{
    position:"relative",
    margin: 16,
    padding: 6,
    width: '40.5vw',//'180px'
    height:'100%'
  },
    content_mobile: {
      position:"absolute",
      bottom:0,
      width: '400px',
      height: '80px',
      opacity:0.85,
      backgroundColor:'rgb(88, 88, 88)',
      listStyle: 'none',
      padding: '2px 1px',
      textAlign: 'left',
      '&:last-child': {paddingBottom: 16},
  },
    list_iconbutton: {
      right:0
    },
    media_mobile: {
      paddingTop: '100%',
      width:'100%',
  },
  clients: {
    color:theme.palette.info.main,
    fontSize:16
  },
  topswiper__horizontal_divider: {
    height:'2px'
  }
}));
const TopSwiperCardDetailMobile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);

  const isSignedIn = getIsSignedIn(selector);

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    <div className="toswipercard_mobile">
      <Divider className={classes.topswiper__horizontal_divider}/>
      <Container className={classes.featured_mobile__container}>
        <Card className={classes.root_mobile} >
          <>
            <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push(`/product/${props.id}`))}} className='featured-content__href_mobile'>
              {images ? (
                <CardMedia
                    className={classes.media_mobile}
                    image={props.images[0].path}
                    title=""
                    onClick={() => {
                      dispatch(showLoadingAction("Loading..."));
                      dispatch(push('/product/'+props.id))}
                    }
                />
                )
                : 
                (<><NoImage /></>)
                }
                <CardContent className={classes.content_mobile}>
                  <Typography className='featured-content__lang__mobile'>
                    {props.category}
                  </Typography>
                  <Typography className='featured-content__name__mobile'>
                    {props.name}
                  </Typography>
                </CardContent>
              </div>
            </>
        </Card>
    </Container>
    </div>
  )
}

export default TopSwiperCardDetailMobile;
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

const useStyles = makeStyles((theme) => ({
  featured_mobile__container:{
  },
  root_mobile:{
    margin: 16,
    padding: 6,
    width: '30.5vw',//'180px'
    height:'100%'
  },
    content_mobile: {
      width: '400px',
      height: 'auto',
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
const TopSwiperCardMobile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const userRole = getUserRole(selector)

  const isSignedIn = getIsSignedIn(selector);
  const guest_href = `/product/${props.id}`

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    <div className="toswipercard_mobile">
      <Divider className={classes.topswiper__horizontal_divider}/>
      <Container className={classes.featured_mobile__container}>
        <Card className={classes.root_mobile} >

        {isSignedIn ? 
          (//遷移先URLが異なる
            <>
            <div onClick={() => {dispatch(push('/product/'+props.id))}}>
            {images ?
              (
                <CardMedia
                  className={classes.media_mobile}
                  image={props.images[0].path}
                  title=""
                  onClick={() => dispatch(push('/product/'+props.id))}
                />
              )
              : 
              (<><NoImage /></>)
            }
            <CardContent className={classes.content_mobile}>
                <Typography className='featured-content__lang_mobile'>
                  <small>
                    {props.category}
                  </small>
                </Typography>
                <Typography className='featured-content__name_mobile'>
                  <small>
                    {props.name}
                  </small>
                </Typography>
            </CardContent>
            </div>
          </>
          )
          :
          (
          <>
            <a href={guest_href} className='featured-content__href_mobile'>
              {images ? (
                <CardMedia
                    className={classes.media_mobile}
                    image={props.images[0].path}
                    title=""
                    onClick={() => dispatch(push('/product/'+props.id))}
                />
                )
                : 
                (<><NoImage /></>)
                }
                <CardContent className={classes.content_mobile}>
                  <Typography className='featured-content__lang_mobile'>
                    {props.category}
                  </Typography>
                  <Typography className='featured-content__name_mobile'>
                    {props.name}
                  </Typography>
                </CardContent>
              </a>
            </>
          )
        }

        </Card>
    </Container>
    </div>
  )
}
export default TopSwiperCardMobile;
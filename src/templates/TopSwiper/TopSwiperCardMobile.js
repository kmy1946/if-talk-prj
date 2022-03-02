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
  root_mobile:{
    margin: 16,
    width: '40.5vw',
    //height:'100%',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  featured_content__href_mobile: {
    position:'relative',//width:'30vw'
  },
    content_mobile: {
      width: '100%',
      height: '60px',
      listStyle: 'none',
      //padding: '2px 1px',
      //textAlign: 'left',
      //'&:last-child': {paddingBottom: 16},
  },
    media_mobile: {
      paddingTop: '100%',
      width:'100%',
  },
  clients: {
    color:theme.palette.info.main,
    fontSize:16,
  },
  topswiper__horizontal_divider: {
    height:'2px'
  }
}));
const TopSwiperCardMobile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    <div className="toswipercard_mobile">
      <Divider className={classes.topswiper__horizontal_divider}/>
      <Container>
        <Card className={classes.root_mobile} >

        {isSignedIn ? 
          (//遷移先URLが異なる
            <>
            <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push(`/product/${props.id}`))}} className={classes.featured_content__href_mobile}>
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
                  <Typography className='featured-content__lang_mobile'>

                      {props.category}

                  </Typography>
                  <Typography className='featured-content__name_mobile'>
                    {props.name}
                  </Typography>
                </CardContent>
            </div>
          </>
          )
          :
          (
          <>
            <div onClick={() => {dispatch(showLoadingAction("Loading..."));dispatch(push(`/product/${props.id}`))}} className={classes.featured_content__href_mobile}>
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
                  <Typography className='featured-content__lang_mobile'>

                      {props.category}

                  </Typography>
                  <Typography className='featured-content__name_mobile'>
                    {props.name}
                  </Typography>
                </CardContent>
              </div>
            </>
          )
        }

        </Card>
    </Container>
    </div>
  )
}
export default TopSwiperCardMobile;
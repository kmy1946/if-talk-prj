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
  root:{
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: '16.5vw',//'180px'
    },
  },
    content: {
      //position:"relative",
      //bottom:'50px',
      //display:'flex',
      height: 'auto',//'50px',
      listStyle: 'none',
      padding: '16px 8px',
      textAlign: 'left',
      '&:last-child': {paddingBottom: 16},
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
  const guest_href = `/guest/product/${props.id}`

  const isAdministrator = (userRole === "customer");//customerのみ編集可能

  const current_user_id = localStorage.getItem('if-uid')//

  const images = (props.images.length > 0) ? props.images : [(NoImage)];

  return (
    
    <div>
      <Divider className={classes.topswiper__horizontal_divider}/>
      <Container>
        <Card className={classes.root} >
        {isSignedIn ? 
          (
            <>
            <div onClick={() => {dispatch(push('/product/'+props.id))}}>
          {images ?
            (
          <CardMedia
              className={classes.media}
              image={props.images[0].path}
              title=""
              onClick={() => dispatch(push('/product/'+props.id))}
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
            <a href={guest_href} className='featured-content__href'>
            
            {images ?
            (
          <CardMedia
              className={classes.media}
              image={props.images[0].path}
              title=""
              onClick={() => dispatch(push('/product/'+props.id))}
          />)
          :
          (<><NoImage /></>)
          }
              <CardContent>
                <Typography className='featured-content__lang'>
                  {props.category}
                </Typography>
                <Typography className='featured-content__name'>
                  {props.name}
                </Typography>
          </CardContent>
          </a>
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
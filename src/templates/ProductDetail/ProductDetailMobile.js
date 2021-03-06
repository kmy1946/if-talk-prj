import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { push } from "connected-react-router";
import { Helmet } from "react-helmet"
import { ImageSwiper } from "../../components/Products";
import { db, FirebaseTimestamp } from "../../Firebase";
import { returnCodeToBr } from "../../function/common";
import { addProductToBookMark } from "../../reducks/users/operations";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { ProductActionTableBookMark, ProductDetailTOCMobile, TopSwiperDetailMobile } from "..";
import { hideLoadingAction } from "../../reducks/loading/actions";
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeIcon from '@material-ui/icons/Home';
import NearMeIcon from '@material-ui/icons/NearMe';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { AdvDetailBottom } from "../Adv";
const useStyles = makeStyles((theme) => ({
  router_from_home: {
    fontSize:13,
    marginBottom: 15,
    display: 'flex',
    textAlign:'left',
    '& li': {
      fontSize:12,
      listStyle:'none',
      paddingRight:7,
      paddingLeft:7
    },
    '& li:hover': {
      fontWeight: 600,
      color:'rgb(70, 73, 247)',
      cursor: 'pointer',
    },
  },
  router__homeicon: {
    zoom:0.75
  },
  detail__topswiper: {
    //marginTop:'-50px',
    //marginBottom:'250px',
    zoom:0.9,
  },
  sliderBox: {
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 400,
          width: 400,
      },
      //marginTop: '30px',
  },
  username: {
    textAlign: 'right',
    fontSize:'14px',
  },
  detail_group: {
    textAlign:'center',
    //marginTop:70
  },
  detail_group__group: {
    display:'flex',
  },
  detail_group__clients: {
    textAlign:'right'
  },
  detail: {
    margin:'3vw',
    maxWidth:'auto'
  },
  detail_name: {
    textAlign: 'left',
    fontSize:27,
    fontWeight:'bold',
    padding: '0.25em 0.5em',
    marginTop:30,
    color: '#494949',
    background: 'transparent',
  },
  clients_icon: {
    color:'#4666f7',
  },
  clients: {
    fontSize: 10,
    '&:hover': {
      fontWeight: 600,
      color:'rgb(70, 73, 247)'
    }
  },
  category_icon: {
    fontSize: 20,
    color:'rgb(73, 76, 290)',
    marginRight:5,
  },
  updated_at_icon: {
    fontSize: 20,
    color:'#4666f7',
    marginRight:5,
  },
  category_updated_at: {
    fontSize: 10,
    '&:hover':{
      cursor: 'pointer',
    }
  },
  featured_p: {
    left:0,
    fontFamily:'cursive',
  },
}))

const ProductDetailMobile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname//domein??????
  const id = path.split('/product/')[1];//?????????=id
  const isSignedIn = getIsSignedIn(selector);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    dispatch(hideLoadingAction());
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data)//product???state?????????
      })
  }, []);

  const addProductToBookmark = useCallback(() => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductToBookMark({
      added_at:timestamp,
      description:product.description,
      clients:product.clients,
      category:product.category,
      images:product.images,
      name:product.name,
      productId:product.id,
      //created_at:product.created_at,
      //updated_at:product.updated_at
    }))
    //console.log(product.id)
  }, [product]);

  const detail_clients = () => {
    if (product.clients == '??????') {
      return (
        <p>
          <small onClick={() => dispatch(push(`/?clients=${product.clients}`))} className={classes.clients}>
            <PersonPinIcon className={classes.clients_icon}/>
            {(product.clients)}??????
          </small>
          <small>
            ??????
          </small>
        </p>
      )
    } else {
      return (
        <p>
          <small onClick={() => dispatch(push(`/?clients=${product.clients}`))} className={classes.clients}>
            <PersonPinIcon className={classes.clients_icon}/>
            {(product.clients)} ??????
          </small>
        </p>
      )
    }
  }

  return (
    <>
      {product && (
        <>
        <Helmet>
          <title>{product.name}</title>
          <meta
              name="description"
              content="?????????????????????????????????????????????????????????????????????"
          />
          <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
        </Helmet>
        <div className={classes.detail_group}>
          <section className="c-section-wrapin_detail__mobile">
          <div className={classes.detail}>
          <ul className={classes.router_from_home}>
              <li onClick={() => dispatch(push('/'))} className={classes.router__homeicon}>
                <HomeIcon/>
              </li>
              >
              <li onClick={() => dispatch(push(`/?category=${product.category}`))}>
                {product.category}
              </li>
              >
              <li>?????????: {product.name}</li>
          </ul>
            <p className={classes.detail_name}>{product.name}</p>
            <div className={classes.detail_group__group}>
              <ul className={classes.detail_group__group_ul}>
              
              <p className={classes.category_updated_at}>
                <small onClick={() => dispatch(push(`/?category=${product.category}`))}>
                  ???
                  <NearMeIcon className={classes.category_icon}/>
                  {(product.category)}
                </small>
                ???
                <small onClick={() => dispatch(push(`/?updated_at_month=${product.updated_at.substr(0,4)}${product.updated_at.substr(4,2)}`))}>
                  <ScheduleIcon className={classes.updated_at_icon}/>
                  {product.updated_at.substr(0,4)}/{product.updated_at.substr(4,2)}/
                  {product.updated_at.substr(6,2)}, 
                </small>
                <small>
                  {product.updated_at.substr(8,2)}:
                  {product.updated_at.substr(10,2)}:{product.updated_at.substr(12,2)}
                </small>
              </p>
              </ul>
            </div>
            <div className={classes.detail_group__clients}>
              {detail_clients()}
            </div>
            <br/>
            <br/>
            
              <div className={classes.sliderBox}>
                <ImageSwiper images={product.images}/>
              </div>
              <ProductDetailTOCMobile/>
              <br/>
              <br/>
            <div>
            <div className="productdetail__description">
              {returnCodeToBr(product.description)}
            </div>
          </div>
          <div className="module-spacer--small"/>
          <div className="module-spacer--small"/>
          <p className={classes.username}><small>????????????</small>{(product.username)}</p>
          
          <div className="module-spacer--small"/>
          <div className="module-spacer--small"/>
        </div>
        </section>
          <div className="module-spacer--small"/>
          <div className="module-spacer--small"/>
              {isSignedIn ? 
                  (
                    <>
                      <ProductActionTableBookMark addProductBookMark={addProductToBookmark} productId={product.id}/>???????????????
                    </>
                  )
                  :
                  (
                    <></>
                  )
                }
          </div>
          <AdvDetailBottom/>
          <div className="module-spacer--small"/>
          <div className={classes.detail__topswiper}>
            <p className={classes.featured_p}>???????????????</p>
            <TopSwiperDetailMobile/>
          </div>
          </>
          )}
    </>
  )

}
export default ProductDetailMobile;
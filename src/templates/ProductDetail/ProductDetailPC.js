import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { push } from "connected-react-router";
import { ImageSwiper } from "../../components/Products";
import { db, FirebaseTimestamp } from "../../Firebase";
import { returnCodeToBr } from "../../function/common";
import { addProductToBookMark } from "../../reducks/users/operations";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { ProductActionTableBookMark, ProductDetailSidebar, TopSwiperDetail } from "..";
import { hideLoadingAction } from "../../reducks/loading/actions";
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import NearMeIcon from '@material-ui/icons/NearMe';
import HomeIcon from '@material-ui/icons/Home';
import './ProductDetail.css';
import { AdvDetailBottom } from "../Adv";

const useStyles = makeStyles((theme) => ({
  router_from_home: {
    fontSize:13,
    marginBottom: 5,
    display: 'flex',
    textAlign:'left',
    //boxShadow: '0 2px 5px #ccc',
    padding:6,
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
    zoom:0.85
  },
  detail__topswiper: {
    marginTop:25,
    marginBottom:120,
    zoom:0.7,
    width:'100%',
    //backgroundColor:'white'
  },
  sliderBox: {
    [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 400,
        width: 400,
        marginTop: '10px'
    },
  },
  username: {
    textAlign: 'right',
    fontSize:'14px',
    marginTop:'60px'
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
    padding: '0.25em 0.5em',/*上下 左右の余白*/

    color: '#494949',/*\文字色*/
    background: 'transparent',/*背景透明に*/
    //borderLeft: 'solid 5px rgb(88, 230, 95)'
  },
  clients_icon: {
    color:'#4666f7',
  },
  clients: {
    fontSize: 12,
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
    marginRight:5
  },
  detail__category: {
    '&:hover':{
      cursor: 'pointer',
      fontWeight: 600,
      color:'rgb(70, 73, 247)',
    }
  },
  detail__updated_at: {
    '&:hover':{
      cursor: 'pointer',
      fontWeight: 600,
      color:'rgb(70, 73, 247)',
    }
  }
}))

const ProductDetailPC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname//domein以降
  const id = path.split('/product/')[1];//２つ目=id
  const isSignedIn = getIsSignedIn(selector);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    dispatch(hideLoadingAction());
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data)
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
  }, [product]);

  const detail_clients = () => {
    if (product.clients === '全て') {
      return (
        <p>
          <small onClick={() => dispatch(push(`/?clients=${product.clients}`))} className={classes.clients}>
            <PersonPinIcon className={classes.clients_icon}/>
            {(product.clients)}の人
          </small>
          <small>
            向け
          </small>
        </p>
      )
    } else {
      return (
        <p>
          <small onClick={() => dispatch(push(`/?clients=${product.clients}`))} className={classes.clients}>
            <PersonPinIcon className={classes.clients_icon}/>
            {(product.clients)} 向け
          </small>
        </p>
      )
    }
  }

  return (
    <>
      {product && (
        <>
        <div className={classes.detail__topswiper}>
          <TopSwiperDetail/>
        </div>
        <div className="pc-main-detail">
      <section className="c-section-wrapin_detail">
        <div>
          <div className={classes.detail}>
          <ul className={classes.router_from_home}>
              <li onClick={() => dispatch(push('/'))} className={classes.router__homeicon}><HomeIcon/></li>
              <li>></li>
              <li onClick={() => dispatch(push(`/?category=${product.category}`))}>
                {product.category}
              </li>
              <li>></li>
              <li>記事名: {product.name}</li>
          </ul>
            <p className={classes.detail_name}>{product.name}</p>
            <div className={classes.detail_group__group}>
              <ul className={classes.detail_group__group_ul}>
              
              <p className={classes.category_updated_at}>
                <small onClick={() => dispatch(push(`/?category=${product.category}`))} className={classes.detail__category}>
                  　
                  <NearMeIcon className={classes.category_icon}/>
                  {(product.category)}
                </small>
                　
                <small onClick={() => dispatch(push(`/?updated_at_month=${product.updated_at.substr(0,4)}${product.updated_at.substr(4,2)}`))} className={classes.detail__updated_at}>
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

            <div className="module-spacer--small"/>
              <div className={classes.sliderBox}>
                <ImageSwiper images={product.images}/>
              </div>
              <br/><br/>
            <div>
            <div>
              {returnCodeToBr(product.description)}
            </div>
          </div>
          {
            (
              product.username === '管理人' ?
                <p className={classes.username}><small>投稿者：</small><a href="/about" className="detail__postman">{(product.username)}</a></p>
              :
                <p className={classes.username}><small>投稿者：</small>{(product.username)}</p>
            )
          }
        </div>
        <div className="module-spacer--small"/>
        
          <div className="detail__bookmark"/>
              {isSignedIn ? 
                  (
                    <>
                      <ProductActionTableBookMark addProductBookMark={addProductToBookmark} productId={product.id}/>お気に入り登録
                    </>
                  )
                  :
                  (
                    <></>
                  )
                }
            </div>
            </section>
            
            <div className="child2-detail">
              <ProductDetailSidebar/>
            </div>
          </div>
          <AdvDetailBottom/>
          </>
          )}
    </>
  )

}
export default ProductDetailPC;
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, makeStyles } from "@material-ui/core";
import { ImageSwiper } from "../components/Products";
import { db, FirebaseTimestamp } from "../Firebase";
import { returnCodeToBr } from "../function/common";
import { addProductToBookMark } from "../reducks/users/operations";
import { getIsSignedIn } from "../reducks/users/selectors";
import { ProductActionTableBookMark } from ".";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 400,
          width: 400,
          marginTop: '100px'
      },
      marginTop: '100px'
  },
  username: {
    textAlign: 'right',
    fontSize:'14px',
  },
  detail_group: {
    textAlign:'center'
  },
  detail: {
    margin:'10vw',
    maxWidth:'auto'
  },
  clients: {
      fontSize: 15,
      textAlign:"right"
  },
  category: {
    fontSize: 15,
    textAlign:"right"
  },
}))

const ProductDetail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname//domein以降
  const id = path.split('/product/')[1];//２つ目=id
  const isSignedIn = getIsSignedIn(selector);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data)//productのstateを更新
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
    if (product.clients == '全て') {
      return (
        <p className={classes.clients}>{(product.clients)}の人 向け</p>
      )
    } else {
      return (
        <p className={classes.clients}>{(product.clients)} 向け</p>
      )
    }
  }

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className={classes.detail_group}>
          <div className={classes.detail}>
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                         <p className={classes.category}>{(product.category)} 関連</p>
                        <h2 className="u-text__headline_detail">{product.name}</h2>
                        <div className="module-spacer--small"/>
                        {detail_clients()}
                    <div>
                      <div className="productdetail__description">{returnCodeToBr(product.description)}</div>
                    </div>
                <p className={classes.username}><small>投稿者：</small>{(product.username)}<small>さん</small></p>
          </div>
                <div className="module-spacer--small"/>
                <div className="module-spacer--small"/>
                {isSignedIn ? 
                  (
                    <>
                      <ProductActionTableBookMark addProductBookMark={addProductToBookmark} productId={product.id}/>お気に入り
                    </>
                  )
                  :
                  (
                    <></>
                  )
                }
            </div>
            )}
    </section>
  )

}
export default ProductDetail;
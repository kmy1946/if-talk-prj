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
    fontWeight:"bold"
  },
  detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 16px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 'auto',
          width: 400
      },
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

  return (
    <section className="c-section-wrapin">
      {product && (
        <div>
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <div className="module-spacer--small"/>
                        <p className={classes.username}>投稿者：{(product.username)}さん</p>
                        <div className="module-spacer--small"/>
                        <h2 className="u-text__headline_detail">{product.name}</h2>
                        <div className="module-spacer--small"/>
                        <p className={classes.clients}>対象者：{(product.clients)}</p>
                        <p className={classes.category}>プログラミング言語：{(product.category)}</p>
                    </div>
                    <div>
                      <p className="productdetail__description">{returnCodeToBr(product.description)}</p>
                    </div>
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
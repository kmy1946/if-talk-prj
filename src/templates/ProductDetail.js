import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { ImageSwiper } from "../components/Products";
import { db } from "../Firebase";
import { returnCodeToBr } from "../function/common";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 24px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 400,
          width: 400
      },
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

  }
}))

const ProductDetail = () => {
  const classes = useStyles()
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname//domein以降
  const id = path.split('/product/')[1];//２つ目=id

  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data)//productのstateを更新
      })
  }, []);

  const addProduct = useCallback()
  
  return (
    <section className="c-section-wrapin">
      {product && (
        <div>
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.clients}>対象者：{(product.clients)}</p>
                        <p className={classes.category}>プログラミング言語：{(product.category)}</p>
                        <div className="module-spacer--small"/>
                        <div className="module-spacer--small"/>
                    </div>
                    <ul>
                      <p className="productdetail__description">{returnCodeToBr(product.description)}</p>
                    </ul>

                </div>
                <div className="module-spacer--small"/>
                <div className="module-spacer--small"/>
                <div>
                      <IconButton>{/* onClick={() => dispatch(push('/cart'))}>*/}
                        <Badge color="secondary">
                          <AddIcon />
                        </Badge>
                        </IconButton>ブックマーク
                        　
                        <IconButton>
                          <FavoriteBorderIcon />
                      </IconButton>お気に入り
                    </div>
            </div>
            )}
    </section>
  )

}
export default ProductDetail;
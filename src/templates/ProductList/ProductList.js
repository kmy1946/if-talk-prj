import { Card, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopSwiper } from "..";
import { ProductCardMobile, ProductCards } from "../../components/Products";
import ProductCard from "../../components/Products/ProductCard";
import { PrimaryButton } from "../../components/UIkit";
import { fetchProducts } from "../../reducks/products/operation";
import { getProducts } from "../../reducks/products/selectors";
import { getIsSignedIn } from "../../reducks/users/selectors";

const useStyles = makeStyles({
  list__card: {
    width:'100vw',
    padding:'1px',
    //backgroundColor: 'rgb(247, 250, 255)',
    borderRadius:2,
  },
  list__card_mobile: {
    width:'130%',
    padding:'1px',
    //backgroundColor:'rgb(210, 255, 234)',
    borderRadius:2,
    marginTop:'50px',
    position:'relative'
  },
  list__query: {
    textAlign:'left',
    fontSize:'17px',
    color:'blue'
  },
  list__title: {
    textAlign:'left',
    margin:'4px',
    fontSize:'17px',
    fontWeight:'bold'
  },
  loadbutton_div: {
    margin:'-75px'
  }
})
const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);//productsにproducts情報を格納

  const isSignedIn = getIsSignedIn(selector);

  const [page, setPage] = useState(10);
  const updatePost = async () => {
    setPage(page + 5);
  };

  const query = selector.router.location.search;
  //const query = window.location.search
  const clients = /^\?clients=/.test(query) ? query.split('?clients=')[1] : ""
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ""
  const updated_at_month = /^\?updated_at_month=/.test(query) ? query.split('?updated_at_month=')[1] : ""

  useEffect(() => {
    dispatch(fetchProducts(clients, category, updated_at_month, page))//, created_at
  },[query, page])
  //console.log(products);

  const list__title__clients = () => {
    if (query.slice( 0, 9 ) === '?clients=') {
      const list__title__clients = query.slice(9, 30)
      return (
        <p className={classes.list__title}>
          <small>
            対象者：
          </small>
          {list__title__clients}
        </p>
      )
    } else {
      return (//category
        <p className={classes.list__title}>
          <small>
            絞り込み：
          </small>
          {query.substr(10, 30)}
        </p>
      )
    }
  }
  const list__title_updated_at_month = () => {
    if (query.slice( 0, 18 ) === '?updated_at_month=') {
      const list__title__all = query.slice(18, 30)//202202
      const list__title__sliced = list__title__all.slice(0, 4)//2022
      const year_text = '年'
      const month_text = '月'
      const list__title__rest = list__title__all.slice(4)//02
      return (
        <p className={classes.list__title}>
          <small>
            投稿月:
          </small>
          {list__title__sliced+year_text+list__title__rest+month_text}
        </p>
      )
    } else {//clients
      return (
        <>
          {list__title__clients()}
        </>
      )
    }
  }
  const list__title = () => {
    if (query !== '') {
      return (//month
        <>{list__title_updated_at_month()}</>
      )
    } else {//empty
      return (
        <p className={classes.list__title}>記事一覧</p>
        )
    }
  }

  return (
    <section className="c-section-wrapin">
      {/*
      <TopSwiper/>
      */}

      <div className="p-grid__row__mobile">

      {
            (
              window.innerWidth > 760 ?
        <>
        
          <Card className={classes.list__card}>
        
            {list__title()}
            
            {products.length > 0 && (
              products.map(product => (
                <ProductCard key={product.id} id={product.id} name={product.name} images={product.images} category={product.category} clients={product.clients} username={product.username} uid={product.uid} updated_at={product.updated_at}/>
              )
            ))}
            <div>
              <PrimaryButton label={"さらに読み込む"} onClick={() => updatePost()}/>
            </div>
            </Card>
        </>
        :
        <>
          <Card className={classes.list__card_mobile}>
      
            {list__title()}
            
            {products.length > 0 && (
              products.map(product => (
                <ProductCardMobile key={product.id} id={product.id} name={product.name} images={product.images} category={product.category} clients={product.clients} username={product.username} uid={product.uid} updated_at={product.updated_at}/>
              )
            ))}
            <PrimaryButton label={"さらに読み込む"} onClick={() => updatePost()}/>
            </Card>
        </>
            )
          }
      </div>
    </section>
  )
}
export default ProductList;
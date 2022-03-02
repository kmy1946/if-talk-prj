import React, { useEffect, useState } from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import Carousel, { consts } from 'react-elastic-carousel'
import TopSwiperCard from "./TopSwiperCard";
import { db } from "../../Firebase";
import { TopSwiperCardMobile } from "..";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

const useStyles = makeStyles({
  topswiper__paginationbutton: {
    textAlign:"center",
    marginTop:'0.3w',
    opacity:0
    /*backgroundColor:'grey',*/
  },
  topswiper__paginationIconButton: {
    borderRadius:'50px'
  },
  topswiper__paginationIcon:{
    width:'22px',
    height:'22px',
    color:'#1e73c2',
  },
  //mobile
  topswiper__paginationbutton__mobile: {
    textAlign:"center",
  },
  topswiper__paginationIconButton__mobile: {
    borderRadius:'50px'
  },
  topswiper__paginationIcon__mobile: {
    width:'22px',
    height:'22px',
    margin:'10px',
    color:'#1e73c2',
  },
  topswiper: {
    display: 'flex',
    //flexGrow: 1,
    height:'14vw',
    width:'100%',
  },
  featured_p: {
    marginTop:'35px',//'75px',
    marginLeft:'10vw',
    fontFamily:'cursive',
  },
  prev_button: {
    height:'8vh',
    width:'1vw',
    fontSize:'2.5vw',
    marginTop:'8vw',
    borderRadius:'40px',
  },
  prev_button__mobile: {
    //height:'4vh',
    //width:'1vw',
    fontSize:'2.5vw',
    borderRadius:'20px',
  }
})

const TopSwiper = () => {
  const classes = useStyles()

  const breakPoints = [
    { width: 1, itemsToShow: 4 },
    { width: 1000, itemsToShow: 5 }
  ];
  const breakPoints_mobile = [
    { width: 1, itemsToShow: 1.31 },
  ];
  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? '〈' : '〉'
    return (
      <Button onClick={onClick} className={classes.prev_button}>{/* disabled={isEdge}  */}
        <div>
          {pointer}
        </div>
      </Button>
    )
  }
  const myArrowMobile = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? '〈' : '〉'
    return (
      <Button onClick={onClick} className={classes.prev_button__mobile}>{/* disabled={isEdge}  */}
        <div>
          {pointer}
        </div>
      </Button>
    )
  }

  const [featuredproducts, setFeaturedproducts] = useState([])
  const productsRef = db.collection('products')
  useEffect(() => {
    (async () => {
      await productsRef.orderBy('updated_at', 'desc').where("featured", "==", true).get()
        .then(snapshots => {
          let results = []
          snapshots.forEach(snapshots => {
            results.push({ ...snapshots.data()})
          })
          setFeaturedproducts(results)
        })
        .catch((error) => console.log(error))
      })()
    },[])

  return (
    <div>
      <p className={classes.featured_p}>Featured</p>
      
      <div className={classes.topswiper}>
        
          <Grid container justify="center">

              {(
                window.innerWidth > 760 ?
                  <>                        
                  <Carousel breakPoints={breakPoints} renderArrow={myArrow}

                    renderPagination={({ pages, onClick }) => {
                      return (
                        <Container direction="row" className={classes.topswiper__paginationbutton}>
                          {pages.map(page => {
                            return (
                              <Button
                                className={classes.topswiper__paginationIconButton}
                                key={page}
                                onClick={() => onClick(page)}
                              >
                              <SwapHorizIcon
                                className={classes.topswiper__paginationIcon}
                              />
                              </Button>
                            )
                          })}
                        
                        </Container>
                      )
                    }}
                  >
                    {featuredproducts.length > 0 && (
                      featuredproducts.map(product => (
                          <TopSwiperCard key={product.id} id={product.id} name={product.name} images={product.images} category={product.category} clients={product.clients} username={product.username}/> 
                        )
                      )
                    )
                    }
                  </Carousel>
                </>
                :
                <>
                  <Carousel breakPoints={breakPoints_mobile} renderArrow={myArrowMobile} >
                    {featuredproducts.length > 0 && (
                      featuredproducts.map(product => (
                          <TopSwiperCardMobile key={product.id} id={product.id} name={product.name} images={product.images} category={product.category} clients={product.clients} username={product.username} />
                        )   
                      )
                    )}
                  </Carousel>
                </>
              )}
          </Grid>
      </div>
    </div>
  )
}
export default TopSwiper;
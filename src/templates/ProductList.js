import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Products/ProductCard";
import { fetchProducts } from "../reducks/products/operation";
import { getProducts } from "../reducks/products/selectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);//productsにproducts情報を格納

  useEffect(() => {
    dispatch((fetchProducts()))
  }, []);
  //console.log(products);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map(product => (
            <ProductCard key={product.id} id={product.id} name={product.name} images={product.images} category={product.category} clients={product.clients}/>
          )
        ))}
      </div>
    </section>
  )
}
export default ProductList;
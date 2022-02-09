import { List } from "@material-ui/core";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookMarkListItem } from "../components/Products";
import { GreyButton, PrimaryButton } from "../components/UIkit";
import { getProductsInBookMark } from "../reducks/users/selectors";

const BookMarkList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInBookMark = getProductsInBookMark(selector);//bookmarkの記事情報
  
  const backToHome = useCallback(() => {
    dispatch(push(''))
  }, [])

  return (
    <section className="c-section-wrapin">
      <h1 className="u-text__headline">
        お気に入りリスト
      </h1>
      <List>
        {productsInBookMark.length > 0 && (
          productsInBookMark.map(product => <BookMarkListItem key={product.bookmarkId} product={product} />)
        )}
      </List>
      <div className="module-spacer--medium"></div>
      <div className="p-grid__column">
        <div className="module-spacer--extra-extra-small" />
        <PrimaryButton label={"一覧へ戻る"} onClick={backToHome} />
      </div>
    </section>
  )
}
export default BookMarkList;
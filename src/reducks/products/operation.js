//Firestoreのメソッド
//・addメソッド -> データ追加に使用
//・setメソッド -> ドキュメントのIDを取得してデータをセットできる
//////例) productsRef.doc(空).set(data) -->> add()と同じ=ID自動採番
//////応用)自動採番IDを取得(関数に格納)
//////   const ref = productsRef.doc()
//////   const id = ref.id;
//////   data.id = id;
//////   return productsRef.doc(id).set(data)
//////変更部分のみmerge可能)productsRef.doc(id).set(data, {merge: true})
//////{merge: true}なし => 上書き
//////
import { db, FirebaseTimestamp } from "../../Firebase"
import { format } from 'date-fns'
import { push } from "connected-react-router"
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import { deleteProductAction, fetchProductsAction } from "./actions"

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
  const confirm = window.confirm('本当に削除しますか？')
  if (confirm) {

    return async (dispatch, getState) => {
      dispatch(showLoadingAction("Loading..."));
      productsRef.doc(id).delete()
          .then(() => {
            const prevProducts = getState().products.list;//getState() ==> 現在のstoreの情報
            const nextProducts = prevProducts.filter(product => product.id !== id)
            dispatch(deleteProductAction(nextProducts))
            dispatch(hideLoadingAction());
            alert(`削除しました。`)
          }).catch(() => {alert('権限がありません')})
        dispatch(hideLoadingAction());
    }
 } else if(confirm === undefined) console.log('You did not delete product.')
}

export const fetchProducts = (clients, category, created_at, created_at_month, page, updated_at_month, ) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("Loading..."));
    let query = productsRef.orderBy('created_at', 'desc')

    query = (clients !== "") ? query.where('clients', '==', clients) : query;
    query = (category !== "") ? query.where('category', '==', category) : query;

    //query = (updated_at_month !== "") ? query.where('updated_at_month', '==', updated_at_month) : query;//updated_at_monthで判別
    query = (created_at_month !== "") ? query.where('created_at_month', '==', created_at_month) : query;//updated_at_monthで判別

    query.limit(page).get()
      .then(snapshots => {
            const productList = []
          snapshots.forEach(snapshots => {
            const product = snapshots.data();
            productList.push(product)
          })
          dispatch(hideLoadingAction());
          dispatch(fetchProductsAction(productList))
      }).catch((error) => {
        dispatch(hideLoadingAction());
        //console.log(error);
        alert('エラーが発生しました。')
      })
      dispatch(hideLoadingAction());
  }
}

export const saveProduct = (id, name, images,  description, category, clients, username, uid) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("処理中..."));
    if (images.length === 0 || description === "" || category === "" || clients === ""){
      dispatch(hideLoadingAction());
      alert("必須項目が未入力です。")
      return false//何も実行しない
    }
  
    const myShapedDate = format(new Date(), 'yyyyMMddHHmmss');
    const myShapedDate_month = format(new Date(), 'yyyyMM');
    const myShapedDate_month_created_at = format(new Date(), 'yyyyMM');
    const myShapedDate_date = format(new Date(), 'yyyyMMdd');

    const data = {
      name: name,
      category: category,
      clients: clients,
      description: description,
      images: images,
      username: username,
      
      uid:localStorage.getItem('if-uid'),
      featured:false,
      updated_at: myShapedDate,

      updated_at_month: myShapedDate_month,
      created_at_month: myShapedDate_month_created_at,//クエリに使う?
      updated_at_date: myShapedDate_date,
    }

    if (id === ""){//新規作成時
      const ref = productsRef.doc();

      data.created_at = myShapedDate

      id = ref.id
      data.id = id
    }
    
    return productsRef.doc(id).set(data, {merge: true})
      .then((res) => {//データ処理成功時
        console.log(data)
        dispatch(hideLoadingAction());
        dispatch(push('/'))
        alert('記事を投稿しました。')
      }).catch((error) => {
        dispatch(hideLoadingAction());
        alert('エラーが発生しました。')
        throw new Error(error)
      })
  }
}
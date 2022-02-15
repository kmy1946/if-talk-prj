//Firestoreのメソッド
//・addメソッド -> データ追加に使用
//////  自動でIDを採番、例) collectionのドキュメントにデータ(name,price等)が格納される
//////
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
import { deleteProductAction, fetchProductsAction } from "./actions"

const productsRef = db.collection('products')//.where("username", "==", username.uid)

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
        .then(() => {
          const prevProducts = getState().products.list;//getState() ==> 現在のstoreの情報
          const nextProducts = prevProducts.filter(product => product.id !== id)
          dispatch(deleteProductAction(nextProducts))
        }).catch((error) => {alert('権限がありません')})
  }
}

export const fetchProducts = (clients, category, updated_at_month, page) => {
  return async (dispatch) => {
    let query = productsRef.orderBy('updated_at', 'desc')

    query = (clients !== "") ? query.where('clients', '==', clients) : query;
    query = (category !== "") ? query.where('category', '==', category) : query;

    query = (updated_at_month !== "") ? query.where('updated_at_month', '==', updated_at_month) : query;//updated_at_monthで判別

    query.limit(page).get()
      .then(snapshots => {
            const productList = []
          snapshots.forEach(snapshots => {
            const product = snapshots.data();
            productList.push(product)
          })
          dispatch(fetchProductsAction(productList))
      }).catch((error) => console.log(error))
  }
}

export const saveProduct = (id, name, images,  description, category, clients, username, uid) => {
  return async (dispatch) => {
    if (images.length === 0 || description === "" || category === "" || clients === ""){
      alert("必須項目が未入力です。")
      return false//何も実行しない
    }
  
    //const timestamp = FirebaseTimestamp.now()
    const myShapedDate = format(new Date(), 'yyyyMMddHHmmss');
    const myShapedDate_month = format(new Date(), 'yyyyMM');
    const myShapedDate_date = format(new Date(), 'yyyyMMdd');

    const data = {
      name: name,
      category: category,
      clients: clients,
      description: description,
      images: images,
      username: username,
      //price: parseInt(price, 10),//10進数
      uid:localStorage.getItem('if-uid'),
      featured:false,
      updated_at: myShapedDate,

      updated_at_month: myShapedDate_month,
      updated_at_date: myShapedDate_date,
    }
    console.log(data.updated_at)

    if (id === ""){//新規作成時
      const ref = productsRef.doc();

      data.created_at = myShapedDate

      id = ref.id
      data.id = id
    }
    
    return productsRef.doc(id).set(data, {merge: true})//where("uid", "==", data.uid).//〇set()は完全上書き ==>> × mergeによる更新部のみ反映=編集可能
    
        .then(() => {//データ処理成功時
          //console.log('data.uid')
          dispatch(push('/'))
          //console.log('ok')
        }).catch((error) => {
          alert('権限がありません')
          throw new Error(error)
        })
  }
}
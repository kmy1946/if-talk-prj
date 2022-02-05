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
import { push } from "connected-react-router"
const productsRef = db.collection('products')

export const saveProduct = (id, name, images,  description, category, clients) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      category: category,
      clients: clients,
      description: description,
      images: images,
      //price: parseInt(price, 10),//10進数
      updated_at: timestamp
    }
    if (id === ""){
      const ref = productsRef.doc();
      const id = ref.id
      data.id = id
      data.created_at = timestamp//新規作成時
    }
    
    return productsRef.doc(id).set(data, {merge: true})//〇set()は完全上書き ==>> × mergeによる更新部のみ反映=編集可能
        .then(() => {//データ処理成功時
          dispatch(push('/'))
        }).catch((error) => {
          throw new Error(error)
        })
  }
}
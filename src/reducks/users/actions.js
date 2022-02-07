//actionsの法則
//文字列を変数に格納し、reducersで呼び出し、状態を管理する
//fetchProductsInBookMarkAction
//
export const FETCH_PRODUCTS_IN_BOOKMARK = "FETCH_PRODUCTS_IN_BOOKMARK";
export const fetchProductsInBookMarkAction = (products) => {
  return {
    type:"FETCH_PRODUCTS_IN_BOOKMARK",
    payload: products
  }
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type:"SIGN_IN",
    payload: {
      isSignedIn:true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username
    }
  }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {//初期化
      isSignedIn:false,
      role: "",
      uid:"",
      username:""
    }
  }
}
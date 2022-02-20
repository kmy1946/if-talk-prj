const initialState = {
  loading: { state: false, text: "" },
  products: {
    list: [],
  },
  users: {
    bookmark:[],
    //icon: "",
    isSignedIn: false,
    role: "",
    uid: "",
    username: ""
  }
};
export default initialState
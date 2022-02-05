import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageArea from "../components/Products/ImageArea";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { db } from "../Firebase";
import { saveProduct } from "../reducks/products/operation";

const ProductEdit = () => {
  const dispatch = useDispatch()
  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== "") {
      id = id.split('/')[1]
      //console.log('after split / ', id)
  }

  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [category, setCategory] = useState(""),
        [clients, setClients] = useState(""),
        //[price, setPrice] = useState("");
        [description, setDescription] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])
  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription])
  //const inputPrice = useCallback((event) => {
  //  setName(event.target.value)
  //}, [setPrice])

  const categories = [
    {id: "no-category", name: "カテゴリーなし"},
    {id: "py", name: "Python"},
    {id: "js", name: "Javascript"},
    {id: "rb", name: "Ruby"},
    {id: "php", name: "PHP"},
    {id: "go", name: "Go"},
    {id: "html", name: "HTML"},
    {id: "css", name: "CSS"},
  ]
  const target_clients = [
    {id:"all", name:"全て"},
    {id:"beginer", name:"初心者"},
    {id:"intermediate", name:"中級者"},
    {id:"advanced", name:"上級者"}
  ]

  useEffect(() => {
    if (id !== "") {//編集ページではない時
      db.collection('products').doc(id).get().then(snapshot => {
            const product = snapshot.data();
            setImages(product.images);
            setName(product.name);
            setCategory(product.category);
            setClients(product.clients);
            //setPrice(data.price);
            setDescription(product.description);
          })
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">記事の登録と編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"記事名"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <SelectBox
          label={"カテゴリ"} required={true} fullWidth={true} options={categories} select={setCategory} value={category}
        />
        <SelectBox
          label={"対象者"} required={true} fullWidth={true} options={target_clients} select={setClients} value={clients}
        />
        <TextInput
          fullWidth={true} label={"説明"} multiline={true} required={true}
          onChange={inputDescription} rows={10} value={description} type={"text"}
        />
        {/*
        <TextInput
          fullWidth={true} label={"価格"} multiline={false} required={false}
          onChange={inputPrice} rows={1} value={price} type={"text"}
        />
        */}
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"記事を投稿する"}
            onClick={() => dispatch(saveProduct(id, name, images, description, category, clients))}
          />
        </div>
      </div>
    </section>
  )
}
export default ProductEdit;
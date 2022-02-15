import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageArea from "../components/Products/ImageArea";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { db } from "../Firebase";
import { saveProduct } from "../reducks/products/operation";
import './productedit.css';
import { EditorState } from 'draft-js';
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const ProdctEditRich = () => {
  let _contentState = ContentState.createFromText('Sample content state');
  const raw = convertToRaw(_contentState)
  const [contentState, setContentState] = useState(raw)
  
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [description, setDescription] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setDescription(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const dispatch = useDispatch()
  let id = window.location.pathname.split('/users/product/edit')[1];
  if (id !== "") {
      id = id.split('/')[1]
  }
  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [category, setCategory] = useState(""),
        [categories, setCategories] = useState([]),
        [clients, setClients] = useState("");
        //[description, setDescription] = useState("");

  const username = localStorage.getItem('if-username')

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])
  //const inputDescription = useCallback((event) => {
    //setDescription(event.target.value)
  //}, [setDescription])

  const target_clients = [
    {id:"all", name:"全て"},
    {id:"beginner", name:"初心者"},
    {id:"intermediate", name:"中級者"},
    {id:"advanced", name:"上級者"}
  ]

  useEffect(() => {
    if (id !== "") {//編集ページではない時
      db.collection('products').doc(id).get()
          .then(snapshot => {
            const product = snapshot.data();
            setImages(product.images);
            setName(product.name);
            setCategory(product.category);
            setClients(product.clients);
            setDescription(product.description);
      })
    }
  }, [id]);

  useEffect(() => {
    db.collection('categories')
        .orderBy('order', 'asc')
        .get()
        .then(snapshots => {
          const list = []
          snapshots.forEach(snapshot => {
            const data = snapshot.data()
            //console.log(data)
            list.push({
              id:data.id,
              name:data.name
            })
          })
          setCategories(list)
        })
  }, [])

  const edit_title = () => {
    if (id !== "") {
      return (
        <h2 className="u-text__headline_post u-text-center_post">記事の編集</h2>
      )
    } else {
      return (
        <h2 className="u-text__headline_post u-text-center_post">記事の登録</h2>
        )
    }
  }

  return (
    <section>
      <div className="module-spacer--xsmall" />
      {edit_title()}
      <div className="c-section-container_post">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"タイトル"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <div className="module-spacer--medium" />
        <SelectBox
          label={"カテゴリ"} required={true} fullWidth={true} options={categories} select={setCategory} value={category}
        />　　　
        <SelectBox
          label={"対象者"} required={true} fullWidth={true} options={target_clients} select={setClients} value={clients}
        />
        <div className="module-spacer--medium" />
        <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        value={description} type={"text"} required={true} fullWidth={true} 
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(description)}></div>
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"記事を投稿する"}
            onClick={() => dispatch(saveProduct(id, name, images, description, category, clients, username))}
          />
        </div>
      </div>

    </section>
  )
}
export default ProdctEditRich;
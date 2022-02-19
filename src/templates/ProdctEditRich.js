import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageArea from "../components/Products/ImageArea";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { db, storage } from "../Firebase";
import { saveProduct } from "../reducks/products/operation";
import './productedit.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, DefaultDraftBlockRenderMap, //convertFromRaw,
          ContentState, convertToRaw, //AtomicBlockUtils, RichUtils,
          //getDefaultKeyBinding, KeyBindingUtil
        } from 'draft-js';//, getDefaultKeyBinding, RichUtils
import createImagePlugin from "@draft-js-plugins/image";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import "draft-js/dist/Draft.css";
//import { convertToHTML, } from 'draft-convert';
import DOMPurify from 'dompurify';
//import { draftToHtml as draftToHtml_unused } from 'draftjs-to-html';
//import CodeUtils from 'draft-js-code';
import Immutable from 'immutable';
//import { EditorComponent } from ".";
//import htmlToDraft from "html-to-draftjs"
//import TextEditor from "./Editor/TextEditor";
import draftToHtml from "draftjs-to-html";

//import draftToHtml from 'draftjs-to-html-fork';//code,highlight supported

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////draft.js
const blockRenderMap = Immutable.Map({//デフォルトのBlockRenderMapにタグに対応するMapオブジェクト
  'section': {
    element: 'section',
  },
  'unstyled': {
    element: 'span',
    aliasedElements: ['div'],
  },
  'code': {
    element: 'code',
  }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


const ProdctEditRich = () => {
  const dispatch = useDispatch()
  const styleMap = {//customstulemap
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
    'BOLD': {
      fontWeight: 'bold',
    },
  };

  const uploadDescription_Images = (props) => {
    const {block, contentState} = props;
    //const {foo} = props.blockProps;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    //console.log({foo})
    console.log('data:',data)
    return <img src={props.data}/>
  }
  const myBlockRenderer = (block) => {
    //console.log(block.getType())
    if (block.getType() === "blockquote") {
      return {
        editable: true,
      }
    }
    if (block.getType() === "unstyled") {
      return {
        editable: true,
      }
    }
    if (block.getType() === "atomic") {
      console.log(block.getType())
      return {
        component: uploadDescription_Images,
        editable: true,
        props: {
          foo: 'foo',
        },
      }
    }
    return null
  }

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'custom') {
      console.log(type)
      return {
        //component: Code_Component,
        editable: false,
        props: {
          foo: 'bar',
        },
      }
    }
  }

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();//オブジェクト作成
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
      const data = new FormData();//
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  let _contentState = ContentState.createFromText('Sample Content');
  const raw = convertToRaw(_contentState)
  const [contentState, setContentState] = useState(raw)
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),//htmlToEState(html)//
  );
  const  [description, setDescription] = useState();
  const handleEditorChange = (state, e) => {
    setEditorState(state);
    convertContentToHTML();
  }
  //console.log(editorState)
  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))//convertToHTML(editorState.getCurrentContent());
    setDescription(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== "") {
      id = id.split('/')[1]
  }
  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [category, setCategory] = useState(""),
        [categories, setCategories] = useState([]),
        [clients, setClients] = useState("");
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

  const imagePlugin = createImagePlugin();

  const Image = (props) => {
    return <img src={props.src} alt="" />;
  };

  const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === "image") {
      media = <Image src={src} />;
    }

    return media;
  };

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
        {/*
        <EditorComponent wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class"
          description={description}
          editorState={editorState} handleEditorChange={handleEditorChange} 
        />
        */}{/*
        <TextEditor description={description}/>
        {description}
        */}
        <Editor //contenteditable="true"
          editorState={editorState}
          onEditorStateChange={handleEditorChange} 
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          value={description}
          toolbar={{
            options: ['inline', 'blockType','fontFamily', 'textAlign', 'list', 'colorPicker', 'link', 'image', 'remove', 'history'],//, 'emoji'
            inline: { inDropdown: true, options: ['bold', 'italic', 'underline', 'monospace','strikethrough', 'superscript', 'subscript'] },//
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'], },
            //image: {urlEnabled: true, uploadEnabled: true,uploadCallback: (file) => uploadImage(file),//upload_DescriptionImages,
              //previewImage: true,alt: { present: true, mandatory: true },inputAccept: "image/*",}
            }}
          localization={{
            locale: 'ja',
            }}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          blockRendererFn={myBlockRenderer}
          blockRenderMap={extendedBlockRenderMap}
          //plugins={plugins}
          //plugins={[imagePlugin]}
          //readOnly={true}
        />
        {/*}
        <Editor //contenteditable="true"
          editorState={editorState} onEditorStateChange={handleEditorChange} 
          wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class"
          value={description}
          //blockRendererFn={myBlockRenderer}
        />
        */}
        <div className="center">
          <PrimaryButton
            label={"記事を投稿する"}
            onClick={() => dispatch(saveProduct(id, name, images, description, category, clients, username))}
          />
        </div>
        <br/>

        <p>Preview:</p>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(description)}></div>
        <div className="preview">
          <p>送信データ：</p>
          <br/>
          {description}
        </div>
      
        <div className="module-spacer--medium" />
      </div>

    </section>
  )
}
export default ProdctEditRich;
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './productedit.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, DefaultDraftBlockRenderMap,
          ContentState, convertToRaw, convertFromRaw,
          Modifier, SelectionState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css'
import DOMPurify from 'dompurify';
import Immutable from 'immutable';
import draftToHtml from "draftjs-to-html";
import { CodeBlock } from ".";
import { db } from "../Firebase";
import { hideLoadingAction,  } from "../reducks/loading/actions";
import ImageArea from "../components/Products/ImageArea";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { saveProduct } from "../reducks/products/operation";

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType()
  const contentText = contentBlock.getText();
  if (type === 'code') {
    console.log(type)
    return {
      component: CodeBlock,
      editable: true,
      props:{
        contentText:contentText
      }
    }
  }
}

const blockRenderMap = Immutable.Map({//デフォルトのBlockRenderMapにタグに対応するMapオブジェクト
  'section': {
    element: 'section',
  },
  'unstyled': {
    element: 'span',
    aliasedElements: ['div'],
  },
  //'code': {element: 'code',}
  'code-block': {//
    element: 'code',
    aliasedElements: ['pre'],
    //nestingEnabled: false
  },
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

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'custom') {      
      return {
        //component: Code_Component,
        editable: false,
        props: {
          foo: 'bar',
        },
      }
    }
  }

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText('')
      )
    //() => EditorState.createEmpty(),//htmlToEState(html)//

    //() => EditorState.createWithContent( convertFromRaw(data),
      //new MultiDecorator([ new PrismDecorator({ defaultSyntax: 'javascript' }),
      //  new NewLineDecorator() ]))
    );
  const  [description, setDescription] = useState('');
  const handleEditorChange = (state, e) => {
    setEditorState(state);
    convertContentToHTML();
  }
  //console.log(editorState)
  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))//convertToHTML(editorState.getCurrentContent());

    const heading = document.getElementsByClassName('H2')
    //console.log(heading)
    if (heading.nodeName === "H2") {
      ///let element = document.getElementById('shopinfo');
      ///const x = element.setAttribute('class', 'H2');
      
    } else if (heading.nodeName === "H3") {
    }

    setDescription(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  let id = window.location.pathname.split('/product/edit')[1];
  if (id === undefined) {//新規作成時UncaughtError回避
    id = ""
  }
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
    dispatch(hideLoadingAction());
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

  const target_clients = [
    {id:"all", name:"全て"},
    {id:"beginner", name:"初心者"},
    {id:"intermediate", name:"中級者"},
    {id:"advanced", name:"上級者"}
  ]

  const edit_title = () => {
    if (id !== "") {
      return (
        <h1 className="u-text__headline_post u-text-center_post">記事の編集</h1>
      )
    } else {
      return (
        <h1 className="u-text__headline_post u-text-center_post">記事の登録</h1>
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
        <Editor //contenteditable="true"
          initialEditorState={description}
          editorState={editorState}
          onEditorStateChange={handleEditorChange} 
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          value={description}
          toolbar={{
            options: ['inline', 'blockType','fontFamily', 'textAlign', 'list', 'colorPicker', 'link', "embedded", 'image', 'remove', 'history', 'emoji'],
            inline: { inDropdown: true, options: ['bold', 'italic', 'underline', 'monospace','strikethrough', 'superscript', 'subscript'] },//
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },

            embedded: {
              defaultSize: {
                height: "auto",
                width: "auto"
              }
            },
            history: { inDropdown: true },
            blockType: { options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'], },
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
          //plugins={PrismPlugin}
          handleReturn={(event, state) => {
            const contentState = state.getCurrentContent()
            const selection = state.getSelection()
            const currentBlock = contentState.getBlockForKey(
              selection.getStartKey()
            )
            if (
              selection.isCollapsed() &&
              currentBlock.getType() === 'code'
            ) {
              if (event.metaKey) {
                const nextContentBlock = contentState.getBlockAfter(
                  selection.getStartKey()
                )
                if (nextContentBlock) {
                  const newEditorState = EditorState.forceSelection(
                    editorState,
                    new SelectionState().merge({
                      anchorKey: nextContentBlock.getKey(),
                      focusKey: nextContentBlock.getKey()
                    })
                  )
                  setEditorState(newEditorState)
                } else {
                  // insert new block;
                  let newContentState = Modifier.splitBlock(
                    contentState,
                    selection.merge({
                      anchorOffset: currentBlock.getLength()
                    })
                  )
                  newContentState = Modifier.setBlockType(
                    newContentState,
                    newContentState.getSelectionAfter(),
                    'unstyled'
                  )
                  const newEditorState = EditorState.push(
                    editorState,
                    newContentState,
                    'split-block'
                  )
                  setEditorState(newEditorState)
                }
              } else {
                let newContentState = Modifier.insertText(
                  contentState,
                  selection,
                  '\n'
                )
                const newEditorState = EditorState.push(
                  editorState,
                  newContentState,
                  'insert-characters'
                )
                setEditorState(newEditorState)
              }
              return 'handled'
            }
          }}
        />
        <div className="center">
          <PrimaryButton
            label={"記事を投稿する"}
            onClick={() => dispatch(saveProduct(id, name, images, description, category, clients, username))}
          />
        </div>
        <br/>

        <p>Preview:</p>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(description)}></div>
        <div className="module-spacer--medium" />
      </div>

    </section>
  )
}
export default ProdctEditRich;